import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import Reveal3D from "./fx/Reveal3D";
import Tilt3D from "./fx/Tilt3D";
import FlipText from "./fx/FlipText";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SALCHIMAX_POS = [3.518157, -76.300247];

/* Info card: stands up on scroll, then tilts with the cursor. */
function InfoCard({ index, children }) {
  return (
    <Reveal3D from={{ rotateX: 45, y: 40, z: -100 }} delay={0.15 * index}>
      <Tilt3D
        max={5}
        lift={10}
        className="bg-[#171717] border border-white/5 p-6 hover:border-[#FF6600]/20 transition-colors duration-200"
      >
        {children}
      </Tilt3D>
    </Reveal3D>
  );
}

export default function Location() {
  const mapRef = useRef(null);
  // Mount the Leaflet map (and fetch its tiles) only when the user is close —
  // it's expensive and lives at the bottom of the page.
  const mapInView = useInView(mapRef, { once: true, margin: "400px 0px" });

  return (
    <section
      id="location"
      data-testid="location-section"
      className="py-20 md:py-28 bg-[#121212]"
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
            Encuéntranos
          </span>
          <FlipText
            className="font-heading text-5xl md:text-6xl text-white mb-3"
            parts={["NUESTRA", { text: "UBICACIÓN", className: "text-[#FF6600]" }]}
          />
          <div className="w-16 h-1 bg-[#FF6600] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <Reveal3D
            ref={mapRef}
            from={{ rotateY: 28, x: -60, z: -120 }}
            origin="0% 50%"
            duration={1}
            data-testid="map-container"
            className="w-full h-80 md:h-96 overflow-hidden border border-white/10 bg-[#171717]"
          >
            {mapInView ? (
              <MapContainer
                center={SALCHIMAX_POS}
                zoom={17}
                style={{ width: "100%", height: "100%", filter: "grayscale(70%) contrast(1.1)" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                />
                <Marker position={SALCHIMAX_POS}>
                  <Popup>
                    <strong>SALCHIMAX</strong><br />
                    Cra. 28 #19-20, Palmira
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin size={32} className="text-[#FF6600]/40 animate-pulse" />
              </div>
            )}
          </Reveal3D>

          {/* Info */}
          <div className="space-y-6">
            <InfoCard index={0}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#FF6600]" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-1 tracking-wide">DIRECCIÓN</h3>
                  <p className="font-body text-gray-300 text-sm leading-relaxed">
                    Cra. 28 #19-20<br />
                    Palmira, Valle del Cauca<br />
                    Colombia
                  </p>
                </div>
              </div>
            </InfoCard>

            <InfoCard index={1}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#FF6600]" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-1 tracking-wide">HORARIO</h3>
                  <p className="font-body text-gray-300 text-sm leading-relaxed">
                    Lunes a Domingo<br />
                    <span className="text-[#FF6600] font-semibold">Desde las 5:00 PM</span>
                    <br />
                    <span className="text-xs text-gray-500">Hasta que se acabe el antojo</span>
                  </p>
                </div>
              </div>
            </InfoCard>

            <InfoCard index={2}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6600]/10 border border-[#FF6600]/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#FF6600]" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-1 tracking-wide">CONTACTO</h3>
                  <a
                    href="tel:3177371695"
                    data-testid="location-phone-link"
                    className="font-body text-[#FF6600] text-sm hover:text-[#FF8533] transition-colors block"
                  >
                    317 737 1695
                  </a>
                  <a
                    href="https://wa.me/573177371695"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="location-whatsapp-link"
                    className="font-body text-gray-400 text-xs hover:text-[#FF6600] transition-colors mt-1 block"
                  >
                    WhatsApp: +57 317 737 1695
                  </a>
                </div>
              </div>
            </InfoCard>

            <motion.a
              href="https://maps.google.com/?q=Cra.+28+%2319-20,+Palmira,+Valle+del+Cauca"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="get-directions-btn"
              className="btn-outline-orange flex items-center justify-center gap-3 w-full py-4 font-heading text-lg tracking-widest"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin size={20} />
              VER EN GOOGLE MAPS
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
