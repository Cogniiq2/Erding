const baseContact = {
  phone: "08122 59-0",
  email: "info@klinikum-erding.de",
};

const baseHours = [
  { name: { de: "Ambulanz nach Vereinbarung", en: "Clinic by appointment" }, day: { de: "Mo-Fr", en: "Mon-Fri" }, time: "08:00-15:30" },
  { name: { de: "Sekretariat", en: "Office" }, day: { de: "Mo-Fr", en: "Mon-Fri" }, time: "08:00-12:00" },
];

function dept(data) {
  return {
    spektrum: [
      { title: "Diagnostik", desc: "Strukturierte Abklärung mit interdisziplinären Konsilen und moderner Bildgebung." },
      { title: "Therapie", desc: "Konservative, interventionelle und operative Behandlungswege werden gemeinsam geplant." },
      { title: "Nachsorge", desc: "Entlassmanagement, Sprechstunden und Kooperationspartner sichern die Weiterbehandlung." },
    ],
    team: [
      { name: "Chefärztliches Team", role: { de: "Leitung", en: "Clinical leadership" } },
      { name: "Pflege- und Funktionsdienst", role: { de: "Patientennahe Versorgung", en: "Care team" } },
    ],
    pflege: {
      de: "Die Pflege arbeitet eng mit Ärztinnen, Therapie, Sozialdienst und Entlassmanagement zusammen.",
      en: "Nursing works closely with physicians, therapy, social services and discharge management.",
    },
    kontakt: baseContact,
    sprechstunden: baseHours,
    zentren: [],
    external: [],
    ...data,
  };
}

export const departments = [
  dept({
    slug: "notaufnahme",
    emergency: true,
    name: { de: "Notaufnahme", en: "Emergency department" },
    teaser: { de: "24/7 für akute Notfälle", en: "24/7 acute emergency care" },
    intro: {
      de: "Die Zentrale Notaufnahme ist rund um die Uhr für akute Erkrankungen und Verletzungen erreichbar. Lebensbedrohliche Symptome gehören sofort zum Rettungsdienst über 112.",
      en: "The emergency department is available around the clock for acute illness and injury. Life-threatening symptoms require emergency services via 112.",
    },
    spektrum: [
      { title: "Ersteinschätzung", desc: "Strukturierte Triage mit klarer Priorisierung nach Dringlichkeit." },
      { title: "Akutdiagnostik", desc: "Labor, Bildgebung, EKG und interdisziplinäre Konsile werden gebündelt." },
      { title: "Weiterversorgung", desc: "Stationäre Aufnahme, ambulante Empfehlung oder Weiterleitung an 116117." },
    ],
    kontakt: { phone: "112", email: "info@klinikum-erding.de" },
    sprechstunden: [{ name: { de: "Notaufnahme", en: "Emergency" }, day: { de: "täglich", en: "daily" }, time: "24/7" }],
  }),
  dept({
    slug: "kardiologie-pneumologie",
    name: { de: "Kardiologie & Pneumologie", en: "Cardiology & pulmonology" },
    teaser: { de: "Herz, Lunge und Herzkatheterlabor", en: "Heart, lungs and cath lab" },
    intro: {
      de: "Die Abteilung behandelt Herz- und Lungenerkrankungen mit internistischer Diagnostik, Funktionslaboren und dem Herzkatheter.",
      en: "The department treats heart and lung disease with internal diagnostics, function labs and catheter procedures.",
    },
    spektrum: [
      { title: "Herzkatheter", desc: "Invasive Diagnostik und Therapie bei koronaren Herzerkrankungen." },
      { title: "Pneumologie", desc: "Abklärung von Atemnot, chronischem Husten und Lungenerkrankungen." },
      { title: "Intensivnahe Medizin", desc: "Überwachung und Behandlung komplexer internistischer Krankheitsbilder." },
    ],
    zentren: ["herzkatheter", "hypertoniezentrum", "pneumozentrum"],
  }),
  dept({
    slug: "gastroenterologie-hepatologie",
    name: { de: "Gastroenterologie & Hepatologie", en: "Gastroenterology & hepatology" },
    teaser: { de: "Endoskopie, Leber und Verdauung", en: "Endoscopy, liver and digestion" },
    intro: {
      de: "Schwerpunkt sind Erkrankungen von Magen, Darm, Leber, Galle und Bauchspeicheldrüse inklusive moderner Endoskopie.",
      en: "The focus is on stomach, bowel, liver, bile duct and pancreatic disease including modern endoscopy.",
    },
    zentren: ["darmzentrum"],
  }),
  dept({
    slug: "innere-medizin-dorfen",
    name: { de: "Innere Medizin Dorfen", en: "Internal medicine Dorfen" },
    teaser: { de: "Internistische Versorgung am Standort Dorfen", en: "Internal care at Dorfen" },
    intro: {
      de: "Der Standort Dorfen bündelt Innere Medizin, Gastroenterologie und die Nähe zur Schmerztagesklinik.",
      en: "Dorfen brings together internal medicine, gastroenterology and access to pain therapy.",
    },
  }),
  dept({
    slug: "unfallchirurgie-orthopaedie",
    name: { de: "Unfallchirurgie & Orthopädie", en: "Trauma surgery & orthopedics" },
    teaser: { de: "Regionales Traumazentrum, Gelenke und Wirbelsäule", en: "Trauma center, joints and spine" },
    intro: {
      de: "Die Abteilung versorgt Verletzungen, Sportorthopädie, Endoprothetik, Schulter, Hand, Knie, Kindertraumatologie und Wirbelsäule.",
      en: "The department treats injuries, sports orthopedics, joint replacement, shoulder, hand, knee, pediatric trauma and spine.",
    },
    zentren: ["wirbelsaeulenzentrum"],
    external: [{ label: "Patientenportal Schulter-Sprechstunde", url: "https://mein-krankenhaus.digital" }],
  }),
  dept({
    slug: "allgemein-viszeral-thoraxchirurgie",
    name: { de: "Allgemein-, Viszeral- & Thoraxchirurgie", en: "General, visceral & thoracic surgery" },
    teaser: { de: "Robotik Dexter, Bauch, Thorax und Plastische Chirurgie", en: "Dexter robotics, abdomen, thorax and plastics" },
    intro: {
      de: "Das chirurgische Team verbindet klassische und minimalinvasive Verfahren mit robotischer Assistenz, Thoraxchirurgie und plastisch-ästhetischen Leistungen.",
      en: "The surgical team combines conventional and minimally invasive procedures with robotic assistance, thoracic surgery and plastic-aesthetic services.",
    },
    spektrum: [
      { title: "Robotik Dexter", desc: "Robotisch assistierte Eingriffe, darunter die 2026 berichtete Nebennierenentfernung." },
      { title: "Viszeralchirurgie", desc: "Operationen an Bauchorganen, Darm, Galle und Hernien." },
      { title: "Thoraxchirurgie", desc: "Eingriffe an Lunge und Brustkorb in enger pneumologischer Abstimmung." },
    ],
    zentren: ["darmzentrum", "ambulantes-op-zentrum"],
  }),
  dept({
    slug: "gefaesschirurgie",
    name: { de: "Gefäßchirurgie", en: "Vascular surgery" },
    teaser: { de: "Arterien, Venen und diabetischer Fuß", en: "Arteries, veins and diabetic foot" },
    intro: {
      de: "Gefäßerkrankungen werden chirurgisch, interventionell und konservativ behandelt, besonders eng bei diabetischem Fuß.",
      en: "Vascular disease is treated surgically, interventionally and conservatively, with close coordination for diabetic foot.",
    },
    zentren: ["gefaesszentrum"],
  }),
  dept({
    slug: "gynaekologie-geburtshilfe",
    highlight: true,
    name: { de: "Gynäkologie & Geburtshilfe", en: "Gynecology & obstetrics" },
    teaser: { de: "Frauenklinik, Geburtshilfe und Brustzentrum", en: "Women’s clinic, obstetrics and breast center" },
    intro: {
      de: "Die Frauenklinik verbindet Geburtshilfe, operative Gynäkologie, Brustzentrum, Urogynäkologie, Dysplasie und Endometriose.",
      en: "The women’s clinic combines obstetrics, gynecologic surgery, breast center, urogynecology, dysplasia and endometriosis.",
    },
    team: [
      { name: "Irene Brotsack", role: { de: "Komm. Leitung", en: "Acting lead" } },
      { name: "Dr. Vukasin Radojicic", role: { de: "Oberärztin/Oberarzt Laparoskopie & Endometriose", en: "Laparoscopy & endometriosis" } },
      { name: "Dr. Maximilian Sander", role: { de: "Urogynäkologie", en: "Urogynecology" } },
      { name: "Dr. Simone Greilich", role: { de: "Gynäkologie", en: "Gynecology" } },
      { name: "Eveline Clocuh", role: { de: "Dysplasie", en: "Dysplasia" } },
      { name: "Barbara Kögel", role: { de: "Pflegeleitung", en: "Nursing lead" } },
      { name: "Cathleen Föhring", role: { de: "Teamleitung", en: "Team lead" } },
    ],
    sprechstunden: [
      { name: { de: "Allgemein", en: "General" }, day: { de: "Do", en: "Thu" }, time: "08:30-12:00" },
      { name: { de: "Brust", en: "Breast" }, day: { de: "Di", en: "Tue" }, time: "09:00-13:00" },
      { name: { de: "Laparoskopie/Endometriose", en: "Laparoscopy/endometriosis" }, day: { de: "Di", en: "Tue" }, time: "10:00-13:00" },
      { name: { de: "Urogynäkologie", en: "Urogynecology" }, day: { de: "Fr", en: "Fri" }, time: "09:00-12:00" },
      { name: { de: "Vulva/Dysplasie", en: "Vulva/dysplasia" }, day: { de: "Mi", en: "Wed" }, time: "09:00-12:00" },
      { name: { de: "Geburtsplanung", en: "Birth planning" }, day: { de: "Di & Do", en: "Tue & Thu" }, time: "08:00-14:00" },
      { name: { de: "Wachstumskontrollen", en: "Growth checks" }, day: { de: "Mi", en: "Wed" }, time: "11:30-14:00" },
    ],
    kontakt: { phone: "08122 59-1648", email: "sekretariat.gynaekologie@klinikum-erding.de" },
    zentren: ["brustzentrum", "kontinenz-beckenboden-zentrum"],
    external: [{ label: "Babygalerie", url: "https://www.babygalerie24.de/erding-dorfen" }],
  }),
  dept({
    slug: "urologie",
    name: { de: "Urologie", en: "Urology" },
    teaser: { de: "Harnsteine, Prostata, Tumoren und Kinderurologie", en: "Stones, prostate, tumors and pediatric urology" },
    intro: {
      de: "Seit 2021 behandelt die Urologie Harnsteine, Prostataerkrankungen, Tumoren, männliche Inkontinenz und kinderurologische Fragen.",
      en: "Since 2021 urology treats urinary stones, prostate disease, tumors, male incontinence and pediatric urology.",
    },
    zentren: ["kontinenz-beckenboden-zentrum"],
  }),
  dept({
    slug: "geriatrie",
    name: { de: "Geriatrie", en: "Geriatrics" },
    teaser: { de: "Altersmedizin mit aktivierender Pflege", en: "Geriatric medicine with activating care" },
    intro: {
      de: "Die Geriatrie verbindet Akutmedizin, Therapie, Pflege und Entlassplanung für ältere Patientinnen und Patienten.",
      en: "Geriatrics combines acute medicine, therapy, nursing and discharge planning for older patients.",
    },
  }),
  dept({
    slug: "schmerztherapie-dorfen",
    name: { de: "Interdisziplinäre Schmerztherapie Dorfen", en: "Interdisciplinary pain therapy Dorfen" },
    teaser: { de: "Tagesklinik mit 12 Plätzen und stationärer Bereich", en: "Day clinic with 12 places and inpatient care" },
    intro: {
      de: "Die Schmerztherapie Dorfen begleitet chronische Schmerzen multimodal, tagesklinisch und stationär.",
      en: "Pain therapy in Dorfen treats chronic pain multimodally, as day-clinic and inpatient care.",
    },
  }),
  dept({
    slug: "anaesthesie-intensivmedizin",
    name: { de: "Anästhesie & Intensivmedizin", en: "Anesthesiology & intensive care" },
    teaser: { de: "OP-Sicherheit, Intensivstation und Schmerzmanagement", en: "OR safety, ICU and pain management" },
    intro: {
      de: "Anästhesie und Intensivmedizin sichern Operationen, Überwachung, Schmerztherapie und Notfallversorgung.",
      en: "Anesthesiology and intensive care secure surgeries, monitoring, pain management and emergency care.",
    },
  }),
  dept({
    slug: "radiologie-nuklearmedizin",
    name: { de: "Radiologie & Nuklearmedizin", en: "Radiology & nuclear medicine" },
    teaser: { de: "Bildgebung und nuklearmedizinische Diagnostik", en: "Imaging and nuclear medicine diagnostics" },
    intro: {
      de: "Radiologie und Nuklearmedizin liefern schnelle, präzise Diagnostik für ambulante und stationäre Behandlung.",
      en: "Radiology and nuclear medicine provide fast precise diagnostics for outpatient and inpatient care.",
    },
  }),
  dept({
    slug: "belegabteilungen",
    name: { de: "Belegabteilungen", en: "Affiliated departments" },
    teaser: { de: "HNO, Augenheilkunde und Neurologie", en: "ENT, ophthalmology and neurology" },
    intro: {
      de: "Belegabteilungen ergänzen das Spektrum unter anderem in HNO, Augenheilkunde und Neurologie.",
      en: "Affiliated departments extend the spectrum including ENT, ophthalmology and neurology.",
    },
  }),
];

export function getDepartment(slug) {
  return departments.find((department) => department.slug === slug);
}
