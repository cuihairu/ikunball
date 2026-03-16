import type { LeaderboardEntry } from "../../../src/types.js";
import type { GameManager } from "../core/game-manager.js";

export class ResultSceneController {
  constructor(private readonly gameManager: GameManager) {}

  getSummary() {
    return {
      score: this.gameManager.context.session.currentScore,
      bestScore: this.gameManager.context.session.bestScore,
      reviveUsed: this.gameManager.context.session.reviveUsed
    };
  }

  async submitResult(playerId: string, playerName: string): Promise<LeaderboardEntry | null> {
    return this.gameManager.context.client.submitScore({
      playerId,
      playerName,
      score: this.gameManager.context.session.currentScore
    });
  }

  goHome(): "Home" {
    this.gameManager.backToHome();
    return "Home";
  }
}
