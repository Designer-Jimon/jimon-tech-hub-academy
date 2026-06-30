"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Star,
  Quote,
  Sparkles,
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  X,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

function AnimatedCounter({
  end,
  suffix,
  label,
  icon: Icon,
  gradient,
}: {
  end: number;
  suffix: string;
  label: string;
  icon: typeof Star;
  gradient: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, duration / (end / step));
    return () => clearInterval(interval);
  }, [inView, end]);

  const display =
    end >= 1000
      ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, "0")}+`
      : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative p-6 sm:p-8 rounded-[24px] bg-white border border-navy/5 hover:border-blue-200 transition-all duration-400 hover:translate-y-[-6px] hover:shadow-xl hover:shadow-blue-900/10"
    >
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-400`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-1">
        {display}
      </div>
      <div className="text-sm sm:text-base text-navy/60 font-medium">{label}</div>
    </motion.div>
  );
}

const successStories = [
  {
    name: "Emeka",
    role: "AI Content Creator",
    story:
      "Started creating promotional videos for businesses using AI tools after completing our AI Video Creation program.",
    rating: 5,
    gradient: "from-blue-500 to-indigo-600",
    initials: "E",
  },
  {
    name: "Chioma",
    role: "Shopify Entrepreneur",
    story:
      "Built and launched an online fashion store using Shopify, now generating consistent sales monthly.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-600",
    initials: "C",
  },
  {
    name: "David",
    role: "Website Developer",
    story:
      "Uses vibe coding tools to develop websites for clients, turning AI prompts into polished business sites.",
    rating: 5,
    gradient: "from-cyan-500 to-blue-600",
    initials: "D",
  },
  {
    name: "Amara",
    role: "Digital Marketer",
    story:
      "Runs social media campaigns for multiple brands, leveraging AI tools for content creation and analytics.",
    rating: 5,
    gradient: "from-rose-500 to-pink-600",
    initials: "A",
  },
  {
    name: "Ifeanyi",
    role: "Graphic Designer",
    story:
      "Combines Photoshop with AI workflows to deliver projects faster and at a higher quality for clients.",
    rating: 5,
    gradient: "from-orange-500 to-amber-600",
    initials: "I",
  },
  {
    name: "Blessing",
    role: "Automation Specialist",
    story:
      "Builds business workflows with Make.com and AI agents, saving companies hours of manual work daily.",
    rating: 5,
    gradient: "from-violet-500 to-purple-600",
    initials: "B",
  },
];

const testimonials = [
  {
    quote:
      "The practical approach completely changed my understanding of AI. I now use AI tools daily in my business.",
    name: "Chidi O.",
    role: "Entrepreneur",
    initials: "CO",
  },
  {
    quote:
      "The Shopify training helped me launch my first online store successfully within weeks of completing the program.",
    name: "Ngozi E.",
    role: "Fashion Entrepreneur",
    initials: "NE",
  },
  {
    quote:
      "I built my first website through vibe coding without writing traditional code. The results were incredible.",
    name: "Tunde A.",
    role: "Freelance Developer",
    initials: "TA",
  },
  {
    quote:
      "The instructors made complex technologies simple and practical. I now automate my entire workflow.",
    name: "Zainab K.",
    role: "Operations Manager",
    initials: "ZK",
  },
  {
    quote:
      "Learning automation tools has increased my productivity tremendously. I recommend this academy to everyone.",
    name: "Michael A.",
    role: "Tech Professional",
    initials: "MA",
  },
];

const partners = [
  "ChatGPT", "Claude", "Gemini", "DeepSeek",
  "Shopify", "WooCommerce", "Make.com", "Zapier",
  "WordPress", "GitHub", "Photoshop", "Canva",
  "CapCut", "Figma",
];

const partnerInfo: Record<string, { description: string; category: string }> = {
  ChatGPT: {
    description: "Advanced AI language model by OpenAI for content generation, idea brainstorming, coding assistance, and conversational AI across diverse applications.",
    category: "AI Language Models",
  },
  Claude: {
    description: "Anthropic's AI assistant designed for safe, nuanced dialogue, document analysis, and complex reasoning tasks with enterprise-grade reliability.",
    category: "AI Language Models",
  },
  Gemini: {
    description: "Google's multimodal AI model capable of understanding text, images, audio, video, and code for comprehensive problem-solving.",
    category: "AI Language Models",
  },
  DeepSeek: {
    description: "Cutting-edge AI model excelling in mathematical reasoning, coding, and logical problem-solving with strong multilingual support.",
    category: "AI Language Models",
  },
  Shopify: {
    description: "Leading e-commerce platform enabling businesses to create, customize, and scale online stores with built-in marketing, payments, and analytics.",
    category: "E-Commerce Platforms",
  },
  WooCommerce: {
    description: "Open-source WordPress plugin that transforms any site into a powerful, customizable online store with full control over products and payments.",
    category: "E-Commerce Platforms",
  },
  "Make.com": {
    description: "Visual automation platform connecting apps and services to create complex workflows, automations, and integrations without coding.",
    category: "Automation Tools",
  },
  Zapier: {
    description: "No-code automation platform linking thousands of apps to automate repetitive tasks and streamline business processes effortlessly.",
    category: "Automation Tools",
  },
  WordPress: {
    description: "World's most popular content management system powering over 40% of websites with flexible themes, plugins, and intuitive editing.",
    category: "Web Development",
  },
  GitHub: {
    description: "Industry-standard platform for version control, collaboration, and code hosting, enabling teams to manage and deploy software projects.",
    category: "Web Development",
  },
  Photoshop: {
    description: "Adobe's professional image editing software with AI-powered tools for photo retouching, compositing, and digital art creation.",
    category: "Design Tools",
  },
  Canva: {
    description: "Intuitive graphic design platform with drag-and-drop tools, AI features, and thousands of templates for creating professional visuals.",
    category: "Design Tools",
  },
  CapCut: {
    description: "Free all-in-one video editing app with AI-powered features, effects, and templates for creating engaging short-form and long-form content.",
    category: "Video Creation",
  },
  Figma: {
    description: "Collaborative interface design tool that enables teams to design, prototype, and gather feedback in real time within the browser.",
    category: "Design Tools",
  },
};

function TestimonialSlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-14"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-5">
          <Sparkles className="w-4 h-4 text-blue-300" />
          WHAT OUR STUDENTS SAY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
          Real Experiences.{" "}
          <span className="text-gradient">Real Growth.</span>
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={900}
          loop
          pagination={{
            clickable: true,
            renderBullet: (_i: number, c: string) =>
              `<span class="${c} !bg-white/40 !w-2.5 !h-2.5 !opacity-100" style="background: white !important"></span>`,
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[28px] p-8 sm:p-10 md:p-12 text-center"
              >
                <Quote className="w-10 h-10 text-accent/40 mx-auto mb-6" />
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-sm text-blue-200/70">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default function TestimonialsSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const successRef = useRef(null);
  const successInView = useInView(successRef, { once: true, margin: "-50px" });
  const partnersRef = useRef(null);
  const partnersInView = useInView(partnersRef, { once: true, margin: "-50px" });
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const [duplicatedPartners] = useState(() => [...partners, ...partners]);

  return (
    <>
      <section
        id="about"
        ref={statsRef}
        className="relative py-20 md:py-28 overflow-hidden bg-gray-light"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />
        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatedCounter
              end={1500}
              suffix="+"
              label="Students Trained"
              icon={GraduationCap}
              gradient="from-blue-500 to-indigo-600"
            />
            <AnimatedCounter
              end={25}
              suffix="+"
              label="Industry Programs"
              icon={BookOpen}
              gradient="from-emerald-500 to-teal-600"
            />
            <AnimatedCounter
              end={50}
              suffix="+"
              label="Expert Mentors & Facilitators"
              icon={Users}
              gradient="from-amber-500 to-orange-600"
            />
            <AnimatedCounter
              end={90}
              suffix="%"
              label="Practical Project Completion Rate"
              icon={Trophy}
              gradient="from-rose-500 to-pink-600"
            />
          </motion.div>
        </div>
      </section>

      <section
        id="testimonials"
        ref={successRef}
        className="relative py-24 md:py-32 overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-light via-white to-gray-light pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={successInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy/70 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4 text-accent" />
            SUCCESS STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy leading-tight mb-4">
            Transforming Learners Into{" "}
            <span className="text-gradient-accent">Digital Innovators</span>
          </h2>
          <p className="text-base sm:text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto">
            Our students gain practical skills, build businesses, secure
            freelance opportunities, and become leaders in the digital
            economy.
          </p>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={900}
            loop
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="success-swiper"
          >
            {successStories.map((story, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={successInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="group h-full"
                >
                  <div className="relative h-full rounded-[24px] bg-white border border-navy/5 overflow-hidden transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/15">
                    <div className="p-6 sm:p-8 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0`}
                        >
                          {story.initials}
                        </div>
                        <div>
                          <div className="font-display font-bold text-navy text-lg">
                            {story.name}
                          </div>
                          <span className="inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full bg-navy/5 text-navy/70">
                            {story.role}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-navy/60 leading-relaxed flex-1 mb-5">
                        &ldquo;{story.story}&rdquo;
                      </p>

                      <div className="flex gap-1">
                        {Array.from({ length: story.rating }).map((_, r) => (
                          <Star
                            key={r}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <TestimonialSlider />

      <section
        ref={partnersRef}
        className="relative py-20 md:py-28 overflow-hidden bg-gray-light"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy/70 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4 text-accent" />
            TOOLS & TECHNOLOGIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy leading-tight">
            Learn With Modern{" "}
            <span className="text-gradient-accent">Industry Platforms</span>
          </h2>
        </motion.div>

        <div className="relative z-10 overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={marqueePaused ? {} : {
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
          >
            {duplicatedPartners.map((name, i) => (
              <motion.button
                key={`${name}-${i}`}
                onClick={() => setSelectedPartner(name)}
                className="group flex items-center justify-center px-4 sm:px-6 py-4 rounded-[16px] bg-white border border-navy/5 hover:border-blue-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 shrink-0"
                style={{ minWidth: "130px" }}
                aria-label={`Learn about ${name}`}
              >
                <span className="text-base sm:text-lg font-display font-bold text-navy/30 group-hover:text-accent transition-colors duration-300 whitespace-nowrap tracking-tight">
                  {name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedPartner && partnerInfo[selectedPartner] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-lg rounded-[28px] bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center hover:bg-navy/10 transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-navy" />
              </button>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent mb-3">
                {partnerInfo[selectedPartner].category}
              </span>
              <h3 className="text-2xl font-display font-bold text-navy mb-3">
                {selectedPartner}
              </h3>
              <p className="text-sm sm:text-base text-navy/60 leading-relaxed">
                {partnerInfo[selectedPartner].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}

