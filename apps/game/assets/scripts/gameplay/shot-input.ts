export interface ShotChargeState {
  charging: boolean;
  chargeRatio: number;
  elapsedSeconds: number;
}

export interface ShotReleaseResult {
  chargeRatio: number;
  isPerfect: boolean;
}

export interface ShotInputOptions {
  maxChargeSeconds: number;
  perfectMinRatio: number;
  perfectMaxRatio: number;
}

const DEFAULT_OPTIONS: ShotInputOptions = {
  maxChargeSeconds: 1.2,
  perfectMinRatio: 0.45,
  perfectMaxRatio: 0.65
};

export class ShotInputController {
  private readonly options: ShotInputOptions;
  private state: ShotChargeState = {
    charging: false,
    chargeRatio: 0,
    elapsedSeconds: 0
  };

  constructor(options: Partial<ShotInputOptions> = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  beginCharge(): ShotChargeState {
    this.state = {
      charging: true,
      chargeRatio: 0,
      elapsedSeconds: 0
    };

    return this.snapshot();
  }

  updateCharge(deltaSeconds: number): ShotChargeState {
    if (!this.state.charging) {
      return this.snapshot();
    }

    const elapsedSeconds = Math.min(
      this.options.maxChargeSeconds,
      this.state.elapsedSeconds + deltaSeconds
    );

    this.state = {
      charging: true,
      elapsedSeconds,
      chargeRatio: elapsedSeconds / this.options.maxChargeSeconds
    };

    return this.snapshot();
  }

  release(): ShotReleaseResult {
    const chargeRatio = this.state.chargeRatio;
    const isPerfect =
      chargeRatio >= this.options.perfectMinRatio &&
      chargeRatio <= this.options.perfectMaxRatio;

    this.state = {
      charging: false,
      chargeRatio: 0,
      elapsedSeconds: 0
    };

    return {
      chargeRatio,
      isPerfect
    };
  }

  cancel(): ShotChargeState {
    this.state = {
      charging: false,
      chargeRatio: 0,
      elapsedSeconds: 0
    };

    return this.snapshot();
  }

  snapshot(): ShotChargeState {
    return { ...this.state };
  }
}
