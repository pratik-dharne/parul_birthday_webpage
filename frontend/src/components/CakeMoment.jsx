import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mic, Flame, RotateCcw, Sparkles, MousePointerClick } from "lucide-react";

const CONFETTI_COLORS = ["#F4C2D7", "#E3C9FF", "#E86A92", "#F7D070", "#9E4770"];
const CANDLE_COUNT = 5;
const BLOW_THRESHOLD = 0.028;
const BLOW_FRAMES_NEEDED = 6;

const FlameWisp = ({ lit }) => (
  <div className="relative h-8 w-5 flex items-end justify-center">
    <AnimatePresence mode="wait">
      {lit ? (
        <motion.div
          key="flame"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.15 } }}
          className="h-6 w-4 origin-bottom animate-[flame-flicker_0.9s_ease-in-out_infinite] rounded-[50%_50%_50%_50%/62%_62%_38%_38%]"
          style={{
            background: "radial-gradient(circle at 50% 70%, #FFF6D8 0%, #F7D070 45%, #E8865A 80%, #E86A92 100%)",
            boxShadow: "0 0 18px 6px rgba(247, 208, 112, 0.55)",
          }}
        />
      ) : (
        <motion.span
          key="smoke"
          initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -34, scale: 1.5 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute bottom-2 h-3 w-3 rounded-full bg-[#7C6377]/50 blur-[3px]"
        />
      )}
    </AnimatePresence>
  </div>
);

export default function CakeMoment() {
  const [lit, setLit] = useState(Array(CANDLE_COUNT).fill(true));
  const [micOn, setMicOn] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [strength, setStrength] = useState(0);
  const [messageShown, setMessageShown] = useState(false);
  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const lastPuff = useRef(0);

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) {
      audioRef.current.stream.getTracks().forEach((t) => t.stop());
      audioRef.current.ctx.close().catch(() => {});
      audioRef.current = null;
    }
    setMicOn(false);
    setStrength(0);
  };

  useEffect(() => stopMic, []);

  const extinguishNext = () => {
    const now = Date.now();
    if (now - lastPuff.current < 450) return;
    lastPuff.current = now;
    setLit((prev) => {
      const idx = prev.indexOf(true);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
      });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      await ctx.resume();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      audioRef.current = { stream, ctx, analyser };
      setMicOn(true);
      setMicDenied(false);
      const data = new Uint8Array(analyser.fftSize);
      let smooth = 0;
      let blowFrames = 0;
      const loop = () => {
        if (!audioRef.current) return;
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        smooth = smooth * 0.55 + rms * 0.45;
        setStrength(Math.min(1, smooth * 8));
        if (smooth > BLOW_THRESHOLD) {
          blowFrames += 1;
          if (blowFrames >= BLOW_FRAMES_NEEDED) {
            extinguishNext();
            blowFrames = 0;
          }
        } else {
          blowFrames = Math.max(0, blowFrames - 2);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {
      setMicDenied(true);
    }
  };

  const blowOut = (i) =>
    setLit((prev) => prev.map((l, idx) => (idx === i ? false : l)));

  const allOut = lit.every((l) => !l);

  useEffect(() => {
    if (!allOut) return;
    stopMic();
    const t = setTimeout(() => {
      confetti({ particleCount: 140, angle: 60, spread: 65, origin: { x: 0, y: 0.7 }, colors: CONFETTI_COLORS });
      confetti({ particleCount: 140, angle: 120, spread: 65, origin: { x: 1, y: 0.7 }, colors: CONFETTI_COLORS });
      setMessageShown(true);
    }, 600);
    return () => clearTimeout(t);
  }, [allOut]);

  const relight = () => {
    setLit(Array(CANDLE_COUNT).fill(true));
    setMessageShown(false);
  };

  return (
    <section id="cake" data-testid="cake-moment" className="relative py-24 sm:py-32 px-6 overflow-hidden bg-[#F5E9F3]/40">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">The grand finale</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] mb-4">
            Blow out the candles, Parul
          </h2>
          <p className="flex items-center justify-center gap-2 text-sm sm:text-base text-[#7C6377] mb-14">
            <MousePointerClick size={15} className="text-[#9E4770]" />
            Use your microphone and really blow — or tap each flame
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-fit"
        >
          <div className="relative z-10 flex justify-center gap-5 sm:gap-7">
            {lit.map((isLit, i) => (
              <button
                key={i}
                data-testid={`candle-${i + 1}`}
                onClick={() => blowOut(i)}
                aria-label={`Blow out candle ${i + 1}`}
                className="flex flex-col items-center cursor-pointer focus:outline-none group"
              >
                <FlameWisp lit={isLit} />
                <div
                  className="h-16 sm:h-20 w-2.5 rounded-full border border-white/60 shadow-sm group-hover:scale-y-105 transition-transform origin-bottom"
                  style={{
                    background:
                      i % 2 === 0
                        ? "repeating-linear-gradient(45deg, #ffffff 0 6px, #E86A92 6px 12px)"
                        : "repeating-linear-gradient(45deg, #ffffff 0 6px, #A678D8 6px 12px)",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="relative -mt-1 mx-auto w-60 sm:w-72">
            <div className="h-20 sm:h-24 rounded-t-3xl bg-[#F9F3E5] border border-[#F4C2D7]/60 shadow-[inset_0_-14px_24px_rgba(244,194,215,0.35)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-5 w-8 rounded-b-full bg-[#F4C2D7]" />
                ))}
              </div>
            </div>
            <div className="h-24 sm:h-28 rounded-b-2xl bg-gradient-to-b from-[#F4C2D7] to-[#E8A8C4] shadow-[0_24px_50px_rgba(158,71,112,0.25)] relative overflow-hidden">
              <div className="absolute bottom-3 inset-x-0 flex justify-around opacity-70">
                {[0, 1, 2, 3].map((i) => (
                  <Sparkles key={i} size={13} className="text-white" />
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto -mt-2 h-5 w-72 sm:w-96 rounded-[50%] bg-white shadow-[0_10px_30px_rgba(158,71,112,0.15)] border border-[#F4C2D7]/40" />
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-4">
          {!micOn && !allOut && (
            <button
              data-testid="enable-mic-btn"
              onClick={startMic}
              className="inline-flex items-center gap-2 rounded-full bg-[#2D1527] text-white px-8 py-3.5 text-sm font-medium hover:bg-[#9E4770] transition-colors shadow-[0_16px_40px_rgba(45,21,39,0.25)]"
            >
              <Mic size={15} /> Enable mic &amp; blow
            </button>
          )}
          {micDenied && (
            <p data-testid="mic-denied-note" className="text-sm text-[#9E4770]">
              Microphone unavailable — no worries, just tap the flames instead.
            </p>
          )}
          {micOn && (
            <div data-testid="blow-strength-meter" className="flex items-center gap-3">
              <Flame size={15} className="text-[#E86A92]" />
              <div className="h-2 w-48 rounded-full bg-[#F4C2D7]/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F7D070] to-[#E86A92] transition-[width] duration-100"
                  style={{ width: `${Math.round(strength * 100)}%` }}
                />
              </div>
              <span className="text-xs text-[#7C6377]">blow into your mic!</span>
            </div>
          )}
        </div>

        <AnimatePresence>
          {messageShown && (
            <motion.div
              data-testid="birthday-message"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 card-surface rounded-3xl border border-[#F4C2D7]/60 px-8 sm:px-14 py-12 shadow-[0_24px_60px_rgba(158,71,112,0.18)]"
            >
              <Sparkles size={20} className="mx-auto text-[#E86A92] mb-6" />
              <p className="font-display text-3xl sm:text-4xl italic text-gradient-rose mb-6">Happy Birthday, Parul.</p>
              <p className="text-base sm:text-lg font-light text-[#4A3245] leading-relaxed max-w-xl mx-auto">
                Every candle is out — which means every single wish is officially in motion. May your year sparkle
                louder than these flames ever did, and may September 26 be only the beginning.
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770]">With all our love</p>
              <button
                data-testid="relight-candles-btn"
                onClick={relight}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#F4C2D7] bg-white/80 px-6 py-2.5 text-sm font-medium text-[#9E4770] hover:bg-[#F4C2D7]/30 transition-colors"
              >
                <RotateCcw size={14} /> Relight the candles
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
