import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import IntroScreen from "./components/IntroScreen";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Terminos = lazy(() => import("./pages/Terminos"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <CartProvider>
      {introVisible && (
        <IntroScreen onComplete={() => setIntroVisible(false)} />
      )}
      <div className="App bg-[#0D0D0D] min-h-screen font-body grain-overlay">
        <BrowserRouter>
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
    </CartProvider>
  );
}

export default App;
