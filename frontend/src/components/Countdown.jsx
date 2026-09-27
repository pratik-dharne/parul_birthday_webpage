import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

const BIRTH_YEAR = 2003;
const BIRTH_MONTH = 8; // September (0-based)
const BIRTH_DAY = 26;

function getState() {
  const now = new Date();
  const start = new Date(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY);
  const end = new Date(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY + 1);

  const age = now >= start ? now.getFullYear() - BIRTH_YEAR : now.getFullYear() - BIRTH_YEAR - 1;

  if (now >= start && now < end) {
    return { isToday: true, diff: 0, age };
  }

  const target =
    now < start
      ? start
      : new Date(now.getFullYear() + 1, BIRTH_MONTH, BIRTH_DAY);

  return {
    isToday: false,
    diff: target - now,
    nextAge: now < start ? now.getFullYear() - BIRTH_YEAR : now.getFullYear() + 1 - BIRTH_YEAR,
  };
}

const pad = (n) => String(n).padStart(2, "0");

const ordinal = (n) => {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
};

const CONFETTI_COLORS = [
  "#E86A92",
  "#F4C2D7",
  "#9E4770",
  "#FFD166",
  "#7BC8A4",
  "#7AA7E8",
];

const confettiPieces = Array.from({ length: 90 }, (_, i) => ({
  left: `${(i * 41) % 101}%`,
  delay: `${(i % 18) * 0.06}s`,
  duration: `${3.2 + (i % 8) * 0.18}s`,
  rotation: `${(i * 47) % 360}deg`,
  drift: `${((i * 29) % 260) - 130}px`,
  size: `${7 + (i % 4) * 2}px`,
}));

const Confetti = () => (
  <div
    data-testid="countdown-confetti"
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
  >
    <style>{`
      @keyframes birthday-confetti-fall {
        0% {
          transform: translate3d(0, -12vh, 0) rotate(var(--rotation));
          opacity: 0;
        }
        8% {
          opacity: 1;
        }
        100% {
          transform: translate3d(var(--drift), 112vh, 0) rotate(calc(var(--rotation) + 900deg));
          opacity: 0;
        }
      }
    `}</style>

    {confettiPieces.map((piece, index) => (
      <span
        key={index}
        className="absolute top-0 block rounded-sm"
        style={{
          left: piece.left,
          width: piece.size,
          height: `${Number.parseInt(piece.size, 10) * 1.8}px`,
          backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          animation: `birthday-confetti-fall ${piece.duration} cubic-bezier(0.22, 0.61, 0.36, 1) ${piece.delay} 1 both`,
          ["--rotation"]: piece.rotation,
          ["--drift"]: piece.drift,
        }}
      />
    ))}
  </div>
);

const Unit = ({ value, label, testid }) => (
  <div className="card-surface rounded-3xl border border-[#F4C2D7]/50 backdrop-blur px-6 sm:px-10 py-8 text-center shadow-[0_16px_40px_rgba(158,71,112,0.10)]">
    <div data-testid={testid} className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2D1527] tabular-nums">
      {value}
    </div>
    <div className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770]">{label}</div>
  </div>
);

export default function Countdown({ unlocked }) {
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
      {state.isToday && unlocked && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">
          The big day approaches
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] mb-12">
          {state.isToday
            ? `It's today. Let the celebration begin.`
            : `Counting down to Parul's ${ordinal(state.nextAge)} birthday`}
        </h2>

        {state.isToday ? (
          <div data-testid="countdown-today" className="flex items-center justify-center gap-3 text-[#E86A92]">
            <PartyPopper size={28} />
            <span className="font-display text-3xl sm:text-4xl italic">
              Happy {ordinal(state.age)} Birthday, Parul!
            </span>
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
