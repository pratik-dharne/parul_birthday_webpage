import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, Flame } from "lucide-react";
import { GRADS } from "@/components/Hero";

const CONFETTI_COLORS = ["#F4C2D7", "#E3C9FF", "#E86A92", "#F7D070", "#9E4770"];

const BALLOONS = [
  { grad: "rose", size: 90 },
  { grad: "lavender", size: 110 },
  { grad: "gold", size: 80 },
  { grad: "rose", size: 100 },
  { grad: "lavender", size: 88 },
];

const burst = (e, count = 70) => {
  confetti({
    particleCount: count,
    spread: 75,
    startVelocity: 32,
    origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
    colors: CONFETTI_COLORS,
  });
};

export default function SurpriseZone() {
  const [popped, setPopped] = useState({});
  const [wishSent, setWishSent] = useState(false);
  const allPopped = BALLOONS.every((_, i) => popped[i]);

  const pop = (i, e) => {
    if (popped[i]) return;
    setPopped((p) => ({ ...p, [i]: true }));
    burst(e);
  };

  const makeAWish = (e) => {
    burst(e, 100);
    confetti({ particleCount: 130, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors: CONFETTI_COLORS });
    confetti({ particleCount: 130, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors: CONFETTI_COLORS });
    setWishSent(true);
  };

  return (
    <section id="surprises" data-testid="interactive-surprises" className="relative py-24 sm:py-32 px-6 overflow-hidden hero-glow">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">A little mischief</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] mb-4">
            Pop the balloons, make a wish
          </h2>
          <p className="text-sm sm:text-base text-[#7C6377] mb-14">Go on — they are begging to be popped.</p>
        </motion.div>

        <div className="flex items-end justify-center gap-4 sm:gap-8 min-h-[220px] flex-wrap">
          <AnimatePresence>
            {BALLOONS.map((b, i) =>
              popped[i] ? null : (
                <motion.button
                  key={i}
                  data-testid={`pop-balloon-btn-${i + 1}`}
                  onClick={(e) => pop(i, e)}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer focus:outline-none"
                  aria-label={`Pop balloon ${i + 1}`}
                >
                  <div
                    className="animate-[float-y_6s_ease-in-out_infinite]"
                    style={{ animationDuration: `${5 + i}s`, animationDelay: `${i * 0.5}s` }}
                  >
                    <div
                      className="rounded-[50%_50%_50%_50%/58%_58%_42%_42%] shadow-[0_18px_36px_rgba(232,106,146,0.28)]"
                      style={{ width: b.size, height: b.size * 1.18, background: GRADS[b.grad] }}
                    />
                    <div className="mx-auto w-px bg-[#9E4770]/30" style={{ height: b.size * 0.7 }} />
                  </div>
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>

        {allPopped && (
          <motion.button
            data-testid="reset-balloons-btn"
            onClick={() => setPopped({})}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#F4C2D7] bg-white/80 px-6 py-2.5 text-sm font-medium text-[#9E4770] hover:bg-[#F4C2D7]/30 transition-colors"
          >
            <RotateCcw size={14} /> Blow them up again
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-20"
        >
          <button
            data-testid="make-wish-button"
            onClick={makeAWish}
            className="group inline-flex items-center gap-3 rounded-full bg-[#2D1527] text-white px-10 py-4 text-sm font-medium tracking-wide shadow-[0_20px_50px_rgba(45,21,39,0.3)] hover:bg-[#9E4770] transition-colors"
          >
            <Flame size={17} className="text-[#F7D070] group-hover:scale-125 transition-transform" />
            Make a wish for Parul
          </button>
          <AnimatePresence>
            {wishSent && (
              <motion.p
                data-testid="wish-sent-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 font-display italic text-xl text-[#9E4770]"
              >
                <Sparkles size={15} className="inline mr-2 -mt-1" />
                Your wish is on its way to the stars.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
