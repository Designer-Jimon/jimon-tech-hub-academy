"use client";

export default function ErrorBoundary({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-display font-bold text-4xl shadow-2xl">
          !
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          Something Went Wrong
        </h1>
        <p className="text-base text-blue-100/70 mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

