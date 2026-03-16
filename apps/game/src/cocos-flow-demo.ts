import { BootScene } from "../assets/scripts/cocos/boot-scene.js";
import { GameplayScene } from "../assets/scripts/cocos/gameplay-scene.js";
import { HomeScene } from "../assets/scripts/cocos/home-scene.js";
import { ResultScene } from "../assets/scripts/cocos/result-scene.js";
import {
  ManualScheduler,
  MemoryButtonNode,
  MemoryEffectNode,
  MemoryPressableNode,
  MemoryProgressNode,
  MemorySceneNavigator,
  MemoryTextNode,
  MemoryToggleNode
} from "../assets/scripts/cocos/testing/memory-bindings.js";

async function main() {
  const navigator = new MemorySceneNavigator();
  const bootStatusText = new MemoryTextNode();
  const bootScene = new BootScene(navigator, bootStatusText);

  await bootScene.onLoad();

  const bestScoreText = new MemoryTextNode();
  const leaderboardText = new MemoryTextNode();
  const startButton = new MemoryButtonNode();
  const homeScene = new HomeScene(
    bootScene.gameManager,
    navigator,
    bestScoreText,
    leaderboardText,
    startButton
  );

  await homeScene.onLoad();
  await startButton.click();

  const scheduler = new ManualScheduler();
  const scoreText = new MemoryTextNode();
  const comboText = new MemoryTextNode();
  const timerText = new MemoryTextNode();
  const powerBar = new MemoryProgressNode();
  const reviveButton = new MemoryButtonNode();
  const hitEffectRoot = new MemoryEffectNode();
  const shotButton = new MemoryPressableNode();
  const gameplayScene = new GameplayScene(
    bootScene.gameManager,
    scheduler,
    scoreText,
    comboText,
    timerText,
    powerBar,
    reviveButton,
    hitEffectRoot,
    shotButton
  );

  gameplayScene.onLoad();
  gameplayScene.start();
  await shotButton.press(6, scheduler);
  await shotButton.press(4, scheduler);
  await shotButton.press(10, scheduler);
  scheduler.tick(59);
  scheduler.tick(1);

  const resultScoreText = new MemoryTextNode();
  const resultBestScoreText = new MemoryTextNode();
  const reviveState = new MemoryToggleNode();
  const submitButton = new MemoryButtonNode();
  const homeButton = new MemoryButtonNode();
  const resultScene = new ResultScene(
    bootScene.gameManager,
    navigator,
    resultScoreText,
    resultBestScoreText,
    reviveState,
    submitButton,
    homeButton
  );

  resultScene.onLoad();
  await submitButton.click();

  console.log(
    JSON.stringify(
      {
        bootStatus: bootStatusText.value,
        loadedScenes: navigator.loadedScenes,
        currentScene: bootScene.gameManager.currentScene,
        homeLeaderboard: leaderboardText.value,
        gameplayScore: scoreText.value,
        gameplayCombo: comboText.value,
        gameplayTimer: timerText.value,
        gameplayPower: powerBar.value,
        gameplayEffects: hitEffectRoot.playedEffects,
        resultScore: resultScoreText.value,
        resultBestScore: resultBestScoreText.value,
        resultReviveVisible: reviveState.visible
      },
      null,
      2
    )
  );
}

void main();
