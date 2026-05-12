"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { vehicles, getVehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepBar } from "@/components/site/Wizard";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Users, Settings2, Compass, PartyPopper } from "lucide-react";

const STEPS = ["Vehicle", "Dates", "Pickup", "Driver"];

function RentWizardInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("vehicle");

  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState<string>(initial ?? vehicles[0].slug);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const v = useMemo(() => getVehicle(slug)!, [slug]);

  const days = useMemo(() => {
    if (!from || !to) return 0;
    const d = (new Date(to).getTime() - new Date(from).getTime()) / 86_400_000;
    return Math.max(0, Math.ceil(d));
  }, [from, to]);
  const total = days * v.perDay;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (!name || !email) { toast.error("Add your contact details"); return; }
    toast.success("Reservation sent!", { description: "We'll confirm availability within 2 hours." });
    setStep(0);
  };

  return (
    <section className="pt-28 pb-20 mx-auto max-w-5xl px-5 sm:px-8">
      <div className="text-xs uppercase tracking-[0.22em] text-earth">Car rental</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2 mb-8">Reserve your vehicle</h1>

      <StepBar steps={STEPS} current={step} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-3xl bg-card border border-border shadow-elevated p-7 md:p-10 min-h-[420px]">
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {vehicles.map((opt) => (
                <button
                  key={opt.slug}
                  onClick={() => setSlug(opt.slug)}
                  className={cn(
                    "text-left rounded-2xl overflow-hidden border-2 transition-smooth group",
                    slug === opt.slug ? "border-gold shadow-gold" : "border-transparent hover:border-foreground/20",
                  )}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={opt.image.src} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider text-earth">{opt.type}</div>
                    <div className="font-display text-lg mt-0.5">{opt.name}</div>
                    <div className="text-sm text-gold mt-1">${opt.perDay} / day</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
              <div><Label>Pick-up date</Label><Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5" /></div>
              <div><Label>Drop-off date</Label><Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1.5" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
              <div><Label>Pick-up location</Label><Input value={pickup} onChange={(e) => setPickup(e.target.value)} className="mt-1.5" placeholder="Nairobi JKIA" /></div>
              <div><Label>Drop-off location</Label><Input value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="mt-1.5" placeholder="Same as pick-up" /></div>
            </div>
          )}

          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <div><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
              <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" /></div>
              <div className="sm:col-span-2"><Label>Phone (WhatsApp)</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" /></div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Back</Button>
            {step < STEPS.length - 1 ? (
              <Button variant="forest" size="pill" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button variant="hero" size="pill" onClick={submit}><PartyPopper className="h-4 w-4" /> Confirm reservation</Button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit rounded-3xl bg-card border border-border shadow-elevated overflow-hidden">
          <div className="aspect-[16/10] overflow-hidden">
            <img src={v.image.src} alt={v.name} className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <div className="text-xs uppercase tracking-wider text-earth">{v.type}</div>
            <div className="font-display text-xl mt-1">{v.name}</div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{v.seats}</span>
              <span className="inline-flex items-center gap-1"><Settings2 className="h-3.5 w-3.5" />{v.transmission}</span>
              <span className="inline-flex items-center gap-1"><Compass className="h-3.5 w-3.5" />{v.drive}</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm">
              {v.features.map((f) => (
                <li key={f} className="flex gap-2 text-muted-foreground"><Check className="h-4 w-4 text-[var(--primary-glow)] mt-0.5" />{f}</li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-border">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{v.perDay} × {days || 0} days</span><span className="font-medium">${total.toLocaleString()}</span></div>
              <div className="font-display text-3xl text-gold mt-2">${total.toLocaleString()}</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function RentWizard() {
  return (
    <Suspense fallback={
      <section className="pt-28 pb-20 mx-auto max-w-5xl px-5 sm:px-8">
        <div className="h-8 w-40 rounded-lg bg-muted animate-pulse mb-4" />
        <div className="h-12 w-72 rounded-xl bg-muted animate-pulse" />
      </section>
    }>
      <RentWizardInner />
    </Suspense>
  );
}
