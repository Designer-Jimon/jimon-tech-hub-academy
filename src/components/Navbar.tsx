"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/constants";

const linkVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(scrollY > 50);
    setScrollProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);

    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop - 120 <= scrollY) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      const id = href.replace("#", "");
      if (pathname !== "/") {
        router.push(`/#${id}`);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-[0_1px_3px_rgba(11,31,77,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy/5">
        <motion.div
          className="h-full bg-accent"
          style={{ scaleX: scrollProgress, transformOrigin: "left" }}
        />
      </div>

      <div className="container-custom flex items-center justify-between h-20">
        <motion.a
          href="#"
          onClick={(e) => handleNavClick(e, "#hero")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label="Jimon Tech Hub Academy Home"
        >
          <Logo scrolled={scrolled} />
        </motion.a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link, i) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  scrolled
                    ? isActive
                      ? "text-accent"
                      : "text-navy hover:text-accent"
                    : isActive
                      ? "text-white"
                      : "text-white/90 hover:text-white"
                }`}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
                <motion.span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                    scrolled ? "bg-accent" : "bg-white"
                  }`}
                  initial={false}
                  animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => {
              if (pathname !== "/") {
                router.push("/#programs");
              } else {
                document
                  .getElementById("programs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            Register Now
          </motion.button>

          <div className="relative lg:hidden">
            <button
              ref={hamburgerBtnRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative z-50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent ${
                mobileOpen
                  ? "text-navy"
                  : scrolled
                    ? "text-navy"
                    : "text-white"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  id="mobile-menu"
                  ref={mobileMenuRef}
                  initial={{ opacity: 0, y: -12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-64 rounded-xl bg-[#0B1F4C] shadow-2xl border border-white/10 overflow-hidden z-50"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile navigation"
                >
                  <nav className="flex flex-col py-2 px-3">
                    {NAV_LINKS.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        custom={i}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-sm font-display font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200 px-3 py-2 rounded-lg"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                    <motion.button
                      onClick={() => {
                        setMobileOpen(false);
                        if (pathname !== "/") {
                          router.push("/#programs");
                        } else {
                          document
                            .getElementById("programs")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      custom={NAV_LINKS.length}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-2 px-4 py-2.5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 text-center"
                    >
                      Register Now
                    </motion.button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

