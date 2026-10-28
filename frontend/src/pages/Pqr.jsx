import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { legal, SIC_URL } from "../data/legal";

const TYPES = [
  { id: "peticion", label: "Petición", hint: "Una solicitud o pregunta" },
  { id: "queja", label: "Queja", hint: "Algo de la atención no te gustó" },
  { id: "reclamo", label: "Reclamo", hint: "Un problema con tu pedido o un cobro" },
];

const TZ = "America/Bogota";
const LINK = "text-[#FF6600] hover:underline";

// Ley 1480 art. 50 lit. g (as amended by Ley 2439 de 2024): each PQR needs a
// registration number with date and time, and a way to follow it up. With no
// backend, the number is built here in Bogotá time and travels inside the
// WhatsApp message, so the customer and the business keep the same record.
function newFiling(type) {
  const now = new Date();
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map(({ type: part, value }) => [part, value])
  );
  const tag = Math.floor(Math.random() * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0");

  return {
    type,
    id: `SMX-${p.year}${p.month}${p.day}-${p.hour}${p.minute}-${tag}`,
    when: new Intl.DateTimeFormat("es-CO", { timeZone: TZ, dateStyle: "long", timeStyle: "short" }).format(now),
  };
}

function openWhatsApp({ id, when, type }) {
  const text = encodeURIComponent(
    `*PQR SALCHIMAX*\nRadicado: ${id}\nFecha y hora: ${when}\nTipo: ${type}\n\nDetalle: `
  );
  // Same hand-off as the cart: the app on phones, WhatsApp Web elsewhere.
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    window.location.href = `whatsapp://send?phone=${legal.whatsapp}&text=${text}`;
  } else {
    window.open(`https://wa.me/${legal.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
  }
}

export default function Pqr() {
  const [filing, setFiling] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const file = (type) => {
    const next = newFiling(type);
    setFiling(next);
    openWhatsApp(next);
  };

  return (
    <main className="relative min-h-screen max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <Link
        to="/"
        data-testid="back-home-link"
        className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-[#FF6600] transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Volver al inicio
      </Link>

      <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wide mb-4">
        RADICA TU <span className="text-[#FF6600]">PQR</span>
      </h1>
      <p className="font-body text-sm text-gray-400 leading-relaxed mb-10 max-w-prose">
        Peticiones, quejas y reclamos. Elige el tipo: te damos un número de radicado con fecha y hora, y abrimos
        WhatsApp con el mensaje listo para que nos cuentes qué pasó.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => file(t.label)}
            data-testid={`pqr-type-${t.id}`}
            className="btn-outline-orange flex flex-col items-center justify-center gap-1 px-4 py-4"
          >
            <span className="text-xl tracking-widest">{t.label.toUpperCase()}</span>
            <span className="font-body text-xs tracking-normal opacity-70">{t.hint}</span>
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {filing && (
          <section data-testid="pqr-receipt" className="mt-8 border border-[#FF6600]/40 bg-[#FF6600]/5 p-6">
            <p className="font-body text-xs uppercase tracking-widest text-gray-400">Tu número de radicado</p>
            <p data-testid="pqr-radicado" className="font-heading text-4xl md:text-5xl text-[#FF6600] tracking-wide mt-1">
              {filing.id}
            </p>
            <p className="font-body text-sm text-gray-300 mt-2">
              {filing.type} · {filing.when}
            </p>
            <p className="font-body text-sm text-gray-400 leading-relaxed mt-4">
              Tu PQR queda radicada cuando envías el mensaje. Guarda este número: con él le haces seguimiento en el
              mismo chat. Te respondemos en máximo 15 días hábiles.
            </p>
            <button
              type="button"
              onClick={() => openWhatsApp(filing)}
              data-testid="pqr-open-whatsapp"
              className="btn-orange inline-flex items-center gap-2 px-6 py-3 text-lg tracking-widest mt-5"
            >
              <MessageCircle size={20} />
              ABRIR WHATSAPP
            </button>
          </section>
        )}
      </div>

      <p className="mt-14 pt-6 border-t border-white/5 font-body text-xs text-gray-400 leading-relaxed">
        {legal.email && `También puedes escribirnos a ${legal.email} indicando tu radicado. `}
        Si tu solicitud es sobre tus datos personales, revisa la{" "}
        <Link to="/privacidad" className={LINK}>
          Política de Privacidad
        </Link>
        . Si no quedas satisfecho con la respuesta, puedes acudir a la{" "}
        <a href={SIC_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
          Superintendencia de Industria y Comercio
        </a>
        .
      </p>
    </main>
  );
}
