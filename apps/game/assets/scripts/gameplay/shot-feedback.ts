export type ShotOutcomeType = "perfect" | "hit" | "miss";

export interface ShotOutcome {
  type: ShotOutcomeType;
  scoreDelta: number;
  effect: "perfect" | "hit" | "miss";
}

export function resolveShotOutcome(chargeRatio: number, isPerfect: boolean): ShotOutcome {
  if (isPerfect) {
    return {
      type: "perfect",
      scoreDelta: 3,
      effect: "perfect"
    };
  }

  if (chargeRatio >= 0.2 && chargeRatio <= 0.85) {
    return {
      type: "hit",
      scoreDelta: 2,
      effect: "hit"
    };
  }

  return {
    type: "miss",
    scoreDelta: 0,
    effect: "miss"
  };
}
