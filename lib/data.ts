import type { IconType } from "react-icons";
import {
  FiMonitor,
  FiLayers,
  FiSun,
  FiWind,
  FiCpu,
  FiUsers,
  FiZap,
  FiMapPin,
} from "react-icons/fi";
import {
  LuCoffee,
  LuCircleParking,
  LuPresentation,
  LuUsers,
  LuMessagesSquare,
  LuMonitorPlay,
} from "react-icons/lu";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */
export const NAV_LINKS = [
  { label: "Why Visit", href: "#why" },
  { label: "Benefits", href: "#benefits" },
  { label: "Privileges", href: "#privileges" },
  { label: "Centers", href: "#centers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve", href: "#book" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 1 — OAC 2026                                                          */
/* -------------------------------------------------------------------------- */
export const OAC_WHY_VISIT = [
  "Experience our latest LED display technologies live",
  "Get expert recommendations for your project",
  "Explore real-world installations and product demos",
] as const;

export const OAC_BENEFITS = [
  "Site Survey",
  "LED Consultation",
  "3D Mockup",
  "Installation Layout",
  "Project Feasibility Report",
] as const;

/* -------------------------------------------------------------------------- */
/*  Page 2 — OAC VIP + registration                                            */
/* -------------------------------------------------------------------------- */
export const OAC_VIP_PRIVILEGES = [
  "VIP Experience Centre Tour",
  "Priority Delivery",
  "Additional 1-Year Warranty",
  "Exclusive OAC Pricing",
] as const;

/* -------------------------------------------------------------------------- */
/*  Extended Why Visit (deeper experience)                                     */
/* -------------------------------------------------------------------------- */
export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export const WHY_VISIT_FEATURES: Feature[] = [
  {
    icon: FiMonitor,
    title: "Live LED Demonstration",
    description:
      "See fine-pitch COB and SMD walls running real content at full brightness — not a spec sheet.",
  },
  {
    icon: FiLayers,
    title: "Compare Pixel Pitches",
    description:
      "P0.9 to P10 side by side. Judge clarity and viewing distance with your own eyes.",
  },
  {
    icon: FiSun,
    title: "Indoor & Outdoor",
    description:
      "From boardroom precision to 6000-nit outdoor billboards built for Indian summers.",
  },
  {
    icon: FiZap,
    title: "DOOH Solutions",
    description:
      "Experience programmatic Digital-Out-Of-Home content and dynamic ad playback live.",
  },
  {
    icon: FiCpu,
    title: "Interactive CMS Demo",
    description:
      "Push content to any screen in seconds with our cloud content management platform.",
  },
  {
    icon: FiUsers,
    title: "Consult Experts",
    description:
      "Sit with our engineers to size, spec and price the right wall for your space.",
  },
  {
    icon: FiWind,
    title: "Touch & Feel Quality",
    description:
      "Inspect cabinet build, module flatness and seam accuracy hands-on.",
  },
  {
    icon: FiMapPin,
    title: "Real Installations",
    description:
      "Walk through true-to-life mounting scenarios: flat, curved, cylindrical and more.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 4 — Experience Centers                                            */
/* -------------------------------------------------------------------------- */
export interface FacilityBadge {
  icon: IconType;
  label: string;
}

export interface ExperienceCenter {
  id: string;
  city: string;
  tagline: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapUrl: string;
  facilities: FacilityBadge[];
}

export const EXPERIENCE_CENTERS: ExperienceCenter[] = [
  {
    id: "delhi",
    city: "Delhi NCR",
    tagline: "Head Office · Flagship Experience Center",
    address:
      "504, 5th Floor, ABW Elegance Tower, Jasola District Centre, New Delhi 110025",
    phone: "+918826888050",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    image: "/images/delhi-experience-centre.png",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=ABW+Elegance+Tower+Jasola+District+Centre+New+Delhi",
    facilities: [
      { icon: LuCircleParking, label: "Parking" },
      { icon: LuCoffee, label: "Coffee Bar" },
      { icon: LuMonitorPlay, label: "Live Demo" },
      { icon: LuUsers, label: "Meeting Room" },
      { icon: LuMessagesSquare, label: "Consultation" },
    ],
  },
  {
    id: "mumbai",
    city: "Mumbai",
    tagline: "West India · Experience Center",
    address:
      "Acme Plaza, 310-311, Andheri - Kurla Rd, Vijay Nagar Colony, J B Nagar, Andheri East, Mumbai, Maharashtra 400059",
    phone: "+918826888050",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    image: "/images/mumbai-office-launch-poster.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Acme+Plaza+Andheri+Kurla+Road+Andheri+East+Mumbai",
    facilities: [
      { icon: LuCircleParking, label: "Parking" },
      { icon: LuCoffee, label: "Coffee Bar" },
      { icon: LuMonitorPlay, label: "Live Demo" },
      { icon: LuUsers, label: "Meeting Room" },
      { icon: LuPresentation, label: "Product Consultation" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 5 — Gallery                                                        */
/* -------------------------------------------------------------------------- */
export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  span: "tall" | "wide" | "square" | "big";
  type: "photo" | "video";
  /** When type is video, optional local / remote video URL for lightbox playback */
  videoSrc?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery-led-pillars.jpg",
    title: "LED Pillars",
    span: "big",
    type: "photo",
  },
  {
    id: 2,
    src: "/images/gallery-highway-night.jpg",
    title: "Highway Night Glow",
    span: "square",
    type: "photo",
  },
  {
    id: 3,
    src: "/images/gallery-landmark-tower.jpg",
    title: "Landmark Tower Display",
    span: "square",
    type: "photo",
  },
  {
    id: 4,
    src: "/images/gallery-project-1.jpeg",
    title: "Mall Launch Billboard",
    span: "square",
    type: "photo",
  },
  {
    id: 5,
    src: "/images/gallery-city-night.jpg",
    title: "City Night Installation",
    span: "square",
    type: "photo",
  },
  {
    id: 6,
    src: "/images/hyderabad-led-scoreboard.png",
    title: "DOOH Billboard",
    span: "square",
    type: "photo",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 6 — Journey Timeline                                               */
/* -------------------------------------------------------------------------- */
export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "Welcome",
    description:
      "Arrive to a curated coffee and a personal walkthrough of what your visit will cover.",
  },
  {
    step: "02",
    title: "Guided Tour",
    description:
      "Explore our full wall of technologies — indoor, outdoor, flexible and creative formats.",
  },
  {
    step: "03",
    title: "Live Product Demo",
    description:
      "Watch real content on the exact series you're considering, at true brightness.",
  },
  {
    step: "04",
    title: "Compare Products",
    description:
      "Line up pixel pitches, cabinets and finishes to find your perfect fit.",
  },
  {
    step: "05",
    title: "Consultation",
    description:
      "Our engineers map your space, content and budget into a precise recommendation.",
  },
  {
    step: "06",
    title: "Quotation",
    description:
      "Leave with a transparent, tailored proposal — no catalogue guesswork.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 7 — Industries                                                     */
/* -------------------------------------------------------------------------- */
export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "retail",
    name: "Retail",
    description:
      "Turn storefronts into magnets with dynamic, high-brightness in-store displays.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "corporate",
    name: "Corporate",
    description:
      "Boardrooms, lobbies and town-halls elevated with seamless fine-pitch walls.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "government",
    name: "Government",
    description:
      "Reliable public information systems built for 24/7 mission-critical uptime.",
    image:
      "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "control-rooms",
    name: "Control Rooms",
    description:
      "Zero-seam video walls with pixel-perfect clarity for 24/7 monitoring.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "broadcast",
    name: "Broadcast",
    description:
      "Studio-grade backdrops and virtual production walls with true color.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "education",
    name: "Education",
    description:
      "Interactive classrooms and auditoriums that keep every seat engaged.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Lobbies, ballrooms and experiences that make a lasting first impression.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dooh",
    name: "DOOH",
    description:
      "City-scale digital billboards engineered for weather and impact.",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 8 — Testimonials                                                   */
/* -------------------------------------------------------------------------- */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Seeing the P1.5 COB wall in person made the decision effortless. The experience center sold itself.",
    name: "Rahul Mehta",
    role: "Facilities Head, Fortune 500 IT",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We compared five pixel pitches in ten minutes. No PDF could have given us that confidence.",
    name: "Ananya Sharma",
    role: "Creative Director, Retail Group",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The CMS demo blew us away. Our whole DOOH network runs on Orion now, city-wide.",
    name: "Vikram Nair",
    role: "CEO, Outdoor Media Network",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "From spec to installation, the team was flawless. The visit built trust that closed the deal.",
    name: "Priya Deshpande",
    role: "Project Lead, Government Smart City",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 9 — Statistics                                                     */
/* -------------------------------------------------------------------------- */
export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 1000, suffix: "+", label: "Installations" },
  { value: 7, suffix: " Yr", label: "Warranty" },
  { value: 100, suffix: "%", label: "Made in India" },
  { value: 15, suffix: "+", label: "Cities Served" },
];

/* -------------------------------------------------------------------------- */
/*  Section 10 — Booking form options                                          */
/* -------------------------------------------------------------------------- */
export const BOOKING_BENEFITS = [
  "Priority slot with a dedicated LED specialist",
  "Personalized live demo of your shortlisted series",
  "On-the-spot pixel pitch & budget comparison",
  "Complimentary space & content consultation",
  "Same-day tailored quotation",
];

export const EXPERIENCE_CENTER_OPTIONS = ["Mumbai", "Delhi NCR"];
export const TIME_SLOTS = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];
export const PROJECT_TYPES = [
  "Indoor LED",
  "Outdoor LED",
  "Rental / Events",
  "DOOH",
  "Digital Standee",
  "Control Room",
  "Not sure yet",
];
export const PURPOSE_OPTIONS = [
  "Product Demo",
  "Price Consultation",
  "Technical Consultation",
  "Just Exploring",
];
export const CONTACT_METHODS = ["Call", "WhatsApp", "Email"] as const;

/* -------------------------------------------------------------------------- */
/*  Section 11 — FAQ                                                           */
/* -------------------------------------------------------------------------- */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Do I need an appointment to visit?",
    answer:
      "Walk-ins are welcome, but we recommend booking a slot so a dedicated specialist and the exact displays you want to see are ready for you.",
  },
  {
    question: "Is the visit free of cost?",
    answer:
      "Absolutely. The experience, demo and consultation are complimentary with no obligation to purchase.",
  },
  {
    question: "How long does a typical visit take?",
    answer:
      "Plan for about 45–90 minutes depending on how deep you want to go into comparisons and consultation.",
  },
  {
    question: "Can I bring my own content to test?",
    answer:
      "Yes. Bring your creatives on a USB drive or share a link and we'll play them live on your shortlisted walls.",
  },
  {
    question: "Which products can I see live?",
    answer:
      "Indoor COB & SMD, outdoor high-brightness, flexible, digital standee and rental series — across pixel pitches from P0.9 to P10.",
  },
  {
    question: "Do you offer virtual tours?",
    answer:
      "Yes. If you can't visit in person, we offer a guided live virtual walkthrough with our specialists over video.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Footer / contact                                                          */
/* -------------------------------------------------------------------------- */
export const CONTACT = {
  phone: "+91 88268 88050",
  phoneHref: "tel:+918826888050",
  email: "sales@orion-led.com",
  whatsapp: "https://wa.me/918826888050",
  address:
    "504, 5th Floor, ABW Elegance Tower, Jasola District Centre, New Delhi 110025",
};
