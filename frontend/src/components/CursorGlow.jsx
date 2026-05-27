import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot — snappy
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40 });

  // Ring follower — laggy
  const ringX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 18 });

  // Outer halo — even laggier
  const haloX = useSpring(rawX, { stiffness: 60, damping: 15 });
  const haloY = useSpring(rawY, { stiffness: 60, damping: 15 });

  useEffect(() => {
    // Only show on devices with a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
      setVisible(true);
    } else {
      return;
    }

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onEnterInteractive = (e) => {
      if (
        e.target.closest("a, button, [role=button], input, textarea, select, label")
      ) {
        setHovered(true);
      }
    };
    const onLeaveInteractive = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnterInteractive);
    document.addEventListener("mouseout", onLeaveInteractive);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnterInteractive);
      document.removeEventListener("mouseout", onLeaveInteractive);
    };
  }, [rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Outer halo — very laggy, ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99996] rounded-full"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 80 : 60,
          height: hovered ? 80 : 60,
          background: "radial-gradient(circle, rgba(255,102,0,0.12) 0%, transparent 70%)",
          transition: "width 0.3s, height 0.3s",
        }}
      />

      {/* Ring follower — medium lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          border: `1.5px solid rgba(255, 102, 0, ${hovered ? 0.8 : 0.45})`,
          boxShadow: hovered
            ? "0 0 14px rgba(255,102,0,0.5), inset 0 0 8px rgba(255,102,0,0.1)"
            : "0 0 6px rgba(255,102,0,0.2)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, box-shadow 0.25s",
          scale: clicked ? 0.7 : 1,
        }}
        animate={{ scale: clicked ? 0.7 : 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Core dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 6 : 5,
          height: hovered ? 6 : 5,
          backgroundColor: "#FF6600",
          boxShadow: "0 0 8px #FF6600, 0 0 16px rgba(255,102,0,0.5)",
          transition: "width 0.2s, height 0.2s",
        }}
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
