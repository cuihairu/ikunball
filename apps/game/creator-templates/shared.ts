export function formatLeaderboardText(lines: string[]): string {
  if (lines.length === 0) {
    return "No leaderboard data";
  }

  return lines.join("\n");
}

export function formatSubmitStatus(state: "idle" | "submitting" | "success" | "error"): string {
  switch (state) {
    case "submitting":
      return "Submitting...";
    case "success":
      return "Submitted";
    case "error":
      return "Submit failed";
    default:
      return "Submit";
  }
}
