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

export const sportIntros: Record<Sport, string> = {
  Football: "Club and international football, from the first whistle to the last transfer.",
  Basketball: "The EuroLeague, the NBA and the national teams, game by game.",
  Tennis: "The tours, the slams and the players between them.",
  Cycling: "Grand tours, one day classics and the climbs that decide them.",
  "Formula 1": "Every race weekend, the garages behind it and the rules that change it.",
  Athletics: "Track, field and road, from the diamond league to the marathon majors.",
  Opinion: "Columns and arguments from the writers of The Absurdist.",
};
