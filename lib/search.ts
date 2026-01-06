export function normalizeForSearch(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function scoreMatch(haystack: string, needle: string): number {
  const h = haystack || '';
  const n = needle || '';
  if (!n) return 0;

  const hLower = h.toLowerCase();
  const nLower = n.toLowerCase();
  const hNorm = normalizeForSearch(h);
  const nNorm = normalizeForSearch(n);

  // Base match: diacritic-insensitive include
  const base = hNorm.includes(nNorm);
  if (!base) return 0;

  // Boosts: exact include and startsWith signals
  let score = 1;
  if (hLower.includes(nLower)) score += 1;
  if (hNorm.startsWith(nNorm)) score += 0.5;
  if (hLower.startsWith(nLower)) score += 0.5;
  return score;
}

export function combinedScore(fields: Array<string | null | undefined>, needle: string): number {
  return fields.reduce((acc, field) => acc + scoreMatch(field || '', needle), 0);
}
