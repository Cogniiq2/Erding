export const zentren = [
  ["ambulantes-op-zentrum", "Ambulantes OP-Zentrum", "Tageschirurgische Abläufe mit kurzen Wegen und klarer Vorbereitung."],
  ["brustzentrum", "Brustzentrum", "Zertifiziertes Zentrum in Kooperation mit dem Klinikum rechts der Isar der TU München."],
  ["darmzentrum", "Darmzentrum", "Zertifizierte interdisziplinäre Versorgung bei Darmerkrankungen und Tumoren."],
  ["gefaesszentrum", "Gefäßzentrum", "Gebündelte Expertise für Arterien, Venen und diabetischen Fuß."],
  ["herzkatheter", "Herzkatheter", "Invasive Herzdiagnostik und Therapie bei koronaren Erkrankungen."],
  ["hypertoniezentrum", "Hypertoniezentrum", "Abklärung und Behandlung komplexer Blutdruckerkrankungen."],
  ["kontinenz-beckenboden-zentrum", "Kontinenz- & Beckenbodenzentrum", "Interdisziplinäre Hilfe bei Inkontinenz und Beckenbodenbeschwerden."],
  ["pneumozentrum", "Pneumozentrum", "Lungenmedizin, Funktionsdiagnostik und abgestimmte Therapie."],
  ["schlaganfalleinheit", "Schlaganfalleinheit", "Versorgung im Programm Bayern gegen den Schlaganfall."],
  ["therapiezentrum", "Therapiezentrum", "Physiotherapie, Ergotherapie, Logopädie und Podologie."],
  ["wirbelsaeulenzentrum", "Wirbelsäulenzentrum", "Diagnostik und Therapie von Wirbelsäulenbeschwerden."],
].map(([slug, name, teaser]) => ({
  slug,
  name: { de: name, en: name },
  teaser: { de: teaser, en: teaser },
  intro: {
    de: `${name} bündelt Fachabteilungen, Pflege, Therapie und Diagnostik in klaren Behandlungspfaden.`,
    en: `${name} brings departments, nursing, therapy and diagnostics together in clear care pathways.`,
  },
  spektrum: [
    { title: "Sprechstunde", desc: "Terminierte Abklärung mit strukturierter Vorbereitung." },
    { title: "Interdisziplinär", desc: "Fachrichtungen stimmen Diagnostik und Therapie gemeinsam ab." },
    { title: "Nachsorge", desc: "Weiterbehandlung und Kooperationspartner werden früh eingebunden." },
  ],
}));

export function getZentrum(slug) {
  return zentren.find((zentrum) => zentrum.slug === slug);
}
