import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Savana Safaris",
  description: "Talk to a real safari planner. We respond within 24 hours.",
  openGraph: {
    title: "Contact — Savana Safaris",
    description: "Talk to a real safari planner.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
