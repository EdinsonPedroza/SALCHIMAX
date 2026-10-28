import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { legal, SIC_URL } from "../data/legal";

const LINK = "text-[#FF6600] hover:underline";

// Minimum contents of a data policy per Decreto 1377 de 2013, art. 13: who is
// responsible, purposes, rights, who answers, the procedure and the effective date.
const SECTIONS = [
  {
    title: "1. RESPONSABLE",
    body: (
      <>
        {legal.brand}
        {legal.owner && `, de ${legal.owner}`}
        {legal.nit && ` (NIT ${legal.nit})`}, con domicilio en {legal.address}. Teléfono y WhatsApp: {legal.phone}
        {legal.email && ` · Correo: ${legal.email}`}. El administrador del negocio atiende tus consultas y reclamos
        sobre datos personales en estos mismos canales.
      </>
    ),
  },
  {
    title: "2. DATOS QUE RECOLECTAMOS",
    body: "Solo lo necesario para atender tu pedido o tu PQR: nombre, número de teléfono, dirección de entrega y el detalle de tu orden o solicitud. No pedimos datos sensibles ni datos de tarjetas. Este sitio no tiene formularios ni guarda tus datos: los pedidos y las PQR nos llegan por WhatsApp.",
  },
  {
    title: "3. PARA QUÉ LOS USAMOS",
    body: "Para preparar y entregar tu pedido, coordinar el domicilio, responder tus mensajes y PQR, y cumplir obligaciones legales. No vendemos ni cedemos tu información.",
  },
  {
    title: "4. TU AUTORIZACIÓN",
    body: "Cuando nos escribes y nos das tus datos para un pedido, nos autorizas a usarlos para atenderlo. Solo te enviamos promociones si nos lo autorizas aparte en el chat, y puedes pedir que paremos cuando quieras con un mensaje.",
  },
  {
    title: "5. CON QUIÉN SE COMPARTEN",
    body: "Los mensajes pasan por WhatsApp (Meta Platforms) y este sitio está alojado en Vercel: ambos procesan información en servidores fuera de Colombia, bajo sus propias políticas. Si pides a domicilio, quien entrega conoce tu nombre, dirección y teléfono solo para llevarte el pedido.",
  },
  {
    title: "6. TUS DERECHOS",
    body: "Según la Ley 1581 de 2012 puedes:",
    list: [
      "Conocer, actualizar y rectificar tus datos.",
      "Pedir prueba de la autorización que nos diste.",
      "Saber qué uso le hemos dado a tus datos.",
      "Revocar la autorización o pedir que borremos tus datos, salvo que exista un deber legal o contractual de conservarlos.",
      "Presentar quejas ante la Superintendencia de Industria y Comercio.",
      "Acceder gratis a tus datos.",
    ],
  },
  {
    title: "7. CÓMO EJERCERLOS",
    body: (
      <>
        Escríbenos por WhatsApp al {legal.phone}
        {legal.email && ` o al correo ${legal.email}`}, o radica una{" "}
        <Link to="/pqr" className={LINK}>
          PQR
        </Link>
        . Respondemos consultas en máximo 10 días hábiles y reclamos (corregir, borrar o revocar) en máximo 15 días
        hábiles. Si necesitamos más tiempo te avisamos antes, sin pasar de 5 días hábiles más para consultas y 8 para
        reclamos. Si después de este trámite no quedas conforme, puedes acudir a la{" "}
        <a href={SIC_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
          Superintendencia de Industria y Comercio
        </a>
        .
      </>
    ),
  },
  {
    title: "8. SEGURIDAD Y CONSERVACIÓN",
    body: "Protegemos tu información con medidas razonables contra acceso no autorizado. Conservamos los datos de pedidos solo mientras los necesitamos para atenderte y cumplir obligaciones legales; después los eliminamos.",
  },
  {
    title: "9. COOKIES Y ANALÍTICA",
    body: "Este sitio no usa cookies de publicidad ni de rastreo. Medimos visitas y rendimiento con Vercel Web Analytics y Speed Insights, que no usan cookies ni te identifican. Al cargar la página, tu navegador también se conecta a Google Fonts (tipografías), Unsplash (algunas fotos) y OpenStreetMap (el mapa), que reciben tu dirección IP para entregar ese contenido.",
  },
  {
    title: "10. VIGENCIA",
    body: `Esta política rige desde el ${legal.updated} y aplica mientras SALCHIMAX esté en funcionamiento. Si hacemos cambios importantes, los publicamos aquí antes de aplicarlos.`,
  },
];

export default function Privacidad() {
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
        POLÍTICA DE <span className="text-[#FF6600]">PRIVACIDAD</span>
      </h1>
      <p className="font-body text-sm text-gray-400 leading-relaxed mb-12 max-w-prose">
        Esta es nuestra política de tratamiento de datos personales: qué datos usamos, para qué y cómo ejercer tus
        derechos, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.
      </p>

      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title} className="border-t border-white/5 pt-6">
            <h2 className="font-heading text-2xl md:text-3xl text-white tracking-wide mb-3">{s.title}</h2>
            <p className="font-body text-sm text-gray-400 leading-relaxed">{s.body}</p>
            {s.list && (
              <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-[#FF6600] font-body text-sm text-gray-400 leading-relaxed">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-14 pt-6 border-t border-white/5 font-body text-xs text-gray-600">
        Última actualización: {legal.updated} · Consulta también nuestros{" "}
        <Link to="/terminos" className="text-[#FF6600] hover:underline">
          Términos y Condiciones
        </Link>
      </p>
    </main>
  );
}
