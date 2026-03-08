import "./App.css";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import MiniCart from "./components/MiniCart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Menu from "./components/Menu";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import OrderCTA from "./components/OrderCTA";
import Location from "./components/Location";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <CartProvider>
      <div className="App bg-[#0D0D0D] min-h-screen font-body">
        <Navbar />
        <Cart />
        <MiniCart />
        <Hero />
        <MarqueeStrip />
        <Menu />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <OrderCTA />
        <Location />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </CartProvider>
  );
}

export default App;
