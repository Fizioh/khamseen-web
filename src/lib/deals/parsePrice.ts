export function parseEuroAmount(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw
    .replace(/\u00a0/g, " ")
    .replace(/[^\d,.\s]/g, " ")
    .trim();
  const match = cleaned.match(/(\d{1,3}(?:[ .\u202f]\d{3})+|\d+)([.,]\d{1,2})?/);
  if (!match) return undefined;
  const whole = match[1].replace(/[ .\u202f]/g, "");
  const fraction = match[2] ? match[2].replace(",", ".") : "";
  const value = Number(`${whole}${fraction}`);
  return Number.isFinite(value) ? value : undefined;
}

export function extractStruckPrice(text: string): number | undefined {
  const patterns = [
    /au lieu de\s*([0-9][0-9\s.,]*)\s*€/i,
    /prix (?:barré|conseillé)\s*[:\-]?\s*([0-9][0-9\s.,]*)\s*€/i,
    /était\s*(?:à\s*)?([0-9][0-9\s.,]*)\s*€/i,
    /~~\s*([0-9][0-9\s.,]*)\s*€/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return parseEuroAmount(match[1]);
  }
  return undefined;
}

export function cleanDealTitle(title: string): string {
  return title
    .replace(/^\s*\d{1,3}\s*°\s*[-–—:]\s*/u, "")
    .replace(/\s+/g, " ")
    .trim();
}
