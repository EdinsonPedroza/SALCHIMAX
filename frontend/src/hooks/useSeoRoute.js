import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://salchimax.com";

/**
 * Keeps SEO state in sync on SPA route changes:
 * - Updates <link rel="canonical"> to the current route.
 * - Sends a GA4 page_view (gtag only exists once a real Measurement ID is set).
 */
export function useSeoRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    const href = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: href,
        page_title: document.title,
      });
    }
  }, [pathname]);
}
