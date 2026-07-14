export const finderMap = [
  { term: "Bauch", regions: ["abdomen"], departments: ["gastroenterologie-hepatologie", "allgemein-viszeral-thoraxchirurgie", "gynaekologie-geburtshilfe", "urologie", "gefaesschirurgie"] },
  { term: "Brust / Herz", regions: ["chest"], departments: ["kardiologie-pneumologie"] },
  { term: "Brust / Lunge", regions: ["chest"], departments: ["kardiologie-pneumologie", "allgemein-viszeral-thoraxchirurgie"] },
  { term: "Fuß", regions: ["legs"], departments: ["unfallchirurgie-orthopaedie", "gefaesschirurgie"] },
  { term: "Gefäße", regions: ["legs", "abdomen"], departments: ["gefaesschirurgie"] },
  { term: "Hals", regions: ["head"], departments: ["belegabteilungen", "allgemein-viszeral-thoraxchirurgie", "gefaesschirurgie", "gastroenterologie-hepatologie"] },
  { term: "Hand", regions: ["arms"], departments: ["unfallchirurgie-orthopaedie"] },
  { term: "Hüfte", regions: ["legs"], departments: ["unfallchirurgie-orthopaedie"] },
  { term: "Knie", regions: ["legs"], departments: ["unfallchirurgie-orthopaedie"] },
  { term: "Schulter", regions: ["arms"], departments: ["unfallchirurgie-orthopaedie"] },
  { term: "Kopf", regions: ["head"], departments: ["belegabteilungen", "schmerztherapie-dorfen"] },
  { term: "Unterleib", regions: ["abdomen"], departments: ["gynaekologie-geburtshilfe", "urologie", "gastroenterologie-hepatologie"] },
  { term: "Schwangerschaft", regions: ["abdomen"], departments: ["gynaekologie-geburtshilfe"] },
  { term: "Prostata", regions: ["abdomen"], departments: ["urologie"] },
  { term: "Inkontinenz", regions: ["abdomen"], departments: ["gynaekologie-geburtshilfe", "urologie"] },
  { term: "Wirbelsäule", regions: ["back"], departments: ["unfallchirurgie-orthopaedie", "schmerztherapie-dorfen"] },
];

export function findDepartments(query, region) {
  const normalized = query.trim().toLowerCase();
  const matches = finderMap.filter((item) => {
    const byText = !normalized || item.term.toLowerCase().includes(normalized);
    const byRegion = !region || item.regions.includes(region);
    return byText && byRegion;
  });
  return [...new Set(matches.flatMap((item) => item.departments))];
}
