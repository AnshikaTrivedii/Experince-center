import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingUiProvider } from "@/components/providers/BookingUiProvider";
import { Hero } from "@/components/sections/Hero";
import { WhyVisit } from "@/components/sections/WhyVisit";
import { OacBenefits } from "@/components/sections/OacBenefits";
import { OacVipPrivileges } from "@/components/sections/OacVipPrivileges";
import { ChooseCentre } from "@/components/sections/ChooseCentre";
import { Gallery } from "@/components/sections/Gallery";
import { ReserveVisit } from "@/components/sections/ReserveVisit";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <BookingUiProvider>
      <Navbar />
      <main className="relative z-10">
        {/* —— Page 1: OAC 2026 Invitation —— */}
        <Hero />
        <WhyVisit />
        <OacBenefits />

        {/* —— Page 2: Privileges + Reserve —— */}
        <OacVipPrivileges />
        <ChooseCentre />
        <Gallery />
        <ReserveVisit />

        {/* —— Page 3: Closing offer —— */}
        <FinalCta />
      </main>
      <Footer />
    </BookingUiProvider>
  );
}
