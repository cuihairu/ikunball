import type { SceneNavigator, TextLikeNode } from "./cocos-bindings.js";
import { GameManager } from "../core/game-manager.js";
import { BootSceneController } from "../ui/boot-scene-controller.js";

export class BootScene {
  readonly gameManager: GameManager;
  private readonly controller: BootSceneController;

  constructor(
    private readonly navigator: SceneNavigator,
    private readonly statusText: TextLikeNode,
    gameManager?: GameManager
  ) {
    this.gameManager = gameManager ?? new GameManager();
    this.controller = new BootSceneController(this.gameManager);
  }

  async onLoad(): Promise<void> {
    this.statusText.setText("Loading...");
    const nextScene = await this.controller.enter();
    this.statusText.setText("Ready");
    this.navigator.loadScene(nextScene);
  }
}
