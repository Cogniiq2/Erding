const VERIFIED_AT = "2026-07-18";

export const sources = {
  "official-home": {
    sourceTitle: "Klinikum Landkreis Erding: Spitzenmedizin ganz nah",
    sourceUrl: "https://www.klinikum-erding.de/de/",
  },
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
  "official-privacy": {
    sourceTitle: "Klinikum Landkreis Erding: Datenschutz",
    sourceUrl: "https://www.klinikum-erding.de/de/datenschutz.html",
  },
  "official-visiting": {
    sourceTitle: "Klinikum Landkreis Erding: Besuchszeiten",
    sourceUrl: "https://www.klinikum-erding.de/de/besuchszeiten.html",
  },
  "official-centers": {
    sourceTitle: "Klinikum Landkreis Erding: Zentren und weitere Einrichtungen",
    sourceUrl: "https://www.klinikum-erding.de/de/zentren-ew.html",
  },
  "official-certificates": {
    sourceTitle: "Klinikum Landkreis Erding: Zertifizierungen",
    sourceUrl: "https://www.klinikum-erding.de/de/zertifizierungen.html",
  },
  "official-quality-reports": {
    sourceTitle: "Klinikum Landkreis Erding: Qualitätsberichte",
    sourceUrl: "https://www.klinikum-erding.de/de/qualitaetsberichte.html",
  },
  "official-directory": {
    sourceTitle: "Klinikum Landkreis Erding: Behandlungsangebot",
    sourceUrl: "https://www.klinikum-erding.de/de/nachrichten.html",
  },
  "official-cardio": {
    sourceTitle: "Klinikum Landkreis Erding: Kardiologie und Pneumologie",
    sourceUrl: "https://www.klinikum-erding.de/de/einfuehrung-kardiologie-und-pneumologie.html",
  },
  "official-gyn": {
    sourceTitle: "Klinikum Landkreis Erding: Gynäkologie und Geburtshilfe",
    sourceUrl: "https://www.klinikum-erding.de/de/gynaekologie-und-geburtshilfe.html",
  },
  "official-care": {
    sourceTitle: "Klinikum Landkreis Erding: Pflege",
    sourceUrl: "https://www.klinikum-erding.de/de/einfuehrung-pflege.html",
  },
  "official-leadership": {
    sourceTitle: "Klinikum Landkreis Erding: Krankenhausleitung",
    sourceUrl: "https://www.klinikum-erding.de/de/krankenhausleitung.html",
  },
  "official-mission": {
    sourceTitle: "Klinikum Landkreis Erding: Unser Auftrag",
    sourceUrl: "https://www.klinikum-erding.de/de/unser-auftrag.html",
  },
  "official-history": {
    sourceTitle: "Klinikum Landkreis Erding: Unsere Geschichte",
    sourceUrl: "https://www.klinikum-erding.de/de/unsere-geschichte.html",
  },
  "official-events": {
    sourceTitle: "Klinikum Landkreis Erding: Veranstaltungen",
    sourceUrl: "https://www.klinikum-erding.de/de/veranstaltungen.html",
  },
  "official-birth-events": {
    sourceTitle: "Klinikum Landkreis Erding: Veranstaltungen und Kurse in der Geburtshilfe",
    sourceUrl: "https://www.klinikum-erding.de/de/veranstaltungen-und-kurse.html",
  },
  "official-news": {
    sourceTitle: "Klinikum Landkreis Erding: Nachrichten",
    sourceUrl: "https://www.klinikum-erding.de/de/nachrichten.html",
  },
  "news-kinderklinik-2026-07-10": {
    sourceTitle: "Grünes Licht für Kinderklinik am KLE: Eröffnung im Sommer 2028",
    sourceUrl: "https://www.klinikum-erding.de/de/nachrichten.html",
  },
  "news-dexter-adrenal-2026-06-08": {
    sourceTitle:
      "Weltpremiere im Klinikum Landkreis Erding: erster robotisch-assistierter Eingriff an der Nebenniere weltweit mit dem „Dexter“-System",
    sourceUrl:
      "https://www.klinikum-erding.de/de/news-detail/weltpremiere-im-klinikum-landkreis-erding-erster-roboterassistierter-eingriff-an-der-nebenniere-weltweit-mit-dem-dexter-system.html",
  },
  "news-dexter-introduction-2026-02-06": {
    sourceTitle: "Klinikum Landkreis Erding führt robotisches Assistenzsystem „Dexter“ ein",
    sourceUrl:
      "https://www.klinikum-erding.de/de/news-detail/klinikum-landkreis-erding-f%C3%BChrt-robotisches-assistenzsystem-dexter-ein.html",
  },
  "news-patient-portal-2026-03-31": {
    sourceTitle: "Klinikum Landkreis Erding startet digitales Patientenportal",
    sourceUrl:
      "https://www.klinikum-erding.de/de/news-detail/klinikum-landkreis-erding-startet-digitales-patientenportal.html",
  },
  "career-platform": {
    sourceTitle: "Klinikum Landkreis Erding: Karriereportal",
    sourceUrl: "https://karriere.klinikum-erding.de/",
  },
};

function editorial(sourceRef, overrides = {}) {
  const source = sources[sourceRef];
  return {
    sourceRefs: [sourceRef],
    sourceUrl: source?.sourceUrl || null,
    sourceTitle: source?.sourceTitle || sourceRef,
    verifiedAt: VERIFIED_AT,
    reviewState: "verified",
    notes: [],
    ...overrides,
  };
}

function record(slug, publicContent, meta = {}) {
  return {
    slug,
    publicContent: { slug, ...publicContent },
    editorial: editorial(meta.sourceRef || "official-about", meta),
  };
}

function publicList(records) {
  return records.map((entry) => entry.publicContent);
}

function publicMap(records) {
  return Object.fromEntries(records.map((entry) => [entry.slug, entry.publicContent]));
}

export const contentModel = {
  site: record(
    "site",
    {
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
    },
    { sourceRef: "official-impressum" },
  ),
};

export const site = contentModel.site.publicContent;

export const verifiedFacts = [
  {
    value: "330",
    label: "stationäre Betten",
    context: "Gehobene Grund- und Regelversorgung im Landkreis.",
  },
  {
    value: "12",
    label: "ambulante Plätze in Dorfen",
    context: "Schmerztagesklinik am Standort Klinik Dorfen.",
  },
  {
    value: "11 + 6",
    label: "Haupt- und Belegabteilungen",
    context: "Breites Behandlungsangebot mit mehreren Fachzentren.",
  },
  {
    value: ">1000",
    label: "Beschäftigte einschließlich Schüler",
    context: "Großer kommunaler Arbeitgeber der Region.",
  },
].map((fact) => ({ ...fact, verifiedAt: VERIFIED_AT, sourceRef: "official-about" }));

const locationRecords = [
  record(
    "erding",
    {
      title: "Standort Erding",
      eyebrow: "Klinikum Erding",
      address: "Bajuwarenstraße 5, 85435 Erding",
      phone: site.phone,
      phoneHref: site.phoneHref,
      description:
        "Hauptstandort mit Notaufnahme, Fachabteilungen, Geburtshilfe, Herzkatheter, Schlaganfalleinheit und regionalem Traumazentrum.",
      arrival: [
        "S-Bahn S2 bis Altenerding; der ausgeschilderte Fußweg dauert etwa fünf Minuten.",
        "Autoanreise über B 388 oder A 92, Abfahrt Erding.",
        "Die Zentrale verbindet bei Fragen zu Station, Ambulanz oder Termin weiter.",
      ],
      services: ["Notaufnahme", "Fachabteilungen", "Geburtshilfe", "Zentrale Verwaltung"],
    },
    { sourceRef: "official-contact" },
  ),
  record(
    "dorfen",
    {
      title: "Standort Dorfen",
      eyebrow: "Klinik Dorfen",
      address: "Erdinger Str. 17, 84405 Dorfen",
      phone: site.phone,
      phoneHref: site.phoneHref,
      description:
        "Standort mit Innerer Medizin Dorfen, interdisziplinärer Schmerztherapie und Schmerztagesklinik.",
      arrival: [
        "Adresse: Erdinger Str. 17, 84405 Dorfen.",
        "Für aktuelle Wege, Besuch und Terminfragen hilft die Zentrale des Klinikums weiter.",
      ],
      services: ["Innere Medizin Dorfen", "Interdisziplinäre Schmerztherapie", "Schmerztagesklinik"],
    },
    { sourceRef: "official-contact" },
  ),
];

export const locations = publicList(locationRecords);

const defaultMedicalPublic = {
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
  type: "department",
};

function medicalRecord(slug, publicContent, meta = {}) {
  return record(slug, { ...defaultMedicalPublic, ...publicContent }, { sourceRef: "official-directory", ...meta });
}

const medicalUnitRecords = [
  medicalRecord("notaufnahme", {
    title: "Notaufnahme",
    teaser: "Akute Hilfe rund um die Uhr. Bei Lebensgefahr immer sofort 112 wählen.",
    tone: "emergency",
    locationScope: "Erding",
    reasons: ["Lebensbedrohliche Situationen", "Akute schwere Beschwerden", "Notfälle nach Unfall"],
    services: ["Ersteinschätzung", "Akutversorgung", "Weiterleitung in passende Fachbereiche"],
    contact: { label: "Lebensgefahr", phone: "112", href: "tel:112" },
  }),
  medicalRecord(
    "kardiologie-pneumologie",
    {
      title: "Kardiologie und Pneumologie",
      teaser:
        "Fachabteilung für Herz-, Kreislauf-, Lungen- und Bronchialerkrankungen mit Anbindung an Herzkatheter und Pneumozentrum.",
      reasons: ["Herz- und Kreislaufbeschwerden", "Lungen- und Bronchialerkrankungen", "Abklärung nach ärztlicher Zuweisung"],
      services: ["Kardiologische Diagnostik", "Pneumologische Diagnostik", "Interdisziplinäre Intensivmedizin"],
      relatedCenters: ["herzkatheter", "hypertoniezentrum", "pneumozentrum"],
    },
    { sourceRef: "official-cardio" },
  ),
  medicalRecord("gastroenterologie-hepatologie", {
    title: "Gastroenterologie / Hepatologie",
    teaser: "Fachabteilung für Magen-Darm-, Leber- und Verdauungsmedizin.",
    reasons: ["Bauchbeschwerden", "Verdauungsbeschwerden", "Leber- und Stoffwechselthemen"],
    services: ["Gastroenterologie", "Hepatologie", "Endoskopische Versorgung"],
    relatedCenters: ["darmzentrum", "kontinenz-beckenboden-zentrum"],
  }),
  medicalRecord("innere-medizin-dorfen", {
    title: "Innere Medizin Dorfen",
    teaser: "Innere Medizin am Standort Dorfen mit wohnortnaher stationärer Versorgung.",
    locationScope: "Dorfen",
    reasons: ["Internistische Beschwerden", "Stationäre Abklärung in Dorfen", "Zuweisung durch Haus- oder Facharztpraxis"],
    services: ["Innere Medizin", "Standortnahe Versorgung in Dorfen", "Zusammenarbeit mit Klinikum Erding"],
  }),
  medicalRecord("unfallchirurgie-orthopaedie", {
    title: "Unfallchirurgie und Orthopädie",
    teaser: "Fachabteilung für Unfallchirurgie, Orthopädie und Erkrankungen des Bewegungsapparats.",
    reasons: ["Unfälle und Verletzungen", "Gelenk- und Knochenbeschwerden", "Schulter-, Knie-, Hüft- oder Handthemen"],
    services: ["Traumatologie", "Endoprothetik", "Schulterchirurgie", "Sportorthopädie", "Handchirurgie"],
    relatedCenters: ["wirbelsaeulenzentrum"],
  }),
  medicalRecord("allgemein-viszeral-thoraxchirurgie", {
    title: "Allgemein-, Viszeral- und Thoraxchirurgie",
    teaser: "Chirurgischer Bereich für Allgemein-, Bauch-, Thorax-, endokrine und plastisch-ästhetische Chirurgie.",
    reasons: ["Chirurgische Abklärung", "Bauch- und Thoraxchirurgie", "Schilddrüsen- oder Weichteilthemen"],
    services: ["Allgemeinchirurgie", "Viszeralchirurgie", "Thoraxchirurgie", "Endokrine Chirurgie"],
    relatedCenters: ["darmzentrum", "kontinenz-beckenboden-zentrum", "ambulantes-op-zentrum"],
  }),
  medicalRecord("gefaesschirurgie", {
    title: "Gefäßchirurgie",
    teaser: "Fachabteilung mit Anbindung an das Gefäßzentrum.",
    reasons: ["Arterielle oder venöse Erkrankungen", "Durchblutungsstörungen", "Wund- und Gefäßfragen"],
    services: ["Gefäßchirurgie", "Interdisziplinäre Zentrumsarbeit", "Ambulante und stationäre Abklärung"],
    relatedCenters: ["gefaesszentrum"],
  }),
  medicalRecord(
    "gynaekologie-geburtshilfe",
    {
      title: "Gynäkologie und Geburtshilfe",
      teaser:
        "Frauenklinik mit Gynäkologie, Geburtshilfe, Geburtsplanung, Babysprechstunde, Brustzentrum sowie Kontinenz- und Beckenbodenzentrum.",
      tone: "gold",
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
      team: ["Sekretariat Gynäkologie und Geburtshilfe", "Hebammen und ärztliches Team der Frauenklinik", "Brustzentrum und geburtshilfliche Pflege"],
      contact: {
        label: "Sekretariat Gynäkologie und Geburtshilfe",
        phone: "08122 59-1648",
        href: "tel:+498122591648",
        email: "sekretariat.gynaekologie@klinikum-erding.de",
      },
      relatedCenters: ["brustzentrum", "kontinenz-beckenboden-zentrum"],
    },
    { sourceRef: "official-gyn" },
  ),
  medicalRecord("urologie", {
    title: "Urologie",
    teaser: "Hauptabteilung für Erkrankungen von Nieren, Harnwegen, Blase, Prostata und männlicher Gesundheit.",
    reasons: ["Urologische Beschwerden", "Prostata-, Harnblasen- oder Nierenthemen", "Inkontinenz"],
    services: ["Urologische Diagnostik", "Ambulante Sprechstunden", "Stationäre urologische Versorgung"],
    relatedCenters: ["kontinenz-beckenboden-zentrum"],
  }),
  medicalRecord("geriatrie", {
    title: "Geriatrie",
    teaser: "Altersmedizin für Patientinnen und Patienten mit mehreren Erkrankungen und erhöhtem Unterstützungsbedarf.",
    reasons: ["Altersspezifische Mehrfacherkrankungen", "Mobilität nach Klinikaufenthalt", "Therapie- und Anschlussplanung"],
    services: ["Geriatrische Einschätzung", "Therapeutische Begleitung", "Entlass- und Anschlussplanung"],
  }),
  medicalRecord(
    "schmerztherapie-dorfen",
    {
      title: "Interdisziplinäre Schmerztherapie Dorfen",
      teaser: "Schmerztherapie in Dorfen mit stationärem Bereich und 12 ambulanten Plätzen in der Schmerztagesklinik.",
      locationScope: "Dorfen",
      reasons: ["Chronische Schmerzen", "Interdisziplinäre Schmerzabklärung", "Tagesklinische oder stationäre Therapie"],
      services: ["Schmerztagesklinik", "Stationärer Bereich", "Interdisziplinäres Behandlungskonzept"],
    },
    { sourceRef: "official-about" },
  ),
  medicalRecord("anaesthesie-intensivmedizin", {
    title: "Anästhesie und Intensivmedizin",
    teaser: "Bereich für Anästhesie, Intensivmedizin und perioperative Sicherheit.",
    reasons: ["Operationen und Eingriffe", "Intensivmedizinische Überwachung", "Schmerztherapeutische Begleitung im klinischen Kontext"],
    services: ["Anästhesie", "Intensivmedizin", "Perioperative Betreuung"],
  }),
  medicalRecord("radiologie-nuklearmedizin", {
    title: "Radiologie und Nuklearmedizin",
    teaser: "Bildgebende Diagnostik und Nuklearmedizin für stationäre und ambulante Fragestellungen.",
    reasons: ["Bildgebende Diagnostik nach Überweisung", "Klinische Abklärung mit Bildgebung", "Interdisziplinäre Diagnostik"],
    services: ["Radiologische Diagnostik", "Nuklearmedizin", "Zusammenarbeit mit Fachabteilungen"],
  }),
];

export const medicalUnits = publicList(medicalUnitRecords);

const centerRecords = [
  ["ambulantes-op-zentrum", "Ambulantes OP-Zentrum", "Ambulante operative Versorgung als offiziell gelistete Einrichtung."],
  ["brustzentrum", "Brustzentrum", "Offiziell gelistetes Zentrum im Umfeld der Frauenklinik."],
  ["darmzentrum", "Darmzentrum", "Offiziell gelistetes Zentrum mit Behandlungsinformationen und Kooperationen."],
  ["gefaesszentrum", "Gefäßzentrum", "Offiziell gelistetes interdisziplinäres Zentrum."],
  ["herzkatheter", "Herzkatheter", "Spezialisierte Einrichtung für kardiologische Diagnostik und Therapie."],
  ["hypertoniezentrum", "Hypertoniezentrum", "Spezialisierter Bereich für Bluthochdruck und kardiovaskuläre Risiken."],
  ["kontinenz-beckenboden-zentrum", "Kontinenz- und Beckenbodenzentrum", "Zentrum mit gynäkologischer und urologischer Anbindung."],
  ["pneumozentrum", "Pneumozentrum", "Pneumologisches Zentrum im Umfeld von Kardiologie und Pneumologie."],
  ["schlaganfalleinheit", "Schlaganfalleinheit", "Spezialisierte Einheit der akuten Schlaganfallversorgung."],
  ["therapiezentrum", "Therapiezentrum", "Therapiezentrum mit Physiotherapie, Ergotherapie, Logopädie und Podologie."],
  ["wirbelsaeulenzentrum", "Wirbelsäulenzentrum", "Zentrum für Wirbelsäulenthemen und interdisziplinäre Abklärung."],
].map(([slug, title, teaser]) =>
  record(
    slug,
    {
      title,
      teaser,
      type: "center",
      services: ["Spezialisierter Schwerpunkt", "Interdisziplinäre Zusammenarbeit", "Kontakt über Zentrale oder Fachbereich"],
      contact: { label: "Zentrale", phone: site.phone, href: site.phoneHref },
    },
    { sourceRef: "official-centers" },
  ),
);

export const centers = publicList(centerRecords);

export const treatmentTopics = [
  {
    area: "Bauch",
    concerns: [
      { label: "Bauchschmerzen", targets: ["gastroenterologie-hepatologie", "allgemein-viszeral-thoraxchirurgie"] },
      { label: "Verdauungsbeschwerden", targets: ["gastroenterologie-hepatologie", "allgemein-viszeral-thoraxchirurgie"] },
      { label: "Unterleibsschmerzen", targets: ["gastroenterologie-hepatologie", "gynaekologie-geburtshilfe", "urologie", "allgemein-viszeral-thoraxchirurgie"] },
    ],
  },
  {
    area: "Brust / Herz",
    concerns: [
      { label: "Bluthochdruck", targets: ["kardiologie-pneumologie"] },
      { label: "Drücken oder Brennen im Brustkorb", targets: ["kardiologie-pneumologie"] },
      { label: "Unregelmäßiger Puls", targets: ["kardiologie-pneumologie"] },
    ],
  },
  {
    area: "Brust / Lunge",
    concerns: [
      { label: "Asthma", targets: ["kardiologie-pneumologie"] },
      { label: "Chronischer Husten", targets: ["kardiologie-pneumologie"] },
      { label: "Probleme mit der Atmung", targets: ["kardiologie-pneumologie", "allgemein-viszeral-thoraxchirurgie"] },
    ],
  },
  {
    area: "Wirbelsäule",
    concerns: [
      { label: "Rückenschmerzen", targets: ["unfallchirurgie-orthopaedie", "schmerztherapie-dorfen"] },
    ],
  },
  {
    area: "Unterleib",
    concerns: [
      { label: "Schwangerschaft", targets: ["gynaekologie-geburtshilfe"] },
      { label: "Inkontinenz", targets: ["gynaekologie-geburtshilfe", "urologie"] },
      { label: "Prostatabeschwerden", targets: ["urologie"] },
    ],
  },
];

const patientServiceRecords = [
  record("aufenthalt-erding", {
    title: "Aufenthalt in Erding",
    teaser: "Orientierung für Aufnahme, Station, Besuch und Entlassung am Standort Erding.",
    pathway: ["Unterlagen für Aufnahme oder Termin bereitlegen", "Am Empfang oder in der zuständigen Aufnahme melden", "Station und Behandlungsteam kennenlernen", "Entlassung und Anschlussversorgung klären"],
    checklist: ["Versichertenkarte", "Einweisung oder Überweisung, falls vorhanden", "Aktueller Medikamentenplan", "Vorbefunde und ärztliche Unterlagen", "Persönliche Hilfsmittel"],
    locationScope: "Erding",
  }, { sourceRef: "official-contact" }),
  record("aufenthalt-dorfen", {
    title: "Aufenthalt in Dorfen",
    teaser: "Standortbezogene Orientierung für Patientinnen und Patienten in Dorfen.",
    pathway: ["Termin- und Aufnahmeinformationen prüfen", "Zum Standort Dorfen anreisen", "Stationäre oder tagesklinische Abläufe klären", "Anschlussversorgung planen"],
    checklist: ["Versichertenkarte", "Vorbefunde", "Medikamentenplan", "Kontakt der einweisenden Praxis"],
    locationScope: "Dorfen",
  }, { sourceRef: "official-contact" }),
  record("aufnahme", {
    title: "Aufnahme",
    teaser: "Was vor einer stationären oder ambulanten Aufnahme wichtig ist.",
    pathway: ["Terminunterlagen prüfen", "Einweisung und Versicherungsdaten mitbringen", "Bei Unklarheiten die Zentrale kontaktieren", "Vor Ort den ausgeschilderten Wegen folgen"],
    checklist: ["Versichertenkarte", "Einweisung", "Medikamentenplan", "Allergiepass, falls vorhanden"],
  }, { sourceRef: "official-privacy" }),
  record("entlassmanagement", {
    title: "Entlassmanagement",
    teaser: "Der Übergang nach Hause, in Reha, Pflege oder weitere Behandlung wird frühzeitig mitgedacht.",
    pathway: ["Bedarf während des Aufenthalts klären", "Anschlussversorgung abstimmen", "Unterlagen vor Entlassung prüfen", "Nachfragen gesammelt an das Behandlungsteam richten"],
    checklist: ["Entlassunterlagen", "Medikationsplan", "Arbeitsunfähigkeitsbescheinigung falls erforderlich", "Kontakt für Rückfragen"],
  }, { sourceRef: "official-about" }),
  record("patientenverwaltung", {
    title: "Patientenverwaltung",
    teaser: "Administrative Fragen zu Aufnahme, Daten, Abrechnung und Wahlleistungen.",
    pathway: ["Persönliche Daten erfassen", "Versicherung und Unterlagen prüfen", "Optional Wahlleistungen besprechen", "Rückfragen zur Abrechnung bündeln"],
    checklist: ["Ausweis", "Versichertenkarte", "Kostenübernahme falls vorhanden"],
  }, { sourceRef: "official-privacy" }),
  record("patientenmanagement", {
    title: "Patientenmanagement",
    teaser: "Koordination im Aufenthalt und an Schnittstellen zwischen Behandlung, Pflege und Organisation.",
    pathway: ["Anliegen benennen", "Zuständigkeit klären", "Informationen aus Station, Pflege und Verwaltung zusammenführen"],
    checklist: ["Frageliste", "Kontaktperson", "Relevante Unterlagen"],
  }),
  record("besuchszeiten", {
    title: "Besuchszeiten",
    teaser: "Besuche sind in Erding und Dorfen täglich zwischen 13:30 und 18:30 Uhr möglich.",
    pathway: ["Besuchszeit prüfen", "Direkt zum Ziel gehen", "Hinweise des Personals beachten", "Ambulanzen nur nach Termin betreten"],
    checklist: ["Besuchszeit 13:30-18:30", "Hygiene beachten", "Bei Fieber oder Atemwegssymptomen vorher abklären"],
  }, { sourceRef: "official-visiting" }),
  record("sozialdienst", {
    title: "Kliniksozialdienst",
    teaser: "Beratung bei sozialen, organisatorischen und nachstationären Fragen.",
    pathway: ["Bedarf auf Station ansprechen", "Beratungstermin vereinbaren", "Anschlussfragen gemeinsam ordnen"],
    checklist: ["Versicherungsunterlagen", "Pflege- oder Reha-Unterlagen falls vorhanden", "Kontaktpersonen"],
  }),
  record("seelsorge", {
    title: "Seelsorge",
    teaser: "Begleitung für Patientinnen, Patienten und Angehörige in belastenden Situationen.",
    pathway: ["Wunsch nach Begleitung äußern", "Kontakt über Station oder Empfang herstellen", "Religiöse und weltanschauliche Bedürfnisse respektvoll klären"],
    checklist: ["Ansprechperson auf Station", "Gewünschte Kontaktform"],
  }),
  record("feedback-patientenfuersprache", {
    title: "Feedback und Patientenfürsprache",
    teaser: "Rückmeldungen, Beschwerden und Lob sollen nachvollziehbar an die zuständigen Stellen gelangen.",
    pathway: ["Anliegen konkret formulieren", "Dringlichkeit einordnen", "Zuständige Kontaktstelle wählen", "Rückmeldung dokumentieren"],
    checklist: ["Name und Kontakt", "Station oder Bereich", "Zeitpunkt", "Kurze Beschreibung"],
  }, { sourceRef: "official-quality-reports" }),
  record("service-a-z", {
    title: "Service von A bis Z",
    teaser: "Schneller Index für praktische Fragen im Klinikalltag.",
    pathway: ["Thema suchen", "Standort beachten", "Kontakt oder Ziel direkt öffnen"],
    checklist: ["Besuch", "Anfahrt", "Aufnahme", "Dokumente", "Entlassung"],
  }),
  record("downloads-dokumente", {
    title: "Downloads und wichtige Dokumente",
    teaser: "Formulare, Merkblätter und Patienteninformationen an einem Ort.",
    pathway: ["Dokumentkategorie wählen", "Version und Datum prüfen", "Bei medizinischen Fragen Behandlungsteam kontaktieren"],
    checklist: ["Qualitätsberichte", "Patienteninformationen", "Formulare und Merkblätter"],
  }, { sourceRef: "official-quality-reports" }),
  record("patientenportal-digitale-services", {
    title: "Patientenportal und digitale Services",
    teaser: "Das Klinikum ist an „Mein-Krankenhaus.Digital“ angebunden; den Auftakt macht die Schulter-Sprechstunde.",
    pathway: ["Digitalen Einstieg öffnen", "Termin- oder Verwaltungsanliegen wählen", "Bei Notfällen telefonisch handeln"],
    checklist: ["Keine Notfalldaten online senden", "Unterlagen bereithalten", "Telefonische Alternative nutzen, wenn etwas dringend ist"],
  }, { sourceRef: "news-patient-portal-2026-03-31" }),
];

export const patientServices = publicList(patientServiceRecords);

export const emergencyTopics = [
  record("was-tun-im-notfall", {
    title: "Was tun im Notfall?",
    teaser: "Bei Lebensgefahr sofort 112 wählen. Diese Seite ersetzt keine medizinische Beratung.",
    steps: ["Akute Gefahr erkennen", "112 wählen", "Ruhig bleiben und Rückfragen beantworten", "Wenn angewiesen: Notaufnahme aufsuchen"],
  }),
  record("ankunft-anmeldung", {
    title: "Ankunft und Anmeldung",
    teaser: "Nach dem Eintreffen wird das Anliegen aufgenommen und medizinisch eingeschätzt.",
    steps: ["Beschilderung zur Notaufnahme folgen", "Anliegen und Stammdaten angeben", "Akute Verschlechterung sofort melden"],
  }),
  record("triage", {
    title: "Triage",
    teaser: "Die Behandlungsreihenfolge richtet sich in der Notaufnahme nach medizinischer Dringlichkeit.",
    steps: ["Ersteinschätzung", "Dringlichkeit festlegen", "Warte- oder Behandlungsbereich zuweisen"],
  }),
  record("wartebereich", {
    title: "Wartebereich",
    teaser: "Wartezeiten können entstehen, weil lebensbedrohliche Fälle vorrangig behandelt werden.",
    steps: ["In Reichweite bleiben", "Veränderungen melden", "Anweisungen des Teams folgen"],
  }),
  record("behandlungsprozess", {
    title: "Behandlungsprozess",
    teaser: "Untersuchung, Diagnostik und Weiterbehandlung werden nach medizinischer Dringlichkeit koordiniert.",
    steps: ["Ärztliche und pflegerische Einschätzung", "Diagnostik falls erforderlich", "Entlassung, stationäre Aufnahme oder Weiterleitung"],
  }),
  record("kontakt-faq", {
    title: "Kontakt und häufige Fragen",
    teaser: "Für nicht lebensbedrohliche Anliegen hilft die Zentrale weiter; medizinische Notfälle laufen über 112.",
    steps: ["Zentrale kontaktieren", "Passenden Bereich nennen", "Keine sensiblen Notfalldaten über Formulare senden"],
  }, { sourceRef: "official-impressum" }),
].map((entry) => entry.publicContent);

export const nursingTopics = [
  ["pflegeleitbild", "Pflegeleitbild", "Grundhaltung und professionelle Pflegearbeit als eigener Kernbereich."],
  ["pflegedirektion", "Pflegedirektion", "Leitung, Verantwortlichkeiten und Entwicklung der Pflege."],
  ["intensiv-imc", "Intensivmedizin und IMC", "Spezialisierte Pflege in kritischen Behandlungssituationen."],
  ["schlaganfalleinheit", "Schlaganfalleinheit", "Pflege in einer spezialisierten akutneurologischen Einheit."],
  ["stationen", "Stationäre Teams", "Pflegebereiche nach Stationen, Rollen und Patientensituationen."],
  ["praxisanleitung", "Zentrale Praxisanleitung", "Ausbildung, Anleitung und Entwicklung in der Pflege."],
  ["pflegekarriere", "Pflegekarriere", "Einstieg, Entwicklung und Weiterbildung in der Pflege."],
].map(([slug, title, teaser]) => record(slug, { title, teaser }, { sourceRef: "official-care" }).publicContent);

export const careerTopics = [
  ["jobs", "Aktuelle Stellenangebote", "Einstieg in das externe Karriereportal mit den aktuell veröffentlichten Vakanzen."],
  ["pflegekarriere", "Pflegekarriere", "Pflege als fachlich anspruchsvolle Laufbahn mit Entwicklungsperspektiven."],
  ["medizinische-karrieren", "Medizinische Karrieren", "Ärztliche und therapeutische Berufswege im Klinikum."],
  ["verwaltung-technik", "Administration und Technik", "Nicht-klinische Funktionen, die den Klinikbetrieb tragen."],
  ["ausbildung", "Ausbildung", "Berufsfachschulen für Krankenpflege und Krankenpflegehilfe sind offiziell genannt."],
  ["ota-ata", "OTA und ATA", "Ausbildungswege im OP- und Anästhesiebereich."],
  ["praktika-pj", "Praktikum und Praktisches Jahr", "Lern- und Praxiswege für Nachwuchsmedizin und Pflege."],
  ["fortbildung", "Fort- und Weiterbildung", "Entwicklung nach Einstieg oder Ausbildung."],
  ["bewerbungsprozess", "Bewerbungsprozess", "Transparenter Weg von Interesse bis Kontakt."],
].map(([slug, title, teaser]) =>
  record(
    slug,
    {
      title,
      teaser,
      externalHref: slug === "jobs" ? "https://karriere.klinikum-erding.de/" : null,
    },
    { sourceRef: slug === "jobs" ? "career-platform" : "official-about" },
  ).publicContent,
);

export const aboutTopics = [
  record("leitbild", {
    title: "Leitbild",
    teaser: "Auftrag, Haltung und regionale Verantwortung des Klinikums.",
    category: "Auftrag",
  }, { sourceRef: "official-mission" }),
  record("geschichte", {
    title: "Geschichte",
    teaser: "Entwicklung der Häuser Erding und Dorfen.",
    category: "Historie",
  }, { sourceRef: "official-history" }),
  record("qualitaet", {
    title: "Qualität",
    teaser: "Qualitätsmanagement, Berichte, Zertifizierungen und Patientenfürsprache.",
    category: "Qualität",
  }, { sourceRef: "official-quality-reports" }),
  record("zertifizierungen", {
    title: "Zertifizierungen",
    teaser: "Zertifizierte Zentren und Nachweise des Klinikums.",
    category: "Nachweise",
  }, { sourceRef: "official-certificates" }),
  record("krankenhausleitung", {
    title: "Krankenhausleitung",
    teaser: "Direktion, ärztliche Leitung, Pflegeleitung und Kontakt zum Sekretariat.",
    category: "Leitung",
  }, { sourceRef: "official-leadership" }),
  record("digitalisierung", {
    title: "Digitalisierung",
    teaser: "Digitale Services, Patientenportal und verantwortliche Datenwege.",
    category: "Digital",
  }, { sourceRef: "news-patient-portal-2026-03-31" }),
].map((entry) => entry.publicContent);

const newsRecords = [
  record("kinderklinik-sommer-2028", {
    date: "10. Jul 2026",
    publicationDate: "2026-07-10",
    exactOfficialTitle: "Grünes Licht für Kinderklinik am KLE: Eröffnung im Sommer 2028",
    title: "Grünes Licht für Kinderklinik am KLE",
    teaser:
      "Der Weg zur Aufnahme in den Krankenhausplan ist frei; für Sommer 2028 ist eine Klinik zur Akut- und Grundversorgung von Kindern und Jugendlichen am Klinikum vorgesehen.",
    summary:
      "Das Klinikum berichtet, dass das Bayerische Staatsministerium den Weg für die Kinderklinik geebnet hat. Geplant ist eine angegliederte Akut- und Grundversorgung für Kinder und Jugendliche.",
    category: "Versorgung",
    officialSourceTitle: sources["news-kinderklinik-2026-07-10"].sourceTitle,
    officialSourceUrl: sources["news-kinderklinik-2026-07-10"].sourceUrl,
    verifiedDate: VERIFIED_AT,
    imageStatus: "official article image available",
    imageRightsStatus: "use official image only with rights clearance",
    publicationStatus: "published by official source",
  }, { sourceRef: "news-kinderklinik-2026-07-10" }),
  record("dexter-nebenniere-weltpremiere", {
    date: "08. Jun 2026",
    publicationDate: "2026-06-08",
    exactOfficialTitle:
      "Weltpremiere im Klinikum Landkreis Erding: erster robotisch-assistierter Eingriff an der Nebenniere weltweit mit dem „Dexter“-System",
    title: "Weltpremiere mit Dexter-System",
    teaser:
      "Das chirurgische Team entfernte weltweit erstmals eine Nebenniere robotisch assistiert mit dem Dexter-System.",
    summary:
      "Die Meldung ordnet den Eingriff als medizinischen Meilenstein ein und verweist auf den Start des Systems Ende Februar 2026.",
    category: "Innovation",
    officialSourceTitle: sources["news-dexter-adrenal-2026-06-08"].sourceTitle,
    officialSourceUrl: sources["news-dexter-adrenal-2026-06-08"].sourceUrl,
    verifiedDate: VERIFIED_AT,
    imageStatus: "official article image available",
    imageRightsStatus: "use official image only with rights clearance",
    publicationStatus: "published by official source",
  }, { sourceRef: "news-dexter-adrenal-2026-06-08" }),
  record("dexter-einfuehrung", {
    date: "06. Feb 2026",
    publicationDate: "2026-02-06",
    exactOfficialTitle: "Klinikum Landkreis Erding führt robotisches Assistenzsystem „Dexter“ ein",
    title: "Robotisches Assistenzsystem Dexter eingeführt",
    teaser:
      "Das Klinikum beschreibt Dexter als neues Assistenzsystem für minimalinvasive, fachübergreifende operative Versorgung.",
    summary:
      "Dexter verbindet robotergestützte Präzision mit laparoskopischer Flexibilität und wird fachübergreifend eingesetzt.",
    category: "Innovation",
    officialSourceTitle: sources["news-dexter-introduction-2026-02-06"].sourceTitle,
    officialSourceUrl: sources["news-dexter-introduction-2026-02-06"].sourceUrl,
    verifiedDate: VERIFIED_AT,
    imageStatus: "official article image available",
    imageRightsStatus: "use official image only with rights clearance",
    publicationStatus: "published by official source",
  }, { sourceRef: "news-dexter-introduction-2026-02-06" }),
  record("patientenportal-start", {
    date: "31. Mär 2026",
    publicationDate: "2026-03-31",
    exactOfficialTitle: "Klinikum Landkreis Erding startet digitales Patientenportal",
    title: "Patientenportal gestartet",
    teaser:
      "Das Klinikum ist an „Mein-Krankenhaus.Digital“ angebunden; den Auftakt macht die Schulter-Sprechstunde.",
    summary:
      "Das Portal unterstützt organisatorische Schritte rund um den Klinikaufenthalt und startet mit einem spezialisierten Terminangebot.",
    category: "Digital",
    officialSourceTitle: sources["news-patient-portal-2026-03-31"].sourceTitle,
    officialSourceUrl: sources["news-patient-portal-2026-03-31"].sourceUrl,
    verifiedDate: VERIFIED_AT,
    imageStatus: "official article image available",
    imageRightsStatus: "use official image only with rights clearance",
    publicationStatus: "published by official source",
  }, { sourceRef: "news-patient-portal-2026-03-31" }),
];

export const news = publicList(newsRecords);

const eventRecords = [
  record("patientenforum-prostataerkrankungen-2026-07-28", {
    date: "28. Jul 2026",
    time: "18:00-19:30",
    title: "Patientenforum „Prostataerkrankungen“",
    teaser: "Moderne Prostata-Therapie im Fokus.",
    category: "Patientenforum",
    officialSourceTitle: "Veranstaltungen - Klinikum Landkreis Erding",
    officialSourceUrl: sources["official-events"].sourceUrl,
    verifiedDate: VERIFIED_AT,
  }, { sourceRef: "official-events" }),
  record("patientenforum-harnwegsinfektion-2026-07-29", {
    date: "29. Jul 2026",
    time: "16:30-17:30",
    title: "Patientenforum „Behandlung von Harnwegsinfektion und Blasenentzündung“",
    teaser: "Überblick über Ursachen, Warnzeichen, Diagnostik und Therapieformen.",
    category: "Patientenforum",
    officialSourceTitle: "Veranstaltungen - Klinikum Landkreis Erding",
    officialSourceUrl: sources["official-events"].sourceUrl,
    verifiedDate: VERIFIED_AT,
  }, { sourceRef: "official-events" }),
  record("patientenforum-blasenschwaeche-frauen-2026-08-04", {
    date: "04. Aug 2026",
    time: "16:30-17:30",
    title: "Patientenforum „Therapie bei Blasenschwäche und Blasensenkung - was Frauen wissen sollten“",
    teaser: "Informationen zu Harninkontinenz und Blasensenkung.",
    category: "Patientenforum",
    officialSourceTitle: "Veranstaltungen - Klinikum Landkreis Erding",
    officialSourceUrl: sources["official-events"].sourceUrl,
    verifiedDate: VERIFIED_AT,
  }, { sourceRef: "official-events" }),
  record("infoabend-werdende-eltern-2026-08-05", {
    date: "05. Aug 2026",
    time: "laut Veranstaltungskalender",
    title: "Informationsabend für werdende Eltern",
    teaser:
      "Informationen zur Geburtshilfe mit Kreißsaal und Entbindungsstation; regelmäßig am ersten Mittwoch im Monat.",
    category: "Geburt",
    officialSourceTitle: "Veranstaltungen - Klinikum Landkreis Erding",
    officialSourceUrl: sources["official-events"].sourceUrl,
    verifiedDate: VERIFIED_AT,
  }, { sourceRef: "official-events" }),
  record("patientenforum-prostatakrebs-robotik-2026-08-20", {
    date: "20. Aug 2026",
    time: "16:30-17:30",
    title: "Patientenforum „Prostatakrebs: Schonende Operation mit Hilfe roboter-unterstützter Chirurgie“",
    teaser: "Informationen zu Diagnostik und individuell abgestimmter Therapie bei Prostatakrebs.",
    category: "Patientenforum",
    officialSourceTitle: "Veranstaltungen - Klinikum Landkreis Erding",
    officialSourceUrl: sources["official-events"].sourceUrl,
    verifiedDate: VERIFIED_AT,
  }, { sourceRef: "official-events" }),
];

export const events = publicList(eventRecords);

const legalRecords = [
  record("impressum", {
    title: "Impressum",
    teaser: "Pflichtangaben zum Klinikum Landkreis Erding.",
    body: [
      "Klinikum Landkreis Erding",
      "Regiebetrieb des Landkreises Erding",
      "Bajuwarenstraße 5, 85435 Erding",
      "Tel. 08122 / 59-0",
      "Fax 08122 / 59-36005",
      "Steuernummer 114/114/50068",
      "Krankenhausdirektorin Sabine Wahl (kommissarisch)",
      "Ärztlicher Direktor PD Dr. med. Lorenz Bott-Flügel",
      "Pflegedirektorin Michaela Zylka",
      "Beauftragter für Medizinproduktesicherheit: Andreas Buttler, medizinproduktesicherheit@klinikum-erding.de",
      "Datenschutzverantwortliche: Sabine Wahl, info@klinikum-erding.de",
      "Beauftragte für Datenschutz: Regina Salten-Wandinger, regina.salten@klinikum-erding.de",
      "Alle Chefärzte und ärztlichen Leiter sind bei der Bayerischen Landesärztekammer, Mühlbaurstraße 16, 81677 München gemeldet.",
    ],
  }, { sourceRef: "official-impressum" }),
  record("datenschutz", {
    title: "Datenschutz",
    teaser: "Hinweise zur Verarbeitung personenbezogener Daten im Online-Angebot.",
    body: [
      "Verantwortlich ist das Klinikum Landkreis Erding, Regiebetrieb des Landkreises Erding, Bajuwarenstraße 5, 85435 Erding.",
      "Kontakt zu Datenschutzfragen: Regina Salten-Wandinger, regina.salten@klinikum-erding.de.",
      "Beim Aufruf der Seiten können technisch erforderliche Zugriffsdaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, angeforderte Adresse, Browserdaten und übertragene Datenmenge.",
      "Diese Daten dienen der sicheren Bereitstellung, Fehleranalyse und Abwehr missbräuchlicher Zugriffe. Rechtsgrundlage ist regelmäßig Art. 6 Abs. 1 lit. f DSGVO.",
      "Das Angebot nutzt lokale Schriftstapel und lädt keine externen Schriftdateien.",
      "Es gibt derzeit keine eigenen Kontaktformulare, keine eingebetteten Karten, keine eingebetteten Videos und keinen Analysecode.",
      "Externe Links führen unter anderem zum Karriereportal und zu Mein-Krankenhaus.Digital. Für dortige Verarbeitungen gelten die Datenschutzhinweise des jeweiligen Anbieters.",
      "Betroffene Personen haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Beschwerde bei einer Aufsichtsbehörde.",
      "Diese Hinweise werden angepasst, wenn neue Dienste eingebunden oder Verarbeitungen verändert werden.",
    ],
    productionReady: true,
  }, { sourceRef: "official-privacy", privacyPlaceholder: false }),
  record("barrierefreiheit", {
    title: "Barrierefreiheit",
    teaser: "Erklärung zur Barrierefreiheit für das digitale Angebot.",
    body: [
      "Das Klinikum Landkreis Erding arbeitet daran, digitale Informationen möglichst gut zugänglich zu machen.",
      "Die Seiten sind responsiv angelegt, verwenden semantische Bereiche, sichtbare Tastaturfokusse, Skip-Link, ARIA-Labels für Suche und Menü sowie eine Alternative für reduzierte Bewegung.",
      "Bekannte Einschränkungen können externe PDF-Dokumente, fremde Portale, Nutzungsrechte für Bilder und WebGL-Animationen betreffen. Bei aktivierter reduzierter Bewegung wird die Animation deutlich zurückgenommen.",
      "Rückmeldungen zur Zugänglichkeit können über die Zentrale des Klinikums eingereicht werden: 08122 59-0 oder info@klinikum-erding.de.",
      "Die Erklärung wird fortgeschrieben, sobald weitere Prüfergebnisse oder technische Änderungen vorliegen.",
    ],
  }, { sourceRef: "official-impressum" }),
];

export const legalPages = publicMap(legalRecords);

export const imageSlots = [
  {
    id: "hero-hospital-exterior",
    subject: "Klinikum Erding Außenansicht mit klar erkennbarem Haupteingang",
    composition: "Querformat, ruhige Tageslichtsituation, keine inszenierten Personen",
    placement: "Startseite, Standort Erding, Kontakt & Anfahrt",
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
    subject: "Authentische Teams aus Pflege, Medizin und Aufnahme mit Fotorechten",
    composition: "Dokumentarisch, keine generierten Mitarbeitenden",
    placement: "Pflege, Karriere, Klinikum",
    resolution: "min. 2000 x 1400",
  },
  {
    id: "birth-family",
    subject: "Geburtshilfe-Umfeld ohne identifizierbare Patientendaten",
    composition: "Warm, medizinisch glaubwürdig, neutral",
    placement: "Frauenklinik, Veranstaltungen, Familienbereich",
    resolution: "min. 2000 x 1400",
  },
];

export const routeInventory = [
  ["/", "Startseite"],
  ["/aktuelles", "Aktuelles"],
  ["/veranstaltungen", "Veranstaltungen"],
  ["/patienten-besucher", "Patienten & Besucher"],
  ["/notfall", "Notfall"],
  ["/medizin-zentren", "Medizin & Zentren"],
  ["/pflege", "Pflege"],
  ["/karriere-bildung", "Karriere & Bildung"],
  ["/klinikum", "Klinikum"],
  ["/standorte", "Standorte"],
  ["/standorte/erding", "Standort Erding"],
  ["/standorte/dorfen", "Standort Dorfen"],
  ["/kontakt-anfahrt", "Kontakt & Anfahrt"],
  ["/digitalisierung", "Digitalisierung"],
  ["/qualitaet", "Qualität"],
  ["/zertifizierungen", "Zertifizierungen"],
  ["/krankenhausleitung", "Krankenhausleitung"],
  ["/leitbild", "Leitbild"],
  ["/geschichte", "Geschichte"],
  ["/impressum", "Impressum"],
  ["/datenschutz", "Datenschutz"],
  ["/barrierefreiheit", "Barrierefreiheit"],
].map(([path, title]) => ({ path, title }));

export const allInternalRoutes = [
  ...routeInventory.map((route) => route.path),
  ...medicalUnits.map((unit) => `/medizin-zentren/fachabteilungen/${unit.slug}`),
  ...centers.map((center) => `/medizin-zentren/zentren/${center.slug}`),
  ...patientServices.map((service) => `/patienten-besucher/${service.slug}`),
  ...emergencyTopics.map((topic) => `/notfall/${topic.slug}`),
  ...nursingTopics.map((topic) => `/pflege/${topic.slug}`),
  ...careerTopics.filter((topic) => !topic.externalHref).map((topic) => `/karriere-bildung/${topic.slug}`),
];

export const pageMeta = Object.fromEntries(
  routeInventory.map((route) => [
    route.path,
    {
      title: route.title,
      description: `${route.title} des Klinikums Landkreis Erding: Orientierung für Patientinnen, Besucher, Mitarbeitende und Interessierte.`,
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

contentModel.locations = locationRecords;
contentModel.medicalUnits = medicalUnitRecords;
contentModel.centers = centerRecords;
contentModel.patientServices = patientServiceRecords;
contentModel.news = newsRecords;
contentModel.events = eventRecords;
contentModel.legalPages = legalRecords;

export const editorialRecords = [
  contentModel.site,
  ...locationRecords,
  ...medicalUnitRecords,
  ...centerRecords,
  ...patientServiceRecords,
  ...newsRecords,
  ...eventRecords,
  ...legalRecords,
];

export function reportMissingContent() {
  if (!import.meta.env.DEV) return;
  const missing = editorialRecords.flatMap((entry) => {
    const data = entry.publicContent;
    const titleMissing = "title" in data && !data.title;
    const teaserMissing = "teaser" in data && !data.teaser;
    return titleMissing || teaserMissing ? [entry.slug] : [];
  });
  if (missing.length) {
    console.info(`Klinikum content check: missing public fields for ${missing.join(", ")}`);
  }
}

export function bySlug(items, slug) {
  return items.find((item) => item.slug === slug);
}

export function sourceSummary(sourceRefs = []) {
  return sourceRefs.map((ref) => sources[ref]).filter(Boolean);
}
