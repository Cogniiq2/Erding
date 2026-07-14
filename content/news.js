export const news = [
  {
    slug: "kinderklinik-2028",
    date: "2026",
    title: { de: "Kinderklinik-Eröffnung für Sommer 2028 vorgesehen", en: "Children’s clinic planned for summer 2028" },
    teaser: { de: "Der Krankenhausplan sieht die neue Kinderklinik für den Standort Erding vor.", en: "The hospital plan includes the new children’s clinic at Erding." },
    body: "Die künftige Kinderklinik stärkt die wohnortnahe Versorgung von Familien im Landkreis. Geburtshilfe und Kinderversorgung rücken damit räumlich und medizinisch enger zusammen.",
  },
  {
    slug: "dexter-weltpremiere",
    date: "06/2026",
    title: { de: "Weltpremiere: Robotische Nebennierenentfernung mit Dexter", en: "World first: adrenal surgery with Dexter" },
    teaser: { de: "Die Chirurgie berichtet eine robotisch assistierte Premiere.", en: "Surgery reports a robotic-assisted first." },
    body: "Robotische Assistenz kann besonders präzise Eingriffe in engen Operationsfeldern unterstützen. Die Meldung zeigt den Innovationsanspruch des Hauses.",
  },
  {
    slug: "sieben-geburten-26-stunden",
    date: "05/2026",
    title: { de: "Sieben Geburten in 26 Stunden", en: "Seven births in 26 hours" },
    teaser: { de: "Ein intensiver Tag für Kreißsaal, Wochenbett und Kinderteam.", en: "An intense day for delivery rooms and care teams." },
    body: "Die Geburtshilfe begleitet rund 600 Geburten im Jahr und setzt auf persönliche, sichere und ruhige Betreuung.",
  },
  {
    slug: "boys-day-2026",
    date: "2026",
    title: { de: "Boys' Day 2026 im Klinikum", en: "Boys' Day 2026 at the clinic" },
    teaser: { de: "Einblicke in Pflege, Therapie und Klinikberufe.", en: "Insights into care, therapy and clinical jobs." },
    body: "Nachwuchsarbeit beginnt mit offenen Türen. Der Boys' Day macht Berufsbilder im Gesundheitswesen greifbar.",
  },
  {
    slug: "foerderverein-spende",
    date: "2026",
    title: { de: "Förderverein-Spende der Frauengemeinschaft Steinkirchen", en: "Donation by Frauengemeinschaft Steinkirchen" },
    teaser: { de: "Bürgerschaftliches Engagement stärkt die Versorgung.", en: "Community engagement strengthens care." },
    body: "Spenden und Förderverein unterstützen Projekte, die Patientinnen, Patienten und Teams direkt zugutekommen.",
  },
];

export const events = [
  ["Diabetischer Fuß", "Patientenforum", "Di 18:00", "Klinikum Erding"],
  ["Prostataerkrankungen", "Patientenforum", "Di 18:00", "Klinikum Erding"],
  ["Harnwegsinfektionen", "Patientenforum", "Di 18:00", "Klinikum Erding"],
  ["Blasenschwäche", "Patientenforum", "Di 18:00", "Klinikum Erding"],
  ["Infoabend werdende Eltern", "monatlich", "jeden 1. Mittwoch", "Frauenklinik"],
].map(([title, date, time, location]) => ({
  slug: title.toLowerCase().replaceAll(" ", "-"),
  title: { de: title, en: title },
  date,
  time,
  location: { de: location, en: location },
}));

export function getArticle(slug) {
  return news.find((item) => item.slug === slug);
}
