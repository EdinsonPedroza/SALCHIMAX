import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import IntroScreen from "./components/IntroScreen";
import VercelMetrics from "./components/VercelMetrics";
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
  // "show" → curtains closed, "exit" → curtains opening, "done" → gone.
  // The intro belongs to the home page: opening /terminos or /pqr straight from a
  // link goes directly to the content.
  const [intro, setIntro] = useState(() =>
    typeof window !== "undefined" && window.location.pathname === "/" ? "show" : "done"
  );

  return (
    <MotionConfig reducedMotion="user">
    <CartProvider>
      {intro !== "done" && (
        <IntroScreen
          onExitStart={() => setIntro((s) => (s === "show" ? "exit" : s))}
          onComplete={() => setIntro("done")}
        />
      )}
      <div className="App bg-[#0D0D0D] min-h-screen font-body">
        <BrowserRouter>
          <SeoRoute />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home heroReady={intro !== "show"} />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/pqr" element={<Pqr />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <VercelMetrics />
      </div>
    </CartProvider>
    </MotionConfig>
  );
}

export default App;
