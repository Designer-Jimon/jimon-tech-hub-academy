"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  getCourseById,
  generateReferenceCode,
  BANK_DETAILS,
  WHATSAPP_NUMBER,
  formatNaira,
} from "@/lib/courses";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  courseId,
}: RegistrationModalProps) {
  const course = getCourseById(courseId);
  const [referenceCode] = useState(() =>
    course ? generateReferenceCode(course.code) : ""
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmission, setLastSubmission] = useState(0);
  const [confirmedPayment, setConfirmedPayment] = useState(false);

  if (!course) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const isRateLimited = Date.now() - lastSubmission < 30000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    const now = Date.now();
    if (now - lastSubmission < 30000) {
      setStatus("error");
      return;
    }
    setLastSubmission(now);
    setStatus("submitting");

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I just registered for ${course.title} with reference code ${referenceCode}. Here is my payment screenshot:`)}`;
    window.open(waUrl, "_blank");

    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyBXaDfD8gVOORDGGsRCW6QdaEZPVJLaniZa-Mn0RcfoqWOzoytzlC0CRBXraypKw/exec";
    fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: fullName,
        email: email,
        phone: phone,
        course: course.title,
        amount: formatNaira(course.price),
        referenceCode: referenceCode,
      }),
    }).catch(() => {});

    try {
      console.log(`[RegistrationModal] referenceCode value: "${referenceCode}" (length=${referenceCode.length})`);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: fullName,
          from_email: email,
          phone: phone,
          reference_code: referenceCode,
          course_title: course.title,
          course_code: course.code,
          course_price: formatNaira(course.price),
          message: `New Course Registration\n\nStudent: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nCourse: ${course.title}\nCourse Code: ${course.code}\nPrice: ${formatNaira(course.price)}\nReference Code: ${referenceCode}\n\nBank: ${BANK_DETAILS.bank}\nAccount Name: ${BANK_DETAILS.accountName}\nAccount Number: ${BANK_DETAILS.accountNumber}\n\nNote: Student was instructed to send payment screenshot via WhatsApp to ${WHATSAPP_NUMBER}.`,
          to_email: "jimonemmanuel@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-[28px] shadow-2xl shadow-navy/20 overflow-hidden z-10"
          >
            <button
              onClick={onClose}
              aria-label="Close registration"
              className="fixed top-4 right-4 z-[9999] w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl font-bold shadow-lg"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy mb-4">
                  Registration Received!
                </h3>
                <p className="text-navy/70 mb-4 leading-relaxed">
                  Registration received! You're being redirected to WhatsApp to send your payment screenshot.
                </p>
                <p className="text-navy/70 mb-4 leading-relaxed">
                  Send to{" "}
                  <strong>WhatsApp 08136329918</strong> with your reference code{" "}
                  <strong className="text-accent">{referenceCode}</strong> for
                  verification. We will confirm your enrollment within 24 hours.
                </p>
                <p className="text-sm text-navy/50 mb-8">
                  Your reference code: <strong>{referenceCode}</strong>
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-sm text-navy/50 hover:text-navy transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 md:pt-12 pb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
                    REGISTRATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-navy/60 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="mt-6 px-4 py-3 rounded-xl bg-navy-deep text-white text-center">
                    <span className="text-sm text-blue-200 font-medium">Amount to Pay: </span>
                    <span className="text-2xl font-bold font-display">{formatNaira(course.price)}</span>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8 md:mx-12 mt-6 p-4 sm:p-5 rounded-[20px] bg-navy text-white mb-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <span className="text-sm text-blue-200">Course Fee</span>
                    <span className="text-2xl font-bold font-display">
                      {formatNaira(course.price)}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Bank</span>
                      <span className="font-medium">{BANK_DETAILS.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Account Name</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {BANK_DETAILS.accountName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Account Number</span>
                      <span className="font-medium font-mono tracking-wider">
                        {BANK_DETAILS.accountNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8 md:mx-12 mb-6 p-4 rounded-[16px] bg-accent/5 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Your Reference Code
                      </span>
                      <p className="text-lg font-bold font-mono text-navy mt-1">
                        {referenceCode}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-semibold transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-navy/50 mt-2">
                    Include this code in your bank transfer narration/description.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-12 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      maxLength={100}
                      className="w-full px-4 py-3.5 rounded-xl border border-navy/10 bg-white text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3.5 rounded-xl border border-navy/10 bg-white text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      maxLength={15}
                      className="w-full px-4 py-3.5 rounded-xl border border-navy/10 bg-white text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedPayment}
                      onChange={(e) => setConfirmedPayment(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-accent/30 text-accent focus:ring-accent/30"
                    />
                    <span className="text-sm text-navy/80 leading-relaxed">
                      I confirm I have transferred {formatNaira(course.price)} to{" "}
                      {BANK_DETAILS.bank}, Account Name:{" "}
                      {BANK_DETAILS.accountName}, Account Number:{" "}
                      {BANK_DETAILS.accountNumber}, using reference code{" "}
                      <strong>{referenceCode}</strong>.
                    </span>
                  </label>

                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      Something went wrong. Please try again or contact us on WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || isRateLimited || !confirmedPayment}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : isRateLimited ? (
                      "Please wait..."
                    ) : (
                      "I Have Paid"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
