import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          soft: "#0a0a0c",
          card: "#0d0e12",
        },
        accent: {
          blue: "#3b82f6",
          cyan: "#22d3ee",
          purple: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(circle at center, rgba(34,211,238,0.18), transparent 60%)",
        "accent-gradient":
          "linear-gradient(120deg, #3b82f6 0%, #22d3ee 50%, #a855f7 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34,211,238,0.45)",
        "glow-lg": "0 0 80px -20px rgba(59,130,246,0.55)",
        card: "0 20px 60px -30px rgba(0,0,0,0.9)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.55" },
          "33%": { transform: "translate(8%, -6%) scale(1.08)", opacity: "0.8" },
          "66%": { transform: "translate(-6%, 8%) scale(0.95)", opacity: "0.45" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "border-spin": {
          to: { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.15)", opacity: "0.85" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        aurora: "aurora 14s ease-in-out infinite",
        "shine-sweep": "shine-sweep 2.8s ease-in-out infinite",
        "border-spin": "border-spin 8s linear infinite",
        breathe: "breathe 5s ease-in-out infinite",
        "line-grow": "line-grow 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
