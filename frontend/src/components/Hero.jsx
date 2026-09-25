import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

export const GRADS = {
  rose: "radial-gradient(circle at 35% 30%, #ffffff 0%, #F4C2D7 45%, #E86A92 100%)",
  lavender: "radial-gradient(circle at 35% 30%, #ffffff 0%, #E3C9FF 45%, #A678D8 100%)",
  gold: "radial-gradient(circle at 35% 30%, #ffffff 0%, #F9F3E5 45%, #E9B949 100%)",
};

const BALLOONS = [
  { left: "5%", top: "20%", size: 86, grad: "rose", dur: 7, depth: 120 },
  { left: "15%", top: "60%", size: 54, grad: "lavender", dur: 9, depth: 220 },
  { left: "84%", top: "18%", size: 100, grad: "lavender", dur: 8, depth: 160 },
  { left: "76%", top: "64%", size: 60, grad: "rose", dur: 6, depth: 260 },
  { left: "44%", top: "10%", size: 44, grad: "gold", dur: 10, depth: 90 },
];

const MaskedLine = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yMed = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, 380]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const layers = [ySlow, yMed, yFast];

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-glow"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <motion.div key={i} className="absolute" style={{ left: b.left, top: b.top, y: layers[i % 3] }}>
            <div
              className="animate-[float-y_7s_ease-in-out_infinite]"
              style={{ animationDuration: `${b.dur}s`, animationDelay: `${i * 0.8}s` }}
            >
              <div
                className="rounded-[50%_50%_50%_50%/58%_58%_42%_42%] opacity-70 shadow-[0_20px_40px_rgba(232,106,146,0.25)]"
                style={{ width: b.size, height: b.size * 1.18, background: GRADS[b.grad] }}
              />
              <div className="mx-auto w-px bg-[#9E4770]/25" style={{ height: b.size * 0.9 }} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div style={{ opacity: fade }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F4C2D7] bg-white/70 backdrop-blur px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-10"
          data-testid="hero-date-pill"
        >
          <Sparkles size={13} /> September 26 <Sparkles size={13} />
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#2D1527]">
          <MaskedLine delay={0.5}>Happy Birthday,</MaskedLine>
          <MaskedLine delay={0.72} className="italic font-light text-gradient-rose">
            Parul
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mt-6 max-w-lg mx-auto font-display italic text-base sm:text-lg text-[#9E4770] leading-relaxed"
          data-testid="hero-flower-line"
        >
          Like the flower, symbolize quiet beauty, grace, and resilience. You never seek attention; you simply bring
          calm, warmth, and steadiness wherever you go, just by being yourself.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="mt-6 max-w-md mx-auto text-base sm:text-lg font-light text-[#4A3245] leading-relaxed"
          data-testid="hero-subtitle"
        >
          Celebrating another trip around the sun — and the wonderful person taking it.
        </motion.p>
      </motion.div>

      <motion.a
        href="#countdown"
        data-testid="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[#9E4770]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
