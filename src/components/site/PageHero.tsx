export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[58svh] min-h-[420px] w-full overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
      <div className="relative z-10 h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-16">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.22em] text-gold">{eyebrow}</div>
        )}
        <h1 className="font-display text-white text-5xl md:text-7xl font-semibold mt-3 max-w-4xl text-balance">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-lg text-white/80 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}