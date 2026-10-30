import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal, useReveal } from "./Reveal";

const galleryImages = [
  {
    src: "/images/maxima.webp",
    alt: "Salchipapa La Máxima",
    span: "col-span-1 row-span-2",
    pos: "50% 72%",
  },
  {
    src: "/images/hamburguesa-especial.webp",
    alt: "Hamburguesa Especial",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/colombiana.webp",
    alt: "Salchipapa La Colombiana",
    span: "col-span-1 row-span-1",
    pos: "50% 85%",
  },
  {
    src: "/images/nachos.webp",
    alt: "Nachos Tex-Mex",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/alitas-12.webp",
    alt: "Alitas BBQ",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/superburro.webp",
    alt: "El Super Burro",
    span: "col-span-1 row-span-1",
  },
];

/* ── 3D tilt gallery item ── */
function GalleryItem({ img, index, tilt }) {
  const ref = useRef(null);
  const rect = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 350,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 350,
    damping: 28,
  });
  const scale = useSpring(1, { stiffness: 350, damping: 28 });

  // Measure once per hover: getBoundingClientRect() inside mousemove forces a
  // synchronous layout on every pointer event.
  const onMouseEnter = () => {
    rect.current = ref.current.getBoundingClientRect();
    scale.set(1.04);
  };
  const onMouseMove = (e) => {
    const r = rect.current;
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
    scale.set(1);
    rect.current = null;
  };

  // Photos are tossed onto the page, each leaning its own way. The entrance lives on the
  // outer wrapper because the tilt below owns `scale` on the inner one.
  const toss = useReveal("toss", { delay: (index % 3) * 0.1 });

  return (
    <motion.div {...toss} className={img.span}>
    <motion.div
      ref={ref}
      style={
        tilt
          ? { rotateX, rotateY, scale, transformStyle: "preserve-3d" }
          : undefined
      }
      onMouseEnter={tilt ? onMouseEnter : undefined}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
      data-testid={`gallery-item-${index}`}
      className="gallery-item overflow-hidden relative group h-full w-full"
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.alt}
        className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
        style={img.pos ? { objectPosition: img.pos } : undefined}
      />

      {/* Orange gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Color tint sweep on hover */}
      <div className="absolute inset-0 bg-[#FF6600]/0 group-hover:bg-[#FF6600]/8 transition-colors duration-500" />

      {/* Caption — fades in and settles from a slightly smaller size (the old one
          only moved when the cursor was exactly over the label itself).
          `scale` is the individual CSS property, so it doesn't replace the inline
          translateZ below. */}
      <div className="pointer-events-none absolute inset-0 flex items-end p-4">
        <span
          className="origin-bottom-left bg-[#FF6600]/90 px-3 py-1.5 font-heading text-sm tracking-widest text-white opacity-0 [scale:0.94] transition-[opacity,scale] duration-200 ease-out-strong group-hover:opacity-100 group-hover:[scale:1]"
          style={{ transform: "translateZ(20px)" }}
        >
          {img.alt}
        </span>
      </div>

      {/* Corner brackets: only the color changes */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-colors duration-300" />
    </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  // No hover on touch devices, so the 3D tilt only costs layer promotion there.
  const [tilt] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-8 md:py-10 bg-[#0D0D0D] relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient side glows */}
      <div
        className="absolute top-1/2 -left-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,102,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal as="span" variant="hop" className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block w-fit mx-auto">
            Hecha para comer
          </Reveal>
          <Reveal as="h2" variant="hop" delay={0.08} className="font-heading text-5xl md:text-6xl text-white mb-3 w-fit mx-auto">
            GALERÍA DE{" "}
            <span className="text-[#FF6600]">COMIDA</span>
          </Reveal>
          <Reveal variant="bar" delay={0.22} className="w-16 h-1 bg-[#FF6600] mx-auto" style={{ transformOrigin: "center" }} />
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "220px" }}
        >
          {galleryImages.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} tilt={tilt} />
          ))}
        </div>
      </div>
    </section>
  );
}
