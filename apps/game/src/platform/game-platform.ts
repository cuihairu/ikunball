import { createPlatformSdk, type PlatformSdk } from "@i-love-playing-ball/platform-sdk";

import type { PlatformFacade } from "../types.js";

const BEST_SCORE_KEY = "game:best-score";

export class GamePlatform implements PlatformFacade {
  constructor(private readonly sdk: PlatformSdk) {}

  get platformName(): string {
    return this.sdk.getPlatformName();
  }

  loadBestScore(): number {
    return this.sdk.getStorage<number>(BEST_SCORE_KEY) ?? 0;
  }

  saveBestScore(score: number): void {
    const currentBest = this.loadBestScore();
    if (score > currentBest) {
      this.sdk.setStorage(BEST_SCORE_KEY, score);
    }
  }

  async showReviveAd(adUnitId: string): Promise<boolean> {
    const ad = await this.sdk.createRewardedVideoAd(adUnitId);
    const result = await ad.show();
    return result.finished;
  }
}

export function createGamePlatform(platformSdk?: PlatformSdk): GamePlatform {
  return new GamePlatform(platformSdk ?? createPlatformSdk("web"));
}
