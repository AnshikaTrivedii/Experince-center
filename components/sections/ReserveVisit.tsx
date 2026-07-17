"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { EXPERIENCE_CENTER_OPTIONS, TIME_SLOTS } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { InputField, SelectField } from "@/components/ui/Field";
import { GlowButton } from "@/components/ui/GlowButton";
import { Confetti } from "@/components/effects/Confetti";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useBookingUi } from "@/components/providers/BookingUiProvider";

export function ReserveVisit() {
  const { values, errors, status, reference, errorMessage, setField, submit, reset } =
    useBookingForm();
  const { selectedCenter, setSelectedCenter } = useBookingUi();

  useEffect(() => {
    if (selectedCenter && values.center !== selectedCenter) {
      setField("center", selectedCenter);
    }
  }, [selectedCenter, values.center, setField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <section id="book" className="relative py-16 sm:py-24 lg:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-blue/20 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-between gap-10 border-b border-white/8 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Registration"
                  title={
                    <>
                      Reserve Your{" "}
                      <span className="text-gradient-accent">Visit</span>
                    </>
                  }
                />
                <p className="mt-5 text-base leading-relaxed text-white/60">
                  Fill in your details and our team will contact you to schedule
                  your Experience Centre visit.
                </p>
              </div>

              <ul className="flex flex-col gap-3 text-sm text-white/70">
                {[
                  "Priority OAC visitor slot",
                  "VIP Experience Centre tour",
                  "Complimentary project package unlocked on registration",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-cyan/15 text-accent-cyan">
                      <FiCheck size={13} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

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
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                      Fill in your details
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        id="name"
                        label="Name *"
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
                        id="phone"
                        type="tel"
                        label="Mobile Number *"
                        value={values.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        error={errors.phone}
                      />
                      <InputField
                        id="email"
                        type="email"
                        label="Email Address *"
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        error={errors.email}
                      />
                      <InputField
                        id="city"
                        label="City"
                        value={values.city}
                        onChange={(e) => setField("city", e.target.value)}
                      />
                      <SelectField
                        id="center"
                        label="Preferred Experience Centre *"
                        options={[...EXPERIENCE_CENTER_OPTIONS]}
                        value={values.center}
                        onChange={(e) => {
                          setField("center", e.target.value);
                          setSelectedCenter(e.target.value);
                        }}
                        error={errors.center}
                      />
                      <InputField
                        id="visitDate"
                        type="date"
                        label="Preferred Date *"
                        value={values.visitDate}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setField("visitDate", e.target.value)}
                        error={errors.visitDate}
                        className="scheme-dark [color-scheme:dark]"
                      />
                      <SelectField
                        id="visitTime"
                        label="Preferred Time *"
                        options={[...TIME_SLOTS]}
                        value={values.visitTime}
                        onChange={(e) => setField("visitTime", e.target.value)}
                        error={errors.visitTime}
                      />
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
                          Reserving…
                        </>
                      ) : (
                        <>
                          Reserve My Visit
                          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </GlowButton>

                    {status === "error" && (
                      <p className="text-center text-sm text-red-400">
                        {errorMessage ||
                          "Something went wrong. Please try again or call us directly."}
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
      className="relative flex min-h-[360px] flex-col items-center justify-center py-8 text-center"
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
      <h3 className="mt-8 font-display text-3xl font-semibold text-white">
        You&apos;re reserved!
      </h3>
      <p className="mt-3 max-w-sm text-white/60">
        Our team will contact you shortly to schedule your Experience Centre
        visit.
      </p>
      {reference && (
        <p className="mt-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-sm text-accent-cyan">
          Ref: {reference}
        </p>
      )}
      <button
        onClick={onReset}
        className="mt-8 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        Reserve another visit
      </button>
    </motion.div>
  );
}
