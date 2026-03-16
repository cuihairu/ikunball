import { _decorator, Button, Component, Label, Node } from "cc";

import { formatSubmitStatus } from "./shared";

const { ccclass, property } = _decorator;

@ccclass("ResultSceneComponent")
export class ResultSceneComponent extends Component {
  @property(Label)
  scoreLabel: Label | null = null;

  @property(Label)
  bestScoreLabel: Label | null = null;

  @property(Node)
  reviveStateNode: Node | null = null;

  @property(Button)
  submitButton: Button | null = null;

  @property(Button)
  homeButton: Button | null = null;

  @property(Label)
  submitStatusLabel: Label | null = null;

  onLoad(): void {
    this.submitButton?.node.on(Button.EventType.CLICK, this.handleSubmitClick, this);
    this.homeButton?.node.on(Button.EventType.CLICK, this.handleHomeClick, this);
  }

  start(): void {
    this.renderSummary(0, 0, false);
    this.renderSubmitState("idle");

    // TODO:
    // 1. 从 GameManager 读取本局分数
    // 2. 读取最高分和是否复活
  }

  onDestroy(): void {
    this.submitButton?.node.off(Button.EventType.CLICK, this.handleSubmitClick, this);
    this.homeButton?.node.off(Button.EventType.CLICK, this.handleHomeClick, this);
  }

  private async handleSubmitClick(): Promise<void> {
    this.renderSubmitState("submitting");

    try {
      // TODO:
      // 1. 提交排行榜
      // 2. 刷新按钮状态或提示文案
      this.renderSubmitState("success");
      this.submitButton!.interactable = false;
    } catch {
      this.renderSubmitState("error");
    }
  }

  private handleHomeClick(): void {
    // TODO: 返回 Home 场景
  }

  private renderSummary(score: number, bestScore: number, reviveUsed: boolean): void {
    if (this.scoreLabel) {
      this.scoreLabel.string = `Score: ${score}`;
    }

    if (this.bestScoreLabel) {
      this.bestScoreLabel.string = `Best: ${bestScore}`;
    }

    if (this.reviveStateNode) {
      this.reviveStateNode.active = reviveUsed;
    }
  }

  private renderSubmitState(state: "idle" | "submitting" | "success" | "error"): void {
    if (this.submitStatusLabel) {
      this.submitStatusLabel.string = formatSubmitStatus(state);
    }
  }
}
