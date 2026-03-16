import type { GameplayConfig } from "@i-love-playing-ball/game-config";

import { createGameServices, type BootstrapOptions } from "../../../src/bootstrap.js";
import { GameClient } from "../../../src/services/game-client.js";

export interface SessionState {
  gameplayConfig: GameplayConfig | null;
  currentScore: number;
  bestScore: number;
  reviveUsed: boolean;
}

export class AppContext {
  readonly services;
  readonly client;
  readonly session: SessionState;

  constructor(options: BootstrapOptions = {}) {
    this.services = createGameServices(options);
    this.client = new GameClient(this.services.api, this.services.platform);
    this.session = {
      gameplayConfig: null,
      currentScore: 0,
      bestScore: this.client.getBestScore(),
      reviveUsed: false
    };
  }

  async preload(): Promise<void> {
    this.session.gameplayConfig = await this.client.loadGameplayConfig();
    this.session.bestScore = this.client.getBestScore();
  }

  resetRound(): void {
    this.session.currentScore = 0;
    this.session.reviveUsed = false;
  }

  applyScore(score: number): void {
    this.session.currentScore = score;
    if (score > this.session.bestScore) {
      this.session.bestScore = score;
    }
  }
}
