import { Navigate, useParams } from "react-router-dom";
import { getService } from "../content/services.js";
import ServicePage from "../templates/ServicePage.jsx";

export default function ServiceRoute({ slugOverride }) {
  const { slug } = useParams();
  const service = getService(slugOverride || slug);
  if (!service) return <Navigate to="/patienten-besucher" replace />;
  return <ServicePage service={service} />;
}
