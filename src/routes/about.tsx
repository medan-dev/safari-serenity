import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/dest-amboseli.jpg";
import { Leaf, Heart, Shield, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Savana Safaris" },
      { name: "description", content: "Conscious safari operators since 2008. Local guides, fair-share lodges, and a portion of every trip funded back to conservation." },
      { property: "og:title", content: "About — Savana Safaris" },
      { property: "og:description", content: "Conscious safari operators across the African continent." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Leaf, title: "Conservation first", body: "5% of every booking funds anti-poaching and habitat work in the parks we visit." },
  { icon: Heart, title: "Local-led travel", body: "Every itinerary is co-designed with guides who grew up where you'll trek." },
  { icon: Shield, title: "Quietly luxurious", body: "Hand-picked camps. No greenwash, no gimmicks — just craft and comfort." },
  { icon: Award, title: "Award-winning guides", body: "Our lead guides hold KPSGA Gold, Silver and Bronze classifications." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A safari is a privilege. We treat it like one."
        subtitle="Founded in 2008 by a Kenyan guide and a Namibian biologist — Savana exists to take the wild seriously."
        image={heroImg}
      />
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-20 text-pretty">
        <p className="font-display text-2xl md:text-3xl leading-snug">
          We've watched too many trips treat Africa like a backdrop. So we built the opposite —
          journeys where guests sit with elders, sleep in family-run camps, and learn the names of the
          trees as well as the animals.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl p-7 bg-card border border-border shadow-soft hover:shadow-elevated transition-smooth">
              <span className="h-12 w-12 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold">
                <v.icon className="h-6 w-6 text-[var(--accent-foreground)]" />
              </span>
              <h3 className="font-display text-xl mt-5">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2.5rem] bg-gradient-forest text-primary-foreground p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl">Ready when you are.</h2>
            <p className="mt-4 text-primary-foreground/80">Tell us your dates and your dream — we'll send a tailored proposal within 48 hours.</p>
            <Button asChild variant="hero" size="xl" className="mt-7">
              <Link to="/contact">Start a conversation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}