"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [interest, setInterest] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
    const provider = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER;

    if (!endpoint) {
      setStatus("success");
      return;
    }

    try {
      const payload =
        provider === "mailchimp"
          ? { email_address: email, status: "subscribed", merge_fields: { FNAME: name } }
          : { email, name, interest };

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-[24px] bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-300" />
        <h3 className="text-lg font-display font-bold text-white">
          Stay Updated
        </h3>
      </div>
      <p className="text-sm text-blue-100/60 mb-5">
        Get the latest on new programs, tech trends, and career opportunities.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-400 font-medium py-3"
        >
          Thank you for subscribing!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 focus-within:border-accent transition-all duration-300">
            <User className="w-4 h-4 text-blue-300/50 shrink-0" />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white placeholder-blue-200/40 text-sm outline-none"
              aria-label="Your Name"
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 focus-within:border-accent transition-all duration-300">
            <Mail className="w-4 h-4 text-blue-300/50 shrink-0" />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white placeholder-blue-200/40 text-sm outline-none"
              aria-label="Your Email"
            />
          </div>

          {process.env.NEXT_PUBLIC_NEWSLETTER_INTERESTS && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10">
              <Mail className="w-4 h-4 text-blue-300/50 shrink-0" />
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none"
                aria-label="Area of interest"
              >
                <option value="" className="text-navy">Select interest</option>
                <option value="ai" className="text-navy">AI & Automation</option>
                <option value="ecommerce" className="text-navy">E-commerce</option>
                <option value="design" className="text-navy">Design & Video</option>
                <option value="marketing" className="text-navy">Digital Marketing</option>
                <option value="development" className="text-navy">Web Development</option>
              </select>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "loading" ? (
              <span className="loader" />
            ) : (
              <>
                Subscribe
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      )}

      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

