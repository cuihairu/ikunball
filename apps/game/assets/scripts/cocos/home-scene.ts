import type { ButtonLikeNode, SceneNavigator, TextLikeNode } from "./cocos-bindings.js";
import type { LeaderboardEntry } from "../../../src/types.js";
import type { GameManager } from "../core/game-manager.js";
import { HomeSceneController } from "../ui/home-scene-controller.js";

export class HomeScene {
  private readonly controller: HomeSceneController;

  constructor(
    gameManager: GameManager,
    private readonly navigator: SceneNavigator,
    private readonly bestScoreText: TextLikeNode,
    private readonly leaderboardText: TextLikeNode,
    private readonly startButton: ButtonLikeNode
  ) {
    this.controller = new HomeSceneController(gameManager);
  }

  async onLoad(): Promise<void> {
    this.bestScoreText.setText("Best: loading");
    this.startButton.bindClick(() => {
      const nextScene = this.controller.startGameplay();
      this.navigator.loadScene(nextScene);
    });

    const leaderboard = await this.controller.loadLeaderboard();
    this.renderLeaderboard(leaderboard);
  }

  private renderLeaderboard(entries: LeaderboardEntry[]): void {
    if (entries.length === 0) {
      this.bestScoreText.setText("Best: 0");
      this.leaderboardText.setText("No leaderboard data");
      return;
    }

    this.bestScoreText.setText(`Best: ${entries[0]?.score ?? 0}`);
    this.leaderboardText.setText(
      entries
        .slice(0, 3)
        .map((entry, index) => `${index + 1}. ${entry.playerName} ${entry.score}`)
        .join("\n")
    );
  }
}
