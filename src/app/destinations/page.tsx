"use client";

import { useMemo, useState } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/site/DestinationCard";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/dest-serengeti.jpg";
import { cn } from "@/lib/utils";

const categories = ["All", "Wildlife", "Landscape", "Cultural", "Beach"] as const;

export default function DestinationsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = useMemo(
    () => (cat === "All" ? destinations : destinations.filter((d) => d.category === cat)),
    [cat],
  );

  return (
    <>
      <PageHero
        eyebrow="The atlas"
        title="Every journey is hand-stitched."
        subtitle="From rainforests to red dunes — twelve countries, infinite afternoons."
        image={heroImg.src}
      />
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-smooth border",
                cat === c
                  ? "bg-gradient-forest text-primary-foreground border-transparent shadow-elevated"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
        </div>
      </section>
    </>
  );
}
