import { motion } from "framer-motion";

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

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-20 md:py-28 bg-[#0D0D0D]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block">
            Hecha para comer
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-3">
            GALERÍA DE <span className="text-[#FF6600]">COMIDA</span>
          </h2>
          <div className="w-16 h-1 bg-[#FF6600] mx-auto" />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ gridAutoRows: "220px" }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              data-testid={`gallery-item-${i}`}
              className={`gallery-item overflow-hidden relative group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-img w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#FF6600]/0 group-hover:bg-[#FF6600]/10 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-heading text-sm text-white tracking-widest bg-black/60 px-3 py-1">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
