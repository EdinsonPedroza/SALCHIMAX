import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. RESPONSABLE",
    body: "SALCHIMAX Urban Food, con punto de venta en Cra. 28 #19-20, Palmira, Valle del Cauca, es responsable del tratamiento de los datos personales que nos compartes al hacer pedidos por WhatsApp o al contactarnos por redes sociales.",
  },
  {
    title: "2. DATOS QUE RECOLECTAMOS",
    body: "Solo pedimos lo necesario para atender tu pedido: nombre, número de teléfono, dirección de entrega y el detalle de tu orden. No solicitamos datos financieros por WhatsApp.",
  },
  {
    title: "3. PARA QUÉ LOS USAMOS",
    body: "Usamos tus datos para preparar y entregar tu pedido, coordinar el domicilio, responder tus mensajes y, ocasionalmente, informarte promociones si nos lo autorizas. No vendemos ni compartimos tu información con terceros con fines comerciales.",
  },
  {
    title: "4. TUS DERECHOS (LEY 1581 DE 2012)",
    body: "De acuerdo con la ley colombiana de protección de datos personales, puedes conocer, actualizar, rectificar y solicitar la eliminación de tus datos, así como revocar cualquier autorización. Para ejercer estos derechos escríbenos por WhatsApp al 317 737 1695.",
  },
  {
    title: "5. SEGURIDAD Y CONSERVACIÓN",
    body: "Protegemos tu información con medidas razonables contra acceso no autorizado y la conservamos solo el tiempo necesario para gestionar pedidos y cumplir obligaciones legales.",
  },
  {
    title: "6. COOKIES Y ANALÍTICA",
    body: "Este sitio no usa cookies de rastreo publicitario. Utilizamos métricas anónimas de visitas (Vercel Analytics) únicamente para mejorar el rendimiento y la experiencia del sitio.",
  },
];

export default function Privacidad() {
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
        POLÍTICA DE <span className="text-[#FF6600]">PRIVACIDAD</span>
      </h1>
      <p className="font-body text-sm text-gray-400 leading-relaxed mb-12 max-w-prose">
        En SALCHIMAX tratamos tus datos personales con responsabilidad, conforme a la Ley 1581 de 2012 y sus decretos
        reglamentarios.
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
        Última actualización: julio de 2026 · Consulta también nuestros{" "}
        <Link to="/terminos" className="text-[#FF6600] hover:underline">
          Términos y Condiciones
        </Link>
      </p>
    </main>
  );
}
