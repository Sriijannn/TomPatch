import Image from "next/image";
import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/HeroSection";
import Bridge from "@/components/landing/bridgeSection";
import Features from "@/components/landing/features";
import Bridge2 from "@/components/landing/bridge2";
import Footer from "@/components/layout/footer";
export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Bridge />
      <Features />
      <Bridge2 />
      <Footer />
    </div>
  );
}
