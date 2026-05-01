import { getDestination, destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = getDestination(params.slug);
  if (!d) return { title: "Not Found" };

  return {
    title: `${d.name} — Savana Safaris`,
    description: d.summary,
    openGraph: {
      title: `${d.name} — Savana`,
      description: d.summary,
      images: [typeof d.image === 'string' ? d.image : (d.image as any).src],
    },
  };
}

export default function DestinationDetail({ params }: { params: { slug: string } }) {
  const d = getDestination(params.slug);
  if (!d) notFound();

  return (
    <>
      <section className="relative h-[72svh] min-h-[520px] w-full overflow-hidden">
        <img src={d.image.src} alt={d.name} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-16 text-white">
          <div className="flex items-center gap-2 text-sm text-white/85">
            <MapPin className="h-4 w-4 text-gold" /> {d.country} · {d.region}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mt-3 max-w-4xl text-balance">{d.name}</h1>
          <p className="mt-3 text-xl text-gold italic">{d.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="glass-dark rounded-full px-4 py-2 inline-flex gap-2 items-center"><Star className="h-4 w-4 fill-gold text-gold" />{d.rating} · {d.reviews} reviews</span>
            <span className="glass-dark rounded-full px-4 py-2 inline-flex gap-2 items-center"><Clock className="h-4 w-4" />{d.duration}</span>
            <span className="glass-dark rounded-full px-4 py-2 inline-flex gap-2 items-center"><Calendar className="h-4 w-4" />{d.bestSeason}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.22em] text-earth">The journey</div>
          <p className="mt-3 font-display text-3xl md:text-4xl leading-snug text-pretty">{d.description}</p>

          <div className="mt-12">
            <h2 className="font-display text-2xl mb-5">What's inside</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border shadow-soft">
                  <span className="mt-0.5 h-6 w-6 grid place-items-center rounded-full bg-gradient-gold text-[var(--accent-foreground)]"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl mb-5">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {d.gallery.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                  <img src={typeof src === 'string' ? src : (src as any).src} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-110 transition-smooth duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-3xl bg-card shadow-elevated border border-border p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
            <div className="font-display text-4xl text-foreground">${d.fromPrice.toLocaleString()}<span className="text-base text-muted-foreground font-sans"> / person</span></div>

            <div className="mt-6 space-y-4">
              {d.packages.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border p-4 hover:border-foreground/30 transition-smooth">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-display text-lg">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.nights} nights</div>
                    </div>
                    <div className="text-gold font-semibold">${p.price.toLocaleString()}</div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {p.includes.map((i) => (
                      <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-[var(--primary-glow)] mt-0.5 shrink-0" />{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Button asChild variant="hero" size="xl" className="w-full mt-6">
              <Link href={`/book?destination=${d.slug}`}>Book this journey <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground text-center">Free 24-hour cancellation · ATOL protected</p>
          </div>
        </aside>
      </section>
    </>
  );
}
