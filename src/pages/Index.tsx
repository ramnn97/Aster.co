import Navbar from "@/components/agency/Navbar";
import Hero from "@/components/agency/Hero";
import About from "@/components/agency/About";
import Portfolio from "@/components/agency/Portfolio";
import Services from "@/components/agency/Services";
import CTA from "@/components/agency/CTA";
import Footer from "@/components/agency/Footer";

const Index = () => {
  return (
    <div className="bg-[#F5F5F5] text-black antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
