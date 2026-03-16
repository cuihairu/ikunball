import type { GameManager } from "../core/game-manager.js";
import type { LeaderboardEntry } from "../../../src/types.js";

export class HomeSceneController {
  constructor(private readonly gameManager: GameManager) {}

  async loadLeaderboard(): Promise<LeaderboardEntry[]> {
    return this.gameManager.context.client.loadLeaderboard();
  }

  startGameplay(): "Gameplay" {
    this.gameManager.startRound();
    return "Gameplay";
  }
}
