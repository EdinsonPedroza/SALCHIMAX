import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/573177371695";

export default function WhatsAppFloat() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] transition-all duration-300"
      style={{ animation: "pulse-glow 2.5s infinite" }}
    >
      <MessageCircle size={28} />
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 4px 35px rgba(37,211,102,0.8); }
        }
      `}</style>
    </a>
  );
}
