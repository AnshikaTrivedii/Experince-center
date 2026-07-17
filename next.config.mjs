/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Inline these env vars at build time so they're available in the SSR runtime.
  // Amplify Gen 1 provides them during build but may not forward to compute.
  // These are server-side only (no NEXT_PUBLIC_ prefix) so they stay out of
  // the client bundle — Next.js only inlines them in server code paths.
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    BOOKING_TO_EMAIL: process.env.BOOKING_TO_EMAIL,
    BOOKING_FROM_EMAIL: process.env.BOOKING_FROM_EMAIL,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "orion-led.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;

