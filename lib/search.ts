// Polish character mapping for comprehensive diacritic handling
const polishCharMap: { [key: string]: string } = {
  // Lowercase Polish characters
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  // Uppercase Polish characters
  Ą: 'a',
  Ć: 'c',
  Ę: 'e',
  Ł: 'l',
  Ń: 'n',
  Ó: 'o',
  Ś: 's',
  Ź: 'z',
  Ż: 'z',
};

export function normalizeForSearch(text: string): string {
  if (!text) return '';
  
  // First pass: Replace Polish special characters
  let normalized = text.split('').map(char => polishCharMap[char] || char).join('');
  
  // Second pass: NFD normalization for remaining diacritics (French, Spanish, etc.)
  normalized = normalized
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  
  return normalized;
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
