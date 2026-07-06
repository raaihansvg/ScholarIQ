import CTA from "./landing/CTA";
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Navbar from "./landing/Navbar";
import WhyScholarIQ from "./landing/WhyScholarIQ";

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-[#0F0F10] font-sans text-zinc-200">
      <Navbar onStart={onStart} />
      <main className="bg-[#0F0F10]">
        <Hero onStart={onStart} />
        <WhyScholarIQ />
        <CTA onStart={onStart} />
      </main>
      <Footer />
    </div>
  );
}
