import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { promos } from "../data/promos";

const WA_LINK = "https://wa.me/573177371695";
const EASE = [0.23, 1, 0.32, 1];

// Color de acento por promo (naranja, amarillo, rojo, crema). Una promo puede
// fijar el suyo con `color` en data/promos.js.
const PALETTE = ["#FF6600", "#FFCC00", "#FF003C", "#F4EFE6"];

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const stripAccents = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Días de la semana (0 = domingo) que menciona la etiqueta de una promo, ej. "Lunes y Martes".
function dowsOf(label) {
  const text = stripAccents(label);
  return DAY_NAMES.map((d, i) => (text.includes(stripAccents(d)) ? i : -1)).filter((i) => i >= 0);
}

function promoWaLink(promo) {
  const text = encodeURIComponent(
    `¡Hola SalchiMax! Quiero aprovechar la promo de ${promo.day}: ${promo.title} 🔥`
  );
  return `${WA_LINK}?text=${text}`;
}

// Qué promo toca hoy; si hoy no hay, cuál es la siguiente y en cuántos días.
function findToday(list, dow) {
  const hoy = list.findIndex((p) => p.dows.includes(dow));
  if (hoy >= 0) return { kind: "today", index: hoy };
  for (let n = 1; n <= 7; n += 1) {
    const next = list.findIndex((p) => p.dows.includes((dow + n) % 7));
    if (next >= 0) return { kind: n === 1 ? "tomorrow" : "later", index: next, in: n };
  }
  return null;
}

function PromoCard({ promo, index, isToday }) {
  const delay = index * 0.1;
  // Entrada sin deslizamientos: cada tarjeta aparece con un fundido escalonado y
  // el sello se estampa al final. Solo opacity/transform: nada que repinte por cuadro.
  const card = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: EASE, delay } },
  };
  const tag = {
    hidden: { opacity: 0, scale: 1.9, rotate: -14 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.44, ease: EASE, delay: delay + 0.45 } },
  };

  return (
    <motion.a
      href={promoWaLink(promo)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`promo-card-${promo.day.toLowerCase()}`}
      className="promo-card"
      style={{ "--c": promo.accent }}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -8, transition: { duration: 0.32, ease: EASE } }}
      whileTap={{ scale: 0.985 }}
    >
      {isToday && (
        <span className="absolute left-1/2 -top-[14px] z-10 flex -translate-x-1/2 items-center gap-[7px] rounded-full border-2 border-[var(--c)] bg-[#0D0D0D] px-3 pb-[3px] pt-[5px] font-heading text-[1.15rem] leading-none tracking-[0.12em] text-white">
          <i className="promo-blink h-2 w-2 rounded-full bg-[var(--c)]" />
          HOY
        </span>
      )}

      <div className="promo-card__photo">
        <img
          src={promo.img}
          alt={promo.title}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <span className="promo-card__sheen" />
      </div>

      <div className="promo-card__info">
        <div className="promo-card__eyebrow">
          <h3 className="promo-card__day">{promo.day.toUpperCase()}</h3>
          {promo.badge && (
            <motion.span variants={tag} className="promo-card__tag">
              {promo.badge}
            </motion.span>
          )}
        </div>

        <h4 className="promo-card__title">{promo.title}</h4>
        <p className="promo-card__desc">{promo.desc}</p>

        <div className="promo-card__foot">
          {promo.price && <span className="promo-card__price">{promo.price}</span>}
          <span className="promo-card__go">
            PEDIR
            <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Promos() {
  const sectionRef = useRef(null);
  // Pausa las cintas (y el parpadeo) cuando la sección no se ve
  const inView = useInView(sectionRef, { margin: "100px 0px" });

  const [dow] = useState(() => new Date().getDay());

  const list = useMemo(
    () =>
      promos
        .filter((p) => p.active)
        .map((p, i) => ({ ...p, dows: dowsOf(p.day), accent: p.color || PALETTE[i % PALETTE.length] })),
    []
  );
  const today = useMemo(() => findToday(list, dow), [list, dow]);

  if (list.length === 0) return null;

  const pill =
    today &&
    (today.kind === "today"
      ? { lead: `HOY ES ${DAY_NAMES[dow].toUpperCase()} · `, strong: list[today.index].title.toUpperCase(), tail: " ¡APROVECHA!" }
      : {
          lead: `HOY ES ${DAY_NAMES[dow].toUpperCase()} · ${today.kind === "tomorrow" ? "MAÑANA" : `EN ${today.in} DÍAS`}: `,
          strong: list[today.index].title.toUpperCase(),
          tail: "",
        });

  return (
    <section
      ref={sectionRef}
      id="promos"
      data-testid="promos-section"
      aria-labelledby="promos-title"
      className={`relative overflow-hidden bg-[#0D0D0D] px-[clamp(16px,4vw,56px)] pb-[clamp(64px,7vw,96px)] pt-[clamp(32px,3.5vw,48px)] ${
        inView ? "" : "anim-paused"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Encabezado */}
        <header className="mb-[clamp(34px,4.6vw,60px)]">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-2 block font-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#FF6600]"
          >
            Cada día una excusa para comer
          </motion.span>

          <h2 id="promos-title" aria-label="Promos de la semana" className="font-heading font-normal leading-[0.82]">
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="block text-[clamp(4.2rem,13vw,11.5rem)] tracking-[0.01em] text-transparent [-webkit-text-stroke:2px_#fff]"
            >
              PROMOS
            </motion.span>
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="mt-[clamp(-26px,-2vw,-8px)] inline-block origin-left -rotate-2 bg-[#FF6600] px-[0.3em] pb-[0.02em] pt-[0.1em] text-[clamp(2.2rem,6.2vw,5.6rem)] text-[#0D0D0D]"
            >
              DE LA SEMANA
            </motion.span>
          </h2>

          {pill && (
            <motion.a
              href="#promos-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              data-testid="promos-today"
              className="mt-[clamp(18px,2.4vw,28px)] inline-flex items-center gap-3 border-2 border-white px-4 py-2.5 font-body text-[0.95rem] font-extrabold tracking-[0.04em] text-white"
            >
              <span className="promo-blink h-2.5 w-2.5 flex-none rounded-full bg-[#FF003C]" />
              <span>
                {pill.lead}
                <b className="font-extrabold text-[#FFCC00]">{pill.strong}</b>
                {pill.tail}
              </span>
            </motion.a>
          )}
        </header>

        {/* Vitrina */}
        <div
          id="promos-grid"
          style={{ "--n": Math.min(list.length, 4) }}
          className="mx-auto grid max-w-[420px] grid-cols-1 items-start gap-[clamp(18px,2.2vw,32px)] min-[521px]:max-w-none min-[521px]:grid-cols-2 min-[521px]:gap-y-[38px] min-[1001px]:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        >
          {list.map((promo, i) => (
            <PromoCard
              key={promo.day + promo.title}
              promo={promo}
              index={i}
              isToday={today?.kind === "today" && today.index === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
