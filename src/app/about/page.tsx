"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  Rocket,
  Target,
  Eye,
  Lightbulb,
  Shield,
  Award,
  Sparkles,
  Users,
  Brain,
} from "lucide-react";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const programs = [
  "Artificial Intelligence (AI)",
  "AI Automation",
  "Graphic Design",
  "AI Video Creation",
  "Website Design & Development",
  "Shopify & WooCommerce",
  "Digital Marketing",
  "Entrepreneurship",
  "Emerging Technologies",
  "No-Code & Automation Tools",
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace emerging technologies and creative approaches to solve real-world problems.",
  },
  {
    icon: Users,
    title: "Empowerment",
    desc: "We equip individuals with skills that create opportunities and transform lives.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "We uphold honesty, transparency, and ethical practices in everything we do.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We deliver high-quality training that meets global standards and industry demands.",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    desc: "We foster original thinking and innovative solutions in every learner.",
  },
  {
    icon: Brain,
    title: "Community Impact",
    desc: "We build a thriving ecosystem where technology benefits everyone.",
  },
];

function generateParticles(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      id: `p${seed}-${i}`,
      left: ((n * 37 + 13) % 100),
      top: ((n * 53 + 7) % 100),
      size: 1 + ((n * 3) % 3),
      duration: 8 + ((n * 2) % 10),
      delay: (i * 0.4) % 5,
      xDrift: ((n * 7) % 40) - 20,
      yDrift: ((n * 11) % 40) - 20,
    };
  });
}

function generateShapes(count: number, seed: number) {
  const types = ["triangle", "diamond", "hexagon"] as const;
  return Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      id: `s${seed}-${i}`,
      type: types[n % 3],
      left: 5 + ((n * 23) % 85),
      top: 5 + ((n * 31) % 85),
      size: 30 + ((n * 15) % 50),
      rotDuration: 20 + ((n * 7) % 15),
      driftDuration: 18 + ((n * 4) % 12),
      delay: i * 2,
    };
  });
}

function ShapeSvg({ type, className }: { type: string; className?: string }) {
  if (type === "triangle") {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <polygon points="50 5, 95 90, 5 90" fill="currentColor" />
      </svg>
    );
  }
  if (type === "diamond") {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <polygon points="50 5, 95 50, 50 95, 5 50" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5" fill="currentColor" />
    </svg>
  );
}

function SectionHeader({ label, title, highlight, dark }: { label?: string; title: string; highlight: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center max-w-3xl mx-auto mb-14"
    >
      {label && (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5 ${dark ? "bg-white/10 text-blue-200" : "bg-navy/5 text-navy/70"}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>
        {title}{" "}
        <span className="text-gradient-accent">{highlight}</span>
      </h2>
    </motion.div>
  );
}

export default function AboutPage() {
  const whoRef = useRef(null);
  const whoInView = useInView(whoRef, { once: true, margin: "-50px" });
  const founderRef = useRef(null);
  const founderInView = useInView(founderRef, { once: true, margin: "-50px" });
  const visionRef = useRef(null);
  const visionInView = useInView(visionRef, { once: true, margin: "-50px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-50px" });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-50px" });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const whoParticles = useMemo(() => generateParticles(18, 100), []);
  const whoShapes = useMemo(() => generateShapes(5, 200), []);
  const founderParticles = useMemo(() => generateParticles(16, 300), []);
  const founderShapes = useMemo(() => generateShapes(4, 400), []);

  return (
    <main>
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] left-[5%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[10%] w-[45%] h-[45%] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[80px]" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/10"
              style={{ left: `${((i * 37 + 13) % 100)}%`, top: `${((i * 53 + 7) % 100)}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 3 + ((i * 3) % 4), repeat: Infinity, delay: (i * 0.7) % 5, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-blue-200 text-sm font-medium mb-6"
          >
            ABOUT JIMON TECH HUB ACADEMY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 max-w-4xl mx-auto"
          >
            Transforming Lives Through{" "}
            <span className="text-gradient">Technology, Innovation,</span>{" "}
            and Digital Skills.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl text-blue-100/70 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We are building a future where practical technology education is
            accessible to everyone, empowering individuals, businesses, and
            communities with skills that create opportunities and generate
            sustainable income.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300"
            >
              Register Now
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/90 font-semibold text-base hover:bg-white/10 transition-all duration-300"
            >
              Explore Our Programs
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* SECTION 2: WHO WE ARE */}
      <section ref={whoRef} className="relative py-24 md:py-32 overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy to-navy-deep/60 pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {whoParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(255,255,255,0.15)`,
              }}
              animate={{
                x: [0, p.xDrift, 0],
                y: [0, p.yDrift, 0],
                opacity: [0.05, 0.5, 0.05],
                scale: [1, 1.6, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {whoShapes.map((s) => (
            <motion.div
              key={s.id}
              className="absolute text-accent"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: 0.04,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -10, 0],
              }}
              transition={{
                rotate: {
                  duration: s.rotDuration,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration: s.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: s.delay,
                },
              }}
            >
              <ShapeSvg type={s.type} className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom wave glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: "radial-gradient(50% 100% at 50% 100%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 container-custom">
          <SectionHeader dark title="Who" highlight="We Are" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={whoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed mb-6">
                Jimon Tech Hub Academy is a center for innovation, empowerment,
                and practical technology education.
              </p>
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed mb-6">
                Our mission is to bridge the digital divide by bringing technology
                closer to people and making modern skills accessible regardless of
                background or location.
              </p>
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed mb-6">
                We equip students, entrepreneurs, job seekers, business owners,
                church leaders, and young innovators with practical digital skills
                that solve problems, create employment opportunities, and generate
                sustainable income.
              </p>
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed mb-10">
                Our training focuses on real-world applications rather than theory
                alone, ensuring that every learner gains skills they can
                immediately apply in business, work, ministry, and everyday life.
              </p>

              <motion.div
                variants={stagger}
                initial="hidden"
                animate={whoInView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {programs.map((p) => (
                  <motion.div
                    key={p}
                    variants={fadeUp}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-blue-100/80">
                      {p}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={whoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
              style={{ y: whoInView ? 0 : 30 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl shadow-navy/10">
                <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/30 to-navy/80 z-10 rounded-[28px] pointer-events-none" />
                <Image
                  src="/logo.png"
                  alt="Jimon Tech Hub Academy - Training and Innovation"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-[28px] border-2 border-accent/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR FOUNDER */}
      <section ref={founderRef} className="relative py-24 md:py-32 overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy to-navy-deep/60 pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {founderParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(255,255,255,0.15)`,
              }}
              animate={{
                x: [0, p.xDrift, 0],
                y: [0, p.yDrift, 0],
                opacity: [0.05, 0.5, 0.05],
                scale: [1, 1.6, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {founderShapes.map((s) => (
            <motion.div
              key={s.id}
              className="absolute text-accent"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: 0.04,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -10, 0],
              }}
              transition={{
                rotate: {
                  duration: s.rotDuration,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration: s.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: s.delay,
                },
              }}
            >
              <ShapeSvg type={s.type} className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom wave glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: "radial-gradient(50% 100% at 50% 100%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 container-custom">
          <SectionHeader dark label="OUR FOUNDER" title="Meet The" highlight="Founder" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={founderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className="relative">
              <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden bg-navy/5 border border-navy/10 shadow-2xl shadow-navy/10">
                <Image
                  src="/about.jpg"
                  alt="Emmanuel Ezeugwu - Founder"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 hidden bg-gradient-to-br from-accent to-blue-600 items-center justify-center text-white font-bold text-6xl font-display"
                  style={{ display: "none" }}
                >
                  EE
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[28px] border-2 border-accent/20 -z-10" />
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                Emmanuel Ezeugwu
              </h3>
              <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-white/10 text-blue-200 mb-6">
                Founder, Jimon Tech Hub & Jimon Tech Hub Academy
              </span>

              <div className="space-y-4 text-blue-100/80 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Emmanuel Ezeugwu founded Jimon Tech Hub with a simple but
                  powerful vision:
                </p>
                <p className="text-lg sm:text-xl font-semibold text-white italic border-l-4 border-accent pl-4">
                  &ldquo;To bring technology to people&apos;s doorsteps.&rdquo;
                </p>
                <p>
                  He believes that access to digital skills should not be
                  limited by geography, background, or financial circumstances.
                </p>
                <p>
                  Through Jimon Tech Hub Academy, his goal is to empower
                  individuals with practical, income-generating skills that
                  create opportunities, build businesses, solve community
                  problems, and prepare people for the future of work.
                </p>
                <p>
                  The academy exists to make innovation accessible, practical,
                  and transformative for everyone.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={founderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="relative mt-8 p-6 sm:p-8 rounded-[24px] bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-400 rounded-t-[24px]" />
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg text-blue-100 font-semibold italic leading-relaxed">
                  &ldquo;We are not merely teaching technology; we are
                  empowering people to build better futures through
                  innovation.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    EE
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Emmanuel Ezeugwu</div>
                    <div className="text-xs text-blue-100/50">Founder</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: VISION & MISSION */}
      <section ref={visionRef} className="relative py-24 md:py-32 overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/15 blur-[100px]" />
        </div>

        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-5">
              OUR PURPOSE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Vision &{" "}
              <span className="text-gradient">Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="group relative p-8 sm:p-10 rounded-[28px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-all duration-500 hover:translate-y-[-8px]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-400 rounded-t-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-400">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-base text-blue-100/70 leading-relaxed">
                To become a leading technology academy that empowers individuals
                with practical, income-generating digital skills and creates a
                generation of innovators, entrepreneurs, and globally competitive
                professionals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={visionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="group relative p-8 sm:p-10 rounded-[28px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-all duration-500 hover:translate-y-[-8px]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-400 rounded-t-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-400">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-base text-blue-100/70 leading-relaxed">
                To provide affordable, practical, and industry-relevant
                technology education that creates employment, entrepreneurship,
                and innovation opportunities while bringing technology closer to
                everyday people.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CORE VALUES */}
      <section ref={valuesRef} className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-light via-white to-gray-light pointer-events-none" />
        <div className="relative z-10 container-custom">
          <SectionHeader label="OUR VALUES" title="Core" highlight="Values" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="group relative p-6 sm:p-8 rounded-[24px] bg-white border border-navy/5 hover:border-blue-300 transition-all duration-400 hover:translate-y-[-8px] hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/15"
                >
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-accent/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-400">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-navy mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-navy/60 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: WHY WE EXIST */}
      <section ref={whyRef} className="relative py-24 md:py-32 overflow-hidden bg-gray-light">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />
        <div className="relative z-10 container-custom">
          <SectionHeader title="Why Jimon Tech Hub" highlight="Academy Exists" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative p-8 sm:p-10 md:p-12 rounded-[28px] bg-white border border-navy/5 shadow-xl shadow-navy/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center shadow-lg shadow-accent/20"
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>

              <p className="text-base sm:text-lg text-navy/70 leading-relaxed mb-6">
                Technology is shaping every aspect of modern life, yet many
                people still lack access to practical digital education.
              </p>
              <p className="text-base sm:text-lg text-navy/70 leading-relaxed mb-6">
                Jimon Tech Hub Academy exists to close that gap.
              </p>
              <p className="text-base sm:text-lg text-navy/70 leading-relaxed mb-6">
                We believe technology should be accessible, understandable, and
                useful to everyone.
              </p>
              <p className="text-base sm:text-lg text-navy font-semibold leading-relaxed">
                Our commitment is to bring technology to people&apos;s doorsteps
                by delivering practical training, mentorship, and opportunities
                that transform lives and strengthen communities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section ref={ctaRef} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[80px]" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/10"
              style={{ left: `${((i * 37 + 13) % 100)}%`, top: `${((i * 53 + 7) % 100)}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3 + ((i * 3) % 4), repeat: Infinity, delay: (i * 0.7) % 5, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto px-6"
        >
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-[32px] p-8 sm:p-12 md:p-16 text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center shadow-2xl shadow-accent/30"
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-5">
              Start Your Digital{" "}
              <span className="text-gradient">Transformation Journey</span> Today
            </h2>
            <p className="text-base sm:text-lg text-blue-100/70 mb-10 max-w-xl mx-auto leading-relaxed">
              Join a growing community of learners, creators, entrepreneurs, and
              innovators building the future through technology.
            </p>

            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent text-white font-semibold text-lg shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300"
            >
              Register Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

