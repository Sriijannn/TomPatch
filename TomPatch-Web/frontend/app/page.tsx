import Image from "next/image";
import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/HeroSection";
import Bridge from "@/components/landing/bridgeSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Bridge />
    </div>
  );
}
