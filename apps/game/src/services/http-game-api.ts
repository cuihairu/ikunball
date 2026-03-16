import type { GameplayConfig } from "@i-love-playing-ball/game-config";

import type {
  ApiResponse,
  GameApi,
  LeaderboardEntry,
  SubmitLeaderboardInput
} from "../types.js";

export interface HttpGameApiOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class HttpGameApi implements GameApi {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: HttpGameApiOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async getGameplayConfig(): Promise<GameplayConfig> {
    const response = await this.fetchJSON<ApiResponse<GameplayConfig>>("/config/game");
    return response.data;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const response = await this.fetchJSON<ApiResponse<LeaderboardEntry[]>>("/leaderboard");
    return response.data;
  }

  async submitLeaderboard(entry: SubmitLeaderboardInput): Promise<LeaderboardEntry> {
    const response = await this.fetchJSON<ApiResponse<LeaderboardEntry>>("/leaderboard/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });

    return response.data;
  }

  private async fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, init);

    if (!response.ok) {
      throw new Error(`Game API request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }
}
