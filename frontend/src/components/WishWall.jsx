import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Heart, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const COLORS = [
  { id: "rose", hex: "#E86A92" },
  { id: "lavender", hex: "#A678D8" },
  { id: "gold", hex: "#D9A62E" },
  { id: "mulberry", hex: "#9E4770" },
];

const hexOf = (id) => COLORS.find((c) => c.id === id)?.hex || "#E86A92";

export default function WishWall() {
  const [wishes, setWishes] = useState([]);
  const [form, setForm] = useState({ name: "", tag: "", message: "", color: "rose" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/wishes`)
      .then((res) => setWishes(res.data))
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please add your name and a message.");
      return;
    }
    setSending(true);
    try {
      const res = await axios.post(`${API}/wishes`, form);
      setWishes((w) => [res.data, ...w]);
      setForm({ name: "", tag: "", message: "", color: "rose" });
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { x: e.nativeEvent.clientX / window.innerWidth, y: e.nativeEvent.clientY / window.innerHeight },
        colors: ["#F4C2D7", "#E3C9FF", "#E86A92", "#F7D070"],
      });
      toast.success("Your wish is on the wall for Parul.");
    } catch {
      toast.error("Could not post your wish. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="wishes" data-testid="message-wall" className="py-24 sm:py-32 px-6 bg-[#FAF4F7]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">The wish wall</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527]">
            Leave a little love for Parul
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.form
            onSubmit={submit}
            data-testid="wish-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 card-surface rounded-3xl border border-[#F4C2D7]/50 p-8 sm:p-10 shadow-[0_16px_40px_rgba(158,71,112,0.10)] self-start"
          >
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[#9E4770] mb-2">Your name</label>
            <input
              data-testid="wish-input-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={60}
              placeholder="e.g. Aisha"
              className="w-full rounded-xl border border-[#F4C2D7]/70 bg-white/80 px-4 py-3 text-sm text-[#2D1527] outline-none focus:border-[#E86A92] transition-colors mb-6"
            />

            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[#9E4770] mb-2">Who are you to Parul?</label>
            <input
              data-testid="wish-input-tag"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              maxLength={40}
              placeholder="Bestie, college pal, family..."
              className="w-full rounded-xl border border-[#F4C2D7]/70 bg-white/80 px-4 py-3 text-sm text-[#2D1527] outline-none focus:border-[#E86A92] transition-colors mb-6"
            />

            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[#9E4770] mb-2">Your wish</label>
            <textarea
              data-testid="wish-input-message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={500}
              rows={4}
              placeholder="Pour your heart out..."
              className="w-full rounded-xl border border-[#F4C2D7]/70 bg-white/80 px-4 py-3 text-sm text-[#2D1527] outline-none focus:border-[#E86A92] transition-colors resize-none mb-6"
            />

            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-[#9E4770] mb-3">Pick an accent</label>
            <div className="flex gap-3 mb-8">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-testid={`wish-color-${c.id}`}
                  onClick={() => setForm({ ...form, color: c.id })}
                  aria-pressed={form.color === c.id}
                  className={`h-8 w-8 rounded-full transition-transform ${form.color === c.id ? "scale-125 ring-2 ring-offset-2 ring-[#2D1527]/30" : "hover:scale-110"}`}
                  style={{ background: c.hex }}
                  aria-label={`Choose ${c.id} accent`}
                />
              ))}
            </div>

            <button
              type="submit"
              data-testid="submit-wish-button"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2D1527] text-white px-8 py-3.5 text-sm font-medium hover:bg-[#9E4770] transition-colors disabled:opacity-60"
            >
              <Send size={15} /> {sending ? "Sending..." : "Pin it to the wall"}
            </button>
          </motion.form>

          <div className="lg:col-span-3 columns-1 sm:columns-2 gap-5 [column-fill:_balance]">
            <AnimatePresence>
              {wishes.map((w) => (
                <motion.article
                  key={w.id}
                  data-testid={`wish-card-${w.id}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5 break-inside-avoid rounded-3xl bg-white/80 backdrop-blur border border-[#F4C2D7]/40 p-7 shadow-[0_10px_30px_rgba(158,71,112,0.08)]"
                  style={{ borderLeft: `4px solid ${hexOf(w.color)}` }}
                >
                  <p className="font-display italic text-lg text-[#2D1527] leading-relaxed mb-5">“{w.message}”</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart size={13} style={{ color: hexOf(w.color) }} fill={hexOf(w.color)} />
                    <span className="font-medium text-[#2D1527]">{w.name}</span>
                    {w.tag && <span className="text-xs text-[#7C6377]">· {w.tag}</span>}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {wishes.length === 0 && (
              <p data-testid="wish-wall-empty" className="text-sm text-[#7C6377]">Be the first to leave a wish.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
