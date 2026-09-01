import { Sparkles } from "lucide-react";

const ITEMS = [
  "Wishing Parul the most magical year ever",
  "September 26",
  "Celebrate love & laughter",
  "Radiant vibes always",
  "Another year of being extraordinary",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center whitespace-nowrap">
        <span className="font-display italic text-2xl sm:text-3xl font-light text-[#9E4770]/50 px-8">{item}</span>
        <Sparkles size={16} className="text-[#F4C2D7]" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden py-10 border-y border-[#F4C2D7]/40 bg-[#FFFDF9]">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
