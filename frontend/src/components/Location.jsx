import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
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

export default function Location() {
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
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-3">
            NUESTRA <span className="text-[#FF6600]">UBICACIÓN</span>
          </h2>
          <div className="w-16 h-1 bg-[#FF6600] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="map-container"
            className="w-full h-80 md:h-96 overflow-hidden border border-white/10"
          >
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
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div className="bg-[#171717] border border-white/5 p-6" whileHover={{ scale: 1.01, borderColor: "rgba(255,102,0,0.2)" }} transition={{ duration: 0.2 }}>
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
            </motion.div>

            <motion.div className="bg-[#171717] border border-white/5 p-6" whileHover={{ scale: 1.01, borderColor: "rgba(255,102,0,0.2)" }} transition={{ duration: 0.2 }}>
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
            </motion.div>

            <motion.div className="bg-[#171717] border border-white/5 p-6" whileHover={{ scale: 1.01, borderColor: "rgba(255,102,0,0.2)" }} transition={{ duration: 0.2 }}>
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
            </motion.div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
