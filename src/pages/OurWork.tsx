import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/agency/Navbar";
import Footer from "@/components/agency/Footer";
import OurWorkSection from "@/components/agency/OurWork";

type Category = "all" | "performance" | "web" | "shoots" | "social";

const hashToCategory: Record<string, Category> = {
  "#performance-marketing": "performance",
  "#web-design": "web",
  "#shoots-product-shoot": "shoots",
  "#social-media": "social",
};

const OurWorkPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    const hash = location.hash as keyof typeof hashToCategory;
    if (hash && hashToCategory[hash]) {
      setActiveCategory(hashToCategory[hash]);
    } else {
      setActiveCategory("all");
    }
  }, [location]);

  return (
    <div className="bg-[#F5F5F5] text-black antialiased overflow-x-hidden min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <OurWorkSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </main>
      <Footer />
    </div>
  );
};

export default OurWorkPage;

