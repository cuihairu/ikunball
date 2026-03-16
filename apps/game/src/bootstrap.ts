import { createPlatformSdk, type PlatformName, type PlatformSdk } from "@i-love-playing-ball/platform-sdk";

import { resolveRuntimeConfig } from "./config/runtime-config.js";
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
  const runtime = resolveRuntimeConfig(options.apiBaseUrl);

  const api = createGameApi({
    ...options,
    apiBaseUrl: runtime.apiBaseUrl
  });

  return {
    api,
    platform,
    runtime
  };
}

function createGameApi(options: BootstrapOptions): GameApi {
  if (options.offline) {
    return new LocalFallbackGameApi();
  }

  return new HttpGameApi({
    baseUrl: options.apiBaseUrl ?? resolveRuntimeConfig().apiBaseUrl
  });
}
