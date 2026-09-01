import { motion } from "framer-motion";

const CHAPTERS = [
  {
    num: "01",
    title: "The Light in Every Room",
    text: "Some people walk into a room and the whole place softens. That is you, Parul — warmth that asks for nothing and gives everything.",
  },
  {
    num: "02",
    title: "Unapologetically Radiant",
    text: "You laugh with your whole heart, dream with your whole mind, and love with your whole soul. Never shrink that for anyone.",
  },
  {
    num: "03",
    title: "A Year of Big Dreams & Laughter",
    text: "This past year you chased things that scared you and turned ordinary days into stories worth retelling. We noticed. We always notice.",
  },
  {
    num: "04",
    title: "Wishes for the Journey Ahead",
    text: "May September 26 open a chapter of soft mornings, brave choices, and love that finds you exactly where you are.",
  },
];

export default function Chapters() {
  return (
    <section id="chapters" data-testid="manifesto-chapters" className="py-24 sm:py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">A manifesto for Parul</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] max-w-xl">
          Four chapters on why the world is better with you in it
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {CHAPTERS.map((c, i) => (
          <motion.article
            key={c.num}
            data-testid={`chapter-${c.num}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className={`card-surface rounded-3xl border border-[#F4C2D7]/50 p-10 sm:p-12 shadow-[0_16px_40px_rgba(158,71,112,0.08)] transition-shadow hover:shadow-[0_24px_60px_rgba(158,71,112,0.16)] ${i % 2 === 1 ? "sm:mt-12" : ""}`}
          >
            <span className="font-display text-6xl font-light text-[#F4C2D7]">{c.num}</span>
            <h3 className="font-display text-xl sm:text-2xl text-[#2D1527] mt-6 mb-4">{c.title}</h3>
            <p className="text-sm sm:text-base text-[#4A3245] leading-relaxed">{c.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
