export interface GameplayNodeMap {
  scoreLabel: string;
  comboLabel: string;
  timerLabel: string;
  powerBar: string;
  reviveButton: string;
  shotButton: string;
  playerNode: string;
  ballNode: string;
  hoopNode: string;
  hitEffectRoot: string;
}

export const DEFAULT_GAMEPLAY_NODE_MAP: GameplayNodeMap = {
  scoreLabel: "Canvas/HUD/ScoreLabel",
  comboLabel: "Canvas/HUD/ComboLabel",
  timerLabel: "Canvas/HUD/TimerLabel",
  powerBar: "Canvas/HUD/PowerBar",
  reviveButton: "Canvas/HUD/ReviveButton",
  shotButton: "Canvas/Input/ShotButton",
  playerNode: "Canvas/Gameplay/Player",
  ballNode: "Canvas/Gameplay/Ball",
  hoopNode: "Canvas/Gameplay/Hoop",
  hitEffectRoot: "Canvas/Gameplay/HitEffectRoot"
};
