import { Navigate, useParams } from "react-router-dom";
import { getZentrum } from "../content/zentren.js";
import ZentrumPage from "../templates/ZentrumPage.jsx";

export default function ZentrumRoute() {
  const { slug } = useParams();
  const zentrum = getZentrum(slug);
  if (!zentrum) return <Navigate to="/zentren" replace />;
  return <ZentrumPage zentrum={zentrum} />;
}
