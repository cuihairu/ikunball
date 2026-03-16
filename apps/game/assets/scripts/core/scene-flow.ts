import type { SceneName } from "./game-manager.js";

export class SceneFlow {
  private currentScene: SceneName = "Boot";

  getCurrentScene(): SceneName {
    return this.currentScene;
  }

  transitionTo(sceneName: SceneName): void {
    this.currentScene = sceneName;
  }
}
