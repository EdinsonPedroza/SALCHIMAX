import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { legal, SIC_URL } from "../data/legal";

const LINK = "text-[#FF6600] hover:underline";

// Covers what Ley 1480 de 2011 (art. 50, as amended by Ley 2439 de 2024) asks an
// online seller to publish: identity, payment, delivery, retracto, PQR and the SIC.
const SECTIONS = [
  {
    title: "1. QUIÉNES SOMOS",
    body: (
      <>
        {legal.brand}
        {legal.owner && `, de ${legal.owner}`}
        {legal.nit && ` (NIT ${legal.nit})`}, con punto de venta en {legal.address}. Teléfono y WhatsApp:{" "}
        {legal.phone}
        {legal.email && ` · Correo: ${legal.email}`}. Al usar este sitio o hacernos un pedido aceptas estos
        términos.
      </>
    ),
  },
  {
    title: "2. CÓMO PEDIR",
    body: "Arma tu pedido en el sitio y envíalo por WhatsApp, o pide en el local. Antes de confirmarlo te enviamos el resumen: productos, valor del domicilio si aplica, total a pagar, forma de pago y tiempo estimado de entrega. El pedido queda hecho cuando lo aceptas en el chat, y por ahí mismo te confirmamos que lo recibimos.",
  },
  {
    title: "3. PRECIOS",
    body: "Los precios están en pesos colombianos (COP) e incluyen impuestos. Pagas el precio publicado: si ves una diferencia entre el sitio y el chat, pagas el menor. Precios y promociones están vigentes mientras aparezcan en este sitio.",
  },
  {
    title: "4. DOMICILIOS Y ENTREGA",
    body: "Llevamos domicilios a las zonas de Palmira que te confirmamos por WhatsApp; su valor se informa aparte, antes de confirmar. Si un producto no está disponible te avisamos de inmediato. Si no podemos entregar en el tiempo acordado, puedes cancelar y te devolvemos todo lo pagado en máximo 15 días calendario, por el medio que prefieras.",
  },
  {
    title: "5. MEDIOS DE PAGO",
    body: `Aceptamos ${legal.payments}. Si pagas con tarjeta u otro medio electrónico y hay fraude, una operación que no hiciste, el pedido no llega o no es lo que pediste, puedes pedir la reversión del pago dentro de los 5 días hábiles siguientes: avísanos y notifica a la entidad de tu medio de pago (art. 51 de la Ley 1480 de 2011).`,
  },
  {
    title: "6. PROMOCIONES",
    body: "Cada promo aplica solo el día de la semana que indica su tarjeta y está vigente mientras esté publicada en este sitio. Si una promo tiene condiciones adicionales, aparecen en la misma tarjeta.",
  },
  {
    title: "7. DERECHO DE RETRACTO",
    body: "Por ser alimentos perecederos preparados al momento, los pedidos no tienen derecho de retracto (art. 47 de la Ley 1480 de 2011). Esto no afecta tu garantía.",
  },
  {
    title: "8. GARANTÍA",
    body: "Si tu pedido llega incompleto, equivocado o en mal estado, escríbenos por WhatsApp apenas lo recibas; una foto nos ayuda a resolverlo más rápido. Lo revisamos contigo y te reponemos el producto o te devolvemos su valor, como lo establece la garantía legal.",
  },
  {
    title: "9. PETICIONES, QUEJAS Y RECLAMOS",
    body: (
      <>
        Radica tu solicitud en nuestra{" "}
        <Link to="/pqr" className={LINK}>
          página de PQR
        </Link>
        : recibes un número de radicado con fecha y hora para hacerle seguimiento. Te respondemos en máximo 15 días
        hábiles.
      </>
    ),
  },
  {
    title: "10. ALERGIAS E INGREDIENTES",
    body: "Nuestros productos pueden contener o tener contacto con gluten, lácteos, huevo y otros alérgenos. Si tienes alguna alergia o restricción alimentaria, infórmanos al hacer tu pedido para indicarte qué opciones son seguras.",
  },
  {
    title: "11. PROPIEDAD INTELECTUAL",
    body: "El nombre y el logo de SALCHIMAX, las fotografías y el contenido de este sitio son de SALCHIMAX Urban Food o de sus autores, que nos autorizan a usarlos. No está permitido reproducirlos sin autorización previa.",
  },
  {
    title: "12. LEY APLICABLE",
    body: (
      <>
        Estos términos se rigen por las leyes de Colombia. Si un reclamo no queda resuelto, puedes acudir a la{" "}
        <a href={SIC_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
          Superintendencia de Industria y Comercio
        </a>
        , autoridad de protección al consumidor.
      </>
    ),
  },
];

export default function Terminos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-enter relative min-h-screen max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
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
        Última actualización: {legal.updated} · Consulta también nuestra{" "}
        <Link to="/privacidad" className="text-[#FF6600] hover:underline">
          Política de Privacidad
        </Link>
      </p>
    </main>
  );
}
