import ContactCard from "../components/ContactCard.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBoard from "../components/ScheduleBoard.jsx";

export default function KontaktSprechstunden({ department }) {
  return (
    <>
      <PageHero
        kicker="Kontakt & Sprechstunden"
        title={department.name.de}
        lead="Telefonnummern und Zeiten stehen in der mono gesetzten Directory-Board-Stimme."
        current={`${department.name.de} Kontakt`}
        index="06"
      />
      <section className="site-section">
        <div className="wrap grid-2">
          <ContactCard
            title={department.emergency ? "Akuter Notfall" : "Sekretariat"}
            phone={department.kontakt.phone}
            email={department.kontakt.email}
            emergency={department.emergency}
          >
            {department.emergency ? <p>Bei Lebensgefahr sofort 112 anrufen. Für nicht lebensbedrohliche Fälle: 116117.</p> : null}
          </ContactCard>
          <ScheduleBoard items={department.sprechstunden} />
        </div>
      </section>
    </>
  );
}
