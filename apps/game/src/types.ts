import type { GameplayConfig } from "@i-love-playing-ball/game-config";

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  score: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface GameServices {
  api: GameApi;
  platform: PlatformFacade;
}

export interface GameApi {
  getGameplayConfig(): Promise<GameplayConfig>;
  getLeaderboard(): Promise<LeaderboardEntry[]>;
  submitLeaderboard(entry: SubmitLeaderboardInput): Promise<LeaderboardEntry>;
}

export interface SubmitLeaderboardInput {
  playerId: string;
  playerName: string;
  score: number;
}

export interface PlatformFacade {
  readonly platformName: string;
  loadBestScore(): number;
  saveBestScore(score: number): void;
  showReviveAd(adUnitId: string): Promise<boolean>;
}
