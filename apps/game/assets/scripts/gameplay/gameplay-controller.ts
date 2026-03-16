import { getEmotionStateByCombo, getMissEmotionState } from "@i-love-playing-ball/game-config";

import type { AppContext } from "../core/app-context.js";
import { GameplaySession } from "./gameplay-session.js";

export class GameplayController {
  private session: GameplaySession | null = null;

  constructor(private readonly context: AppContext) {}

  start(): GameplaySession {
    const config = this.requireConfig();
    this.session = new GameplaySession(config.game.roundDurationSeconds);
    return this.session;
  }

  handleHit(scoreDelta: number): { score: number; combo: number; emotion: string } {
    const session = this.requireSession();
    const snapshot = session.addHit(scoreDelta);

    return {
      score: snapshot.score,
      combo: snapshot.combo,
      emotion: getEmotionStateByCombo(this.requireConfig(), snapshot.combo)
    };
  }

  handleMiss(): { score: number; combo: number; emotion: string } {
    const session = this.requireSession();
    const snapshot = session.addMiss();

    return {
      score: snapshot.score,
      combo: snapshot.combo,
      emotion: getMissEmotionState(this.requireConfig())
    };
  }

  tick(deltaSeconds: number) {
    return this.requireSession().tick(deltaSeconds);
  }

  revive(): boolean {
    const config = this.requireConfig();
    if (this.context.session.reviveUsed) {
      return false;
    }

    this.requireSession().revive(config.game.reviveDurationSeconds);
    this.context.session.reviveUsed = true;
    return true;
  }

  private requireConfig() {
    const config = this.context.session.gameplayConfig;
    if (!config) {
      throw new Error("Gameplay config is not loaded");
    }

    return config;
  }

  private requireSession(): GameplaySession {
    if (!this.session) {
      throw new Error("Gameplay session is not started");
    }

    return this.session;
  }
}
