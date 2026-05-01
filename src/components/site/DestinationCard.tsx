import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";

export function DestinationCard({ d, priority = false }: { d: Destination; priority?: boolean }) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group relative block overflow-hidden rounded-3xl shadow-soft hover:shadow-elevated transition-smooth bg-card"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={d.image.src}
          alt={d.name}
          width={1280}
          height={896}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide glass-dark text-white uppercase">
          {d.category}
        </span>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold glass-dark text-white inline-flex items-center gap-1">
        <Star className="h-3 w-3 fill-gold text-gold" />
        {d.rating}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="flex items-center gap-1.5 text-xs text-white/80">
          <MapPin className="h-3.5 w-3.5" /> {d.country}
        </div>
        <h3 className="font-display text-2xl font-semibold mt-1.5 leading-tight">{d.name}</h3>
        <p className="text-sm text-white/80 mt-1.5 line-clamp-2">{d.tagline}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/60">From</div>
            <div className="font-display text-xl text-gold font-semibold">${d.fromPrice.toLocaleString()}</div>
          </div>
          <span className="h-10 w-10 rounded-full bg-gold text-[var(--accent-foreground)] grid place-items-center group-hover:rotate-45 transition-smooth">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}