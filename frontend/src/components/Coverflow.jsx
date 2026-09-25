import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  "/photos/collage-1.jpg",
  "/photos/collage-2.jpg",
  "/photos/collage-3.jpg",
  "/photos/collage-4.jpg",
];

export default function Coverflow() {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const n = SLIDES.length;

  const go = (dir) => setActive((a) => (a + dir + n) % n);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (dx > 40) go(-1);
    else if (dx < -40) go(1);
    startX.current = null;
  };

  return (
    <div
      data-testid="coverflow"
      className="absolute inset-0 [perspective:1100px] touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (startX.current = null)}
    >
      {SLIDES.map((src, i) => {
        let d = i - active;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return (
          <div
            key={i}
            data-testid={`coverflow-slide-${i + 1}`}
            className="absolute left-1/2 top-1/2 h-[86%] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-[0_18px_44px_rgba(45,21,39,0.35)] transition-all duration-500 ease-out"
            style={{
              transform: `translate(-50%, -50%) translateX(${d * 46}%) translateZ(${-Math.abs(d) * 150}px) rotateY(${d * -38}deg)`,
              zIndex: 10 - Math.abs(d),
              opacity: Math.abs(d) > 1.5 ? 0 : 1,
            }}
          >
            <img src={src} alt={`Collage moment ${i + 1}`} draggable={false} className="h-full w-full object-cover" />
          </div>
        );
      })}

      <button
        data-testid="coverflow-prev"
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/85 backdrop-blur p-2 shadow-md hover:bg-white hover:scale-110 transition-all cursor-pointer"
      >
        <ChevronLeft size={16} className="text-[#9E4770]" />
      </button>
      <button
        data-testid="coverflow-next"
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/85 backdrop-blur p-2 shadow-md hover:bg-white hover:scale-110 transition-all cursor-pointer"
      >
        <ChevronRight size={16} className="text-[#9E4770]" />
      </button>
    </div>
  );
}
