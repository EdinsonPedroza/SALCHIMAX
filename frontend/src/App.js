import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import IntroScreen from "./components/IntroScreen";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSeoRoute } from "./hooks/useSeoRoute";

const Terminos = lazy(() => import("./pages/Terminos"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Pqr = lazy(() => import("./pages/Pqr"));

// Must render inside BrowserRouter to access the current location
function SeoRoute() {
  useSeoRoute();
  return null;
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
    <CartProvider>
      {introVisible && (
        <IntroScreen onComplete={() => setIntroVisible(false)} />
      )}
      <div className="App bg-[#0D0D0D] min-h-screen font-body">
        <BrowserRouter>
          <SeoRoute />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/pqr" element={<Pqr />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </div>
    </CartProvider>
    </MotionConfig>
  );
}

export default App;
