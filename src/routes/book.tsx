import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { destinations, getDestination } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepBar } from "@/components/site/Wizard";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Users, PartyPopper } from "lucide-react";

const search = z.object({ destination: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Book your safari — Savana" },
      { name: "description", content: "Build your African safari step by step: destination, dates, package and travelers." },
      { property: "og:title", content: "Book your safari — Savana" },
      { property: "og:description", content: "Build your African safari in minutes." },
    ],
  }),
  component: BookingWizard,
});

const STEPS = ["Destination", "Dates", "Package", "Travelers", "Confirm"];

function BookingWizard() {
  const { destination: initial } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [destSlug, setDestSlug] = useState<string>(initial ?? destinations[0].slug);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [pkgIdx, setPkgIdx] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const dest = useMemo(() => getDestination(destSlug)!, [destSlug]);
  const pkg = dest.packages[pkgIdx] ?? dest.packages[0];
  const total = pkg.price * (adults + children * 0.6);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (!name || !email) { toast.error("Add your name and email to confirm"); return; }
    toast.success("Booking request sent!", { description: "Our planner will email a confirmation within 24h." });
    setStep(0);
  };

  return (
    <section className="pt-28 pb-20 mx-auto max-w-5xl px-5 sm:px-8">
      <div className="text-xs uppercase tracking-[0.22em] text-earth">Plan your trip</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2 mb-8">Build your safari</h1>

      <StepBar steps={STEPS} current={step} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-3xl bg-card border border-border shadow-elevated p-7 md:p-10 min-h-[420px]">
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {destinations.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => setDestSlug(d.slug)}
                  className={cn(
                    "text-left rounded-2xl overflow-hidden border-2 transition-smooth group",
                    destSlug === d.slug ? "border-gold shadow-gold" : "border-transparent hover:border-foreground/20",
                  )}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{d.country}</div>
                    <div className="font-display text-lg mt-0.5">{d.name}</div>
                    <div className="text-sm text-gold mt-1">From ${d.fromPrice.toLocaleString()}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
              <div>
                <Label>Start date</Label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>End date</Label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5" />
              </div>
              <div className="sm:col-span-2 mt-2 p-4 rounded-2xl bg-secondary text-sm text-secondary-foreground inline-flex gap-2 items-start">
                <Calendar className="h-4 w-4 mt-0.5 text-[var(--primary)]" />
                Best season for {dest.name}: <span className="font-medium text-foreground">{dest.bestSeason}</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {dest.packages.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPkgIdx(i)}
                  className={cn(
                    "w-full text-left rounded-2xl p-5 border-2 transition-smooth flex justify-between items-start gap-4",
                    pkgIdx === i ? "border-gold bg-secondary/40 shadow-gold" : "border-border hover:border-foreground/30",
                  )}
                >
                  <div>
                    <div className="font-display text-xl">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.nights} nights · {dest.name}</div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {p.includes.map((inc) => (
                        <li key={inc} className="flex gap-2"><Check className="h-4 w-4 text-[var(--primary-glow)] mt-0.5" />{inc}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-2xl text-gold">${p.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
              <div>
                <Label>Adults</Label>
                <Input type="number" min={1} max={20} value={adults} onChange={(e) => setAdults(+e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Children (under 12)</Label>
                <Input type="number" min={0} max={20} value={children} onChange={(e) => setChildren(+e.target.value)} className="mt-1.5" />
              </div>
              <div className="sm:col-span-2 mt-2 p-4 rounded-2xl bg-secondary text-sm text-secondary-foreground inline-flex gap-2">
                <Users className="h-4 w-4 mt-0.5 text-[var(--primary)]" />
                Children pay 60% of adult rate. Infants under 2 are free.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <div>
                <Label>Full name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label>Anything else we should know?</Label>
                <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1.5" placeholder="Dietary needs, mobility, celebrating something special…" />
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Back</Button>
            {step < STEPS.length - 1 ? (
              <Button variant="forest" size="pill" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button variant="hero" size="pill" onClick={submit}><PartyPopper className="h-4 w-4" /> Confirm booking</Button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit rounded-3xl bg-gradient-forest text-primary-foreground p-7 shadow-elevated">
          <div className="text-xs uppercase tracking-[0.18em] text-gold">Your trip</div>
          <div className="font-display text-2xl mt-2">{dest.name}</div>
          <div className="text-sm text-primary-foreground/75">{dest.country}</div>

          <div className="mt-6 space-y-3 text-sm">
            <Row k="Package" v={pkg.name} />
            <Row k="Nights" v={String(pkg.nights)} />
            <Row k="Travelers" v={`${adults} adult${adults !== 1 ? "s" : ""}${children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}`} />
            <Row k="Dates" v={start && end ? `${start} → ${end}` : "—"} />
          </div>

          <div className="mt-6 pt-5 border-t border-white/15">
            <div className="text-xs uppercase tracking-wider text-primary-foreground/65">Estimated total</div>
            <div className="font-display text-4xl text-gold mt-1">${Math.round(total).toLocaleString()}</div>
            <div className="text-xs text-primary-foreground/65 mt-1">Final quote in 24h · no charge today</div>
          </div>

          <Link to="/destinations/$slug" params={{ slug: dest.slug }} className="mt-5 text-xs text-gold hover:underline inline-block">View destination details →</Link>
        </aside>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-primary-foreground/70">{k}</span>
      <span className="font-medium text-right">{v}</span>
    </div>
  );
}