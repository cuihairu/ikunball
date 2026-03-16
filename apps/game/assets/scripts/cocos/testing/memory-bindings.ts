import type {
  ButtonLikeNode,
  ClickHandler,
  EffectLikeNode,
  PressableLikeNode,
  ProgressLikeNode,
  SceneNavigator,
  SchedulerLike,
  TextLikeNode,
  ToggleLikeNode
} from "../cocos-bindings.js";

export class MemoryTextNode implements TextLikeNode {
  value = "";

  setText(value: string): void {
    this.value = value;
  }
}

export class MemoryToggleNode implements ToggleLikeNode {
  visible = false;

  setVisible(visible: boolean): void {
    this.visible = visible;
  }
}

export class MemoryProgressNode implements ProgressLikeNode {
  value = 0;

  setProgress(value: number): void {
    this.value = value;
  }
}

export class MemoryEffectNode implements EffectLikeNode {
  playedEffects: string[] = [];

  play(effectName: string): void {
    this.playedEffects.push(effectName);
  }
}

export class MemoryButtonNode implements ButtonLikeNode {
  enabled = true;
  private handler: ClickHandler | null = null;

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  bindClick(handler: ClickHandler): void {
    this.handler = handler;
  }

  async click(): Promise<void> {
    if (this.enabled && this.handler) {
      await this.handler();
    }
  }
}

export class MemoryPressableNode implements PressableLikeNode {
  private startHandler: ClickHandler | null = null;
  private endHandler: ClickHandler | null = null;

  bindPress(startHandler: ClickHandler, endHandler: ClickHandler): void {
    this.startHandler = startHandler;
    this.endHandler = endHandler;
  }

  async press(durationTicks: number, scheduler: ManualScheduler, deltaSeconds = 0.1): Promise<void> {
    if (this.startHandler) {
      await this.startHandler();
    }

    for (let index = 0; index < durationTicks; index += 1) {
      scheduler.tick(deltaSeconds);
    }

    if (this.endHandler) {
      await this.endHandler();
    }
  }
}

export class MemorySceneNavigator implements SceneNavigator {
  loadedScenes: string[] = [];

  loadScene(sceneName: string): void {
    this.loadedScenes.push(sceneName);
  }
}

export class ManualScheduler implements SchedulerLike {
  private handler: ((deltaSeconds: number) => void) | null = null;

  schedule(handler: (deltaSeconds: number) => void): void {
    this.handler = handler;
  }

  unschedule(): void {
    this.handler = null;
  }

  tick(deltaSeconds: number): void {
    this.handler?.(deltaSeconds);
  }
}
