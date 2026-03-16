import type {
  ButtonLikeNode,
  EffectLikeNode,
  PressableLikeNode,
  ProgressLikeNode,
  SchedulerLike,
  TextLikeNode
} from "./cocos-bindings.js";
import type { GameManager } from "../core/game-manager.js";
import { resolveShotOutcome } from "../gameplay/shot-feedback.js";
import { ShotInputController } from "../gameplay/shot-input.js";
import { GameplaySceneController } from "../ui/gameplay-scene-controller.js";

export class GameplayScene {
  private readonly controller: GameplaySceneController;
  private readonly shotInput = new ShotInputController();

  constructor(
    gameManager: GameManager,
    private readonly scheduler: SchedulerLike,
    private readonly scoreText: TextLikeNode,
    private readonly comboText: TextLikeNode,
    private readonly timerText: TextLikeNode,
    private readonly powerBar: ProgressLikeNode,
    private readonly reviveButton: ButtonLikeNode,
    private readonly hitEffectRoot?: EffectLikeNode,
    private readonly shotButton?: PressableLikeNode
  ) {
    this.controller = new GameplaySceneController(gameManager);
  }

  onLoad(): void {
    const initialState = this.controller.enter();
    this.renderState(initialState.score, initialState.combo, initialState.remainingSeconds);

    this.reviveButton.bindClick(async () => {
      const revived = await this.controller.tryRevive("rewarded-revive");
      this.reviveButton.setEnabled(!revived);
    });

    this.shotButton?.bindPress(
      () => {
        this.shotInput.beginCharge();
        this.powerBar.setProgress(0);
      },
      () => {
        const result = this.shotInput.release();
        const outcome = resolveShotOutcome(result.chargeRatio, result.isPerfect);
        if (outcome.type === "miss") {
          this.onMiss();
          return;
        }

        this.onHit(outcome.scoreDelta, outcome.effect);
      }
    );
  }

  start(): void {
    this.scheduler.schedule((deltaSeconds) => {
      const chargeState = this.shotInput.updateCharge(deltaSeconds);
      if (chargeState.charging) {
        this.powerBar.setProgress(chargeState.chargeRatio);
      }

      const snapshot = this.controller.tick(deltaSeconds);
      this.renderState(snapshot.score, snapshot.combo, snapshot.remainingSeconds);
    });
  }

  onDestroy(): void {
    this.scheduler.unschedule();
  }

  onHit(scoreDelta = 2, effectName = "hit"): void {
    const result = this.controller.onHit(scoreDelta);
    this.scoreText.setText(`Score: ${result.score}`);
    this.comboText.setText(`Combo: ${result.combo} ${result.emotion}`);
    this.powerBar.setProgress(Math.min(result.combo / 8, 1));
    this.hitEffectRoot?.play(effectName);
  }

  onMiss(): void {
    const result = this.controller.onMiss();
    this.scoreText.setText(`Score: ${result.score}`);
    this.comboText.setText(`Combo: ${result.combo} ${result.emotion}`);
    this.powerBar.setProgress(0);
    this.hitEffectRoot?.play("miss");
  }

  private renderState(score: number, combo: number, remainingSeconds: number): void {
    this.scoreText.setText(`Score: ${score}`);
    this.comboText.setText(`Combo: ${combo}`);
    this.timerText.setText(`Time: ${Math.ceil(remainingSeconds)}`);
  }
}
