import type { StaticImageData } from "next/image";
import landcruiser from "@/assets/car-landcruiser.jpg";
import van from "@/assets/car-safari-van.jpg";
import rover from "@/assets/car-range-rover.jpg";
import jeep from "@/assets/car-jeep.jpg";

export type Vehicle = {
  slug: string;
  name: string;
  type: string;
  image: StaticImageData;
  seats: number;
  transmission: "Manual" | "Automatic";
  drive: "4x4" | "AWD";
  perDay: number;
  features: string[];
  best: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "land-cruiser-78",
    name: "Toyota Land Cruiser 78",
    type: "Safari 4x4",
    image: landcruiser,
    seats: 7,
    transmission: "Manual",
    drive: "4x4",
    perDay: 165,
    features: ["Pop-up roof", "Long-range tank", "Fridge", "Roof tent option"],
    best: "Multi-day expeditions",
  },
  {
    slug: "safari-van",
    name: "Toyota Hiace Safari Van",
    type: "Tour Van",
    image: van,
    seats: 9,
    transmission: "Manual",
    drive: "4x4",
    perDay: 120,
    features: ["Pop-up roof", "Window seats", "Cooler box", "WiFi"],
    best: "Group tours & families",
  },
  {
    slug: "range-rover",
    name: "Range Rover Vogue",
    type: "Premium SUV",
    image: rover,
    seats: 5,
    transmission: "Automatic",
    drive: "AWD",
    perDay: 290,
    features: ["Leather", "Panoramic roof", "Driver included", "Premium audio"],
    best: "Lodge transfers & city",
  },
  {
    slug: "open-jeep",
    name: "Open Safari Jeep",
    type: "Game Drive",
    image: jeep,
    seats: 6,
    transmission: "Manual",
    drive: "4x4",
    perDay: 145,
    features: ["Open sides", "Tiered seating", "Canopy", "Spotlight"],
    best: "In-park game drives",
  },
];

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);