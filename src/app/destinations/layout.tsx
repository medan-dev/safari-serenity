import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations — Savana Safaris",
  description: "Explore safari destinations across Africa: Bwindi, Serengeti, Maasai Mara, Victoria Falls, Namib desert, Zanzibar, Amboseli.",
  openGraph: {
    title: "Destinations — Savana Safaris",
    description: "Hand-crafted safari journeys across the continent.",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
