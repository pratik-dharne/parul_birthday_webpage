import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export const FREQ = { G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
export const MELODY = [
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", 0.75], ["G4", 0.25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", 0.75], ["F5", 0.25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2.5],
];

const SONG_URL = "/audio/happy-birthday-parul.m4a";

export default function MusicToggle({ autostart = false }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SONG_URL);
      audioRef.current.loop = true;
    }
    return audioRef.current;
  };

  const start = async () => {
    try {
      await getAudio().play();
      setPlaying(true);
      return true;
    } catch {
      return false;
    }
  };

  const stop = () => {
    if (audioRef.current) audioRef.current.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (!autostart) return;
    let cancelled = false;
    start().then((ok) => {
      if (ok || cancelled) return;
      window.addEventListener("pointerdown", () => start(), { once: true });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autostart]);

  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    },
    []
  );

  return (
    <motion.button
      data-testid="music-toggle-btn"
      onClick={() => (playing ? stop() : start())}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label={playing ? "Mute birthday song" : "Play birthday song"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-[#F4C2D7]/70 bg-white/80 backdrop-blur-xl px-4 py-3 shadow-[0_12px_32px_rgba(158,71,112,0.22)] hover:bg-[#F4C2D7]/40 transition-colors cursor-pointer"
    >
      <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-[#E86A92] origin-bottom"
            style={
              playing
                ? { animation: `eq-bounce 0.9s ease-in-out ${i * 0.15}s infinite`, height: "100%" }
                : { height: "6px" }
            }
          />
        ))}
      </span>
      {playing ? <Music size={16} className="text-[#9E4770]" /> : <VolumeX size={16} className="text-[#7C6377]" />}
      <span className="text-xs font-medium text-[#4A3245]">{playing ? "Playing" : "Play song"}</span>
      <style>{`@keyframes eq-bounce { 0%,100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }`}</style>
    </motion.button>
  );
}
