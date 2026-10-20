export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const formatShortDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
