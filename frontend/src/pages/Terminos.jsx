import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. ACEPTACIÓN",
    body: "Al usar este sitio web o realizar un pedido a SALCHIMAX Urban Food aceptas estos términos y condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos no utilizar nuestros servicios.",
  },
  {
    title: "2. PEDIDOS Y PAGOS",
    body: "Los pedidos se realizan por WhatsApp o directamente en nuestro punto de venta (Cra. 28 #19-20, Palmira). El pedido se confirma únicamente cuando recibes nuestra respuesta por WhatsApp. Los pagos se realizan contra entrega en efectivo o por los medios que te confirmemos en el chat.",
  },
  {
    title: "3. PRECIOS Y DISPONIBILIDAD",
    body: "Los precios publicados están en pesos colombianos (COP) e incluyen los impuestos aplicables. Pueden cambiar sin previo aviso y algunos productos pueden no estar disponibles según el día. El precio válido es el confirmado por WhatsApp al momento del pedido.",
  },
  {
    title: "4. DOMICILIOS",
    body: "El servicio a domicilio aplica para las zonas de cobertura en Palmira que te confirmamos por WhatsApp. El costo del domicilio se informa antes de confirmar el pedido y los tiempos de entrega son estimados: pueden variar según demanda, clima o tráfico.",
  },
  {
    title: "5. ALERGIAS E INGREDIENTES",
    body: "Nuestros productos pueden contener o tener contacto con gluten, lácteos, huevo y otros alérgenos. Si tienes alguna alergia o restricción alimentaria, infórmanos al hacer tu pedido para indicarte qué opciones son seguras.",
  },
  {
    title: "6. CAMBIOS Y RECLAMOS",
    body: "Si tu pedido llega incompleto o con algún error, escríbenos por WhatsApp dentro de los 30 minutos siguientes a la entrega con foto del producto. Evaluaremos el caso y, de proceder, haremos la reposición o el ajuste correspondiente.",
  },
  {
    title: "7. PROPIEDAD INTELECTUAL",
    body: "La marca SALCHIMAX, su logotipo, fotografías y el contenido de este sitio son propiedad de SALCHIMAX Urban Food o de sus autores bajo licencia. No está permitida su reproducción sin autorización previa.",
  },
];

export default function Terminos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        TÉRMINOS Y <span className="text-[#FF6600]">CONDICIONES</span>
      </h1>
      <p className="font-body text-sm text-gray-400 leading-relaxed mb-12 max-w-prose">
        Estos términos regulan el uso del sitio web y los pedidos a SALCHIMAX Urban Food, Palmira, Valle del Cauca.
      </p>

      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title} className="border-t border-white/5 pt-6">
            <h2 className="font-heading text-2xl md:text-3xl text-white tracking-wide mb-3">{s.title}</h2>
            <p className="font-body text-sm text-gray-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-14 pt-6 border-t border-white/5 font-body text-xs text-gray-600">
        Última actualización: julio de 2026 · Consulta también nuestra{" "}
        <Link to="/privacidad" className="text-[#FF6600] hover:underline">
          Política de Privacidad
        </Link>
      </p>
    </main>
  );
}
