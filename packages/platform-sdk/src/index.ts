export type PlatformName = "wechat" | "douyin" | "web" | "unknown";

export interface RewardedAdResult {
  finished: boolean;
}

export interface InterstitialAd {
  show(): Promise<void>;
}

export interface RewardedAd {
  show(): Promise<RewardedAdResult>;
}

export interface LoginResult {
  platform: PlatformName;
  userId?: string;
  token?: string;
}

export interface SharePayload {
  title: string;
  imageUrl?: string;
  query?: string;
}

export interface PlatformSdk {
  getPlatformName(): PlatformName;
  login(): Promise<LoginResult>;
  createRewardedVideoAd(adUnitId: string): Promise<RewardedAd>;
  createInterstitialAd(adUnitId: string): Promise<InterstitialAd>;
  share(payload: SharePayload): Promise<void>;
  getStorage<T>(key: string): T | null;
  setStorage<T>(key: string, value: T): void;
}

class UnsupportedRewardedAd implements RewardedAd {
  async show(): Promise<RewardedAdResult> {
    return { finished: false };
  }
}

class UnsupportedInterstitialAd implements InterstitialAd {
  async show(): Promise<void> {
    return;
  }
}

export class MemoryPlatformSdk implements PlatformSdk {
  private readonly storage = new Map<string, unknown>();

  constructor(private readonly platformName: PlatformName = "web") {}

  getPlatformName(): PlatformName {
    return this.platformName;
  }

  async login(): Promise<LoginResult> {
    return {
      platform: this.platformName
    };
  }

  async createRewardedVideoAd(_adUnitId: string): Promise<RewardedAd> {
    return new UnsupportedRewardedAd();
  }

  async createInterstitialAd(_adUnitId: string): Promise<InterstitialAd> {
    return new UnsupportedInterstitialAd();
  }

  async share(_payload: SharePayload): Promise<void> {
    return;
  }

  getStorage<T>(key: string): T | null {
    return (this.storage.get(key) as T | undefined) ?? null;
  }

  setStorage<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }
}

export function createPlatformSdk(platformName: PlatformName = "web"): PlatformSdk {
  return new MemoryPlatformSdk(platformName);
}
