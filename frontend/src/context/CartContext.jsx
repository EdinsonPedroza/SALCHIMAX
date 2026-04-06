import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    // No longer auto-open cart when adding items
  }, []);

  const removeItem = useCallback((name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const updateQty = useCallback((name, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const totalPrice = items.reduce((s, i) => {
    const num = parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0;
    return s + num * i.qty;
  }, 0);

  const buildWhatsAppMessage = () => {
    const lines = items.map(
      (i) => `• ${i.qty}x ${i.name} — ${i.price}`
    );
    const total = totalPrice > 0
      ? `\n*Total estimado: $${totalPrice.toLocaleString("es-CO")}*`
      : "";
    return encodeURIComponent(
      `¡Hola SALCHIMAX! Quiero hacer este pedido:\n\n${lines.join("\n")}${total}\n\n¿Está disponible?`
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        buildWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
