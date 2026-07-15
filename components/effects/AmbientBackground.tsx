/**
 * Static ambient backdrop — no continuous animation (major FPS win).
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-ink" />

      <div className="absolute inset-0 grid-bg opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div
        className="absolute -left-32 top-[-8%] h-[28rem] w-[28rem] rounded-full blur-[80px] animate-breathe"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.24), transparent 65%)",
        }}
      />
      <div
        className="absolute right-[-8%] top-[28%] h-[24rem] w-[24rem] rounded-full blur-[80px] animate-breathe"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2), transparent 65%)",
          animationDelay: "-2.5s",
        }}
      />
      <div
        className="absolute bottom-[-8%] left-[32%] h-[22rem] w-[22rem] rounded-full blur-[72px] animate-breathe"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.16), transparent 65%)",
          animationDelay: "-4s",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
