const VERIFIED_AT = "2026-07-18";

export const sources = {
  "official-about": {
    sourceTitle: "Klinikum Landkreis Erding: Über das Klinikum",
    sourceUrl: "https://www.klinikum-erding.de/de/unser-krankenhaus.html",
  },
  "official-contact": {
    sourceTitle: "Klinikum Landkreis Erding: Kontakt & Anfahrt",
    sourceUrl: "https://www.klinikum-erding.de/de/kontakt-anfahrt.html",
  },
  "official-impressum": {
    sourceTitle: "Klinikum Landkreis Erding: Impressum",
    sourceUrl: "https://www.klinikum-erding.de/de/impressum.html",
  },
  "official-visiting": {
    sourceTitle: "Klinikum Landkreis Erding: Besuchszeiten",
    sourceUrl: "https://www.klinikum-erding.de/de/besuchszeiten.html",
  },
  "official-centers": {
    sourceTitle: "Klinikum Landkreis Erding: Zentren und weitere Einrichtungen",
    sourceUrl: "https://www.klinikum-erding.de/de/zentren-ew.html",
  },
  "official-directory": {
    sourceTitle: "Klinikum Landkreis Erding: Behandlungsangebot",
    sourceUrl: "https://www.klinikum-erding.de/de/unser-krankenhaus.html",
  },
  "official-cardio": {
    sourceTitle: "Klinikum Landkreis Erding: Kardiologie und Pneumologie",
    sourceUrl: "https://www.klinikum-erding.de/de/einfuehrung-kardiologie-und-pneumologie.html",
  },
  "official-gyn": {
    sourceTitle: "Klinikum Landkreis Erding: Gynäkologie und Geburtshilfe",
    sourceUrl: "https://www.klinikum-erding.de/de/gynaekologie-und-geburtshilfe.html",
  },
  "official-care-op": {
    sourceTitle: "Klinikum Landkreis Erding: OP-Pflege",
    sourceUrl: "https://www.klinikum-erding.de/de/pflege-op.html",
  },
  "career-platform": {
    sourceTitle: "Klinikum Landkreis Erding: Karriereportal",
    sourceUrl: "https://karriere.klinikum-erding.de/",
  },
  "client-brief": {
    sourceTitle: "User-provided build specification and concept brief",
    sourceUrl: null,
  },
};

function governance(sourceRef, overrides = {}) {
  const source = sources[sourceRef] || sources["client-brief"];
  return {
    sourceRefs: [sourceRef],
    sourceUrl: source.sourceUrl,
    sourceTitle: source.sourceTitle,
    verifiedAt: VERIFIED_AT,
    lastReviewed: VERIFIED_AT,
    contentStatus: "verified",
    locationScope: "Erding und Dorfen",
    ...overrides,
  };
}

export const site = {
  name: "Klinikum Landkreis Erding",
  claim: "Spitzenmedizin ganz nah",
  description:
    "Kommunales Krankenhaus der gehobenen Grund- und Regelversorgung an den Standorten Erding und Dorfen.",
  organizationForm: "Regiebetrieb des Landkreises Erding",
  phone: "08122 59-0",
  phoneHref: "tel:+498122590",
  emergencyPhone: "112",
  emergencyHref: "tel:112",
  email: "info@klinikum-erding.de",
  canonicalBase: "https://www.klinikum-erding.de",
  primaryNav: [
    ["Aktuelles", "/aktuelles"],
    ["Patienten & Besucher", "/patienten-besucher"],
    ["Notfall", "/notfall"],
    ["Medizin & Zentren", "/medizin-zentren"],
    ["Pflege", "/pflege"],
    ["Karriere & Bildung", "/karriere-bildung"],
    ["Klinikum", "/klinikum"],
    ["Standorte", "/standorte"],
    ["Kontakt & Anfahrt", "/kontakt-anfahrt"],
  ],
  utilityNav: [
    ["Patientenportal", "/patienten-besucher/patientenportal-digitale-services"],
    ["Behandlungsfinder", "/medizin-zentren#finder"],
    ["Jobs", "/karriere-bildung"],
  ],
  legalNav: [
    ["Impressum", "/impressum"],
    ["Datenschutz", "/datenschutz"],
    ["Barrierefreiheit", "/barrierefreiheit"],
  ],
  ...governance("official-impressum", { locationScope: "Klinikum" }),
};

export const verifiedFacts = [
  {
    value: "330",
    label: "stationäre Betten",
    context: "Gehobene Grund- und Regelversorgung.",
    ...governance("official-about"),
  },
  {
    value: "12",
    label: "ambulante Plätze in der Schmerztagesklinik",
    context: "Teil der interdisziplinären Schmerztherapie in Dorfen.",
    ...governance("official-about", { locationScope: "Dorfen" }),
  },
  {
    value: "100%",
    label: "Trägerschaft Landkreis Erding",
    context: "Kommunales Krankenhaus im Landkreis.",
    ...governance("official-about"),
  },
  {
    value: ">1000",
    label: "Beschäftigte einschließlich Schüler",
    context: "Größter kommunaler Arbeitgeber im Landkreis laut offizieller Selbstdarstellung.",
    ...governance("official-about"),
  },
];

export const locations = [
  {
    slug: "erding",
    title: "Standort Erding",
    eyebrow: "Klinikum Erding",
    address: "Bajuwarenstraße 5, 85435 Erding",
    phone: site.phone,
    phoneHref: site.phoneHref,
    description:
      "Hauptstandort des Klinikums Landkreis Erding. Mit S-Bahn S2 bis Altenerding, Bus oder über B 388 beziehungsweise A 92 erreichbar.",
    arrival: [
      "S-Bahn Linie S2 bis Altenerding; der ausgeschilderte Fußweg dauert etwa fünf Minuten.",
      "Buslinien und Haltestelle Kreiskrankenhaus laut offizieller Anfahrtsseite prüfen.",
      "Anfahrt mit dem Auto über B 388 bis Erding oder A 92 Richtung Flughafen, Abfahrt Erding.",
    ],
    services: ["Notaufnahme", "Fachabteilungen", "Geburtshilfe", "Zentrale Verwaltung"],
    ...governance("official-contact", { locationScope: "Erding" }),
  },
  {
    slug: "dorfen",
    title: "Standort Dorfen",
    eyebrow: "Klinik Dorfen",
    address: "Erdinger Str. 17, 84405 Dorfen",
    phone: site.phone,
    phoneHref: site.phoneHref,
    description:
      "Zweiter Standort des Klinikums mit offiziell geführten Bereichen Innere Medizin Dorfen und interdisziplinäre Schmerztherapie.",
    arrival: [
      "Adresse: Erdinger Str. 17, 84405 Dorfen.",
      "Detailinformationen zu Parken, ÖPNV und Zugängen müssen standortbezogen final bestätigt werden.",
    ],
    services: ["Innere Medizin Dorfen", "Interdisziplinäre Schmerztherapie", "Schmerztagesklinik"],
    contentNeeded: "CONTENT-NEEDED: Standortfotos, Lageplan und vollständige Zugangsinformationen Dorfen.",
    ...governance("official-contact", { locationScope: "Dorfen", contentStatus: "needs-client-confirmation" }),
  },
];

const defaultMedical = {
  reasons: [],
  services: [],
  diagnostics: [],
  nursing: [],
  outpatient: [],
  team: [],
  downloads: [],
  faq: [],
  relatedCenters: [],
  contact: { label: "Zentrale", phone: site.phone, href: site.phoneHref },
  locationScope: "Erding und Dorfen",
  contentNeeded: "CONTENT-NEEDED: Fachredaktion für Leistungsspektrum, Team, Downloads und Sprechstunden.",
};

function medicalUnit(unit) {
  return {
    type: "department",
    ...defaultMedical,
    ...governance(unit.sourceRef || "official-directory", {
      locationScope: unit.locationScope || defaultMedical.locationScope,
      contentStatus: unit.contentStatus || "verified",
    }),
    ...unit,
  };
}

export const medicalUnits = [
  medicalUnit({
    slug: "notaufnahme",
    title: "Notaufnahme",
    teaser: "Akute Hilfe rund um die Uhr. Bei Lebensgefahr immer sofort 112 wählen.",
    tone: "emergency",
    locationScope: "Erding",
    reasons: ["Plötzlich lebensbedrohliche Situationen", "Akute schwere Beschwerden", "Notfälle nach Unfall"],
    services: ["Ersteinschätzung", "Akutversorgung", "Weiterleitung in passende Fachbereiche"],
    contact: { label: "Lebensgefahr", phone: "112", href: "tel:112" },
    contentNeeded: "CONTENT-NEEDED: Detailkontakte und Prozessfreigabe der Notaufnahme.",
  }),
  medicalUnit({
    slug: "kardiologie-pneumologie",
    title: "Kardiologie und Pneumologie",
    teaser:
      "Fachabteilung für Herz-, Kreislauf-, Lungen- und Bronchialerkrankungen; auf der offiziellen Seite als gemeinsamer Bereich geführt.",
    sourceRef: "official-cardio",
    reasons: ["Herz- und Kreislaufbeschwerden", "Lungen- und Bronchialerkrankungen", "Abklärung nach ärztlicher Zuweisung"],
    services: ["Kardiologische und pneumologische Diagnostik", "Interdisziplinäre Zusammenarbeit mit Intensivmedizin", "Anbindung an Herzkatheter und Pneumozentrum"],
    relatedCenters: ["herzkatheter", "hypertoniezentrum", "pneumozentrum"],
  }),
  medicalUnit({
    slug: "gastroenterologie-hepatologie",
    title: "Gastroenterologie / Hepatologie",
    teaser: "Offiziell geführte Fachabteilung für Magen-Darm-, Leber- und Verdauungsmedizin.",
    reasons: ["Bauchbeschwerden", "Verdauungsbeschwerden", "Leber- und Stoffwechselthemen nach Zuweisung"],
    services: ["Gastroenterologie", "Hepatologie", "Endoskopische Versorgung laut offizieller Fachstruktur"],
    relatedCenters: ["darmzentrum", "kontinenz-beckenboden-zentrum"],
  }),
  medicalUnit({
    slug: "innere-medizin-dorfen",
    title: "Innere Medizin Dorfen",
    teaser: "Offiziell geführte Innere Medizin am Standort Dorfen.",
    locationScope: "Dorfen",
    reasons: ["Internistische Beschwerden", "Stationäre Abklärung am Standort Dorfen", "Zuweisung durch Ärztinnen und Ärzte"],
    services: ["Innere Medizin", "Standortnahe Versorgung in Dorfen", "Zusammenarbeit mit Schmerzzentrum und Klinikum Erding"],
  }),
  medicalUnit({
    slug: "unfallchirurgie-orthopaedie",
    title: "Unfallchirurgie und Orthopädie",
    teaser: "Offiziell geführte Fachabteilung für Unfallchirurgie, Orthopädie und Bewegungsapparat.",
    reasons: ["Unfälle und Verletzungen", "Gelenk- und Knochenbeschwerden", "Wirbelsäulennahe Beschwerden nach Abklärung"],
    services: ["Traumatologie", "Orthopädie", "Sprechstunden und Ambulanzen nach offizieller Terminstruktur"],
    relatedCenters: ["wirbelsaeulenzentrum"],
  }),
  medicalUnit({
    slug: "allgemein-viszeral-thoraxchirurgie",
    title: "Allgemein-, Viszeral- und Thoraxchirurgie",
    teaser: "Offiziell geführter chirurgischer Bereich für Allgemein-, Bauch- und Thoraxchirurgie.",
    reasons: ["Chirurgische Abklärung", "Bauch- und Thoraxchirurgie", "Zuweisung durch Haus- oder Facharztpraxis"],
    services: ["Allgemeinchirurgie", "Viszeralchirurgie", "Thoraxchirurgie"],
    relatedCenters: ["darmzentrum", "kontinenz-beckenboden-zentrum", "ambulantes-op-zentrum"],
    contentStatus: "needs-client-confirmation",
    contentNeeded: "CONTENT-NEEDED: Robotik/Dexter nur nach offizieller aktueller Quelle als News oder Innovation freigeben.",
  }),
  medicalUnit({
    slug: "gefaesschirurgie",
    title: "Gefäßchirurgie",
    teaser: "Offiziell geführte Fachabteilung mit Anbindung an das Gefäßzentrum.",
    reasons: ["Arterielle oder venöse Erkrankungen", "Gefäßmedizinische Abklärung", "Wund- und Durchblutungsfragen nach Zuweisung"],
    services: ["Gefäßchirurgie", "Interdisziplinäre Zentrumsarbeit", "Ambulante und stationäre Abklärung nach Termin"],
    relatedCenters: ["gefaesszentrum"],
  }),
  medicalUnit({
    slug: "gynaekologie-geburtshilfe",
    title: "Gynäkologie und Geburtshilfe",
    teaser:
      "Frauenklinik mit Gynäkologie, Geburtshilfe, Geburtsplanung, Babysprechstunde und Brustzentrum laut offizieller Fachstruktur.",
    tone: "gold",
    sourceRef: "official-gyn",
    reasons: ["Gynäkologische Beschwerden", "Schwangerschaft und Geburtsplanung", "Brustsprechstunde nach Termin"],
    services: [
      "Allgemeine gynäkologische Sprechstunde",
      "Brustsprechstunde",
      "Laparoskopie- und Endometriosesprechstunde",
      "Urologisch-gynäkologische Sprechstunde",
      "Vulva- und Dysplasiesprechstunde",
      "Geburtsplanung, Kurse und Babysprechstunde",
    ],
    outpatient: [
      "Allgemeine Gynäkologische Sprechstunde: Donnerstag 08:30-12:00",
      "Brustsprechstunde: Dienstag 09:00-13:00",
      "Geburtsplanung: Dienstag und Donnerstag 08:00-14:00",
    ],
    team: [
      "Team- und Leitungsangaben sind zeitkritisch und bleiben bis zur Client-Freigabe redaktionell markiert.",
    ],
    contact: {
      label: "Sekretariat Gynäkologie und Geburtshilfe",
      phone: "08122 59-1648",
      href: "tel:+498122591648",
      email: "sekretariat.gynaekologie@klinikum-erding.de",
    },
    relatedCenters: ["brustzentrum", "kontinenz-beckenboden-zentrum"],
    contentStatus: "needs-client-confirmation",
    contentNeeded: "CONTENT-NEEDED: Personalnamen und tagesaktuelle Sprechstunden vor Veröffentlichung freigeben.",
  }),
  medicalUnit({
    slug: "urologie",
    title: "Urologie",
    teaser: "Offiziell geführte Hauptabteilung Urologie.",
    reasons: ["Urologische Beschwerden", "Prostata-, Harnblasen- oder Nierenthemen nach Zuweisung", "Inkontinenzthemen"],
    services: ["Urologische Diagnostik", "Ambulante Sprechstunden nach offizieller Terminstruktur", "Stationäre urologische Versorgung"],
    relatedCenters: ["kontinenz-beckenboden-zentrum"],
  }),
  medicalUnit({
    slug: "geriatrie",
    title: "Geriatrie",
    teaser: "Offiziell geführte Altersmedizin im Klinikum.",
    reasons: ["Altersspezifische Mehrfacherkrankungen", "Rehabilitation und Mobilität nach Klinikaufenthalt", "Interdisziplinäre Altersmedizin"],
    services: ["Geriatrische Einschätzung", "Therapeutische Begleitung", "Entlass- und Anschlussplanung"],
  }),
  medicalUnit({
    slug: "schmerztherapie-dorfen",
    title: "Interdisziplinäre Schmerztherapie Dorfen",
    teaser: "Schmerztherapie in Dorfen mit stationärem Bereich und 12 ambulanten Plätzen in der Schmerztagesklinik.",
    locationScope: "Dorfen",
    reasons: ["Chronische Schmerzen", "Interdisziplinäre Schmerzabklärung", "Tagesklinische oder stationäre Therapie nach Zuweisung"],
    services: ["Schmerztagesklinik", "Stationärer Bereich", "Interdisziplinäres Behandlungskonzept"],
    sourceRef: "official-about",
  }),
  medicalUnit({
    slug: "anaesthesie-intensivmedizin",
    title: "Anästhesie und Intensivmedizin",
    teaser: "Offiziell geführter Bereich für Anästhesie, Intensivmedizin und perioperative Sicherheit.",
    reasons: ["Operationen und Eingriffe", "Intensivmedizinische Überwachung", "Schmerztherapeutische Begleitung im klinischen Kontext"],
    services: ["Anästhesie", "Intensivmedizin", "Perioperative Betreuung"],
  }),
  medicalUnit({
    slug: "radiologie-nuklearmedizin",
    title: "Radiologie und Nuklearmedizin",
    teaser: "Offiziell geführter Bereich für bildgebende Diagnostik und Nuklearmedizin.",
    reasons: ["Bildgebende Diagnostik nach Überweisung", "Klinische Abklärung mit Bildgebung", "Interdisziplinäre Diagnostik"],
    services: ["Radiologische Diagnostik", "Nuklearmedizin", "Zusammenarbeit mit Fachabteilungen"],
  }),
];

export const centers = [
  ["ambulantes-op-zentrum", "Ambulantes OP-Zentrum", "Ambulante operative Versorgung als offiziell gelistete Einrichtung."],
  ["brustzentrum", "Brustzentrum", "Offiziell gelistetes Zentrum im Umfeld der Frauenklinik."],
  ["darmzentrum", "Darmzentrum", "Offiziell gelistetes Zentrum mit Behandlungsinformationen und Kooperationsstruktur."],
  ["gefaesszentrum", "Gefäßzentrum", "Offiziell gelistetes interdisziplinäres Zentrum."],
  ["herzkatheter", "Herzkatheter", "Offiziell gelistete spezialisierte Einrichtung."],
  ["hypertoniezentrum", "Hypertoniezentrum", "Offiziell gelistetes spezialisiertes Zentrum."],
  ["kontinenz-beckenboden-zentrum", "Kontinenz- und Beckenbodenzentrum", "Offiziell gelistetes Zentrum mit gynäkologischer und urologischer Anbindung."],
  ["pneumozentrum", "Pneumozentrum", "Offiziell gelistetes pneumologisches Zentrum."],
  ["schlaganfalleinheit", "Schlaganfalleinheit", "Offiziell gelistete spezialisierte Einheit."],
  ["therapiezentrum", "Therapiezentrum", "Offiziell gelistetes Therapiezentrum."],
  ["wirbelsaeulenzentrum", "Wirbelsäulenzentrum", "Offiziell gelistetes Zentrum für Wirbelsäulenthemen."],
].map(([slug, title, teaser]) => ({
  slug,
  title,
  teaser,
  type: "center",
  services: ["Offiziell gelisteter Schwerpunkt", "Interdisziplinäre Vernetzung", "Detailinhalte nach offizieller Fachfreigabe"],
  contact: { label: "Zentrale", phone: site.phone, href: site.phoneHref },
  contentNeeded: "CONTENT-NEEDED: Zentrumsleitung, Detailleistungen und Downloads final prüfen.",
  ...governance("official-centers", { contentStatus: "needs-client-confirmation" }),
}));

export const treatmentTopics = [
  {
    area: "Bauch",
    concerns: [
      { label: "Bauchschmerzen", targets: ["gastroenterologie-hepatologie", "allgemein-viszeral-thoraxchirurgie"] },
      { label: "Verdauungsbeschwerden", targets: ["gastroenterologie-hepatologie", "allgemein-viszeral-thoraxchirurgie"] },
      { label: "Unterleibsschmerzen", targets: ["gastroenterologie-hepatologie", "gynaekologie-geburtshilfe", "urologie", "allgemein-viszeral-thoraxchirurgie"] },
    ],
    ...governance("official-directory"),
  },
  {
    area: "Brust / Herz",
    concerns: [
      { label: "Bluthochdruck", targets: ["kardiologie-pneumologie"] },
      { label: "Drücken oder Brennen im Brustkorb", targets: ["kardiologie-pneumologie"] },
      { label: "Unregelmäßiger Puls", targets: ["kardiologie-pneumologie"] },
    ],
    ...governance("official-directory"),
  },
  {
    area: "Brust / Lunge",
    concerns: [
      { label: "Asthma", targets: ["kardiologie-pneumologie"] },
      { label: "Chronischer Husten", targets: ["kardiologie-pneumologie"] },
      { label: "Probleme mit der Atmung", targets: ["kardiologie-pneumologie", "allgemein-viszeral-thoraxchirurgie"] },
    ],
    ...governance("official-directory"),
  },
  {
    area: "Wirbelsäule",
    concerns: [
      { label: "Rückenschmerzen", targets: ["unfallchirurgie-orthopaedie", "schmerztherapie-dorfen"] },
    ],
    ...governance("official-directory"),
  },
  {
    area: "Unterleib",
    concerns: [
      { label: "Schwangerschaft", targets: ["gynaekologie-geburtshilfe"] },
      { label: "Inkontinenz", targets: ["gynaekologie-geburtshilfe", "urologie"] },
      { label: "Prostatabeschwerden", targets: ["urologie"] },
    ],
    ...governance("official-directory"),
  },
];

export const patientServices = [
  {
    slug: "aufenthalt-erding",
    title: "Aufenthalt in Erding",
    teaser: "Orientierung für Aufnahme, Station, Besuch und Entlassung am Standort Erding.",
    pathway: ["Vor Aufnahme Unterlagen bereitlegen", "Am Empfang oder in der zuständigen Aufnahme melden", "Station und Behandlungsteam kennenlernen", "Entlassung und Anschlussversorgung klären"],
    checklist: ["Versichertenkarte", "Einweisung oder Überweisung, falls vorhanden", "Aktueller Medikamentenplan", "Vorbefunde und Arztbriefe", "Persönliche Hilfsmittel"],
    locationScope: "Erding",
    ...governance("official-contact", { contentStatus: "needs-client-confirmation", locationScope: "Erding" }),
  },
  {
    slug: "aufenthalt-dorfen",
    title: "Aufenthalt in Dorfen",
    teaser: "Standortbezogene Orientierung für Patientinnen und Patienten in Dorfen.",
    pathway: ["Termin- und Aufnahmeinformationen prüfen", "Zum Standort Dorfen anreisen", "Stationäre oder tagesklinische Abläufe klären", "Anschlussversorgung planen"],
    checklist: ["Versichertenkarte", "Vorbefunde", "Medikamentenplan", "Kontakt der einweisenden Praxis"],
    locationScope: "Dorfen",
    contentNeeded: "CONTENT-NEEDED: Detailabläufe Dorfen mit Klinikteam abstimmen.",
    ...governance("official-contact", { contentStatus: "needs-client-confirmation", locationScope: "Dorfen" }),
  },
  {
    slug: "aufnahme",
    title: "Aufnahme",
    teaser: "Was vor einer stationären oder ambulanten Aufnahme wichtig ist.",
    pathway: ["Terminunterlagen prüfen", "Einweisung und Versicherungsdaten mitbringen", "Bei Unklarheiten die Zentrale kontaktieren", "Vor Ort den ausgeschilderten Wegen folgen"],
    checklist: ["Versichertenkarte", "Einweisung", "Medikamentenplan", "Allergiepass, falls vorhanden"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "entlassmanagement",
    title: "Entlassmanagement",
    teaser: "Der Übergang nach Hause, in Reha, Pflege oder weitere Behandlung wird frühzeitig mitgedacht.",
    pathway: ["Bedarf während des Aufenthalts klären", "Anschlussversorgung abstimmen", "Unterlagen vor Entlassung prüfen", "Nachfragen gesammelt an das Behandlungsteam richten"],
    checklist: ["Entlassbrief", "Medikationsplan", "Arbeitsunfähigkeitsbescheinigung falls erforderlich", "Kontakt für Rückfragen"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "patientenverwaltung",
    title: "Patientenverwaltung",
    teaser: "Administrative Fragen zu Aufnahme, Daten, Abrechnung und Wahlleistungen.",
    pathway: ["Persönliche Daten erfassen", "Versicherung und Unterlagen prüfen", "Optional Wahlleistungen besprechen", "Rückfragen zur Abrechnung bündeln"],
    checklist: ["Ausweis", "Versichertenkarte", "Kostenübernahme falls vorhanden"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "patientenmanagement",
    title: "Patientenmanagement",
    teaser: "Koordination im Aufenthalt und an Schnittstellen zwischen Behandlung, Pflege und Organisation.",
    pathway: ["Anliegen benennen", "Zuständigkeit klären", "Informationen aus Station, Pflege und Verwaltung zusammenführen"],
    checklist: ["Frageliste", "Kontaktperson", "Relevante Unterlagen"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "besuchszeiten",
    title: "Besuchszeiten",
    teaser: "Besuche sind in Erding und Dorfen täglich zwischen 13:30 und 18:30 Uhr möglich.",
    pathway: ["Besuchszeit prüfen", "Direkt zum Ziel gehen", "Hinweise des Personals beachten", "Ambulanzen nur nach Termin betreten"],
    checklist: ["Besuchszeit 13:30-18:30", "Hygiene beachten", "Bei Fieber oder Atemwegssymptomen vorher abklären"],
    ...governance("official-visiting"),
  },
  {
    slug: "sozialdienst",
    title: "Kliniksozialdienst",
    teaser: "Beratung bei sozialen, organisatorischen und nachstationären Fragen.",
    pathway: ["Bedarf auf Station ansprechen", "Beratungstermin vereinbaren", "Anschlussfragen gemeinsam strukturieren"],
    checklist: ["Versicherungsunterlagen", "Pflege- oder Reha-Unterlagen falls vorhanden", "Kontaktpersonen"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "seelsorge",
    title: "Seelsorge",
    teaser: "Begleitung für Patientinnen, Patienten und Angehörige in belastenden Situationen.",
    pathway: ["Wunsch nach Begleitung äußern", "Kontakt über Station oder Empfang herstellen", "Religiöse und weltanschauliche Bedürfnisse respektvoll klären"],
    checklist: ["Ansprechperson auf Station", "Gewünschte Kontaktform"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "feedback-patientenfuersprache",
    title: "Feedback und Patientenfürsprache",
    teaser: "Rückmeldungen, Beschwerden und Lob sollen strukturiert an die zuständigen Stellen gelangen.",
    pathway: ["Anliegen konkret formulieren", "Dringlichkeit einordnen", "Zuständige Kontaktstelle wählen", "Rückmeldung dokumentieren"],
    checklist: ["Name und Kontakt", "Station oder Bereich", "Zeitpunkt", "Kurze Beschreibung"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "service-a-z",
    title: "Service von A bis Z",
    teaser: "Schneller Index für praktische Fragen im Klinikalltag.",
    pathway: ["Thema suchen", "Standort beachten", "Kontakt oder Ziel direkt öffnen"],
    checklist: ["Besuch", "Anfahrt", "Aufnahme", "Dokumente", "Entlassung"],
    ...governance("official-about", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "downloads-dokumente",
    title: "Downloads und wichtige Dokumente",
    teaser: "Ein geordneter Bereich für Formulare, Merkblätter und Patienteninformationen.",
    pathway: ["Dokumentkategorie wählen", "Version und Datum prüfen", "Bei medizinischen Fragen Behandlungsteam kontaktieren"],
    checklist: ["Finale PDF-Dateien", "Freigabedatum", "Barrierearme PDF-Prüfung"],
    contentNeeded: "CONTENT-NEEDED: Final freigegebene Dokumente und Downloads.",
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "patientenportal-digitale-services",
    title: "Patientenportal und digitale Services",
    teaser: "Digitaler Einstiegspunkt für künftige Services, ohne nicht vorhandene Online-Funktionen vorzutäuschen.",
    pathway: ["Digitale Services prüfen", "Keine medizinischen Notfälle digital einreichen", "Bei dringenden Anliegen Telefon oder Notfallweg nutzen"],
    checklist: ["Portal-Link final", "Datenschutzfreigabe", "Supportkontakt"],
    contentNeeded: "CONTENT-NEEDED: Portal-Ziel, Authentifizierung und Datenschutztext final bestätigen.",
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
];

export const emergencyTopics = [
  {
    slug: "was-tun-im-notfall",
    title: "Was tun im Notfall?",
    teaser: "Bei Lebensgefahr sofort 112 wählen. Diese Seite ersetzt keine medizinische Beratung.",
    steps: ["Akute Gefahr erkennen", "112 wählen", "Ruhig bleiben und Rückfragen beantworten", "Wenn angewiesen: Notaufnahme aufsuchen"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
  {
    slug: "ankunft-anmeldung",
    title: "Ankunft und Anmeldung",
    teaser: "Nach dem Eintreffen wird das Anliegen aufgenommen und medizinisch eingeschätzt.",
    steps: ["Beschilderung zur Notaufnahme folgen", "Anliegen und Stammdaten angeben", "Akute Verschlechterung sofort melden"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation", locationScope: "Erding" }),
  },
  {
    slug: "triage",
    title: "Triage",
    teaser: "Die Behandlungsreihenfolge richtet sich in der Notaufnahme nach medizinischer Dringlichkeit.",
    steps: ["Ersteinschätzung", "Dringlichkeit festlegen", "Warte- oder Behandlungsbereich zuweisen"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation", locationScope: "Erding" }),
  },
  {
    slug: "wartebereich",
    title: "Wartebereich",
    teaser: "Wartezeiten können entstehen, weil lebensbedrohliche Fälle vorrangig behandelt werden.",
    steps: ["In Reichweite bleiben", "Veränderungen melden", "Anweisungen des Teams folgen"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation", locationScope: "Erding" }),
  },
  {
    slug: "behandlungsprozess",
    title: "Behandlungsprozess",
    teaser: "Untersuchung, Diagnostik und Weiterbehandlung werden nach medizinischer Dringlichkeit koordiniert.",
    steps: ["Ärztliche und pflegerische Einschätzung", "Diagnostik falls erforderlich", "Entlassung, stationäre Aufnahme oder Weiterleitung"],
    ...governance("client-brief", { contentStatus: "needs-client-confirmation", locationScope: "Erding" }),
  },
  {
    slug: "kontakt-faq",
    title: "Kontakt und häufige Fragen",
    teaser: "Für nicht lebensbedrohliche Anliegen hilft die Zentrale weiter; medizinische Notfälle laufen über 112.",
    steps: ["Zentrale kontaktieren", "Passenden Bereich nennen", "Keine sensiblen Notfalldaten über Formulare senden"],
    ...governance("official-impressum", { contentStatus: "needs-client-confirmation" }),
  },
];

export const nursingTopics = [
  ["pflegeleitbild", "Pflegeleitbild", "Grundhaltung und professionelle Pflegearbeit als eigener Kernbereich."],
  ["pflegedirektion", "Pflegedirektion", "Leitung, Verantwortlichkeiten und Entwicklung der Pflege."],
  ["intensiv-imc", "Intensivmedizin und IMC", "Spezialisierte Pflege in kritischen Behandlungssituationen."],
  ["schlaganfalleinheit", "Schlaganfalleinheit", "Pflege in einer spezialisierten akutneurologischen Einheit."],
  ["stationen", "Stationäre Teams", "Pflegebereiche nach Stationen, Rollen und Patientensituationen."],
  ["praxisanleitung", "Zentrale Praxisanleitung", "Ausbildung, Anleitung und Entwicklung in der Pflege."],
  ["pflegekarriere", "Pflegekarriere", "Einstieg, Entwicklung und Weiterbildung in der Pflege."],
].map(([slug, title, teaser]) => ({
  slug,
  title,
  teaser,
  ...governance("official-care-op", { contentStatus: "needs-client-confirmation" }),
}));

export const careerTopics = [
  ["jobs", "Aktuelle Stellenangebote", "Einstieg in das externe Karriereportal mit den aktuell veröffentlichten Vakanzen."],
  ["pflegekarriere", "Pflegekarriere", "Pflege als fachlich anspruchsvolle Laufbahn mit Entwicklungsperspektiven."],
  ["medizinische-karrieren", "Medizinische Karrieren", "Ärztliche und therapeutische Berufswege im Klinikum."],
  ["verwaltung-technik", "Administration und Technik", "Nicht-klinische Funktionen, die den Klinikbetrieb tragen."],
  ["ausbildung", "Ausbildung", "Berufsfachschulen für Krankenpflege und Krankenpflegehilfe sind offiziell genannt."],
  ["ota-ata", "OTA und ATA", "Ausbildungswege nur final veröffentlichen, wenn der aktuelle offizielle Stand bestätigt ist."],
  ["praktika-pj", "Praktikum und Praktisches Jahr", "Lern- und Praxiswege für Nachwuchsmedizin und Pflege."],
  ["fortbildung", "Fort- und Weiterbildung", "Entwicklung nach Einstieg oder Ausbildung."],
  ["bewerbungsprozess", "Bewerbungsprozess", "Transparenter Weg von Interesse bis Kontakt."],
].map(([slug, title, teaser]) => ({
  slug,
  title,
  teaser,
  externalHref: slug === "jobs" ? "https://karriere.klinikum-erding.de/" : null,
  ...governance(slug === "jobs" ? "career-platform" : "official-about", {
    contentStatus: "needs-client-confirmation",
  }),
}));

export const aboutTopics = [
  ["leitbild", "Leitbild", "Auftrag, Haltung und regionale Verantwortung des Klinikums."],
  ["geschichte", "Geschichte", "Entwicklung der Häuser Erding und Dorfen."],
  ["qualitaet", "Qualität", "Qualitätsmanagement, Berichte und Patientenfürsprache."],
  ["zertifizierungen", "Zertifizierungen", "Zertifizierte Zentren und Nachweise strukturiert sichtbar machen."],
  ["krankenhausleitung", "Krankenhausleitung", "Leitungsinformationen sind zeitkritisch und benötigen Client-Freigabe."],
  ["digitalisierung", "Digitalisierung", "Digitale Infrastruktur, Services und künftige Patientenzugänge."],
].map(([slug, title, teaser]) => ({
  slug,
  title,
  teaser,
  ...governance(slug === "krankenhausleitung" ? "official-impressum" : "official-about", {
    contentStatus: slug === "krankenhausleitung" ? "needs-client-confirmation" : "verified",
  }),
}));

export const news = [
  {
    slug: "newsroom-offizielle-meldungen",
    date: "Laufend",
    title: "Offizielle Nachrichten aus dem Klinikum",
    teaser: "Der Newsroom ist für geprüfte Meldungen, Abteilungsnachrichten und Presseinformationen vorbereitet.",
    category: "Redaktion",
    ...governance("official-directory", { contentStatus: "needs-client-confirmation" }),
    contentNeeded: "CONTENT-NEEDED: Aktuelle Meldungen mit Datum, Bildrechten und Freigabestatus anbinden.",
  },
  {
    slug: "medizinische-innovation",
    date: "Nach Freigabe",
    title: "Medizinische Innovation sichtbar machen",
    teaser: "Robotik, neue Verfahren und digitale Services werden nur mit aktueller offizieller Quelle veröffentlicht.",
    category: "Innovation",
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
    contentNeeded: "CONTENT-NEEDED: Dexter/Robotik und Kinderklinik mit aktueller offizieller Quelle verifizieren.",
  },
];

export const events = [
  {
    slug: "kurse-und-infoabende",
    date: "Nach offizieller Terminfreigabe",
    title: "Kurse, Infoabende und Veranstaltungen",
    teaser: "Veranstaltungen rund um Geburt, Pflege, Medizin und Karriere werden als Kalenderstruktur geführt.",
    category: "Kalender",
    ...governance("official-directory", { contentStatus: "needs-client-confirmation" }),
    contentNeeded: "CONTENT-NEEDED: Einzeltermine mit Datum, Ort, Anmeldung und Barriereinformationen einpflegen.",
  },
];

export const legalPages = {
  impressum: {
    slug: "impressum",
    title: "Impressum",
    teaser: "Pflichtangaben zum Klinikum Landkreis Erding.",
    body: [
      "Klinikum Landkreis Erding",
      "Regiebetrieb des Landkreises Erding",
      "Bajuwarenstraße 5, 85435 Erding",
      "Tel. 08122 / 59-0",
    ],
    ...governance("official-impressum"),
  },
  datenschutz: {
    slug: "datenschutz",
    title: "Datenschutz",
    teaser: "Struktur für die finale Datenschutzerklärung mit klarer Trennung von redaktionellem und juristischem Text.",
    body: [
      "Diese Konzeptseite bereitet Inhaltsbereiche für Verantwortliche, Kontaktwege, Zwecke, Rechtsgrundlagen, Speicherdauer und Betroffenenrechte vor.",
      "Der finale Rechtstext muss vom Klinikum oder juristisch Beauftragten bereitgestellt und geprüft werden.",
    ],
    contentNeeded: "CONTENT-NEEDED: Finale Datenschutzerklärung und Datenschutzkontakte juristisch freigeben.",
    ...governance("official-impressum", { contentStatus: "needs-client-confirmation" }),
  },
  barrierefreiheit: {
    slug: "barrierefreiheit",
    title: "Barrierefreiheit",
    teaser: "Erklärung zur Barrierefreiheit mit Status, Feedbackweg und Maßnahmenplan.",
    body: [
      "Die Seite dokumentiert den geplanten Aufbau einer Erklärung zur Barrierefreiheit.",
      "Eine vollständige Konformitätsaussage wird erst nach fachlicher Prüfung und Audit getroffen.",
    ],
    contentNeeded: "CONTENT-NEEDED: Auditstatus, Feedbackkontakt und Durchsetzungsverfahren final bestätigen.",
    ...governance("client-brief", { contentStatus: "needs-client-confirmation" }),
  },
};

export const imageSlots = [
  {
    id: "hero-hospital-exterior",
    subject: "Klinikum Erding Außenansicht mit klar erkennbarem Haupteingang",
    composition: "Querformat, ruhige Morgen- oder Tageslichtsituation, keine inszenierten Personen",
    placement: "Homepage nach Hero, Standort Erding, Kontakt & Anfahrt",
    resolution: "min. 2400 x 1400",
  },
  {
    id: "dorfen-location",
    subject: "Klinik Dorfen Außenansicht und Zugangssituation",
    composition: "Querformat und mobiler Hochformat-Crop",
    placement: "Standort Dorfen, Patientenbereich",
    resolution: "min. 2200 x 1400",
  },
  {
    id: "clinical-team-authentic",
    subject: "Authentische Teams aus Pflege, Medizin und Aufnahme mit Fotofreigaben",
    composition: "Editorial, dokumentarisch, keine generierten Mitarbeitenden",
    placement: "Pflege, Karriere, Klinikum",
    resolution: "min. 2000 x 1400",
  },
  {
    id: "birth-family",
    subject: "Geburtshilfe-Umfeld ohne identifizierbare Patientendaten",
    composition: "Warm, medizinisch glaubwürdig, neutral und nicht kitschig",
    placement: "Frauenklinik, Veranstaltungen, Familienbereich",
    resolution: "min. 2000 x 1400",
  },
];

export const routeInventory = [
  ["/", "Startseite", "implemented", "verified + needs-client-confirmation"],
  ["/aktuelles", "Aktuelles", "implemented", "needs-client-confirmation"],
  ["/veranstaltungen", "Veranstaltungen", "implemented", "needs-client-confirmation"],
  ["/patienten-besucher", "Patienten & Besucher", "implemented", "needs-client-confirmation"],
  ["/notfall", "Notfall", "implemented", "needs-client-confirmation"],
  ["/medizin-zentren", "Medizin & Zentren", "implemented", "verified directory"],
  ["/pflege", "Pflege", "implemented", "needs-client-confirmation"],
  ["/karriere-bildung", "Karriere & Bildung", "implemented", "needs-client-confirmation"],
  ["/klinikum", "Klinikum", "implemented", "verified + needs-client-confirmation"],
  ["/standorte", "Standorte", "implemented", "verified"],
  ["/standorte/erding", "Standort Erding", "implemented", "verified"],
  ["/standorte/dorfen", "Standort Dorfen", "implemented", "needs-client-confirmation"],
  ["/kontakt-anfahrt", "Kontakt & Anfahrt", "implemented", "verified"],
  ["/digitalisierung", "Digitalisierung", "implemented", "needs-client-confirmation"],
  ["/qualitaet", "Qualität", "implemented", "verified + needs-client-confirmation"],
  ["/zertifizierungen", "Zertifizierungen", "implemented", "verified center list"],
  ["/krankenhausleitung", "Krankenhausleitung", "implemented", "needs-client-confirmation"],
  ["/leitbild", "Leitbild", "implemented", "needs-client-confirmation"],
  ["/geschichte", "Geschichte", "implemented", "needs-client-confirmation"],
  ["/impressum", "Impressum", "implemented", "verified"],
  ["/datenschutz", "Datenschutz", "implemented", "needs-client-confirmation"],
  ["/barrierefreiheit", "Barrierefreiheit", "implemented", "needs-client-confirmation"],
].map(([path, title, completionStatus, contentStatus]) => ({ path, title, completionStatus, contentStatus }));

export const pageMeta = Object.fromEntries(
  routeInventory.map((route) => [
    route.path,
    {
      title: route.title,
      description: `${route.title} des Klinikums Landkreis Erding: klare Orientierung für Patientinnen, Besucher, Mitarbeitende und Interessierte.`,
    },
  ]),
);

export const searchIndex = [
  ...routeInventory.map((route) => ({ title: route.title, path: route.path, type: "Seite" })),
  ...medicalUnits.map((unit) => ({
    title: unit.title,
    path: `/medizin-zentren/fachabteilungen/${unit.slug}`,
    type: "Fachabteilung",
    text: unit.teaser,
  })),
  ...centers.map((center) => ({
    title: center.title,
    path: `/medizin-zentren/zentren/${center.slug}`,
    type: "Zentrum",
    text: center.teaser,
  })),
  ...patientServices.map((service) => ({
    title: service.title,
    path: `/patienten-besucher/${service.slug}`,
    type: "Service",
    text: service.teaser,
  })),
];

export function bySlug(items, slug) {
  return items.find((item) => item.slug === slug);
}

export function sourceSummary(sourceRefs = []) {
  return sourceRefs.map((ref) => sources[ref]).filter(Boolean);
}
