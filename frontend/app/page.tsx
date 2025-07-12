import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/home/footer";
import LandingPage from "@/components/home/landing-page";
import { ProblemSection } from "@/components/home/problem-section";
import { WhyPepperSection } from "@/components/home/why-pepper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingPage />
      <ProblemSection />
      <FeaturesSection />
      <WhyPepperSection />
    </div>
  );
}
