# Orion LED — Experience Centers

A premium, award-worthy one-page landing experience built to convince visitors to book a visit to Orion LED's **Delhi** and **Mumbai** Experience Centers.

> "This is not just an office. This is an immersive LED technology experience. I want to visit."

## ✨ Highlights

- **Dark luxury theme** (`#050505`) with glassmorphism, glow, floating LED particles, animated grid & noise texture.
- **Cinematic motion**: GSAP + Lenis smooth scrolling, Framer Motion reveals, parallax, magnetic buttons, tilt cards, cursor-follow spotlight and scroll progress bar.
- **12 fully animated sections** — Hero, Immersive Intro, Why Visit, Experience Centers, Gallery (with lightbox), Journey Timeline, Industries, Testimonials, Statistics (count-up), Booking, FAQ, Footer.
- **Production-grade booking form** with frontend validation, API route (`/api/booking`), success animation and confetti.
- Fully **responsive**, **SEO optimized** (metadata, Open Graph, robots, sitemap) and **accessible** (reduced-motion aware).

## 🧱 Tech Stack

| Layer      | Tooling                                     |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19          |
| Styling    | Tailwind CSS 3 + custom design tokens       |
| Animation  | Framer Motion, GSAP (ScrollTrigger), Lenis  |
| Icons      | React Icons                                 |
| UI system  | Shadcn-style primitives (CVA + tailwind-merge) |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## 📁 Structure

```
app/                 # App Router entry, layout, metadata, api route
  api/booking/       # Booking submission endpoint (API-ready)
components/
  common/            # Reusable animated primitives (Reveal, Magnetic, Tilt, Logo…)
  effects/           # Ambient background, particles, cursor glow, confetti, scroll bar
  layout/            # Navbar, Footer
  providers/         # Lenis smooth-scroll provider
  sections/          # The 12 page sections
  ui/                # Buttons & form fields (shadcn-style)
hooks/               # useCountUp, useMousePosition, useBookingForm, useMediaQuery
lib/                 # data (content), validation, utils
```

## 🔌 Wiring up the booking form

The form posts to `POST /api/booking`. Drop your CRM / email / DB integration inside
`app/api/booking/route.ts` where the `TODO` comment lives.

## 🖼️ Media

Reference imagery is pulled from Unsplash and can be swapped for Orion's own
assets from [orion-led.com](https://orion-led.com). The hero uses a background
video with an animated gradient-mesh fallback.
