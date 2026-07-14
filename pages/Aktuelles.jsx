import { useState } from "react";
import EventCard from "../components/EventCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import PageHero from "../components/PageHero.jsx";
import { events, news } from "../content/news.js";

export default function Aktuelles() {
  const [tab, setTab] = useState("news");
  return (
    <>
      <PageHero
        kicker="Aktuelles"
        title="Nachrichten und Termine aus dem Klinikum"
        lead="Editorial lesbar, klar datiert und ohne Überinszenierung."
        current="Aktuelles"
        index="12"
      />
      <section className="site-section">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Aktuelles">
            <button type="button" role="tab" aria-selected={tab === "news"} className={tab === "news" ? "on" : ""} onClick={() => setTab("news")}>News</button>
            <button type="button" role="tab" aria-selected={tab === "events"} className={tab === "events" ? "on" : ""} onClick={() => setTab("events")}>Events</button>
          </div>
          <div className="grid-3">
            {tab === "news" ? news.map((item) => <NewsCard item={item} key={item.slug} />) : events.map((item) => <EventCard item={item} key={item.slug} />)}
          </div>
        </div>
      </section>
    </>
  );
}
