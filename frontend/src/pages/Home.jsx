import Cart from "../components/Cart";
import MiniCart from "../components/MiniCart";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Menu from "../components/Menu";
import Promos from "../components/Promos";
import WhyUs from "../components/WhyUs";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import OrderCTA from "../components/OrderCTA";
import Location from "../components/Location";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

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
      <WhyUs />
      <Gallery />
      <Testimonials />
      <OrderCTA />
      <Location />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
