import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import leadsPdf from "@/Leads.pdf";
import coverHospital from "@/source/cover-hospital.png";
import coverBhiwandi from "@/bhiwandi cover.png";
import coverPerformance from "@/source/cover-performance.jpg";

type Category = "all" | "performance" | "web";

type ProjectCard = {
  id: number;
  title: string;
  subtitle: string;
  category: Category;
  tag: string;
  link?: string;
  cover?: string;
};

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Performance growth dashboard",
    subtitle: "Insta-first campaign layout built for ROAS and scale.",
    category: "performance",
    tag: "Performance Marketing",
    link: leadsPdf,
    cover: coverPerformance,
  },
  {
    id: 2,
    title: "Hospital Website",
    subtitle: "Minimal hero, sharp hierarchy, and conversion-focused layout.",
    category: "web",
    tag: "Web Design",
    link: "https://white-lotus-portal.vercel.app/",
    cover: coverHospital,
  },


  {
    id: 6,
    title: "High-end landing page",
    subtitle: "Clean layout to make products feel premium and effortless.",
    category: "web",
    tag: "Web Design",
    link: "https://obys-agency-flame.vercel.app/",
  },
  {
    id: 7,
    title: "Bhiwandi Restaurant",
    subtitle: "A rich, immersive restaurant website with elegant visuals and smooth experience.",
    category: "web",
    tag: "Web Design",
    link: "https://restaurant-gules-three.vercel.app/",
    cover: coverBhiwandi,
  },
];

const categoryLabels: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web design" },
  { key: "performance", label: "Performance marketing" },
];

type OurWorkProps = {
  activeCategory: Category;
  onCategoryChange?: (category: Category) => void;
};

const categoryAccent: Record<Category, string> = {
  all: "from-black via-slate-700 to-black",
  web: "from-emerald-400 via-teal-400 to-cyan-400",
  performance: "from-orange-400 via-red-500 to-pink-500",
};

export default function OurWork({ activeCategory, onCategoryChange }: OurWorkProps) {
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="bg-[#f7f7f7] px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 md:mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-2">
              Projects
            </h1>
            <p className="text-xs md:text-sm text-black/50 max-w-xl">
              Every project is a little lab for experimentation and craft — built
              to be clean, minimal and easy to plug your real work into later.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-[11px] md:text-xs shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="uppercase tracking-[0.18em] font-semibold">
              {activeCategory === "all"
                ? "Live: all work"
                : `Live: ${
                    categoryLabels.find((c) => c.key === activeCategory)?.label
                  }`}
            </span>
          </div>
        </header>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm mb-8 border-b border-black/5 pb-4">
          {categoryLabels.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => onCategoryChange?.(cat.key)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-black text-white border-black shadow-sm translate-y-[-1px]"
                  : "bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.18)] border border-black/5 flex flex-col ${project.link ? "cursor-pointer" : ""}`}
              onClick={() => project.link && setPreviewLink(project.link)}
            >
              <div className="relative aspect-[16/9] bg-[#f0f0f0] overflow-hidden">
                <div
                  className={`absolute inset-x-[-20%] -top-10 h-24 bg-gradient-to-r ${categoryAccent[project.category]} opacity-80 blur-2xl`}
                />
                <div className="relative z-10 h-full w-full">
                  {project.cover ? (
                    <img src={project.cover} alt={project.title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <PlaceholderImage />
                  )}
                </div>
              </div>
              <div className="px-5 py-4 md:px-6 md:py-5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-black/50 mb-1">
                  <span className="uppercase tracking-[0.16em] font-semibold">
                    {project.tag}
                  </span>
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px]">
                    Demo layout
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-black">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-black/55">
                  {project.subtitle}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-black/55">
                  <span className="inline-flex items-center gap-1 cursor-pointer hover:text-black">
                    <span className="h-4 w-4 rounded-full border border-black/30 flex items-center justify-center text-[9px]">
                      ↗
                    </span>
                    Visit site
                  </span>
                  <span className="text-black/35 cursor-pointer hover:text-black">
                    Search image ↻
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setPreviewLink(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewLink(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                src={previewLink}
                className="w-full h-full border-0"
                title="PDF Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


