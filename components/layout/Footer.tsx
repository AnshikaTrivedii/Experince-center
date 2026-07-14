"use client";

import { motion } from "framer-motion";
import {
  FiArrowUp,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { NAV_LINKS, CONTACT } from "@/lib/data";
import { Logo } from "@/components/common/Logo";
import { MagneticButton } from "@/components/common/MagneticButton";

const SOCIALS = [
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaXTwitter, href: "#", label: "X" },
];

const PRODUCTS = [
  "Indoor Series",
  "Outdoor Series",
  "Rental Series",
  "Digital Standee",
  "Flexible Series",
  "Jumbo Series",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20">
      {/* giant glowing wordmark */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center">
        <span className="bg-gradient-to-b from-white/[0.05] to-transparent bg-clip-text text-[22vw] font-bold leading-none tracking-tighter text-transparent">
          ORION
        </span>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo size="lg" />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              India&apos;s trusted LED display manufacturer since 2015. From
              highways to hotels, malls to metros — we light up spaces
              nationwide.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-white/70 transition-all duration-300 hover:-translate-y-1 hover:text-accent-cyan hover:shadow-glow"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Products">
            {PRODUCTS.map((p) => (
              <FooterLink key={p} href="#">
                {p}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <a
              href={CONTACT.phoneHref}
              className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <FiPhone className="mt-0.5 shrink-0 text-accent-cyan" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <FiMail className="mt-0.5 shrink-0 text-accent-cyan" />
              {CONTACT.email}
            </a>
            <span className="flex items-start gap-3 text-sm text-white/60">
              <FiMapPin className="mt-0.5 shrink-0 text-accent-cyan" />
              {CONTACT.address}
            </span>
          </FooterCol>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 py-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2015–{new Date().getFullYear()} Atenti Origins Photoelectricity
            Consort Pvt. Ltd. All rights reserved.
          </p>
          <MagneticButton>
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="group flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-white/80 transition-all hover:text-white hover:shadow-glow"
            >
              Back to top
              <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4 }}
      className="w-fit text-sm text-white/60 transition-colors hover:text-white"
    >
      {children}
    </motion.a>
  );
}
