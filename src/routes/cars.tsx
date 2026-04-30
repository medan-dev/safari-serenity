import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/data/vehicles";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/car-landcruiser.jpg";
import { Button } from "@/components/ui/button";
import { Users, Settings2, Compass, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Safari Car Rental — Savana" },
      { name: "description", content: "Rent a 4x4 Land Cruiser, safari van, premium SUV or open game-drive jeep across Africa." },
      { property: "og:title", content: "Safari Car Rental — Savana" },
      { property: "og:description", content: "Self-drive or chauffeured vehicles built for the bush." },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  return (
    <>
      <PageHero
        eyebrow="Built for the bush"
        title="Wheels for every kind of wild."
        subtitle="Self-drive expeditions or chauffeured comfort — every vehicle is bush-tested and lodge-loved."
        image={heroImg}
      />
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {vehicles.map((v) => (
            <article key={v.slug} className="group rounded-3xl bg-card shadow-soft hover:shadow-elevated transition-smooth overflow-hidden border border-border">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-earth">{v.type}</div>
                    <h3 className="font-display text-3xl mt-1">{v.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-gold">${v.perDay}</div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" />{v.seats} seats</span>
                  <span className="inline-flex items-center gap-1.5"><Settings2 className="h-4 w-4" />{v.transmission}</span>
                  <span className="inline-flex items-center gap-1.5"><Compass className="h-4 w-4" />{v.drive}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {v.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{f}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-5">Best for: <span className="text-foreground font-medium">{v.best}</span></p>
                <Button asChild variant="forest" size="pill" className="mt-6">
                  <Link to="/rent" search={{ vehicle: v.slug }}>Reserve this vehicle <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}