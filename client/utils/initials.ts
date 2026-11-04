export function getInitials(value: string): string {
  const words = value
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "FIG";

  const first = words[0]?.[0] ?? "";
  const second = words[1]?.[0] ?? words[0]?.[1] ?? "";

  return `${first}${second}`.toUpperCase();
}
