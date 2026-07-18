import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout.jsx";

const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const MedicalIndexPage = lazy(() => import("../pages/MedicalIndexPage.jsx"));
const MedicalUnitPage = lazy(() => import("../pages/MedicalUnitPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));

const page = (name) => lazy(() => import("../pages/StandardPages.jsx").then((module) => ({ default: module[name] })));

const NewsPage = page("NewsPage");
const EventsPage = page("EventsPage");
const PatientsPage = page("PatientsPage");
const PatientServicePage = page("PatientServicePage");
const EmergencyPage = page("EmergencyPage");
const EmergencyTopicPage = page("EmergencyTopicPage");
const NursingPage = page("NursingPage");
const NursingTopicPage = page("NursingTopicPage");
const CareerPage = page("CareerPage");
const CareerTopicPage = page("CareerTopicPage");
const KlinikumPage = page("KlinikumPage");
const LocationsPage = page("LocationsPage");
const LocationPage = page("LocationPage");
const ContactPage = page("ContactPage");
const DigitalPage = page("DigitalPage");
const QualityPage = page("QualityPage");
const CertificatesPage = page("CertificatesPage");
const LeadershipPage = page("LeadershipPage");
const MissionPage = page("MissionPage");
const HistoryPage = page("HistoryPage");
const LegalPage = lazy(() => import("../pages/StandardPages.jsx").then((module) => ({ default: module.LegalPage })));

function Fallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/aktuelles" element={<NewsPage />} />
          <Route path="/veranstaltungen" element={<EventsPage />} />
          <Route path="/patienten-besucher" element={<PatientsPage />} />
          <Route path="/patienten-besucher/:slug" element={<PatientServicePage />} />
          <Route path="/notfall" element={<EmergencyPage />} />
          <Route path="/notfall/:slug" element={<EmergencyTopicPage />} />
          <Route path="/im-notfall" element={<Navigate to="/notfall" replace />} />
          <Route path="/im-notfall/:slug" element={<Navigate to="/notfall" replace />} />
          <Route path="/medizin-zentren" element={<MedicalIndexPage />} />
          <Route path="/medizin-zentren/fachabteilungen/:slug" element={<MedicalUnitPage type="department" />} />
          <Route path="/medizin-zentren/zentren/:slug" element={<MedicalUnitPage type="center" />} />
          <Route path="/pflege" element={<NursingPage />} />
          <Route path="/pflege/:slug" element={<NursingTopicPage />} />
          <Route path="/karriere-bildung" element={<CareerPage />} />
          <Route path="/karriere-bildung/:slug" element={<CareerTopicPage />} />
          <Route path="/klinikum" element={<KlinikumPage />} />
          <Route path="/ueber-das-klinikum" element={<Navigate to="/klinikum" replace />} />
          <Route path="/standorte" element={<LocationsPage />} />
          <Route path="/standorte/:slug" element={<LocationPage />} />
          <Route path="/kontakt-anfahrt" element={<ContactPage />} />
          <Route path="/digitalisierung" element={<DigitalPage />} />
          <Route path="/qualitaet" element={<QualityPage />} />
          <Route path="/zertifizierungen" element={<CertificatesPage />} />
          <Route path="/krankenhausleitung" element={<LeadershipPage />} />
          <Route path="/leitbild" element={<MissionPage />} />
          <Route path="/geschichte" element={<HistoryPage />} />
          <Route path="/impressum" element={<LegalPage kind="impressum" />} />
          <Route path="/datenschutz" element={<LegalPage kind="datenschutz" />} />
          <Route path="/barrierefreiheit" element={<LegalPage kind="barrierefreiheit" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
