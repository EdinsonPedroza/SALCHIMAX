import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const CartContext = createContext(null);
// Actions only, and referentially stable: components that just dispatch (the
// product cards) subscribe here so they don't re-render on every cart change.
const CartActionsContext = createContext(null);

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

  const { totalItems, totalPrice } = useMemo(() => {
    return {
      totalItems: items.reduce((s, i) => s + i.qty, 0),
      totalPrice: items.reduce((s, i) => {
        const num = parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0;
        return s + num * i.qty;
      }, 0),
    };
  }, [items]);

  const buildWhatsAppMessage = useCallback(() => {
    const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${i.price}`);
    const total = totalPrice > 0
      ? `\n*Subtotal: $${totalPrice.toLocaleString("es-CO")}* (sin domicilio)`
      : "";
    return encodeURIComponent(
      `¡Hola SALCHIMAX! Quiero hacer este pedido:\n\n${lines.join("\n")}${total}\n\n¿Está disponible?`
    );
  }, [items, totalPrice]);

  // Memoized so adding one item doesn't re-render every consumer
  // (the 20 product cards, navbar, cart drawer) on an unchanged reference.
  const value = useMemo(
    () => ({
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
    }),
    [
      items,
      totalItems,
      totalPrice,
      isOpen,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      buildWhatsAppMessage,
    ]
  );

  const actions = useMemo(
    () => ({ addItem, removeItem, updateQty, clearCart, setIsOpen }),
    [addItem, removeItem, updateQty, clearCart]
  );

  return (
    <CartActionsContext.Provider value={actions}>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </CartActionsContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function useCartActions() {
  const ctx = useContext(CartActionsContext);
  if (!ctx) throw new Error("useCartActions must be used inside CartProvider");
  return ctx;
}
