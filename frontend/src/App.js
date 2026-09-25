import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Marquee from "@/components/Marquee";
import Chapters from "@/components/Chapters";
import Gallery from "@/components/Gallery";
import SurpriseZone from "@/components/SurpriseZone";
import CakeMoment from "@/components/CakeMoment";
import MusicToggle from "@/components/MusicToggle";
import PasswordGate, { isBirthdayOrLater } from "@/components/PasswordGate";
import Footer from "@/components/Footer";

const Nav = () => (
  <nav
    data-testid="main-nav"
    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-6 rounded-full border border-[#F4C2D7]/60 bg-white/70 backdrop-blur-xl px-4 sm:px-6 py-2.5 shadow-[0_8px_30px_rgba(158,71,112,0.12)]"
  >
    <a
      href="#hero"
      data-testid="nav-logo"
      className="font-display text-lg font-medium text-[#2D1527] whitespace-nowrap"
    >
      Parul<span className="text-[#E86A92]">·26</span>
    </a>
    <div className="hidden md:flex items-center gap-5 text-xs font-medium uppercase tracking-[0.15em] text-[#7C6377]">
      <a data-testid="nav-link-countdown" href="#countdown" className="hover:text-[#9E4770] transition-colors">Countdown</a>
      <a data-testid="nav-link-chapters" href="#chapters" className="hover:text-[#9E4770] transition-colors">Chapters</a>
      <a data-testid="nav-link-memories" href="#memories" className="hover:text-[#9E4770] transition-colors">Memories</a>
      <a data-testid="nav-link-cake" href="#cake" className="hover:text-[#9E4770] transition-colors">Cake</a>
    </div>
    <a
      href="#surprises"
      data-testid="nav-pop-balloon-cta"
      className="flex items-center gap-1.5 rounded-full bg-[#2D1527] text-white text-xs font-medium px-4 py-2 hover:bg-[#9E4770] transition-colors"
    >
      <Sparkles size={13} /> Pop a balloon
    </a>
  </nav>
);

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => isBirthdayOrLater() || localStorage.getItem("parul-unlocked") === "yes"
  );

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#FFFDF9] text-[#4A3245] antialiased overflow-x-clip">
      <AnimatePresence>
        {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <Countdown />
        <Marquee />
        <Chapters />
        <Gallery />
        <SurpriseZone />
        <CakeMoment />
      </main>
      <Footer />
      <MusicToggle autostart={unlocked} />
      <Toaster position="bottom-center" />
    </div>
  );
}
