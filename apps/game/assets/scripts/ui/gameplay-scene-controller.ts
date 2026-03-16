import type { GameManager } from "../core/game-manager.js";
import { GameplayController } from "../gameplay/gameplay-controller.js";

export class GameplaySceneController {
  private readonly gameplayController: GameplayController;

  constructor(private readonly gameManager: GameManager) {
    this.gameplayController = new GameplayController(gameManager.context);
  }

  enter() {
    return this.gameplayController.start().snapshot;
  }

  onHit(scoreDelta: number) {
    return this.gameplayController.handleHit(scoreDelta);
  }

  onMiss() {
    return this.gameplayController.handleMiss();
  }

  tick(deltaSeconds: number) {
    const snapshot = this.gameplayController.tick(deltaSeconds);

    if (snapshot.finished) {
      this.gameManager.finishRound(snapshot.score);
    }

    return snapshot;
  }

  async tryRevive(adUnitId: string): Promise<boolean> {
    const revived = await this.gameManager.context.client.tryRevive(adUnitId);
    if (!revived) {
      return false;
    }

    return this.gameplayController.revive();
  }
}
