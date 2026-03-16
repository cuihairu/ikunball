export { createGameServices, type BootstrapOptions } from "./bootstrap.js";
export { resolveRuntimeConfig } from "./config/runtime-config.js";
export { GameClient, type SubmitScoreOptions } from "./services/game-client.js";
export { HttpGameApi, type HttpGameApiOptions } from "./services/http-game-api.js";
export { LocalFallbackGameApi } from "./services/local-fallback-game-api.js";
export { GamePlatform, createGamePlatform } from "./platform/game-platform.js";
export type {
  ApiResponse,
  GameApi,
  GameServices,
  LeaderboardEntry,
  PlatformFacade,
  RuntimeConfig,
  SubmitLeaderboardInput
} from "./types.js";
