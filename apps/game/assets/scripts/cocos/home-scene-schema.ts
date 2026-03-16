export interface HomeSceneSchema {
  bestScoreLabel: string;
  leaderboardLabel: string;
  startButton: string;
}

export const DEFAULT_HOME_SCENE_SCHEMA: HomeSceneSchema = {
  bestScoreLabel: "Canvas/HUD/BestScoreLabel",
  leaderboardLabel: "Canvas/HUD/LeaderboardLabel",
  startButton: "Canvas/Actions/StartButton"
};
