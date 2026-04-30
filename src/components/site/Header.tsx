import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/cars", label: "Car Rental" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        transparent ? "bg-transparent" : "glass shadow-soft border-b border-border/40",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-18 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className={cn(
              "h-9 w-9 rounded-full grid place-items-center bg-gradient-gold shadow-gold transition-smooth group-hover:scale-105",
            )}
          >
            <Compass className="h-5 w-5 text-[var(--accent-foreground)]" />
          </span>
          <span
            className={cn(
              "font-display text-2xl font-semibold tracking-tight transition-smooth",
              transparent ? "text-white" : "text-foreground",
            )}
          >
            Savana
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                  active
                    ? transparent
                      ? "bg-white/15 text-white"
                      : "bg-secondary text-foreground"
                    : transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="pill">
            <Link to="/book">Book a Trip</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className={cn(
            "md:hidden h-10 w-10 grid place-items-center rounded-full transition-smooth",
            transparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/40 px-5 pb-5 pt-2 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="hero" size="pill" className="mt-3">
              <Link to="/book">Book a Trip</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}