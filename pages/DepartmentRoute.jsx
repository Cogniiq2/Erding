import { Navigate, useParams } from "react-router-dom";
import { getDepartment } from "../content/departments.js";
import DeptIntro from "../templates/DeptIntro.jsx";
import LeistungsSpektrum from "../templates/LeistungsSpektrum.jsx";
import TeamPage from "../templates/TeamPage.jsx";
import KontaktSprechstunden from "../templates/KontaktSprechstunden.jsx";

const templates = {
  intro: DeptIntro,
  spektrum: LeistungsSpektrum,
  team: TeamPage,
  kontakt: KontaktSprechstunden,
};

export default function DepartmentRoute({ view = "intro" }) {
  const { slug } = useParams();
  const department = getDepartment(slug);
  const Template = templates[view] || DeptIntro;

  if (!department) return <Navigate to="/behandlungsangebot" replace />;
  return <Template department={department} />;
}
