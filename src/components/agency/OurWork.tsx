import { useMemo } from "react";
import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";

type Category = "all" | "performance" | "web" | "shoots" | "social";

type ProjectCard = {
  id: number;
  title: string;
  subtitle: string;
  category: Category;
  tag: string;
};

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Performance growth dashboard",
    subtitle: "Insta-first campaign layout built for ROAS and scale.",
    category: "performance",
    tag: "Performance Marketing",
  },
  {
    id: 2,
    title: "High-converting landing page",
    subtitle: "Minimal hero, sharp hierarchy, and conversion-focused layout.",
    category: "web",
    tag: "Web Design",
  },
  {
    id: 3,
    title: "Product shoot grid",
    subtitle: "Clean tabletop product visuals with soft shadows.",
    category: "shoots",
    tag: "Shoots & Product Shoot",
  },
  {
    id: 4,
    title: "Lifestyle reel cover",
    subtitle: "Scroll-stopping social visual made for Reels & Shorts.",
    category: "social",
    tag: "Social Media",
  },
  {
    id: 5,
    title: "Retargeting creative set",
    subtitle: "Carousel-ready concepts for warm audience retargeting.",
    category: "performance",
    tag: "Performance Marketing",
  },
  {
    id: 6,
    title: "E‑commerce product page",
    subtitle: "Clean layout to make products feel premium and effortless.",
    category: "web",
    tag: "Web Design",
  },
];

const categoryLabels: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web design" },
  { key: "performance", label: "Performance marketing" },
  { key: "shoots", label: "Shoots" },
  { key: "social", label: "Social media" },
];

type OurWorkProps = {
  activeCategory: Category;
  onCategoryChange?: (category: Category) => void;
};

const categoryAccent: Record<Category, string> = {
  all: "from-black via-slate-700 to-black",
  web: "from-emerald-400 via-teal-400 to-cyan-400",
  performance: "from-orange-400 via-red-500 to-pink-500",
  shoots: "from-purple-400 via-fuchsia-500 to-indigo-500",
  social: "from-yellow-300 via-pink-400 to-purple-500",
};

export default function OurWork({ activeCategory, onCategoryChange }: OurWorkProps) {
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
              className="bg-white rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.18)] border border-black/5 flex flex-col"
            >
              <div className="relative aspect-[16/9] bg-[#f0f0f0] overflow-hidden">
                <div
                  className={`absolute inset-x-[-20%] -top-10 h-24 bg-gradient-to-r ${categoryAccent[project.category]} opacity-80 blur-2xl`}
                />
                <div className="relative z-10 h-full w-full">
                  <PlaceholderImage />
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
    </section>
  );
}


