import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

function getState() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 8, 26);
  const end = new Date(now.getFullYear(), 8, 27);
  if (now >= start && now < end) return { isToday: true, diff: 0 };
  const target = now < start ? start : new Date(now.getFullYear() + 1, 8, 26);
  return { isToday: false, diff: target - now };
}

const pad = (n) => String(n).padStart(2, "0");

const Unit = ({ value, label, testid }) => (
  <div className="card-surface rounded-3xl border border-[#F4C2D7]/50 backdrop-blur px-6 sm:px-10 py-8 text-center shadow-[0_16px_40px_rgba(158,71,112,0.10)]">
    <div data-testid={testid} className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2D1527] tabular-nums">
      {value}
    </div>
    <div className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770]">{label}</div>
  </div>
);

export default function Countdown() {
  const [state, setState] = useState(getState);

  useEffect(() => {
    const t = setInterval(() => setState(getState()), 1000);
    return () => clearInterval(t);
  }, []);

  const days = Math.floor(state.diff / 86400000);
  const hours = Math.floor((state.diff % 86400000) / 3600000);
  const minutes = Math.floor((state.diff % 3600000) / 60000);
  const seconds = Math.floor((state.diff % 60000) / 1000);

  return (
    <section id="countdown" data-testid="countdown-timer" className="relative py-24 sm:py-32 px-6 bg-[#FAF4F7]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">The big day approaches</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] mb-12">
          {state.isToday ? "It's today. Let the celebration begin." : "Counting down to September 26"}
        </h2>

        {state.isToday ? (
          <div data-testid="countdown-today" className="flex items-center justify-center gap-3 text-[#E86A92]">
            <PartyPopper size={28} />
            <span className="font-display text-3xl sm:text-4xl italic">Happy Birthday, Parul!</span>
            <PartyPopper size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <Unit value={pad(days)} label="Days" testid="countdown-days" />
            <Unit value={pad(hours)} label="Hours" testid="countdown-hours" />
            <Unit value={pad(minutes)} label="Minutes" testid="countdown-minutes" />
            <Unit value={pad(seconds)} label="Seconds" testid="countdown-seconds" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
