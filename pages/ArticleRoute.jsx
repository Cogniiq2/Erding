import { Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { getArticle } from "../content/news.js";

export default function ArticleRoute() {
  const { slug } = useParams();
  const article = getArticle(slug);
  if (!article) return <Navigate to="/aktuelles" replace />;
  return (
    <>
      <PageHero kicker="Aktuelles" title={article.title.de} lead={article.teaser.de} current={article.title.de} index="13" />
      <article className="site-section">
        <div className="wrap article-body">
          <p>{article.body}</p>
          <p>Diese Konzeptseite zeigt die redaktionelle Darstellung mit begrenzter Zeilenlänge, ruhiger Typografie und klarer Quellenlogik.</p>
        </div>
      </article>
    </>
  );
}
