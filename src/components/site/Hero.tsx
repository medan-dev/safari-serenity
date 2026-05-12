"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import heroImg from "@/assets/hero-savannah.jpg";

const phrases = [
  "Track silverbacks in Bwindi.",
  "Chase the Great Migration.",
  "Sleep beneath Kilimanjaro.",
  "Stand where rivers thunder.",
];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = phrases[i];
    const speed = del ? 28 : 55;
    const t = setTimeout(() => {
      if (!del && text.length < full.length) setText(full.slice(0, text.length + 1));
      else if (!del && text.length === full.length) setTimeout(() => setDel(true), 1600);
      else if (del && text.length > 0) setText(full.slice(0, text.length - 1));
      else { setDel(false); setI((i + 1) % phrases.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

export function Hero() {
  const typed = useTyping();

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ height: '100dvh' }}>
      <img
        src={heroImg.src}
        alt="African savannah at sunset"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* floating badge */}
      <div className="absolute top-28 right-6 md:right-14 hidden lg:flex animate-float">
        <div className="glass-dark text-white rounded-2xl px-5 py-4 max-w-[230px]">
          <div className="text-[11px] uppercase tracking-[0.18em] text-gold">Live now</div>
          <div className="font-display text-lg leading-tight mt-1">Migration river crossings — Mara</div>
        </div>
      </div>

      <div className="relative z-10 h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <div className="inline-flex items-center gap-2 self-start rounded-full glass-dark px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold">
          <Compass className="h-3.5 w-3.5" />
          Pan-African safaris · Est. 2008
        </div>

        <h1 className="font-display text-white text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] mt-6 max-w-4xl text-balance">
          The wild, <span className="text-gold italic">unscripted</span>.
        </h1>

        <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 min-h-[3.5rem]">
          {typed}
          <span className="inline-block w-[2px] h-[1.1em] align-[-0.15em] bg-gold ml-1 animate-caret" />
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl">
            <Link href="/book">
              Plan your journey <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/destinations">Explore destinations</Link>
          </Button>
        </div>

        {/* trust strip */}
        <div className="mt-12 grid grid-cols-3 max-w-2xl gap-6 text-white">
          {[
            { k: "12", l: "Countries" },
            { k: "180+", l: "Hand-picked lodges" },
            { k: "4.9★", l: "From 2,400 guests" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl text-gold font-semibold">{s.k}</div>
              <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* curved bottom mask blending into next section */}
      <div className="absolute inset-x-0 -bottom-[1px] h-16 bg-background [clip-path:ellipse(75%_100%_at_50%_100%)]" />
    </section>
  );
}