import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./layout/SiteLayout.jsx";
import "./styles/tokens.css";
import "./styles/themes.css";
import "./styles/global.css";

const landingModules = import.meta.glob("./App.jsx");
const Landing = lazy(() => {
  const loadLanding = landingModules["./App.jsx"];
  return loadLanding ? loadLanding() : Promise.resolve({ default: LandingFallback });
});
const DepartmentIndex = lazy(() => import("./pages/DepartmentIndex.jsx"));
const DepartmentRoute = lazy(() => import("./pages/DepartmentRoute.jsx"));
const ZentrenIndex = lazy(() => import("./pages/ZentrenIndex.jsx"));
const ZentrumRoute = lazy(() => import("./pages/ZentrumRoute.jsx"));
const GynPage = lazy(() => import("./pages/GynPage.jsx"));
const BirthRegistration = lazy(() => import("./pages/BirthRegistration.jsx"));
const EmergencyPage = lazy(() => import("./pages/EmergencyPage.jsx"));
const PatientenBesucher = lazy(() => import("./pages/PatientenBesucher.jsx"));
const ServiceRoute = lazy(() => import("./pages/ServiceRoute.jsx"));
const Aktuelles = lazy(() => import("./pages/Aktuelles.jsx"));
const ArticleRoute = lazy(() => import("./pages/ArticleRoute.jsx"));
const Klinikum = lazy(() => import("./pages/Klinikum.jsx"));
const KontaktAnfahrt = lazy(() => import("./pages/KontaktAnfahrt.jsx"));
const LegalPage = lazy(() => import("./pages/LegalPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PorcelainFallback() {
  return (
    <div className="porcelain-fallback" role="status" aria-live="polite" aria-label="Seite wird geladen">
      <span className="fallback-dot" />
    </div>
  );
}

function LandingFallback() {
  return (
    <main className="missing-landing">
      <div className="wrap">
        <span className="mono">Klinikum Landkreis Erding</span>
        <h1>Konzeptseite bereit.</h1>
        <p>
          Die geschützte Landing-Datei wurde in dieser Laufzeit nicht gefunden. Die innere Website ist
          weiterhin vollständig erreichbar.
        </p>
        <a className="btn btn-primary" href="/behandlungsangebot">
          Behandlungsangebot öffnen
        </a>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PorcelainFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<SiteLayout />}>
            <Route path="/behandlungsangebot" element={<DepartmentIndex />} />
            <Route path="/behandlungsangebot/:slug" element={<DepartmentRoute view="intro" />} />
            <Route path="/behandlungsangebot/:slug/spektrum" element={<DepartmentRoute view="spektrum" />} />
            <Route path="/behandlungsangebot/:slug/team" element={<DepartmentRoute view="team" />} />
            <Route path="/behandlungsangebot/:slug/kontakt" element={<DepartmentRoute view="kontakt" />} />
            <Route path="/zentren" element={<ZentrenIndex />} />
            <Route path="/zentren/:slug" element={<ZentrumRoute />} />
            <Route path="/gynaekologie-geburtshilfe" element={<GynPage />} />
            <Route path="/gynaekologie-geburtshilfe/geburt-anmelden" element={<BirthRegistration />} />
            <Route path="/notaufnahme" element={<EmergencyPage />} />
            <Route path="/patienten-besucher" element={<PatientenBesucher />} />
            <Route path="/patienten-besucher/besuchszeiten" element={<ServiceRoute slugOverride="besuchszeiten" />} />
            <Route path="/patienten-besucher/:slug" element={<ServiceRoute />} />
            <Route path="/aktuelles" element={<Aktuelles />} />
            <Route path="/aktuelles/:slug" element={<ArticleRoute />} />
            <Route path="/klinikum" element={<Klinikum />} />
            <Route path="/kontakt-anfahrt" element={<KontaktAnfahrt />} />
            <Route path="/impressum" element={<LegalPage kind="impressum" />} />
            <Route path="/datenschutz" element={<LegalPage kind="datenschutz" />} />
            <Route path="/barrierefreiheit" element={<LegalPage kind="barrierefreiheit" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
