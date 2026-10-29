// Google Analytics 4 — reemplaza G-XXXXXXXXXX con el Measurement ID real.
// No se carga nada mientras el ID sea el placeholder. Al activarlo:
//  1. GA4 usa cookies: actualiza "Cookies y analítica" en src/pages/Privacidad.jsx.
//  2. La Content-Security-Policy de vercel.json bloquea a Google hasta que lo permitas:
//     agrega https://*.googletagmanager.com a script-src, y
//     https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com
//     a img-src y a connect-src.
const GA_ID = "G-XXXXXXXXXX";

export function loadGoogleAnalytics() {
  if (GA_ID.includes("XXXX")) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the `arguments` object itself: this can't become a rest-params arrow
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}
