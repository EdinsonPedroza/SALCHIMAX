import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Both scripts are served by Vercel itself (/_vercel/...), so they only exist on a Vercel
// deployment. Anywhere else (salchimax.com on Cloudflare) the request would just fail.
const ON_VERCEL =
  typeof window !== "undefined" && window.location.hostname.endsWith(".vercel.app");

export default function VercelMetrics() {
  if (!ON_VERCEL) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
