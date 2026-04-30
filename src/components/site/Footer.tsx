import { Link } from "@tanstack/react-router";
import { Compass, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-forest text-primary-foreground">
      <div className="absolute inset-x-0 -top-12 h-12 bg-gradient-forest [clip-path:ellipse(75%_100%_at_50%_100%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full grid place-items-center bg-gradient-gold shadow-gold">
                <Compass className="h-5 w-5 text-[var(--accent-foreground)]" />
              </span>
              <span className="font-display text-2xl font-semibold">Savana</span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">
              Crafted safaris and conscious adventures across the African continent — from
              gorilla-haunted forests to desert silences.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-[var(--accent-foreground)] transition-smooth"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Explore",
              links: [
                { to: "/destinations", label: "All destinations" },
                { to: "/cars", label: "Car rental" },
                { to: "/book", label: "Plan a trip" },
              ],
            },
            {
              title: "Company",
              links: [
                { to: "/about", label: "About us" },
                { to: "/contact", label: "Contact" },
                { to: "/contact", label: "Press & partners" },
              ],
            },
            {
              title: "Promise",
              links: [
                { to: "/about", label: "Conservation" },
                { to: "/about", label: "Travel safety" },
                { to: "/contact", label: "24/7 support" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.18em] text-gold mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-primary-foreground/80 hover:text-gold transition-smooth text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Savana Safaris. Crafted with reverence for the wild.</span>
          <span>Pan-African operator · Member of ATTA</span>
        </div>
      </div>
    </footer>
  );
}