import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { IntroProvider } from "./context/IntroContext";
import Home from "./pages/Home";
import IntroScreen from "./components/IntroScreen";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSeoRoute } from "./hooks/useSeoRoute";

const Terminos = lazy(() => import("./pages/Terminos"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

// Must render inside BrowserRouter to access the current location
function SeoRoute() {
  useSeoRoute();
  return null;
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
    <CartProvider>
    <IntroProvider value={revealed || !introVisible}>
      {introVisible && (
        <IntroScreen
          onReveal={() => setRevealed(true)}
          onComplete={() => setIntroVisible(false)}
        />
      )}
      <div className="App bg-[#0D0D0D] min-h-screen font-body grain-overlay">
        <BrowserRouter>
          <SeoRoute />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </div>
    </IntroProvider>
    </CartProvider>
    </MotionConfig>
  );
}

export default App;
