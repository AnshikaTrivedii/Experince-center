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
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
