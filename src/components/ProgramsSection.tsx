"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Sparkles,
  Palette,
  Video,
  Code2,
  ShoppingCart,
  Megaphone,
  Briefcase,
  Cpu,
  ChevronRight,
  Check,
  Rocket,
} from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";

const programs = [
  {
    id: "ai-fundamentals",
    category: "ai",
    icon: Brain,
    title: "Artificial Intelligence (AI) Fundamentals",
    description:
      "Build a strong foundation in Artificial Intelligence, Generative AI, Prompt Engineering, and ethical AI usage.",
    skills: [
      "Introduction to AI",
      "Generative AI",
      "Prompt Engineering",
      "AI Ethics",
      "Productivity Systems",
      "AI Workflows",
    ],
    gradient: "from-blue-600/20 to-indigo-600/20",
    iconBg: "from-blue-500 to-indigo-600",
    borderGlow: "group-hover:border-blue-400/50",
  },
  {
    id: "ai-business",
    category: "ai",
    icon: Sparkles,
    title: "AI Tools for Business & Productivity",
    description:
      "Master modern AI platforms to automate work, increase productivity, and improve business performance.",
    skills: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "DeepSeek",
      "AI Research",
      "AI Automation",
    ],
    gradient: "from-violet-600/20 to-purple-600/20",
    iconBg: "from-violet-500 to-purple-600",
    borderGlow: "group-hover:border-violet-400/50",
  },
  {
    id: "ai-design",
    category: "creative",
    icon: Palette,
    title: "AI Graphic Design & Flyer Creation",
    description:
      "Learn how to create stunning visual designs using AI and professional design principles.",
    skills: [
      "Flyer Design",
      "Social Media Graphics",
      "Photoshop + AI",
      "Brand Identity",
      "Marketing Assets",
    ],
    gradient: "from-rose-600/20 to-pink-600/20",
    iconBg: "from-rose-500 to-pink-600",
    borderGlow: "group-hover:border-rose-400/50",
  },
  {
    id: "ai-video",
    category: "creative",
    icon: Video,
    title: "AI Video Creation & Animation",
    description:
      "Create engaging videos, animations, voiceovers, and digital campaigns with AI tools.",
    skills: [
      "Text-to-Video",
      "AI Animation",
      "AI Voiceovers",
      "Video Editing",
      "Content Creation",
    ],
    gradient: "from-orange-600/20 to-amber-600/20",
    iconBg: "from-orange-500 to-amber-600",
    borderGlow: "group-hover:border-orange-400/50",
  },
  {
    id: "vibe-coding",
    category: "development",
    icon: Code2,
    title: "Website Creation Through Vibe Coding",
    description:
      "Build websites using AI prompts and modern development tools without extensive traditional coding.",
    skills: [
      "Vibe Coding",
      "AI Coding Assistants",
      "Business Websites",
      "Portfolio Sites",
      "Landing Pages",
      "Deployment",
    ],
    gradient: "from-cyan-600/20 to-blue-600/20",
    iconBg: "from-cyan-500 to-blue-600",
    borderGlow: "group-hover:border-cyan-400/50",
  },
  {
    id: "ecommerce",
    category: "business",
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "Launch and manage successful online stores using Shopify and WooCommerce.",
    skills: [
      "Shopify",
      "WooCommerce",
      "Product Management",
      "Payment Integration",
      "Store Customization",
      "AI Automation",
    ],
    gradient: "from-emerald-600/20 to-teal-600/20",
    iconBg: "from-emerald-500 to-teal-600",
    borderGlow: "group-hover:border-emerald-400/50",
    badges: ["SHOPIFY", "WOOCOMMERCE"],
  },
  {
    id: "digital-marketing",
    category: "marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Learn how to build brands, attract customers, and grow businesses online.",
    skills: [
      "SEO",
      "Social Media Marketing",
      "Content Creation",
      "Email Marketing",
      "Paid Ads",
      "Analytics",
      "AI Marketing Tools",
    ],
    gradient: "from-red-600/20 to-rose-600/20",
    iconBg: "from-red-500 to-rose-600",
    borderGlow: "group-hover:border-red-400/50",
  },
  {
    id: "entrepreneurship",
    category: "business",
    icon: Briefcase,
    title: "Entrepreneurship & Tech Business Development",
    description:
      "Turn your digital skills into sustainable businesses and remote work opportunities.",
    skills: [
      "Freelancing",
      "Personal Branding",
      "CRM",
      "Client Acquisition",
      "Pricing Strategies",
      "Business Growth",
    ],
    gradient: "from-amber-600/20 to-yellow-600/20",
    iconBg: "from-amber-500 to-yellow-600",
    borderGlow: "group-hover:border-amber-400/50",
  },
  {
    id: "emerging-tech",
    category: "future",
    icon: Cpu,
    title: "Emerging Technologies & Future Skills",
    description:
      "Stay ahead by mastering the next generation of digital tools and innovations.",
    skills: [
      "No-Code Tools",
      "Low-Code Platforms",
      "Make.com",
      "Zapier",
      "AI Agents",
      "Workflow Automation",
      "Digital Transformation",
    ],
    gradient: "from-indigo-600/20 to-violet-600/20",
    iconBg: "from-indigo-500 to-violet-600",
    borderGlow: "group-hover:border-indigo-400/50",
  },
];

const filters = [
  { label: "All Programs", value: "all" },
  { label: "AI", value: "ai" },
  { label: "Creative", value: "creative" },
  { label: "Development", value: "development" },
  { label: "Business", value: "business" },
  { label: "Marketing", value: "marketing" },
  { label: "Future Skills", value: "future" },
];

function ProgramCard({
  program,
  index,
  onRegister,
}: {
  program: (typeof programs)[0];
  index: number;
  onRegister: (id: string) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = program.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <motion.div
        className={`group relative h-full rounded-[28px] border border-white/10 bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-400 hover:translate-y-[-10px] hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/20 ${program.borderGlow}`}
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${program.gradient}`}
        />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.iconBg} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            {program.badges && (
              <div className="flex gap-1.5">
                {program.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full bg-navy/10 text-navy uppercase"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-navy mb-3 leading-snug">
            {program.title}
          </h3>
          <p className="text-sm text-navy/60 mb-5 leading-relaxed">
            {program.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6 flex-1">
            {program.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-navy/5 text-navy/70 group-hover:bg-navy/10 transition-colors duration-300"
              >
                <Check className="w-3 h-3 text-accent" />
                {skill}
              </span>
            ))}
          </div>

          <motion.button
            onClick={() => onRegister(program.id)}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-navy text-white font-semibold text-sm hover:bg-accent transition-all duration-300 mt-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Register Now
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const bottomRef = useRef(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-50px" });

  const filtered =
    activeFilter === "all"
      ? programs
      : programs.filter((p) => p.category === activeFilter);

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gray-light"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none" />

      <div className="relative z-10" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy/70 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4 text-accent" />
            OUR PROGRAMS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-navy leading-[1.15] mb-5">
            Master Future-Ready{" "}
            <span className="text-gradient-accent">Digital Skills</span>
          </h2>
          <p className="text-base sm:text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto">
            From Artificial Intelligence and website creation to e-commerce,
            digital marketing, and business automation, our programs are
            designed to equip Africans with practical skills for the future
            of work.
          </p>
        </motion.div>

        <div className="mb-10 md:mb-14">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start md:justify-center">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-navy text-white shadow-lg shadow-navy/20"
                    : "bg-white/80 text-navy/60 hover:bg-navy/5 hover:text-navy border border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filtered.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={i}
              onRegister={setSelectedCourseId}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-navy/40 text-lg">No programs in this category.</p>
          </div>
        )}
      </div>

      <div ref={bottomRef} className="relative mt-24 md:mt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/30 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={bottomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 py-20 md:py-28"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center shadow-2xl shadow-accent/30"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
            Ready to Start Your{" "}
            <span className="text-gradient">Tech Journey?</span>
          </h2>
          <p className="text-base sm:text-lg text-blue-100/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of future innovators learning practical digital
            skills that create opportunities, businesses, and global careers.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() =>
                document
                  .getElementById("programs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <RegistrationModal
        isOpen={selectedCourseId !== null}
        onClose={() => setSelectedCourseId(null)}
        courseId={selectedCourseId ?? ""}
      />
    </section>
  );
}

