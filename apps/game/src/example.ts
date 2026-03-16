import { createGameServices } from "./bootstrap.js";
import { GameClient } from "./services/game-client.js";

async function main() {
  const services = createGameServices({
    apiBaseUrl: "http://127.0.0.1:3000",
    platformName: "web"
  });

  const client = new GameClient(services.api, services.platform);
  const config = await client.loadGameplayConfig();
  const leaderboard = await client.loadLeaderboard();

  console.log(
    JSON.stringify(
      {
        platform: services.platform.platformName,
        roundDurationSeconds: config.game.roundDurationSeconds,
        leaderboardCount: leaderboard.length,
        bestScore: client.getBestScore()
      },
      null,
      2
    )
  );
}

void main();
