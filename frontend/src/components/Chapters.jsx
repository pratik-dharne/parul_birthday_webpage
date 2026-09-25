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
  {
    num: "05",
    title: "All the Colour We Need",
    text: "I've said this once, and I'll say it again — you don't need a colour. You already bring so much colour into everything around you. 🌈✨",
    wide: true,
  },
  {
    num: "06",
    title: "Sun-Bright, Moon-Calm",
    text: "May you shine as bright as the sun, but stay as cool and calm as the moon. 🌞🌙 Wishing you lots of happiness, success, laughter, and beautiful moments ahead. Have an amazing birthday! 🎂✨",
    wide: true,
  },
  {
    num: "07",
    title: "Never Dim Your Light",
    text: "People will always try to judge or bring down what they don’t understand. But please don’t let that make you sad or make you doubt yourself. ❤️ Remember, there are people who see you for who you truly are, believe in you, and will always be there to support you. Keep being yourself, keep shining, and don’t let anyone take away the light you bring into the world. ✨",
    wide: true,
  },
  {
    num: "08",
    title: "You Inspire Me",
    text: "If you remember, I told you this the very first time we spoke — the way you manage yourself and handle everything on your own has always inspired me. Cooking, managing the house, going to the market, handling work, staying away from your family, and even pushing through difficult days when you’re sick — you somehow keep going and give your best every single day. Seeing that motivates me to work harder too. No matter what you do or wherever you are, I’ll always respect and admire you. ❤️ They say, “God helps those who help themselves,” and seeing you makes me believe it. ✨",
    wide: true,
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
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527] max-w-xl">
          Chapters on why the world is better with you in it
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
            className={`card-surface rounded-3xl border border-[#F4C2D7]/50 p-10 sm:p-12 shadow-[0_16px_40px_rgba(158,71,112,0.08)] transition-shadow hover:shadow-[0_24px_60px_rgba(158,71,112,0.16)] ${
              c.wide ? "sm:col-span-2 text-center" : i % 2 === 1 ? "sm:mt-12" : ""
            }`}
          >
            <h3 className="font-display text-xl sm:text-2xl text-[#2D1527] mb-4">{c.title}</h3>
            <p className="text-sm sm:text-base text-[#4A3245] leading-relaxed">{c.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
