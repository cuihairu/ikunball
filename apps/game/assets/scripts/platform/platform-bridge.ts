import type { AppContext } from "../core/app-context.js";

export class PlatformBridge {
  constructor(private readonly context: AppContext) {}

  get platformName(): string {
    return this.context.services.platform.platformName;
  }

  get apiBaseUrl(): string {
    return this.context.services.runtime.apiBaseUrl;
  }

  async tryRevive(adUnitId: string): Promise<boolean> {
    return this.context.client.tryRevive(adUnitId);
  }
}
