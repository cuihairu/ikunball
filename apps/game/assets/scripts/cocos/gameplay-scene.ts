import type {
  ButtonLikeNode,
  ProgressLikeNode,
  SchedulerLike,
  TextLikeNode
} from "./cocos-bindings.js";
import type { GameManager } from "../core/game-manager.js";
import { GameplaySceneController } from "../ui/gameplay-scene-controller.js";

export class GameplayScene {
  private readonly controller: GameplaySceneController;

  constructor(
    gameManager: GameManager,
    private readonly scheduler: SchedulerLike,
    private readonly scoreText: TextLikeNode,
    private readonly comboText: TextLikeNode,
    private readonly timerText: TextLikeNode,
    private readonly powerBar: ProgressLikeNode,
    private readonly reviveButton: ButtonLikeNode
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
  }

  start(): void {
    this.scheduler.schedule((deltaSeconds) => {
      const snapshot = this.controller.tick(deltaSeconds);
      this.renderState(snapshot.score, snapshot.combo, snapshot.remainingSeconds);
    });
  }

  onDestroy(): void {
    this.scheduler.unschedule();
  }

  onHit(): void {
    const result = this.controller.onHit(2);
    this.scoreText.setText(`Score: ${result.score}`);
    this.comboText.setText(`Combo: ${result.combo} ${result.emotion}`);
    this.powerBar.setProgress(Math.min(result.combo / 8, 1));
  }

  onMiss(): void {
    const result = this.controller.onMiss();
    this.scoreText.setText(`Score: ${result.score}`);
    this.comboText.setText(`Combo: ${result.combo} ${result.emotion}`);
    this.powerBar.setProgress(0);
  }

  private renderState(score: number, combo: number, remainingSeconds: number): void {
    this.scoreText.setText(`Score: ${score}`);
    this.comboText.setText(`Combo: ${combo}`);
    this.timerText.setText(`Time: ${Math.ceil(remainingSeconds)}`);
  }
}
