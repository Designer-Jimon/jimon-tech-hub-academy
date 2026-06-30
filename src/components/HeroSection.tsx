"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import {
  Brain,
  ShoppingCart,
  Code2,
  Sparkles,
  Zap,
  Globe,
  ChevronRight,
  Check,
  GraduationCap,
  FolderKanban,
  Clock,
  BarChart3,
  Play,
  Users,
  Monitor,
} from "lucide-react";
import { useGsapParallax } from "@/lib/gsap-hooks";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const trustItems = [
  { icon: GraduationCap, text: "Industry Mentors" },
  { icon: FolderKanban, text: "Practical Projects" },
  { icon: Clock, text: "Flexible Learning" },
  { icon: BarChart3, text: "Future-Ready Skills" },
];

const floatingCards = [
  {
    icon: Brain,
    label: "AI Agents",
    color: "from-violet-500 to-purple-600",
    x: "15%",
    y: "20%",
    delay: 0,
  },
  {
    icon: ShoppingCart,
    label: "Shopify",
    color: "from-emerald-500 to-teal-600",
    x: "70%",
    y: "15%",
    delay: 2,
  },
  {
    icon: Code2,
    label: "Vibe Coding",
    color: "from-blue-500 to-cyan-600",
    x: "10%",
    y: "60%",
    delay: 4,
  },
  {
    icon: Play,
    label: "AI Video",
    color: "from-rose-500 to-pink-600",
    x: "75%",
    y: "55%",
    delay: 1,
  },
  {
    icon: Zap,
    label: "Automation",
    color: "from-amber-500 to-orange-600",
    x: "45%",
    y: "8%",
    delay: 3,
  },
  {
    icon: Globe,
    label: "E-Commerce",
    color: "from-sky-500 to-indigo-600",
    x: "42%",
    y: "72%",
    delay: 5,
  },
];

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
    title: "Group Training",
    description: "African students learning together in a classroom",
    gradient: "from-blue-600/40 to-indigo-600/40",
    icon: Users,
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    title: "One-on-One Mentoring",
    description: "Personalized guidance from experienced mentors",
    gradient: "from-emerald-600/40 to-teal-600/40",
    icon: Monitor,
  },
  {
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600",
    title: "Online Learning",
    description: "Live sessions via Zoom and Google Meet",
    gradient: "from-violet-600/40 to-purple-600/40",
    icon: GraduationCap,
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    title: "Tech Conferences",
    description: "Networking and learning at industry events",
    gradient: "from-rose-600/40 to-pink-600/40",
    icon: Brain,
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
    title: "Graduation & Success",
    description: "Celebrating students who completed our programs",
    gradient: "from-amber-600/40 to-orange-600/40",
    icon: Code2,
  },
];

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

function FloatingCard({
  icon: Icon,
  label,
  color,
  x,
  y,
  delay,
}: {
  icon: typeof Brain;
  label: string;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-dark shadow-xl z-10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 1 + delay * 0.15 },
        scale: { duration: 0.6, delay: 1 + delay * 0.15 },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
      }}
      whileHover={{ scale: 1.08, y: -16 }}
    >
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-medium text-white/90">{label}</span>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiperReady, setSwiperReady] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  useGsapParallax(bgRef, 0.2);

  return (
      <section
        id="hero"
        ref={sectionRef}
        className="relative min-h-screen overflow-x-hidden bg-navy-deep"
        style={{ touchAction: "pan-y" }}
      >
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep z-0" />

      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[80px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>

      <Particles />

      <div className="relative z-10 container-custom pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen flex items-center max-w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full max-w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-full text-center lg:text-left"
          >
            <motion.div
              variants={fadeUpFast}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6 mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-blue-300 shrink-0" />
              <span className="text-sm font-medium text-blue-200">
                Africa&apos;s AI-First Tech Academy
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-white mb-6 max-w-full mx-auto"
            >
              Learn{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                AI
              </span>
              , Build{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Businesses
              </span>
              , and Shape the{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Future
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-blue-100/70 max-w-xl leading-relaxed mb-8 mx-auto"
            >
              Master Artificial Intelligence, AI Content Creation, Website
              Development, E-commerce, Digital Marketing, Automation, and Future
              Technologies through practical, project-based learning.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full"
            >
              <motion.a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Register Now
                <ChevronRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full border border-white/20 text-white/90 font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Explore Programs
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-x-6 gap-y-3 max-w-full justify-center lg:justify-start"
            >
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-300" />
                  </div>
                  <span className="text-sm text-blue-200/80">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative max-w-full hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
          <motion.div
            className="relative w-full h-[300px] sm:h-[380px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-navy/40"
            style={{ y: parallaxY }}
          >
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={900}
              loop
              pagination={{ clickable: true }}
              className="w-full h-full"
              touchStartPreventDefault={false}
              onInit={() => setSwiperReady(true)}
            >
              {carouselSlides.map((slide, i) => {
                const Icon = slide.icon;
                const imageFailed = failedImages.has(i);
                return (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full flex items-end overflow-hidden" style={{ touchAction: "pan-y" }}>
                      {imageFailed ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-navy to-accent/30 flex items-center justify-center">
                          <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-white/20" />
                        </div>
                      ) : (
                        <img
                          src={slide.image}
                          alt={slide.title}
                          width={600}
                          height={400}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchPriority={i === 0 ? "high" : "auto"}
                          onError={() => handleImageError(i)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass-dark flex items-center justify-center">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>

                      <div className="relative z-20 p-5 sm:p-8 pointer-events-none">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-1 sm:mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-sm sm:text-base text-blue-100/70 max-w-md">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>

            {floatingCards.map((card) => (
              <FloatingCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
    </section>
  );
}

