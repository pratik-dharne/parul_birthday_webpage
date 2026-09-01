import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
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
          Made with love, for <span className="text-[#E86A92]">Parul</span>
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
