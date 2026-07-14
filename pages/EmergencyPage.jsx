import ContactCard from "../components/ContactCard.jsx";
import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        kicker="Notaufnahme"
        title="Akut richtig handeln"
        lead="Bei Lebensgefahr zählt keine Website: sofort 112 anrufen. Für dringende, nicht lebensbedrohliche Beschwerden hilft der ärztliche Bereitschaftsdienst 116117."
        tone="red"
        current="Notaufnahme"
        index="10"
      />
      <section className="site-section">
        <div className="wrap grid-2">
          <ContactCard title="Lebensbedrohlicher Notfall" phone="112" emergency>
            <p>Brustschmerz, Atemnot, Schlaganfallzeichen, Bewusstlosigkeit oder starke Blutung: Rettungsdienst rufen.</p>
          </ContactCard>
          <ContactCard title="Ärztlicher Bereitschaftsdienst" phone="116117">
            <p>Wenn es dringend ist, aber nicht lebensbedrohlich.</p>
          </ContactCard>
        </div>
      </section>
      <section className="site-section tight">
        <div className="wrap grid-4">
          {["Ruhe bewahren", "112 oder 116117 wählen", "Symptome klar nennen", "Dokumente mitbringen"].map((title, index) => (
            <SignageRail key={title} tone={index === 1 ? "red" : "teal"} label={`0${index + 1}`} title={title}>
              <p>{index === 1 ? "Farbkennzeichnung wird immer durch Warnsymbol und Text ergänzt." : "Kurze, eindeutige Schritte helfen Patientinnen, Patienten und Angehörigen."}</p>
            </SignageRail>
          ))}
        </div>
      </section>
    </>
  );
}
