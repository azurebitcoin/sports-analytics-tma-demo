export function formatKickoff(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function formatProbability(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatConfidence(value: number): string {
  return `${Math.round(value * 100)} / 100`;
}
