import { useState } from "react";
import { useReducedMotion } from "framer-motion";

// Pointer-driven 3D (tilt, parallax) needs a real mouse: on touch there is no
// hover, so it would only cost layer promotion. Also honours reduced motion.
export function usePointerFx() {
  const reduced = useReducedMotion();
  const [fine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  return fine && !reduced;
}
