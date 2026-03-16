import { createGameServices } from "./bootstrap.js";
import { GameClient } from "./services/game-client.js";

async function main() {
  const services = createGameServices({
    platformName: "web"
  });

  const client = new GameClient(services.api, services.platform);
  const config = await client.loadGameplayConfig();
  const beforeLeaderboard = await client.loadLeaderboard();
  const submitted = await client.submitScore({
    playerId: "demo-online",
    playerName: "联调小鸡",
    score: beforeLeaderboard.length + 40
  });
  const afterLeaderboard = await client.loadLeaderboard();

  console.log(
    JSON.stringify(
      {
        apiBaseUrl: services.runtime.apiBaseUrl,
        roundDurationSeconds: config.game.roundDurationSeconds,
        beforeLeaderboardCount: beforeLeaderboard.length,
        submittedScore: submitted?.score ?? null,
        topPlayer: afterLeaderboard[0]?.playerName ?? null,
        topScore: afterLeaderboard[0]?.score ?? null
      },
      null,
      2
    )
  );
}

void main();
