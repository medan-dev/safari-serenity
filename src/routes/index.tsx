import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { DestinationCard } from "@/components/site/DestinationCard";
import { featuredDestinations, destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Compass, ShieldCheck, HeartHandshake, Quote } from "lucide-react";
import gorillas from "@/assets/dest-gorillas.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />

      {/* Featured destinations */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-earth">Featured journeys</div>
            <h2 className="font-display text-4xl md:text-6xl mt-3 max-w-2xl text-balance">
              Where the wild is still <span className="italic text-[var(--primary)]">writing the script</span>.
            </h2>
          </div>
          <Button asChild variant="ghost" className="self-start md:self-end">
            <Link to="/destinations">All destinations <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((d, i) => (
            <DestinationCard key={d.slug} d={d} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* Why us — split image */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold rounded-[2.5rem] opacity-20 blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elevated">
              <img src={gorillas} alt="Mountain gorilla in the rainforest" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 max-w-[220px] hidden md:block">
              <div className="text-xs uppercase tracking-wider text-earth">Conservation</div>
              <div className="font-display text-xl mt-1">5% of every booking funds anti-poaching</div>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-earth">Why Savana</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance">
              Crafted by guides — not by call centres.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Every itinerary is designed by someone who can name the trees and the predators.
              We partner with family-run camps, pay above industry guide rates, and route a fixed
              share of revenue back into the parks you visit.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Leaf, t: "Conservation funded" },
                { icon: Compass, t: "Local lead guides" },
                { icon: ShieldCheck, t: "ATOL protected" },
                { icon: HeartHandshake, t: "Real human concierge" },
              ].map((p) => (
                <div key={p.t} className="flex gap-3 items-center p-4 rounded-2xl bg-card border border-border">
                  <span className="h-10 w-10 rounded-xl bg-gradient-forest grid place-items-center shrink-0">
                    <p.icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="font-medium text-sm">{p.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <div className="text-xs uppercase tracking-[0.22em] text-earth">Across the continent</div>
        <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-3xl text-balance">
          Twelve countries. One operator who's been to every camp.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {destinations.slice(4, 7).map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-24">
        <figure className="rounded-[2.5rem] bg-gradient-forest text-primary-foreground p-10 md:p-16 relative overflow-hidden">
          <Quote className="h-12 w-12 text-gold opacity-50" />
          <blockquote className="font-display text-2xl md:text-4xl leading-snug mt-4 text-pretty">
            "We've been on twelve safaris. None came close to the silence we sat in with Savana —
            in a Bwindi clearing, a silverback breathing eight feet away. Worth every cent."
          </blockquote>
          <figcaption className="mt-6 text-sm text-primary-foreground/75">
            — Helena & Marcus · Stockholm · 14-day East Africa odyssey
          </figcaption>
        </figure>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="rounded-[2.5rem] bg-gradient-gold p-10 md:p-16 text-[var(--accent-foreground)] relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <h2 className="font-display text-4xl md:text-5xl">Your wild is waiting.</h2>
            <p className="mt-4 text-base md:text-lg opacity-85">
              Tell us your dates and your dream — we'll send a tailored proposal within 48 hours. No deposit, no obligation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="xl">
                <Link to="/book">Plan your safari <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-white/40 border-[var(--accent-foreground)]/20 text-[var(--accent-foreground)] hover:bg-white/60">
                <Link to="/contact">Talk to a planner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
