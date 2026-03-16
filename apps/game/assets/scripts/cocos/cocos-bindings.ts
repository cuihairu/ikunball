export interface TextLikeNode {
  setText(value: string): void;
}

export interface ToggleLikeNode {
  setVisible(visible: boolean): void;
}

export interface EffectLikeNode {
  play(effectName: string): void;
}

export interface ProgressLikeNode {
  setProgress(value: number): void;
}

export interface ClickHandler {
  (): void | Promise<void>;
}

export interface ButtonLikeNode {
  setEnabled(enabled: boolean): void;
  bindClick(handler: ClickHandler): void;
}

export interface PressableLikeNode {
  bindPress(startHandler: ClickHandler, endHandler: ClickHandler): void;
}

export interface SceneNavigator {
  loadScene(sceneName: string): void;
}

export interface SchedulerLike {
  schedule(handler: (deltaSeconds: number) => void): void;
  unschedule(): void;
}
