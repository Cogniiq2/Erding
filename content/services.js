export const services = [
  ["aufenthalt-erding", "Aufenthalt Erding", "Aufnahme, Stationen, Besuch, Parken und Entlassung am Hauptstandort."],
  ["aufenthalt-dorfen", "Aufenthalt Dorfen", "Informationen zum Standort Dorfen mit Innerer Medizin und Schmerztherapie."],
  ["besuchszeiten", "Besuchszeiten", "Erding und Dorfen täglich 13:30-18:30, Ausnahmen mit ärztlicher Erlaubnis."],
  ["wahlleistungen", "Wahlleistungen", "Zimmer, Komfort und ärztliche Wahlleistungen transparent erklärt."],
  ["sozialdienst", "Sozialdienst", "Beratung zu Reha, Pflege, Hilfsmitteln und sozialrechtlichen Fragen."],
  ["palliativ", "Palliativ", "Begleitung schwerkranker Menschen und ihrer Angehörigen."],
  ["entlassmanagement", "Entlassmanagement", "Frühzeitige Planung für eine sichere Weiterbehandlung nach dem Aufenthalt."],
  ["diabetesberatung", "Diabetesberatung", "Schulung und Beratung für Patientinnen und Patienten mit Diabetes."],
  ["gruene-damen", "Grüne Damen", "Ehrenamtliche Unterstützung im Klinikalltag."],
  ["seelsorge", "Seelsorge", "Gespräch, Begleitung und spirituelle Unterstützung."],
  ["service-a-z", "Service A-Z", "Praktische Hinweise von Anfahrt bis Zuzahlung."],
  ["ihre-meinung", "Ihre Meinung", "Lob, Kritik und Hinweise für bessere Versorgung."],
  ["hausordnung", "Hausordnung", "Regeln für ein sicheres und ruhiges Miteinander im Klinikum."],
].map(([slug, title, teaser]) => ({
  slug,
  title: { de: title, en: title },
  teaser: { de: teaser, en: teaser },
  body: {
    de: `${teaser} Die Informationen dieser Konzeptstudie sind bewusst klar, kurz und handlungsorientiert formuliert.`,
    en: `${teaser} The information in this concept study is intentionally clear, concise and action-oriented.`,
  },
}));

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
