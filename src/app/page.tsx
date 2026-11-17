// import Image from "next/image";

import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
      <main className="min-h-screen">
        <Header/>
        <Hero/>
        <HowItWorks/>
        <ContactSection/>
        <Footer/>
      </main>
  );
}
