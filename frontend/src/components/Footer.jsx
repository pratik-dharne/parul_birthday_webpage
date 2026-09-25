import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Gift } from "lucide-react";

export default function Footer() {
  const ctxRef = useRef(null);
  const lastShake = useRef(0);

  const playRuffle = () => {
    const now = Date.now();
    if (now - lastShake.current < 500) return;
    lastShake.current = now;
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      ctx.resume().catch(() => {});
      const dur = 0.4;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2600;
      filter.Q.value = 1.2;
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, t);
      [0, 0.12, 0.24].forEach((offset, i) => {
        gain.gain.exponentialRampToValueAtTime(0.14 - i * 0.04, t + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.1);
      });
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(t);
    } catch {}
  };

  return (
    <footer data-testid="footer-section" className="relative bg-[#2D1527] text-[#F9F3E5] py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 120%, rgba(232,106,146,0.5) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#F4C2D7]/70 mb-8 flex items-center justify-center gap-2">
          <Sparkles size={13} /> September 26 <Sparkles size={13} />
        </p>
        <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic leading-tight">
          Made for <span className="text-[#E86A92]">Parul</span>
        </p>
        <p
          data-testid="footer-drawer-note"
          onMouseEnter={playRuffle}
          className="group mt-6 font-display italic text-lg sm:text-xl text-[#F7D070]/90 inline-flex items-center justify-center gap-2.5 cursor-default"
        >
          <Gift
            size={22}
            aria-hidden="true"
            data-testid="footer-gift-icon"
            className="text-[#E86A92] shrink-0 group-hover:animate-[gift-wiggle_0.55s_ease-in-out_2]"
          />
          <span>P.S. 👀 If you’re coming to the office on Monday, you might want to check your drawer… 🎁✨😉</span>
        </p>
        <p className="mt-8 text-sm text-[#F9F3E5]/60 font-light">
          May this year be your softest, bravest, brightest one yet.
        </p>
        <a
          href="#hero"
          data-testid="back-to-top-btn"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-[#F4C2D7]/40 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#F4C2D7] hover:bg-[#F4C2D7]/10 transition-colors"
        >
          <ArrowUp size={13} /> Back to the top
        </a>
      </motion.div>
    </footer>
  );
}
