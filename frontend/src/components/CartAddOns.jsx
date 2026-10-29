import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { useCart, useCartActions } from "../context/CartContext";
import { getAddOns, thumbOf } from "../data/menu";
import ProductThumb from "./ProductThumb";

const EASE_OUT = [0.23, 1, 0.32, 1];
// How many suggestions the row holds.
const SHOWN = 6;
// How long after the cart opens the strip unfolds on its own.
const OPEN_AFTER_MS = 900;
// On a short phone screen the strip would squeeze the order list: it stays folded.
const MIN_HEIGHT_TO_AUTO_OPEN = 680;

// Each tile leans its own way (stable per product), so the row never moves in lockstep.
const lean = (id) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return (h % 2 ? 1 : -1) * (3 + (Math.abs(h) % 4));
};

/**
 * "¿Un último antojo?": a collapsible strip between the order list and the total (so it
 * stays in reach however long the list is). It starts folded every time the cart opens
 * (the drawer unmounts when it closes) and unfolds by itself after OPEN_AFTER_MS, unless
 * the client already folded or unfolded it by hand. One tap adds one unit; the tile pops
 * away and the next suggestion pops in at the end of the row.
 */
export default function CartAddOns() {
  const { items } = useCart();
  const { addItem } = useCartActions();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // tiles (and their photos) mount on the first unfold
  const touched = useRef(false);

  // The picks stay STABLE: adding one only takes that tile out and appends the next
  // suggestion; the others don't re-rank or move. Recomputed only when the set of
  // products in the cart changes, not when a quantity does.
  const cartKey = items.map((i) => i.name).sort().join("|");
  const [picks, setPicks] = useState(() => getAddOns(items, SHOWN));
  const [seenKey, setSeenKey] = useState(cartKey);
  if (cartKey !== seenKey) {
    setSeenKey(cartKey);
    const have = new Set(items.map((i) => i.name));
    const kept = picks.filter((p) => !have.has(p.name));
    const fill =
      kept.length < SHOWN
        ? getAddOns(items, SHOWN * 2).filter((p) => !kept.some((k) => k.id === p.id))
        : [];
    setPicks([...kept, ...fill].slice(0, SHOWN));
  }
  const has = picks.length > 0;

  useEffect(() => {
    if (!has || window.innerHeight < MIN_HEIGHT_TO_AUTO_OPEN) return;
    const t = setTimeout(() => {
      if (!touched.current) {
        setShown(true);
        setOpen(true);
      }
    }, OPEN_AFTER_MS);
    return () => clearTimeout(t);
  }, [has]);

  if (!has) return null;

  const toggle = () => {
    touched.current = true;
    setShown(true);
    setOpen((o) => !o);
  };

  return (
    <section
      aria-labelledby="add-ons-title"
      data-testid="cart-add-ons"
      className="shrink-0 border-t border-white/10 bg-[#111111]"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="add-ons-panel"
        data-testid="add-ons-toggle"
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#FF6600]"
      >
        <span>
          <span id="add-ons-title" className="block font-heading text-lg leading-none tracking-wide text-white">
            ¿UN ÚLTIMO ANTOJO?
          </span>
          <span className="mt-1 block font-body text-xs text-gray-400">Algo pequeño para completar tu pedido.</span>
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 text-[#FF6600] transition-transform duration-300 ease-out-strong motion-reduce:transition-none${
            open ? "" : " rotate-180"
          }`}
        />
      </button>

      {/* The panel opens by animating its grid row from 0fr to 1fr: no height measuring */}
      <div
        id="add-ons-panel"
        role="region"
        aria-labelledby="add-ons-title"
        className={`grid transition-[grid-template-rows] duration-300 ease-out-strong motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          {shown && (
            <ul className="addon-row relative flex gap-2.5 overflow-x-auto px-5 pb-4 pt-1">
              <AnimatePresence initial mode="popLayout">
                {picks.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.6, rotate: lean(p.id) }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 380,
                        damping: 17,
                        delay: Math.min(i, 5) * 0.05,
                        opacity: { duration: 0.2, delay: Math.min(i, 5) * 0.05 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      rotate: -lean(p.id),
                      transition: { duration: 0.22, ease: EASE_OUT },
                    }}
                    className="w-[84px] shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => addItem({ name: p.name, price: p.price, img: thumbOf(p.img) })}
                      aria-label={`Agregar ${p.name} al pedido, ${p.price}`}
                      data-testid={`add-on-${p.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                      className="addon-tile group block w-full text-left"
                    >
                      <span className="relative block">
                        <ProductThumb
                          src={thumbOf(p.img)}
                          alt=""
                          width={84}
                          height={84}
                          loading="lazy"
                          decoding="async"
                          className="h-[84px] w-[84px] rounded-lg border border-white/5"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-[#FF6600] text-white shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors group-hover:bg-[#FF8533]"
                        >
                          <Plus size={16} strokeWidth={2.8} />
                        </span>
                      </span>
                      <span className="mt-2 block line-clamp-2 font-heading text-[0.95rem] leading-[1.05] tracking-wide text-white">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block font-heading text-sm text-[#FF6600]">{p.price}</span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
