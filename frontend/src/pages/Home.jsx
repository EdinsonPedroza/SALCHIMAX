import { lazy, Suspense } from "react";
import Cart from "../components/Cart";
import MiniCart from "../components/MiniCart";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Menu from "../components/Menu";
import Promos from "../components/Promos";
import WhatsAppFloat from "../components/WhatsAppFloat";

// Below-the-fold sections are code-split so the initial bundle stays lean.
// Location is the big win: it pulls leaflet + react-leaflet into its own chunk.
const WhyUs = lazy(() => import("../components/WhyUs"));
const Gallery = lazy(() => import("../components/Gallery"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const OrderCTA = lazy(() => import("../components/OrderCTA"));
const Location = lazy(() => import("../components/Location"));
const Footer = lazy(() => import("../components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <Cart />
      <MiniCart />
      <Hero />
      <MarqueeStrip />
      <Promos />
      <Menu />
      <Suspense fallback={null}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={null}>
        <Gallery />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <OrderCTA />
      </Suspense>
      <Suspense fallback={null}>
        <Location />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppFloat />
    </>
  );
}
