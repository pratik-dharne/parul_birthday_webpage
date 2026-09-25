import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1654605218844-4b250fd445a7?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Make a wish",
    overlay: "Happy Birthday Parul",
    span: "sm:col-span-7 sm:row-span-2",
    ratio: "aspect-[4/3] sm:aspect-auto sm:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1672424290532-65e205435307?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Bloom where you are",
    span: "sm:col-span-5",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1616369939022-b6e3e7a82295?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Soft like rose petals",
    span: "sm:col-span-5",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Every light for you",
    span: "sm:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1747576660172-949fe54dee36?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Sweetest day of the year",
    span: "sm:col-span-8",
    ratio: "aspect-[16/9]",
  },
];

export default function Gallery() {
  return (
    <section id="memories" data-testid="photo-gallery" className="py-24 sm:py-32 px-6 bg-[#F5E9F3]/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9E4770] mb-4">Memory wall</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#2D1527]">
              Moments worth keeping
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-[#7C6377]" data-testid="gallery-hint">
            <Camera size={15} className="text-[#9E4770]" /> Swap these with your favourite photos of Parul
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={i}
              data-testid={`gallery-photo-${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_16px_40px_rgba(158,71,112,0.12)] ${p.span} ${p.ratio}`}
            >
              <img
                src={p.src}
                alt={p.overlay || p.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {p.overlay && (
                <div
                  data-testid="gallery-cake-overlay"
                  className="absolute inset-0 flex items-center justify-center bg-[#2D1527]/30"
                >
                  <span className="font-display italic text-3xl sm:text-5xl text-white text-center px-6 leading-snug drop-shadow-[0_4px_20px_rgba(45,21,39,0.65)]">
                    {p.overlay}
                  </span>
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2D1527]/60 to-transparent p-5 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="font-display italic text-lg text-white">{p.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
