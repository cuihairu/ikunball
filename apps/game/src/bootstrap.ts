import { createPlatformSdk, type PlatformName, type PlatformSdk } from "@i-love-playing-ball/platform-sdk";

import { createGamePlatform } from "./platform/game-platform.js";
import { HttpGameApi } from "./services/http-game-api.js";
import { LocalFallbackGameApi } from "./services/local-fallback-game-api.js";
import type { GameApi, GameServices } from "./types.js";

export interface BootstrapOptions {
  apiBaseUrl?: string;
  offline?: boolean;
  platformName?: PlatformName;
  platformSdk?: PlatformSdk;
}

export function createGameServices(options: BootstrapOptions = {}): GameServices {
  const sdk = options.platformSdk ?? createPlatformSdk(options.platformName ?? "web");
  const platform = createGamePlatform(sdk);

  const api = createGameApi(options);

  return {
    api,
    platform
  };
}

function createGameApi(options: BootstrapOptions): GameApi {
  if (options.offline) {
    return new LocalFallbackGameApi();
  }

  return new HttpGameApi({
    baseUrl: options.apiBaseUrl ?? "http://127.0.0.1:3000"
  });
}
