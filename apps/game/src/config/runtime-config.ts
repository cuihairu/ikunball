const DEFAULT_API_BASE_URL = "http://127.0.0.1:3000";

export interface RuntimeConfig {
  apiBaseUrl: string;
}

export function resolveRuntimeConfig(apiBaseUrl?: string): RuntimeConfig {
  return {
    apiBaseUrl: normalizeBaseUrl(
      apiBaseUrl ??
        readEnvValue("GAME_API_BASE_URL") ??
        readBrowserBaseUrl() ??
        DEFAULT_API_BASE_URL
    )
  };
}

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function readEnvValue(name: string): string | undefined {
  const processLike = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return processLike?.env?.[name];
}

function readBrowserBaseUrl(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.origin;
}
