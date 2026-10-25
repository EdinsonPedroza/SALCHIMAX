import { motion } from "framer-motion";
import Reveal3D from "./fx/Reveal3D";
import Tilt3D from "./fx/Tilt3D";
import FlipText from "./fx/FlipText";

const galleryImages = [
  {
    src: "/images/maxima.webp",
    alt: "Salchipapa La Máxima",
    span: "col-span-1 row-span-2",
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
  },
  {
    src: "/images/nachos-texmex.webp",
    alt: "Nachos Tex-Mex",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/alitas-24.webp",
    alt: "Alitas BBQ",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/superburro.webp",
    alt: "El Super Burro",
    span: "col-span-1 row-span-1",
  },
];

/* Each tile stands up from a different side, then tilts with the cursor. */
const ENTRANCES = [
  { rotateY: -70, x: -80, z: -160 },
  { rotateX: -60, y: -70, z: -160 },
  { rotateY: 70, x: 80, z: -160 },
  { rotateY: 70, x: 80, z: -160 },
  { rotateX: 60, y: 70, z: -160 },
  { rotateY: -70, x: -80, z: -160 },
];

function GalleryItem({ img, index }) {
  return (
    <Reveal3D
      from={ENTRANCES[index] ?? { rotateX: 55, y: 50, z: -140 }}
      delay={index * 0.1}
      duration={0.95}
      origin="50% 50%"
      data-testid={`gallery-item-${index}`}
      className={img.span}
    >
      {/* overflow-hidden lives on the inner photo box only: on the tilting
          element it would flatten the 3D context. */}
      <Tilt3D max={9} lift={22} className="gallery-item group h-full w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />

          {/* Orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Color tint sweep on hover */}
          <div className="absolute inset-0 bg-[#FF6600]/0 group-hover:bg-[#FF6600]/8 transition-all duration-500" />
        </div>

        {/* Caption — floats above the photo while hovered */}
        <div className="preserve-3d pointer-events-none absolute inset-0 flex items-end p-4">
          <span className="depth-lg font-heading text-sm text-white tracking-widest bg-[#FF6600]/90 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {img.alt}
          </span>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF6600]/0 group-hover:border-[#FF6600]/80 transition-all duration-300" />
      </Tilt3D>
    </Reveal3D>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-20 md:py-28 bg-[#0D0D0D] relative overflow-hidden"
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
          <FlipText
            className="font-heading text-5xl md:text-6xl text-white mb-3"
            parts={["GALERÍA DE", { text: "COMIDA", className: "text-[#FF6600]" }]}
          />
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
