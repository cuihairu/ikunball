import { getDefaultGameplayConfig, type GameplayConfig } from "@i-love-playing-ball/game-config";

import type { GameApi, LeaderboardEntry, PlatformFacade, SubmitLeaderboardInput } from "../types.js";

export interface SubmitScoreOptions {
  playerId: string;
  playerName: string;
  score: number;
  syncToLeaderboard?: boolean;
}

export class GameClient {
  constructor(
    private readonly api: GameApi,
    private readonly platform: PlatformFacade
  ) {}

  async loadGameplayConfig(): Promise<GameplayConfig> {
    try {
      return await this.api.getGameplayConfig();
    } catch {
      return getDefaultGameplayConfig();
    }
  }

  async loadLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      return await this.api.getLeaderboard();
    } catch {
      return [];
    }
  }

  async submitScore(options: SubmitScoreOptions): Promise<LeaderboardEntry | null> {
    this.platform.saveBestScore(options.score);

    if (options.syncToLeaderboard === false) {
      return null;
    }

    const payload: SubmitLeaderboardInput = {
      playerId: options.playerId,
      playerName: options.playerName,
      score: options.score
    };

    try {
      return await this.api.submitLeaderboard(payload);
    } catch {
      return null;
    }
  }

  getBestScore(): number {
    return this.platform.loadBestScore();
  }

  async tryRevive(adUnitId: string): Promise<boolean> {
    return this.platform.showReviveAd(adUnitId);
  }
}
