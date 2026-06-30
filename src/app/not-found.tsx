import Link from "next/link";
import { useMemo } from "react";

export default function NotFound() {
  const particles = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      left: `${((i * 37 + 13) % 100)}%`,
      top: `${((i * 53 + 7) % 100)}%`,
      duration: `${3 + (i % 4)}s`,
      delay: `${(i * 0.7) % 5}s`,
    })),
  []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white font-display font-bold text-5xl shadow-2xl shadow-accent/30">
          ?
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
          Oops! This Page Is Exploring{" "}
          <span className="text-gradient">The Future</span>
        </h1>
        <p className="text-base sm:text-lg text-blue-100/70 mb-10 leading-relaxed">
          The page you are looking for does not exist, but your digital
          journey can still begin.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            Return Home
          </Link>
          <Link
            href="/#programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/90 font-semibold text-base hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}

