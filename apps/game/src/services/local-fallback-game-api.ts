import { getDefaultGameplayConfig } from "@i-love-playing-ball/game-config";

import type { GameApi, LeaderboardEntry, SubmitLeaderboardInput } from "../types.js";

export class LocalFallbackGameApi implements GameApi {
  private readonly entries: LeaderboardEntry[] = [
    {
      playerId: "local-1",
      playerName: "本地小鸡",
      score: 12,
      createdAt: new Date().toISOString()
    }
  ];

  async getGameplayConfig() {
    return getDefaultGameplayConfig();
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    return [...this.entries].sort((left, right) => right.score - left.score);
  }

  async submitLeaderboard(entry: SubmitLeaderboardInput): Promise<LeaderboardEntry> {
    const savedEntry: LeaderboardEntry = {
      ...entry,
      createdAt: new Date().toISOString()
    };

    this.entries.push(savedEntry);

    return savedEntry;
  }
}
