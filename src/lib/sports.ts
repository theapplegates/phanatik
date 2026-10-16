export const sports = [
  "Football",
  "Basketball",
  "Tennis",
  "Cycling",
  "Formula 1",
  "Athletics",
  "Opinion",
] as const;

export type Sport = (typeof sports)[number];

export const sportSlug = (sport: string) =>
  sport.toLowerCase().replace(/\s+/g, "-");
