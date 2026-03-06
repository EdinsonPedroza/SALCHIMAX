import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const WA_NUMBER = "573177371695";

export default function Cart() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    buildWhatsAppMessage,
  } = useCart();

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm"
            data-testid="cart-backdrop"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="cart-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            data-testid="cart-sidebar"
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#111111] z-[70] flex flex-col shadow-2xl border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10 bg-[#0D0D0D]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-[#FF6600]" />
                <span className="font-heading text-2xl text-white tracking-wide">MI PEDIDO</span>
                {totalItems > 0 && (
                  <span className="bg-[#FF6600] text-white text-xs font-heading px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                data-testid="cart-close-btn"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Cerrar carrito"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 ? (
                <div
                  data-testid="cart-empty-state"
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                >
                  <ShoppingBag size={52} className="text-white/10" />
                  <p className="font-heading text-2xl text-white/30 tracking-wide">
                    TU CARRITO ESTÁ VACÍO
                  </p>
                  <p className="font-body text-sm text-gray-500">
                    Agrega productos del menú para hacer tu pedido
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-outline-orange px-6 py-3 font-heading text-base tracking-widest"
                  >
                    VER MENÚ
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        data-testid={`cart-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-[#1A1A1A] border border-white/5 p-3 flex gap-3"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <p className="font-heading text-base text-white tracking-wide leading-tight truncate">
                              {item.name}
                            </p>
                            <button
                              data-testid={`remove-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={() => removeItem(item.name)}
                              className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                              aria-label={`Eliminar ${item.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="font-heading text-[#FF6600] text-sm mb-2">{item.price}</p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              data-testid={`decrease-qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={() => updateQty(item.name, -1)}
                              className="w-7 h-7 bg-[#252525] text-white flex items-center justify-center hover:bg-[#FF6600] transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              data-testid={`item-qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="font-heading text-base text-white w-5 text-center"
                            >
                              {item.qty}
                            </span>
                            <button
                              data-testid={`increase-qty-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={() => updateQty(item.name, 1)}
                              className="w-7 h-7 bg-[#252525] text-white flex items-center justify-center hover:bg-[#FF6600] transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={12} />
                            </button>

                            {/* Item subtotal */}
                            {parseInt(item.price.replace(/[^0-9]/g, ""), 10) > 0 && (
                              <span className="font-body text-xs text-gray-400 ml-auto">
                                = ${(parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.qty).toLocaleString("es-CO")}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Clear cart */}
                  <button
                    data-testid="clear-cart-btn"
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors font-body flex items-center gap-1 mx-auto"
                  >
                    <Trash2 size={12} />
                    Limpiar pedido
                  </button>
                </>
              )}
            </div>

            {/* Footer with total and CTA */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-5 py-5 bg-[#0D0D0D] space-y-4">
                {/* Total */}
                {totalPrice > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-gray-400 uppercase tracking-widest">Total estimado</span>
                    <span
                      data-testid="cart-total-price"
                      className="font-heading text-2xl text-[#FF6600]"
                    >
                      ${totalPrice.toLocaleString("es-CO")}
                    </span>
                  </div>
                )}

                <p className="font-body text-xs text-gray-500 text-center">
                  Los precios marcados como "Consultar" se confirman por WhatsApp
                </p>

                {/* WhatsApp order button */}
                <button
                  data-testid="cart-whatsapp-order-btn"
                  onClick={handleWhatsApp}
                  className="btn-orange w-full py-4 font-heading text-xl tracking-widest flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,102,0,0.3)]"
                >
                  <MessageCircle size={22} />
                  ENVIAR PEDIDO
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
