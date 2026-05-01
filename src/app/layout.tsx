import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import "../styles.css";

export const metadata: Metadata = {
  title: "Savana — Crafted Safaris across Africa",
  description: "Pan-African safari & nature journeys: gorillas in Bwindi, the Great Migration, Victoria Falls, Namib dunes, and Zanzibar shores. Premium guides, conscious travel.",
  authors: [{ name: "Savana Safaris" }],
  openGraph: {
    title: "Savana — Crafted Safaris across Africa",
    description: "Premium safari journeys across Africa. Plan your wildlife adventure.",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
