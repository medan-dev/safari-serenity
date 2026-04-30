import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/dest-victoria-falls.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Savana Safaris" },
      { name: "description", content: "Talk to a real safari planner. We respond within 24 hours." },
      { property: "og:title", content: "Contact — Savana Safaris" },
      { property: "og:description", content: "Talk to a real safari planner." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Add a subject").max(200),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});
type Form = z.infer<typeof schema>;

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log("Contact submission", data);
    toast.success("Message received", { description: "A planner will reply within 24 hours." });
    reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Say jambo"
        title="Let's design your wild."
        subtitle="Real humans, fast replies, zero pressure. Average response in 4 hours."
        image={heroImg}
      />
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-6">
          {[
            { icon: Mail, k: "Email", v: "hello@savana.travel" },
            { icon: Phone, k: "WhatsApp", v: "+254 700 000 000" },
            { icon: MapPin, k: "Studio", v: "Karen, Nairobi · by appointment" },
          ].map((i) => (
            <div key={i.k} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft">
              <span className="h-10 w-10 rounded-xl bg-gradient-gold grid place-items-center shrink-0"><i.icon className="h-5 w-5 text-[var(--accent-foreground)]" /></span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{i.k}</div>
                <div className="font-display text-lg">{i.v}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-3 rounded-3xl bg-card border border-border shadow-elevated p-7 md:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} className="mt-1.5" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} className="mt-1.5" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" {...register("subject")} className="mt-1.5" placeholder="Honeymoon to Tanzania, etc." />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">Tell us about your trip</Label>
            <Textarea id="message" rows={6} {...register("message")} className="mt-1.5" placeholder="Dates, party size, dream destinations…" />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </section>
    </>
  );
}