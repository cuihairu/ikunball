import type { SceneNavigator, TextLikeNode } from "./cocos-bindings.js";
import { GameManager } from "../core/game-manager.js";
import { BootSceneController } from "../ui/boot-scene-controller.js";

export class BootScene {
  private readonly gameManager = new GameManager();
  private readonly controller = new BootSceneController(this.gameManager);

  constructor(
    private readonly navigator: SceneNavigator,
    private readonly statusText: TextLikeNode
  ) {}

  async onLoad(): Promise<void> {
    this.statusText.setText("Loading...");
    const nextScene = await this.controller.enter();
    this.statusText.setText("Ready");
    this.navigator.loadScene(nextScene);
  }
}
