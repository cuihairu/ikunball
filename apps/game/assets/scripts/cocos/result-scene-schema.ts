export interface ResultSceneSchema {
  scoreLabel: string;
  bestScoreLabel: string;
  reviveStateNode: string;
  submitButton: string;
  homeButton: string;
}

export const DEFAULT_RESULT_SCENE_SCHEMA: ResultSceneSchema = {
  scoreLabel: "Canvas/HUD/ScoreLabel",
  bestScoreLabel: "Canvas/HUD/BestScoreLabel",
  reviveStateNode: "Canvas/HUD/ReviveState",
  submitButton: "Canvas/Actions/SubmitButton",
  homeButton: "Canvas/Actions/HomeButton"
};
