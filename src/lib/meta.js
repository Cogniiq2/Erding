import { createElement, useEffect } from "react";
import { site } from "../content/siteContent.js";

const defaultDescription =
  "Klinikum Landkreis Erding: medizinisch präzise, regional verankerte Versorgung an den Standorten Erding und Dorfen.";

function setMeta(name, value, attr = "name") {
  if (!value) return;
  let node = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", value);
}

function setLink(rel, href) {
  if (!href) return;
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function usePageMeta({ title, description = defaultDescription, path = "/" }) {
  useEffect(() => {
    const fullTitle = title === site.name ? title : `${title} | ${site.name}`;
    const url = `${site.canonicalBase}${path}`;
    document.title = fullTitle;
    setMeta("description", description);
    setLink("canonical", url);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", site.name, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:card", "summary_large_image");
  }, [title, description, path]);
}

export function JsonLd({ data }) {
  return createElement("script", {
    type: "application/ld+json",
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}
