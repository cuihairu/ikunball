import { _decorator, Button, Component, Label } from "cc";

import { formatLeaderboardText } from "./shared";

const { ccclass, property } = _decorator;

@ccclass("HomeSceneComponent")
export class HomeSceneComponent extends Component {
  @property(Label)
  bestScoreLabel: Label | null = null;

  @property(Label)
  leaderboardLabel: Label | null = null;

  @property(Button)
  startButton: Button | null = null;

  @property(Label)
  statusLabel: Label | null = null;

  onLoad(): void {
    this.startButton?.node.on(Button.EventType.CLICK, this.handleStartClick, this);
  }

  start(): void {
    this.renderLoadingState();
    void this.loadHomeData();
  }

  onDestroy(): void {
    this.startButton?.node.off(Button.EventType.CLICK, this.handleStartClick, this);
  }

  private handleStartClick(): void {
    // TODO: 切到 Gameplay 场景
  }

  private async loadHomeData(): Promise<void> {
    try {
      // TODO:
      // 1. 从 GameManager / GameClient 读取最高分
      // 2. 拉取排行榜并刷新前三名

      const leaderboardLines = ["1. Demo Chick 28", "2. Meme Chick 22", "3. Ball Chick 19"];
      this.renderLeaderboard(0, leaderboardLines);
    } catch {
      this.renderErrorState();
    }
  }

  private renderLoadingState(): void {
    if (this.statusLabel) {
      this.statusLabel.string = "Loading leaderboard...";
    }

    if (this.bestScoreLabel) {
      this.bestScoreLabel.string = "Best: --";
    }

    if (this.leaderboardLabel) {
      this.leaderboardLabel.string = "...";
    }
  }

  private renderLeaderboard(bestScore: number, lines: string[]): void {
    if (this.statusLabel) {
      this.statusLabel.string = "";
    }

    if (this.bestScoreLabel) {
      this.bestScoreLabel.string = `Best: ${bestScore}`;
    }

    if (this.leaderboardLabel) {
      this.leaderboardLabel.string = formatLeaderboardText(lines);
    }
  }

  private renderErrorState(): void {
    if (this.statusLabel) {
      this.statusLabel.string = "Load failed";
    }

    if (this.leaderboardLabel) {
      this.leaderboardLabel.string = "Tap to retry later";
    }
  }
}
