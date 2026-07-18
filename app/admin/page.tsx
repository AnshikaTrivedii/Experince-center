import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05080d] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_55%)]" />
      <div className="relative w-full max-w-lg rounded-[1.75rem] border border-white/10 bg-[#0b1018]/90 p-8 shadow-2xl backdrop-blur sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
          Orion LED · Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Experience Centre Portal
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Sign in with your admin username and password.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
