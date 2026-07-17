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
    video: {
      src: "/videos/oac-2025-recap.mp4",
      mobileSrc: "/videos/oac-2025-recap-mobile.mp4",
      type: "video/mp4" as const,
      poster: "/images/orion-experience-showroom.jpg",
      alt: "Orion LED OAC 2025 recap — July 18–19 experience highlights",
    },
  },

  whyVisit: {
    liveTechnology: {
      src: "/images/why-live-technology.jpg",
      alt: "Orion LED exhibition booth with curved and flat LED display walls",
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
      src: "/images/orion-experience-showroom.jpg",
      alt: "Orion LED Experience Centre booth showcasing vibrant LED display walls",
      video: {
        src: "/videos/orion-terminal-expo.mp4",
        type: "video/mp4" as const,
        poster: "/images/orion-terminal-expo-poster.jpg",
      },
    },
  },

  centres: {
    mumbai: {
      poster: {
        src: "/images/mumbai-centre.jpg",
        alt: "Orion LED Mumbai Experience Centre — live demo wall and booth displays",
      },
      video: {
        src: "/videos/mumbai-office-launch.mp4",
        type: "video/mp4" as const,
      },
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
      src: "/images/ai-site-survey.png",
      alt: "On-site LED display site survey and installation planning",
    },
    ledConsultation: {
      src: "/images/ai-led-consultation.png",
      alt: "LED specialists consulting on pixel pitch and display series",
    },
    mockup3d: {
      src: "/images/ai-3d-mockup.png",
      alt: "3D LED display mockup visualized in a premium architectural environment",
    },
    installationLayout: {
      src: "/images/ai-installation-layout.png",
      alt: "LED installation layout with cabinet map and power planning",
    },
    feasibilityReport: {
      src: "/images/ai-feasibility-report.png",
      alt: "Project feasibility analysis with timeline and budget insights",
    },
  },

  finalCta: {
    booth: {
      src: "/images/final-cta-booth.jpg",
      alt: "Orion LED Experience Centre booth with immersive display walls and seating",
    },
  },
} as const;

export type MediaAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
