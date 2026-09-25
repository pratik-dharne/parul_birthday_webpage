import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, Cake } from "lucide-react";

const PASSWORD = "parul26";

export const isBirthdayOrLater = () => {
  const now = new Date();
  const birthday = new Date(now.getFullYear(), 8, 26);
  return now >= birthday;
};

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      localStorage.setItem("parul-unlocked", "yes");
      onUnlock();
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 1800);
    }
  };

  return (
    <motion.div
      data-testid="password-gate"
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#2D1527] px-6"
    >
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#E86A92]/25 blur-[110px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#A678D8]/25 blur-[110px]" />
      <div className="absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-[#F7D070]/15 blur-[90px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md text-center"
      >
        <motion.div
          animate={error ? { x: [0, -10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-white/15 bg-white/[0.07] backdrop-blur-2xl px-8 sm:px-12 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#F4C2D7]/40 bg-[#E86A92]/15">
            <Lock size={24} className="text-[#F4C2D7]" />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#F4C2D7]/80 mb-4">Shh — it's a surprise</p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-white mb-4">Something special is blooming</h1>
          <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed mb-9">
            This page opens for everyone on <span className="text-[#F7D070]">September 26</span> — until then, it's
            password protected.
          </p>

          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              data-testid="gate-password-input"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the secret word"
              autoFocus
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-center text-sm text-white placeholder-white/40 outline-none focus:border-[#F4C2D7]/70 focus:bg-white/15 transition-colors"
            />
            <button
              data-testid="gate-unlock-btn"
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A92] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#F4C2D7] hover:text-[#2D1527] transition-colors"
            >
              <Sparkles size={15} /> Unlock the magic
            </button>
          </form>

          {error && (
            <p data-testid="gate-error" className="mt-4 text-sm text-[#F7D070]">
              Not quite — try again
            </p>
          )}
          <p className="mt-7 flex items-center justify-center gap-2 text-xs text-white/40">
            <Cake size={13} /> Hint: her name + her big day
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
