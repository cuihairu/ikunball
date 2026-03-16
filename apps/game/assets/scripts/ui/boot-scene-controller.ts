import type { GameManager } from "../core/game-manager.js";

export class BootSceneController {
  constructor(private readonly gameManager: GameManager) {}

  async enter(): Promise<"Home"> {
    await this.gameManager.boot();
    return "Home";
  }
}
