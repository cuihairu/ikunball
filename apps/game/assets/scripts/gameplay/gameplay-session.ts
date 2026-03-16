export interface GameplayState {
  score: number;
  combo: number;
  remainingSeconds: number;
  finished: boolean;
}

export class GameplaySession {
  private readonly state: GameplayState;

  constructor(roundDurationSeconds: number) {
    this.state = {
      score: 0,
      combo: 0,
      remainingSeconds: roundDurationSeconds,
      finished: false
    };
  }

  get snapshot(): GameplayState {
    return { ...this.state };
  }

  addHit(scoreDelta: number): GameplayState {
    this.state.score += scoreDelta;
    this.state.combo += 1;
    return this.snapshot;
  }

  addMiss(): GameplayState {
    this.state.combo = 0;
    return this.snapshot;
  }

  tick(deltaSeconds: number): GameplayState {
    this.state.remainingSeconds = Math.max(0, this.state.remainingSeconds - deltaSeconds);
    this.state.finished = this.state.remainingSeconds <= 0;
    return this.snapshot;
  }

  revive(extraSeconds: number): GameplayState {
    this.state.remainingSeconds += extraSeconds;
    this.state.finished = false;
    return this.snapshot;
  }
}
