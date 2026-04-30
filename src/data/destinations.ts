import gorillas from "@/assets/dest-gorillas.jpg";
import serengeti from "@/assets/dest-serengeti.jpg";
import victoria from "@/assets/dest-victoria-falls.jpg";
import namib from "@/assets/dest-namib.jpg";
import mara from "@/assets/dest-maasai-mara.jpg";
import zanzibar from "@/assets/dest-zanzibar.jpg";
import amboseli from "@/assets/dest-amboseli.jpg";

export type Package = {
  name: string;
  nights: number;
  price: number;
  includes: string[];
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  bestSeason: string;
  duration: string;
  fromPrice: number;
  rating: number;
  reviews: number;
  category: "Wildlife" | "Landscape" | "Cultural" | "Beach";
  packages: Package[];
};

export const destinations: Destination[] = [
  {
    slug: "bwindi-gorillas",
    name: "Bwindi Impenetrable Forest",
    country: "Uganda",
    region: "East Africa",
    tagline: "Eye to eye with mountain gorillas",
    summary: "Trek into a misty UNESCO rainforest to meet a habituated gorilla family.",
    description:
      "Bwindi shelters nearly half of the world's remaining mountain gorillas. Guided by trackers, you'll move through dense jungle until you sit, breathless, an arm's length from a silverback and his family — one of the most profound encounters in modern travel.",
    image: gorillas,
    gallery: [gorillas, mara, amboseli],
    highlights: ["Gorilla trekking permit", "Local Batwa cultural visit", "Canopy walks", "Birdlife (350+ species)"],
    bestSeason: "Jun – Sep · Dec – Feb",
    duration: "4 days",
    fromPrice: 2890,
    rating: 4.9,
    reviews: 218,
    category: "Wildlife",
    packages: [
      { name: "Essential Trek", nights: 3, price: 2890, includes: ["1 gorilla permit", "Lodge stay", "All transfers"] },
      { name: "Signature Encounter", nights: 5, price: 4290, includes: ["2 gorilla permits", "Premium lodge", "Private guide", "Cultural visit"] },
      { name: "Private Expedition", nights: 7, price: 6890, includes: ["Habituation experience", "Luxury camp", "Private vehicle", "Helicopter transfer"] },
    ],
  },
  {
    slug: "serengeti-migration",
    name: "Serengeti National Park",
    country: "Tanzania",
    region: "East Africa",
    tagline: "The greatest wildlife show on Earth",
    summary: "Witness the Great Migration thunder across endless golden plains.",
    description:
      "Two million wildebeest, zebra and gazelle move in a vast circle through the Serengeti each year — pursued by lions, cheetahs and crocodiles. Stay in classic tented camps and wake to the sound of hooves at dawn.",
    image: serengeti,
    gallery: [serengeti, mara, amboseli],
    highlights: ["Big Five game drives", "River crossings (Jul–Oct)", "Hot air balloon option", "Maasai village visit"],
    bestSeason: "Jul – Oct · Jan – Mar",
    duration: "6 days",
    fromPrice: 3450,
    rating: 4.9,
    reviews: 412,
    category: "Wildlife",
    packages: [
      { name: "Classic Safari", nights: 5, price: 3450, includes: ["Tented camp", "Daily game drives", "All meals"] },
      { name: "Migration Special", nights: 7, price: 5290, includes: ["Mobile camp follows herds", "Balloon safari", "Private guide"] },
      { name: "Luxury Bush", nights: 9, price: 8990, includes: ["Singita-class lodge", "Private vehicle", "Spa treatments"] },
    ],
  },
  {
    slug: "maasai-mara",
    name: "Maasai Mara Reserve",
    country: "Kenya",
    region: "East Africa",
    tagline: "Sunrise balloons over endless plains",
    summary: "Float silently above herds of wildebeest at dawn, then land for a bush breakfast.",
    description:
      "The Mara is Kenya's crown jewel — a sweep of golden grass dotted with acacias and predators. Combine balloon flights, walking safaris with Maasai warriors, and intimate game drives in a private conservancy.",
    image: mara,
    gallery: [mara, serengeti, amboseli],
    highlights: ["Sunrise balloon flight", "Walking safari with Maasai", "Big cat sightings", "Conservancy night drive"],
    bestSeason: "Aug – Oct · Jan – Feb",
    duration: "5 days",
    fromPrice: 2790,
    rating: 4.8,
    reviews: 356,
    category: "Wildlife",
    packages: [
      { name: "Mara Discovery", nights: 4, price: 2790, includes: ["Conservancy lodge", "Balloon flight", "Game drives"] },
      { name: "Mara & Lake Naivasha", nights: 7, price: 4590, includes: ["Two parks", "Boat safari", "Private vehicle"] },
    ],
  },
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zambia / Zimbabwe",
    region: "Southern Africa",
    tagline: "The smoke that thunders",
    summary: "Stand at the lip of the world's largest curtain of falling water.",
    description:
      "Mosi-oa-Tunya — 'the smoke that thunders' — drops 108 meters into the Zambezi gorge. Pair the falls with sunset river cruises, white-water rafting and a Devil's Pool plunge for the bravest.",
    image: victoria,
    gallery: [victoria, namib, zanzibar],
    highlights: ["Falls walking tour", "Zambezi sunset cruise", "Helicopter flight", "Devil's Pool (seasonal)"],
    bestSeason: "Apr – Jul · peak flow",
    duration: "3 days",
    fromPrice: 1490,
    rating: 4.7,
    reviews: 289,
    category: "Landscape",
    packages: [
      { name: "Falls Express", nights: 2, price: 1490, includes: ["Riverside lodge", "Falls tour", "Sunset cruise"] },
      { name: "Adventure Pack", nights: 4, price: 2390, includes: ["Rafting", "Helicopter flight", "Bungee option"] },
    ],
  },
  {
    slug: "namib-desert",
    name: "Sossusvlei & Deadvlei",
    country: "Namibia",
    region: "Southern Africa",
    tagline: "Where dunes meet ancient silence",
    summary: "Climb the world's tallest red dunes and walk among 900-year-old skeleton trees.",
    description:
      "The Namib is the oldest desert on earth. At sunrise the sand glows molten red against cobalt skies, and the bone-white pan of Deadvlei feels like another planet. Stay in a desert lodge under a sky thick with stars.",
    image: namib,
    gallery: [namib, victoria, amboseli],
    highlights: ["Dune 45 sunrise climb", "Deadvlei photography", "Stargazing", "Quad biking"],
    bestSeason: "May – Oct",
    duration: "4 days",
    fromPrice: 2190,
    rating: 4.9,
    reviews: 167,
    category: "Landscape",
    packages: [
      { name: "Desert Soul", nights: 3, price: 2190, includes: ["Desert lodge", "Sunrise drive", "Stargazing dinner"] },
      { name: "Namibia Loop", nights: 8, price: 5490, includes: ["Sossusvlei", "Swakopmund", "Etosha NP", "Self-drive 4x4"] },
    ],
  },
  {
    slug: "zanzibar",
    name: "Zanzibar Archipelago",
    country: "Tanzania",
    region: "Indian Ocean",
    tagline: "Spice islands & turquoise tides",
    summary: "Unwind on powder-white beaches after your safari, on dhow boats and coral reefs.",
    description:
      "Zanzibar's Stone Town hums with Swahili, Omani and Indian heritage. Step beyond the labyrinth and you find empty beaches, spice plantations, and reefs alive with color — the perfect coda to a safari.",
    image: zanzibar,
    gallery: [zanzibar, victoria, mara],
    highlights: ["Stone Town walking tour", "Spice farm visit", "Snorkeling Mnemba Atoll", "Dhow sunset sail"],
    bestSeason: "Jun – Oct · Dec – Feb",
    duration: "5 days",
    fromPrice: 1690,
    rating: 4.8,
    reviews: 423,
    category: "Beach",
    packages: [
      { name: "Beach Reset", nights: 4, price: 1690, includes: ["Beachfront resort", "Snorkeling", "Spice tour"] },
      { name: "Safari + Beach", nights: 9, price: 5290, includes: ["Serengeti combo", "Flights", "Private transfers"] },
    ],
  },
  {
    slug: "amboseli",
    name: "Amboseli National Park",
    country: "Kenya",
    region: "East Africa",
    tagline: "Elephants beneath Kilimanjaro",
    summary: "Photograph great tuskers framed by Africa's tallest mountain.",
    description:
      "Amboseli is the home of the giant elephants — and on clear mornings, snow-capped Kilimanjaro rises like a stage curtain behind them. Small, intimate, and unforgettable.",
    image: amboseli,
    gallery: [amboseli, mara, serengeti],
    highlights: ["Elephant photography", "Kilimanjaro views", "Maasai cultural tour", "Observation hill"],
    bestSeason: "Jun – Oct · Jan – Feb",
    duration: "3 days",
    fromPrice: 1390,
    rating: 4.8,
    reviews: 198,
    category: "Wildlife",
    packages: [
      { name: "Tusker Trail", nights: 2, price: 1390, includes: ["Bush lodge", "Game drives", "Cultural visit"] },
      { name: "Kenya Triangle", nights: 6, price: 3590, includes: ["Amboseli + Mara + Naivasha", "Private vehicle"] },
    ],
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const featuredDestinations = destinations.slice(0, 4);