import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImmersiveIntro } from "@/components/sections/ImmersiveIntro";
import { WhyVisit } from "@/components/sections/WhyVisit";
import { ExperienceCenters } from "@/components/sections/ExperienceCenters";
import { Gallery } from "@/components/sections/Gallery";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { Statistics } from "@/components/sections/Statistics";
import { BookVisit } from "@/components/sections/BookVisit";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ImmersiveIntro />
        <WhyVisit />
        <ExperienceCenters />
        <Gallery />
        <JourneyTimeline />
        <Industries />
        <Testimonials />
        <Statistics />
        <BookVisit />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
