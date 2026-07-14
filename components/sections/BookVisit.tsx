"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import {
  EXPERIENCE_CENTER_OPTIONS,
  TIME_SLOTS,
  PROJECT_TYPES,
  PURPOSE_OPTIONS,
  CONTACT_METHODS,
  BOOKING_BENEFITS,
} from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { InputField, SelectField, TextareaField } from "@/components/ui/Field";
import { GlowButton } from "@/components/ui/GlowButton";
import { Confetti } from "@/components/effects/Confetti";
import { useBookingForm } from "@/hooks/useBookingForm";
import { cn } from "@/lib/utils";

export function BookVisit() {
  const { values, errors, status, reference, setField, submit, reset } =
    useBookingForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="book" className="relative py-28 sm:py-36">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-blue/20 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — benefits */}
            <div className="flex flex-col justify-between gap-10 border-b border-white/8 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Book Your Visit"
                  title={
                    <>
                      Reserve your{" "}
                      <span className="text-gradient-accent">
                        private experience
                      </span>
                    </>
                  }
                />
                <p className="mt-5 text-base leading-relaxed text-white/60">
                  Tell us a little about your project and we&apos;ll tailor the
                  visit around exactly what you need to see.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {BOOKING_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-cyan/15 text-accent-cyan">
                      <FiCheck size={13} />
                    </span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right — form / success */}
            <div className="relative p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessState
                    key="success"
                    reference={reference}
                    onReset={reset}
                  />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        id="name"
                        label="Full Name *"
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                        error={errors.name}
                      />
                      <InputField
                        id="company"
                        label="Company"
                        value={values.company}
                        onChange={(e) => setField("company", e.target.value)}
                      />
                      <InputField
                        id="email"
                        type="email"
                        label="Email *"
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        error={errors.email}
                      />
                      <InputField
                        id="phone"
                        type="tel"
                        label="Phone *"
                        value={values.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        error={errors.phone}
                      />
                      <InputField
                        id="city"
                        label="City"
                        value={values.city}
                        onChange={(e) => setField("city", e.target.value)}
                      />
                      <SelectField
                        id="center"
                        label="Preferred Center *"
                        options={EXPERIENCE_CENTER_OPTIONS}
                        value={values.center}
                        onChange={(e) => setField("center", e.target.value)}
                        error={errors.center}
                      />
                      <InputField
                        id="date"
                        type="date"
                        min={today}
                        label="Preferred Date *"
                        value={values.date}
                        onChange={(e) => setField("date", e.target.value)}
                        error={errors.date}
                      />
                      <SelectField
                        id="time"
                        label="Preferred Time *"
                        options={TIME_SLOTS}
                        value={values.time}
                        onChange={(e) => setField("time", e.target.value)}
                        error={errors.time}
                      />
                      <SelectField
                        id="purpose"
                        label="Purpose of Visit"
                        options={PURPOSE_OPTIONS}
                        value={values.purpose}
                        onChange={(e) => setField("purpose", e.target.value)}
                      />
                      <SelectField
                        id="projectType"
                        label="Project Type"
                        options={PROJECT_TYPES}
                        value={values.projectType}
                        onChange={(e) =>
                          setField("projectType", e.target.value)
                        }
                      />
                    </div>

                    <InputField
                      id="screenSize"
                      label="Estimated Screen Size (e.g. 10ft × 6ft)"
                      value={values.screenSize}
                      onChange={(e) => setField("screenSize", e.target.value)}
                    />

                    <TextareaField
                      id="message"
                      label="Message"
                      value={values.message}
                      onChange={(e) => setField("message", e.target.value)}
                    />

                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                        Preferred Contact
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_METHODS.map((method) => (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setField("contactMethod", method)}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                              values.contactMethod === method
                                ? "border-accent-cyan/50 bg-accent-cyan/10 text-white"
                                : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                            )}
                          >
                            {method === "WhatsApp" && (
                              <FaWhatsapp className="text-green-400" />
                            )}
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <GlowButton
                      type="submit"
                      size="lg"
                      className="mt-2 w-full"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Booking…
                        </>
                      ) : (
                        <>
                          Book My Experience
                          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </GlowButton>

                    {status === "error" && (
                      <p className="text-center text-sm text-red-400">
                        Something went wrong. Please try again or call us
                        directly.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessState({
  reference,
  onReset,
}: {
  reference: string | null;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-[400px] flex-col items-center justify-center py-8 text-center"
    >
      <Confetti fire />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-accent-blue via-accent-cyan to-accent-purple shadow-glow-lg"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/30" />
        <FiCheck size={44} className="text-white" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-display text-3xl font-semibold text-white"
      >
        You&apos;re all set!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 max-w-sm text-white/60"
      >
        Your experience is reserved. Our team will reach out shortly to confirm
        your slot.
      </motion.p>
      {reference && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-sm text-accent-cyan"
        >
          Ref: {reference}
        </motion.p>
      )}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="mt-8 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        Book another visit
      </motion.button>
    </motion.div>
  );
}
