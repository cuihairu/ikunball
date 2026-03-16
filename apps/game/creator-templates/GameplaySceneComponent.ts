import { _decorator, Button, Component, Label, Node, ProgressBar } from "cc";

const { ccclass, property } = _decorator;

@ccclass("GameplaySceneComponent")
export class GameplaySceneComponent extends Component {
  @property(Label)
  scoreLabel: Label | null = null;

  @property(Label)
  comboLabel: Label | null = null;

  @property(Label)
  timerLabel: Label | null = null;

  @property(ProgressBar)
  powerBar: ProgressBar | null = null;

  @property(Button)
  reviveButton: Button | null = null;

  @property(Node)
  shotTouchArea: Node | null = null;

  @property(Node)
  playerNode: Node | null = null;

  @property(Node)
  ballNode: Node | null = null;

  @property(Node)
  hoopNode: Node | null = null;

  @property(Node)
  hitEffectRoot: Node | null = null;

  private charging = false;
  private chargeElapsed = 0;
  private readonly maxChargeSeconds = 1.2;
  private remainingSeconds = 60;

  onLoad(): void {
    this.reviveButton?.node.on(Button.EventType.CLICK, this.handleReviveClick, this);
    this.shotTouchArea?.on(Node.EventType.TOUCH_START, this.handleTouchStart, this);
    this.shotTouchArea?.on(Node.EventType.TOUCH_END, this.handleTouchEnd, this);
    this.shotTouchArea?.on(Node.EventType.TOUCH_CANCEL, this.handleTouchCancel, this);

    this.renderHud(0, 0, this.remainingSeconds);
  }

  update(deltaTime: number): void {
    this.remainingSeconds = Math.max(0, this.remainingSeconds - deltaTime);

    if (this.charging) {
      this.chargeElapsed = Math.min(this.maxChargeSeconds, this.chargeElapsed + deltaTime);
      if (this.powerBar) {
        this.powerBar.progress = this.chargeElapsed / this.maxChargeSeconds;
      }
    }

    this.renderTimer();

    if (this.remainingSeconds <= 0) {
      this.finishRound();
    }
  }

  onDestroy(): void {
    this.reviveButton?.node.off(Button.EventType.CLICK, this.handleReviveClick, this);
    this.shotTouchArea?.off(Node.EventType.TOUCH_START, this.handleTouchStart, this);
    this.shotTouchArea?.off(Node.EventType.TOUCH_END, this.handleTouchEnd, this);
    this.shotTouchArea?.off(Node.EventType.TOUCH_CANCEL, this.handleTouchCancel, this);
  }

  private handleTouchStart(): void {
    this.charging = true;
    this.chargeElapsed = 0;
    if (this.powerBar) {
      this.powerBar.progress = 0;
    }
  }

  private handleTouchEnd(): void {
    const chargeRatio = this.maxChargeSeconds === 0 ? 0 : this.chargeElapsed / this.maxChargeSeconds;
    this.charging = false;

    if (chargeRatio >= 0.45 && chargeRatio <= 0.65) {
      this.handleShotSuccess(3, "perfect");
    } else if (chargeRatio >= 0.2 && chargeRatio <= 0.85) {
      this.handleShotSuccess(2, "hit");
    } else {
      this.handleShotMiss();
    }

    if (this.powerBar) {
      this.powerBar.progress = 0;
    }
  }

  private handleTouchCancel(): void {
    this.charging = false;
    this.chargeElapsed = 0;

    if (this.powerBar) {
      this.powerBar.progress = 0;
    }
  }

  private handleReviveClick(): void {
    // TODO:
    // 1. 拉起激励视频
    // 2. 成功后增加剩余时间
  }

  private handleShotSuccess(scoreDelta: number, effectName: "perfect" | "hit"): void {
    // TODO:
    // 1. 接入 GameManager / GameplayController
    // 2. 更新真实分数和连击
    // 3. 切换角色表情

    this.playHitEffect(effectName);

    if (this.scoreLabel) {
      this.scoreLabel.string = `Score: +${scoreDelta}`;
    }
  }

  private handleShotMiss(): void {
    // TODO:
    // 1. 接入 GameplayController 的 miss 逻辑
    // 2. 重置连击
    // 3. 切换破防表情

    this.playHitEffect("miss");
  }

  private renderHud(score: number, combo: number, timeLeft: number): void {
    if (this.scoreLabel) {
      this.scoreLabel.string = `Score: ${score}`;
    }

    if (this.comboLabel) {
      this.comboLabel.string = `Combo: ${combo}`;
    }

    if (this.timerLabel) {
      this.timerLabel.string = `Time: ${Math.ceil(timeLeft)}`;
    }
  }

  private renderTimer(): void {
    if (this.timerLabel) {
      this.timerLabel.string = `Time: ${Math.ceil(this.remainingSeconds)}`;
    }
  }

  private finishRound(): void {
    // TODO:
    // 1. 保存本局结果
    // 2. 跳转 Result 场景
  }

  private playHitEffect(effectName: "perfect" | "hit" | "miss"): void {
    // TODO:
    // 1. 从对象池取特效预制体
    // 2. 挂到 hitEffectRoot
    // 3. 播放音效和角色动画
    void effectName;
  }
}
