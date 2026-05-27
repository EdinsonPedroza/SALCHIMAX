import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1678110707289-ab14382a1625?w=600&q=80",
    alt: "Smash burger",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1762284513031-3d7ad15562bc?w=600&q=80",
    alt: "Salchipapas con queso y salchicha",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1771818708792-d671ae9b4b46?w=600&q=80",
    alt: "Papas con toppings",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?w=600&q=80",
    alt: "Alitas BBQ",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?w=600&q=80",
    alt: "Combo hamburguesa y papas",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1678110707493-8d05425137ac?w=600&q=80",
    alt: "Doble burger",
    span: "col-span-1 row-span-1",
  },
];

/* ── 3D tilt gallery item ── */
function GalleryItem({ img, index }) {
  const ref = useRef(null);
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

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    scale.set(1.04);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
    scale.set(1);
  };

  // Stagger from different directions for visual punch
  const directions = [
    { x: -60, y: 0 },
    { x: 0, y: -60 },
    { x: 60, y: 0 },
    { x: 60, y: 0 },
    { x: 0, y: 60 },
    { x: -60, y: 60 },
  ];
  const dir = directions[index] || { x: 0, y: 40 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.88 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-testid={`gallery-item-${index}`}
      className={`gallery-item overflow-hidden relative group ${img.span} cursor-none`}
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.alt}
        className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Orange gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Color tint sweep on hover */}
      <div className="absolute inset-0 bg-[#FF6600]/0 group-hover:bg-[#FF6600]/8 transition-all duration-500" />

      {/* Caption — slides up */}
      <motion.div
        className="absolute inset-0 flex items-end p-4"
        initial={false}
      >
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-heading text-sm text-white tracking-widest bg-[#FF6600]/90 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(20px)" }}
        >
          {img.alt}
        </motion.span>
      </motion.div>

      {/* Corner bracket — top left */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-all duration-300" />
      {/* Corner bracket — bottom right */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-all duration-300" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-20 md:py-28 bg-[#0D0D0D] relative overflow-hidden"
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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block"
          >
            Hecha para comer
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl md:text-6xl text-white mb-3"
            >
              GALERÍA DE{" "}
              <span className="text-[#FF6600]">COMIDA</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-1 bg-[#FF6600] mx-auto origin-left"
          />
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "220px" }}
        >
          {galleryImages.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
