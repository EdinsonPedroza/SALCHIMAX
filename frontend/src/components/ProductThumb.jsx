import { useEffect, useRef, useState } from "react";
import { UtensilsCrossed } from "lucide-react";

// A product photo that never shows the browser's broken-image glyph with its alt text.
// A failed request is often a blip, so it retries once, quietly (cache-busted, after a
// short pause); if that fails too it stays as a dark tile with a fork-and-knife icon.
// The icon also sits behind the photo, so it doubles as the loading placeholder.
export default function ProductThumb({ src, alt, className = "", ...rest }) {
  const [tries, setTries] = useState(0); // 0 first load, 1 quiet retry, 2 gave up
  const [failed, setFailed] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleError = () => {
    setFailed(true);
    if (tries >= 1) {
      setTries(2);
      return;
    }
    timer.current = setTimeout(() => setTries(1), 800);
  };

  const url = tries === 1 ? `${src}${src.includes("?") ? "&" : "?"}retry=1` : src;

  return (
    <span className={`relative block overflow-hidden bg-[#1A1A1A] ${className}`}>
      <UtensilsCrossed
        aria-hidden="true"
        size={22}
        className="absolute inset-0 m-auto text-[#FF6600]/40"
      />
      {tries < 2 && (
        <img
          src={url}
          alt={alt}
          onError={handleError}
          onLoad={() => setFailed(false)}
          className={`relative h-full w-full object-cover${failed ? " invisible" : ""}`}
          {...rest}
        />
      )}
    </span>
  );
}
