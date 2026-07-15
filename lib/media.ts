/**
 * Central media registry — single source of truth for all site imagery.
 * Prefer local assets in /public for sharp, reliable delivery.
 */
export const MEDIA = {
  brand: {
    logo: {
      src: "/images/orion-led-logo.png",
      alt: "Orion LED — Manufactured by ATENTI | ORIGINS",
      width: 513,
      height: 542,
    },
  },

  hero: {
    booth: {
      src: "/images/hero-booth.jpg",
      alt: "Orion LED Experience Centre booth with curved and flat LED display walls",
    },
  },

  whyVisit: {
    liveTechnology: {
      src: "/images/why-live-technology.jpg",
      alt: "Orion LED curved and flat display walls showing vivid content at the experience booth",
    },
    expertGuidance: {
      src: "/images/orion-team.png",
      alt: "Orion LED team at the Experience Centre",
    },
    realInstallations: {
      src: "/images/hyderabad-led-scoreboard.png",
      alt: "Orion LED stadium scoreboard installation in Hyderabad",
    },
    boothStrip: {
      src: "/images/orion-experience-showroom.png",
      alt: "Orion LED Experience Centre showroom with immersive display walls",
    },
  },

  centres: {
    mumbai: {
      src: "/images/mumbai-centre.jpg",
      alt: "Orion LED Mumbai Experience Centre — live demo wall and booth displays",
    },
    delhi: {
      poster: {
        src: "/images/delhi-experience-centre.png",
        alt: "Orion LED Delhi NCR Experience Centre — COB and SMD display showcase",
      },
      video: {
        src: "/videos/delhi-experience-centre.mp4",
        type: "video/mp4" as const,
      },
    },
  },

  benefits: {
    siteSurvey: {
      src: "/images/benefit-site-survey.jpg",
      alt: "On-site technician assessing space for LED display mounting and viewing distance",
    },
    ledConsultation: {
      src: "/images/benefit-led-consultation.jpg",
      alt: "LED specialists consulting with clients on pixel pitch and display series",
    },
    mockup3d: {
      src: "/images/benefit-3d-mockup.jpg",
      alt: "Architectural visualization of an LED wall in a premium interior",
    },
    installationLayout: {
      src: "/images/benefit-installation-layout.jpg",
      alt: "Technical planning documents for LED cabinet map and power layout",
    },
    feasibilityReport: {
      src: "/images/benefit-feasibility-report.jpg",
      alt: "Project feasibility analysis with timeline and budget insights",
    },
  },

  finalCta: {
    booth: {
      src: "/images/final-cta-booth.jpg",
      alt: "Orion LED display technology at the experience centre",
    },
  },
} as const;

export type MediaAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
