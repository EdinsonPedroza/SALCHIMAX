import { motion } from "framer-motion";
import { Leaf, Trophy, DollarSign, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Ingredientes Frescos",
    desc: "Usamos solo ingredientes de la más alta calidad, frescos cada día para garantizar el mejor sabor.",
  },
  {
    icon: Trophy,
    title: "Porciones Épicas",
    desc: "Porciones generosas que te dejarán satisfecho. Aquí no hay pequeñas porciones.",
  },
  {
    icon: DollarSign,
    title: "Precios Accesibles",
    desc: "La mejor comida rápida de Palmira a precios que todos pueden disfrutar.",
  },
  {
    icon: Users,
    title: "Ambiente Familiar",
    desc: "Un lugar acogedor donde toda la familia y los amigos pueden disfrutar juntos.",
  },
  {
    icon: Zap,
    title: "Pedidos Rápidos",
    desc: "Tu pedido listo en tiempo récord. Domicilio o para recoger — siempre rápido.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="py-20 md:py-28 bg-[#121212] relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(255,102,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block">
            Nuestra diferencia
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-3">
            ¿POR QUÉ ELEGIR <span className="text-[#FF6600]">SALCHIMAX</span>?
          </h2>
          <div className="w-16 h-1 bg-[#FF6600] mx-auto" />
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`feature-card-${i}`}
                className="bg-[#171717] border border-white/5 p-6 text-center hover:border-[#FF6600]/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center group-hover:bg-[#FF6600]/20 transition-colors duration-300">
                    <Icon size={26} className="text-[#FF6600]" />
                  </div>
                </div>
                <h3 className="font-heading text-xl text-white mb-2 tracking-wide">{feat.title}</h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 border-t border-white/10 pt-12"
        >
          {[
            { num: "5.0★", label: "En Google Maps" },
            { num: "100%", label: "Ingredientes frescos" },
            { num: "5PM", label: "Abrimos desde" },
          ].map((stat, i) => (
            <div key={i} className="text-center" data-testid={`stat-${i}`}>
              <div className="font-heading text-4xl md:text-5xl text-[#FF6600] mb-1">{stat.num}</div>
              <div className="font-body text-xs md:text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
