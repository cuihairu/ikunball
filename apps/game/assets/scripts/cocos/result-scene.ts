import type { ButtonLikeNode, SceneNavigator, TextLikeNode, ToggleLikeNode } from "./cocos-bindings.js";
import type { GameManager } from "../core/game-manager.js";
import { ResultSceneController } from "../ui/result-scene-controller.js";

export class ResultScene {
  private readonly controller: ResultSceneController;

  constructor(
    gameManager: GameManager,
    private readonly navigator: SceneNavigator,
    private readonly scoreText: TextLikeNode,
    private readonly bestScoreText: TextLikeNode,
    private readonly reviveState: ToggleLikeNode,
    private readonly submitButton: ButtonLikeNode,
    private readonly homeButton: ButtonLikeNode
  ) {
    this.controller = new ResultSceneController(gameManager);
  }

  onLoad(): void {
    const summary = this.controller.getSummary();
    this.scoreText.setText(`Score: ${summary.score}`);
    this.bestScoreText.setText(`Best: ${summary.bestScore}`);
    this.reviveState.setVisible(summary.reviveUsed);

    this.submitButton.bindClick(async () => {
      await this.controller.submitResult("guest-player", "Guest Chick");
    });

    this.homeButton.bindClick(() => {
      const nextScene = this.controller.goHome();
      this.navigator.loadScene(nextScene);
    });
  }
}
