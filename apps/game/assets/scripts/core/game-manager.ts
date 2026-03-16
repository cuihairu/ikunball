import { AppContext } from "./app-context.js";

export type SceneName = "Boot" | "Home" | "Gameplay" | "Result";

export class GameManager {
  readonly context: AppContext;
  currentScene: SceneName = "Boot";

  constructor(context?: AppContext) {
    this.context = context ?? new AppContext();
  }

  async boot(): Promise<void> {
    await this.context.preload();
    this.currentScene = "Home";
  }

  startRound(): void {
    this.context.resetRound();
    this.currentScene = "Gameplay";
  }

  finishRound(score: number): void {
    this.context.applyScore(score);
    this.currentScene = "Result";
  }

  backToHome(): void {
    this.currentScene = "Home";
  }
}
