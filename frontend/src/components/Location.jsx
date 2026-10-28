import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Reveal, useKind, HIDDEN, SHOWN, VIEWPORT, EASE_OUT } from "./Reveal";

// Own marker (no external images): an orange pin with a soft pulse ring, styled in App.css.
const PIN_ICON = L.divIcon({
  className: "map-pin",
  html: '<span class="map-pin__pulse"></span><span class="map-pin__dot"></span>',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -18],
});

const SALCHIMAX_POS = [3.518157, -76.300247];
const MAPS_URL = "https://maps.google.com/?q=Cra.+28+%2319-20,+Palmira,+Valle+del+Cauca";

const openMaps = () => window.open(MAPS_URL, "_blank", "noopener,noreferrer");

// A click on the map opens Google Maps. Leaflet only fires "click" for a real click,
// not at the end of a drag, so panning the map still works; the zoom buttons stop
// their own clicks from reaching the map.
function ClickToOpen() {
  useMapEvents({ click: openMaps });
  return null;
}

export default function Location() {
  const mapRef = useRef(null);
  // Mount the Leaflet map (and fetch its tiles) only when the user is close —
  // it's expensive and lives at the bottom of the page.
  const mapInView = useInView(mapRef, { once: true, margin: "400px 0px" });
  // The "open in Google Maps" ring plays when the map is actually on screen, not 400px before.
  const mapSeen = useInView(mapRef, { once: true, amount: 0.5 });
  // The map frame is uncovered left to right (a fade with reduced motion)
  const mapKind = useKind("unveil");

  return (
    <section
      id="location"
      data-testid="location-section"
      className="py-8 md:py-10 bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal as="span" variant="wipe" className="font-body text-xs uppercase tracking-widest text-[#FF6600] mb-3 block w-fit mx-auto">
            Encuéntranos
          </Reveal>
          <Reveal as="h2" variant="wipe" delay={0.08} className="font-heading text-5xl md:text-6xl text-white mb-3 w-fit mx-auto">
            NUESTRA <span className="text-[#FF6600]">UBICACIÓN</span>
          </Reveal>
          <Reveal variant="bar" delay={0.22} className="w-16 h-1 bg-[#FF6600] mx-auto" style={{ transformOrigin: "center" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            ref={mapRef}
            initial={HIDDEN[mapKind]}
            whileInView={SHOWN[mapKind]}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            data-testid="map-container"
            className="map-frame relative w-full h-80 md:h-96 lg:h-auto lg:min-h-[28rem] overflow-hidden rounded-xl border border-white/10 bg-[#171717]"
          >
            {mapInView ? (
              <MapContainer
                center={SALCHIMAX_POS}
                zoom={17}
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={false}
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <ClickToOpen />
                {/* ODbL licence: credit OSM contributors and link to the copyright page */}
                <TileLayer
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker
                  position={SALCHIMAX_POS}
                  icon={PIN_ICON}
                  title="Abrir en Google Maps"
                  eventHandlers={{ click: openMaps }}
                />
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin size={32} className="text-[#FF6600]/40 animate-pulse" />
              </div>
            )}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="map-open-link"
              className={`map-open-link${mapSeen ? " is-seen" : ""}`}
            >
              <ExternalLink size={17} strokeWidth={2.6} aria-hidden="true" />
              Abrir en Google Maps
            </a>
          </motion.div>

          {/* Info */}
          <div className="space-y-6">
            <Reveal variant="stamp" delay={0.00}>
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
            </Reveal>

            <Reveal variant="stamp" delay={0.08}>
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
            </Reveal>

            <Reveal variant="stamp" delay={0.16}>
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
            </Reveal>

            <Reveal variant="stamp" delay={0.24}>
            <motion.a
              href={MAPS_URL}
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
