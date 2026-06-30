"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import emailjs from "@emailjs/browser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  ChevronRight,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Rocket,
  Star,
  User,
  MessageSquare,
  X,
} from "lucide-react";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import Logo from "@/components/Logo";

import "swiper/css";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};



interface Mentor {
  name: string;
  title: string;
  bio: string;
  fullBio: string;
  expertise: string[];
  image: string;
  gradient: string;
  initials: string;
}

const mentors: Mentor[] = [
  {
    name: "Arch. Uche Donald",
    title: "AI Creative Media & Automation Specialist",
    bio: "Digital creative and technology enthusiast leveraging AI for graphics, video creation, content production, and workflow automation.",
    fullBio: "Pastor Uche Donatus is a digital creative and technology enthusiast with expertise in leveraging Artificial Intelligence for graphics, video creation, content production, and workflow automation. He is passionate about helping individuals and businesses embrace emerging technologies to improve productivity and unlock new opportunities. His work focuses on practical applications of AI tools for creative design, video editing, content generation, and digital innovation. Through his teachings, he inspires people to adapt to the changing technological landscape and build sustainable digital careers.",
    expertise: [
      "AI-Powered Graphic Design",
      "AI Video Creation & Editing",
      "Workflow Automation",
      "Content Creation with AI",
      "Digital Creativity & Innovation",
    ],
    image: "/arch-uche-donald.jpeg",
    gradient: "from-blue-500 to-indigo-600",
    initials: "AD",
  },
  {
    name: "Kenney Jacobs",
    title: "E-Commerce & Digital Business Strategist",
    bio: "E-commerce professional and digital entrepreneur specializing in online business systems and global freelancing opportunities.",
    fullBio: "Jacob is an e-commerce professional and digital entrepreneur specializing in online business systems and global freelancing opportunities. He helps aspiring entrepreneurs build profitable online stores and position themselves in the digital economy through platforms such as Shopify and WooCommerce. With practical experience in digital commerce, he empowers individuals to monetize their skills online, reach international markets, and create sustainable income streams through modern business models.",
    expertise: [
      "Shopify Store Development",
      "WooCommerce Solutions",
      "E-Commerce Business Models",
      "Freelancing & Remote Work",
      "Digital Entrepreneurship",
      "Online Income Strategies",
    ],
    image: "/kenny-jacobs.jpg",
    gradient: "from-emerald-500 to-teal-600",
    initials: "KJ",
  },
  {
    name: "Linda Odo",
    title: "Artificial Intelligence & Digital Transformation Advocate",
    bio: "AI enthusiast and digital transformation advocate dedicated to helping individuals and businesses harness the power of Artificial Intelligence.",
    fullBio: "Linda Odo is an AI enthusiast and digital transformation advocate dedicated to helping individuals and businesses harness the power of Artificial Intelligence. Her work centers on practical AI applications, productivity tools, and emerging technologies that are reshaping the future of work. She is passionate about educating people on how to leverage AI to increase efficiency, create opportunities, and thrive in an increasingly digital world. Her mission is to bridge the gap between technology and everyday life, making innovation accessible to everyone.",
    expertise: [
      "Artificial Intelligence Tools & Applications",
      "AI for Business & Productivity",
      "Emerging Digital Technologies",
      "Remote Work Opportunities",
      "Digital Innovation & Transformation",
    ],
    image: "/lynda-odo.jpeg",
    gradient: "from-violet-500 to-purple-600",
    initials: "LO",
  },
];

const faqs = [
  {
    q: "Do I need prior experience before joining?",
    a: "No. Our programs accommodate complete beginners and experienced learners alike.",
  },
  {
    q: "How do I register?",
    a: "Simply click the Register button anywhere on the website and complete your registration process. Our team will guide you through the next steps.",
  },
  {
    q: "Can I learn online?",
    a: "Yes. We provide online, onsite, and hybrid learning opportunities.",
  },
  {
    q: "Will I work on real projects?",
    a: "Absolutely. Practical projects are a core part of every program.",
  },
  {
    q: "Do you teach Shopify and WooCommerce?",
    a: "Yes. Our e-commerce program covers both platforms extensively.",
  },
  {
    q: "Will AI tools be used throughout the training?",
    a: "Yes. AI integration forms a major component of our learning philosophy.",
  },
];

const footerPrograms = [
  "Artificial Intelligence",
  "AI Design",
  "AI Video Creation",
  "Website Development",
  "Shopify",
  "WooCommerce",
  "Digital Marketing",
  "Automation",
];

const footerLinks = [
  "Home",
  "About",
  "Programs",
  "Testimonials",
  "Contact",
  "Register",
];



export default function BottomSections() {
  const mentorRef = useRef(null);
  const mentorInView = useInView(mentorRef, { once: true, margin: "-50px" });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-50px" });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-50px" });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmission, setLastSubmission] = useState(0);

  return (
    <>


      <section
        ref={mentorRef}
        className="relative py-24 md:py-32 overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-light via-white to-gray-light pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mentorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy/70 text-sm font-medium mb-5">
            <Star className="w-4 h-4 text-accent" />
            OUR FACILITATORS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy leading-tight mb-4">
            Learn From{" "}
            <span className="text-gradient-accent">Industry Professionals</span>
          </h2>
          <p className="text-base sm:text-lg text-navy/60 leading-relaxed max-w-2xl mx-auto">
            Experienced practitioners teaching practical, real-world skills.
          </p>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={900}
            loop
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
          >
            {mentors.map((m, i) => (
              <SwiperSlide key={i}>
                <motion.button
                  onClick={() => setSelectedMentor(m)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={mentorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="group h-full w-full text-left"
                >
                  <div className="h-full rounded-[24px] bg-white border border-navy/5 overflow-hidden transition-all duration-400 hover:translate-y-[-8px] hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-900/15 hover:border-blue-300">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-navy/5">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-400 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling;
                          if (fallback) (fallback as HTMLElement).style.display = "flex";
                        }}
                      />
                      <div
                        className={`absolute inset-0 hidden bg-gradient-to-br ${m.gradient} items-center justify-center text-white font-bold text-4xl`}
                        style={{ display: "none" }}
                      >
                        {m.initials}
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-display font-bold text-navy mb-1 leading-snug">
                        {m.name}
                      </h3>
                      <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full bg-accent/10 text-accent mb-3">
                        {m.title}
                      </span>
                      <p className="text-sm text-navy/60 leading-relaxed line-clamp-2">
                        {m.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.expertise.slice(0, 3).map((e) => (
                          <span
                            key={e}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-navy/5 text-navy/50"
                          >
                            {e}
                          </span>
                        ))}
                        {m.expertise.length > 3 && (
                          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/10 text-accent">
                            +{m.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-2xl rounded-[28px] bg-white p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMentor(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center hover:bg-navy/10 transition-colors duration-300 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-navy" />
              </button>
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="relative w-full sm:w-48 h-56 rounded-2xl overflow-hidden bg-navy/5 shrink-0">
                  <Image
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fb = target.nextElementSibling;
                      if (fb) (fb as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div
                    className={`absolute inset-0 hidden bg-gradient-to-br ${selectedMentor.gradient} items-center justify-center text-white font-bold text-5xl`}
                    style={{ display: "none" }}
                  >
                    {selectedMentor.initials}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-display font-bold text-navy mb-1">
                    {selectedMentor.name}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent mb-4">
                    {selectedMentor.title}
                  </span>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    {selectedMentor.fullBio}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((e) => (
                    <span
                      key={e}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-navy/5 text-navy/70"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={faqRef}
        className="relative py-24 md:py-32 overflow-hidden bg-gray-light"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white pointer-events-none" />
        <div className="relative z-10 container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy/70 text-sm font-medium mb-5">
              <MessageSquare className="w-4 h-4 text-accent" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy leading-tight">
              Questions Students{" "}
              <span className="text-gradient-accent">Frequently Ask</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-[20px] bg-white/80 backdrop-blur-sm border border-navy/5 overflow-hidden transition-all duration-350 hover:border-blue-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 sm:px-8 py-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base sm:text-lg font-semibold text-navy pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0"
                  >
                    <Plus className="w-5 h-5 text-navy" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-5 pt-0 text-sm sm:text-base text-navy/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="relative py-24 md:py-32 overflow-hidden bg-navy-deep"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] left-[10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 container-custom"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-5">
                Let&apos;s Build Your{" "}
                <span className="text-gradient">Future Together</span>
              </h2>
              <p className="text-base sm:text-lg text-blue-100/70 mb-10 max-w-md leading-relaxed">
Whether you want to learn or partner with us, we would love to hear from you.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+234 813 632 9918", href: "tel:+2348136329918" },
                  { icon: Mail, label: "Email", value: "jimonemmanuel@gmail.com", href: "mailto:jimonemmanuel@gmail.com" },
                  { icon: MapPin, label: "Location", value: "Nigeria" },
                  { icon: Clock, label: "Working Hours", value: "Mon - Sat, 9:00 AM - 6:00 PM" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200/50 font-medium uppercase tracking-wider">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm sm:text-base text-white font-medium hover:text-accent-light transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm sm:text-base text-white font-medium">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="text-xs text-blue-200/50 font-medium uppercase tracking-wider mb-3">
                  Follow Us
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100076226372890", label: "Facebook" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/ezeugwu-emmanuel", label: "LinkedIn" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="w-5 h-5 text-blue-200 hover:text-white transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden shadow-2xl shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/20 to-navy/70 z-10 rounded-[28px] pointer-events-none" />
                <SafeImage
                  basePath="/contact-us-picture"
                  alt="Jimon Tech Hub Academy - Contact us"
                  fill
                  className="object-cover"
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-blue-600/10 flex items-center justify-center rounded-[28px]">
                      <span className="font-display font-bold text-3xl text-white/20">JTH</span>
                    </div>
                  }
                />
              </div>

              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-[28px] p-6 sm:p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Send Us a Message
                </h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (honeypot) return;
                  const now = Date.now();
                  if (now - lastSubmission < 30000) {
                    setFormStatus("error");
                    return;
                  }
                  setLastSubmission(now);
                  setFormStatus("loading");
                  try {
                    await emailjs.send(
                      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                      {
                        from_name: formData.name,
                        from_email: formData.email,
                        phone: formData.phone,
                        message: formData.message,
                        to_email: "jimonemmanuel@gmail.com",
                      },
                      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
                    );
                    setFormStatus("success");
                    setFormData({ name: "", email: "", phone: "", message: "" });
                  } catch {
                    setFormStatus("error");
                  }
                }}
                className="space-y-5"
              >
                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center"
                  >
                    <div className="text-green-400 font-semibold text-lg mb-1">Message sent successfully!</div>
                    <p className="text-sm text-blue-100/70">We will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <>
                {[
                  { key: "name" as const, placeholder: "Your Name", icon: User, type: "text", maxLength: 100 },
                  { key: "email" as const, placeholder: "Your Email", icon: Mail, type: "email" },
                  { key: "phone" as const, placeholder: "Phone Number", icon: Phone, type: "tel", maxLength: 15 },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div
                      key={field.placeholder}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 focus-within:border-accent focus-within:shadow-lg focus-within:shadow-accent/20 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-blue-300/50 shrink-0" />
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-transparent text-white placeholder-blue-200/40 text-sm outline-none"
                        aria-label={field.placeholder}
                        required
                        {...(field.maxLength ? { maxLength: field.maxLength } : {})}
                      />
                    </div>
                  );
                })}
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 focus-within:border-accent focus-within:shadow-lg focus-within:shadow-accent/20 transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-blue-300/50 shrink-0 mt-1" />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-transparent text-white placeholder-blue-200/40 text-sm outline-none resize-none"
                    aria-label="Your Message"
                    required
                    maxLength={1000}
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <motion.button
                  type="submit"
                  disabled={formStatus === "loading" || (Date.now() - lastSubmission < 30000)}
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === "loading" ? (
                    <span className="loader" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
                {formStatus === "error" && (
                  <p className="text-sm text-red-400 text-center">Something went wrong. Please try again or contact us directly.</p>
                )}
                </>
                )}
              </form>
            </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        ref={ctaRef}
        className="relative py-24 md:py-32 overflow-hidden"
      >
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
              <span className="text-gradient">Transformation Today</span>
            </h2>
            <p className="text-base sm:text-lg text-blue-100/70 mb-10 max-w-xl mx-auto leading-relaxed">
              Learn Artificial Intelligence, Website Development, E-commerce,
              Digital Marketing, Automation, and Future Skills through
              practical, project-based education.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#programs"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
                <ChevronRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/90 font-semibold text-base hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Talk To Our Team
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative bg-navy-deep overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div className="relative z-10 container-custom pt-20 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
            <div>
              <Logo
                textClassName="text-white"
                subTextClassName="text-accent-light"
              />
              <p className="text-sm text-blue-100/50 leading-relaxed mb-6 max-w-xs">
                Empowering Africans with practical digital skills, AI
                knowledge, entrepreneurship, and future-ready opportunities.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100076226372890", label: "Facebook" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/ezeugwu-emmanuel", label: "LinkedIn" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/30"
                    >
                      <Icon className="w-4 h-4 text-blue-200/70 hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-5">
                Programs
              </h4>
              <ul className="space-y-3">
                {footerPrograms.map((p) => (
                  <li key={p}>
                    <a
                       href="#programs"
                      className="text-sm text-blue-100/50 hover:text-accent-light transition-colors duration-300"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((l) => (
                  <li key={l}>
                    <a
                      href={
                        l === "Register"
                          ? "#programs"
                          : l === "About"
                            ? "/about"
                            : `#${l.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      className="text-sm text-blue-100/50 hover:text-accent-light transition-colors duration-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-5">
                Contact Information
              </h4>
              <ul className="space-y-4">
                <li>
                  <div className="text-xs text-blue-200/40 font-medium uppercase tracking-wider mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+2348136329918"
                    className="text-sm text-blue-100/70 hover:text-accent-light transition-colors duration-300"
                  >
                    +234 813 632 9918
                  </a>
                </li>
                <li>
                  <div className="text-xs text-blue-200/40 font-medium uppercase tracking-wider mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:jimonemmanuel@gmail.com"
                    className="text-sm text-blue-100/70 hover:text-accent-light transition-colors duration-300"
                  >
                    jimonemmanuel@gmail.com
                  </a>
                </li>
                <li>
                  <div className="text-xs text-blue-200/40 font-medium uppercase tracking-wider mb-1">
                    Location
                  </div>
                  <div className="text-sm text-blue-100/70">Nigeria</div>
                </li>
                <li>
                  <div className="text-xs text-blue-200/40 font-medium uppercase tracking-wider mb-1">
                    Working Hours
                  </div>
                  <div className="text-sm text-blue-100/70">
                    Mon - Sat, 9:00 AM - 6:00 PM
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-sm text-blue-100/40 text-center sm:text-left">
              &copy; 2026 Jimon Tech Hub Academy. All Rights Reserved.
            </p>
            <p className="text-sm text-blue-100/40">
              Powered by{" "}
              <span className="text-accent-light font-medium">
                Jimon Tech Hub
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

