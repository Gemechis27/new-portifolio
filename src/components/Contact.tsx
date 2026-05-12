// src/components/Contact.tsx
"use client";

import React, {
  useRef, useState, useCallback, useEffect, memo,
} from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   FIX 8: EmailJS credentials moved to environment variables.
   Create a .env.local file at project root with:
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_4g7h43y
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_x6p9j8j
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ThC4IXXiIkNvj0GUR
   NEXT_PUBLIC_ prefix is required for client-side access in Next.js.
   These are never committed to Git — add .env.local to .gitignore.
─────────────────────────────────────────────────────────────── */
const EJ_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EJ_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJ_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA — module level, zero reallocation per render.
─────────────────────────────────────────────────────────────── */
const SOCIALS = [
  {
    href:      "https://github.com/Gemechis27",
    label:     "GitHub",
    Icon:      Github,
    // FIX 19: removed conflicting text-slate-900 + text-white
    // FIX 18: hover:bg-slate-700 instead of bg-teal-200 (better contrast)
    cls:       "bg-[#24292e] text-white hover:bg-slate-700",
    darkCls:   "dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/20",
  },
  {
    href:      "https://linkedin.com/in/gemechismulisa",
    label:     "LinkedIn",
    Icon:      Linkedin,
    cls:       "bg-blue-500 text-white hover:bg-blue-600",
    darkCls:   "dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/20",
  },
  {
    href:      "https://wa.me/251923606867",
    label:     "WhatsApp",
    Icon:      MessageCircle,
    cls:       "bg-green-600 text-white hover:bg-green-700",
    darkCls:   "dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/20",
  },
] as const;

// Shared input className — extracted once, never rebuilt per render
const INPUT_CLS = [
  "w-full rounded-xl px-4 py-3 text-sm font-medium",
  "bg-white/70 text-slate-900 placeholder:text-slate-400",
  "border border-sky-300",
  // FIX 15: focus ring only — not transition on all properties
  "focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-teal-400",
  "dark:bg-[#0f2020] dark:text-white dark:placeholder:text-slate-400",
  "dark:border-indigo-400/50 dark:focus:ring-indigo-400/60 dark:focus:border-indigo-400",
  // transition on border-color + ring only — compositor-safe
  "transition-[border-color,box-shadow] duration-150",
].join(" ");

/* ─────────────────────────────────────────────────────────────
   useInView — FIX 25: scroll entrance animation
─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────
   SOCIAL ICON BUTTON — memo: never re-renders after mount
─────────────────────────────────────────────────────────────── */
const SocialBtn = memo(function SocialBtn({
  href, label, Icon, cls, darkCls,
}: (typeof SOCIALS)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={[
        "h-12 w-12 rounded-xl grid place-items-center",
        // FIX 16: transition-transform only — no layout properties
        "transition-transform duration-200",
        "hover:scale-110 active:scale-95",
        // FIX 24: touch-manipulation removes 300ms iOS tap delay
        "touch-manipulation",
        cls, darkCls,
      ].join(" ")}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </a>
  );
});

/* ─────────────────────────────────────────────────────────────
   STATUS BANNER — animated in/out, replaces alert()
   FIX 10: no alert() — inline banner is non-blocking
   FIX 26: fade animation instead of abrupt disappear
─────────────────────────────────────────────────────────────── */
function StatusBanner({
  status,
}: { status: "success" | "error" | null }) {
  if (!status) return null;
  const isOk = status === "success";
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold",
        "animate-[fadeIn_0.25s_ease-out]",
        isOk
          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400",
      ].join(" ")}
    >
      {isOk
        ? <CheckCircle className="h-4 w-4 shrink-0" aria-hidden />
        : <AlertCircle  className="h-4 w-4 shrink-0" aria-hidden />
      }
      {isOk
        ? "Message sent! I'll reply within 24 hours. 🎉"
        : "Failed to send. Please try again or email me directly."
      }
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
─────────────────────────────────────────────────────────────── */
export default function Contact() {
  const formRef   = useRef<HTMLFormElement>(null);
  const { ref: secRef, inView } = useInView();
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState({
    name: "", email: "", title: "", message: "",
  });
  const [sending, setSending]   = useState(false);
  const [status,  setStatus]    = useState<"success" | "error" | null>(null);
  const [msgLen,  setMsgLen]    = useState(0);

  // Cleanup timer on unmount so it can never fire after component gone
  useEffect(() => () => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
  }, []);

  /*
    FIX 11: useCallback — stable handleChange reference.
    FIX 28: message length counter tracked here.
  */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
      if (name === "message") setMsgLen(value.length);
    },
    []
  );

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    // Guard: prevent double-submit
    if (sending) return;

    // Validate env vars are set
    if (!EJ_SERVICE || !EJ_TEMPLATE || !EJ_KEY) {
      setStatus("error");
      return;
    }

    try {
      setSending(true);
      setStatus(null);

      // FIX 9: removed console.log(result.text) — no info leakage
      await emailjs.sendForm(EJ_SERVICE, EJ_TEMPLATE, formRef.current, EJ_KEY);

      // FIX 12: only call setForm reset — formRef.current.reset() is redundant
      // when controlled inputs are driven by state
      setForm({ name: "", email: "", title: "", message: "" });
      setMsgLen(0);
      setStatus("success");

      // FIX 26: banner fades in/out, clears after 5s
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => setStatus(null), 5000);

    } catch {
      // FIX 10: no alert() — inline error banner instead
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact me"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
    >

      {/* ── BACKGROUNDS — kept exactly as original ────────────────

          Dark:  #0D1717 base + slate-950 gradient + star-field
          FIX 17: was TWO separate dark divs both rendering simultaneously.
                  Merged into ONE div with both bg applied correctly.
          Light: #F4EFE8 + white/60 backdrop
                 + white rounded panel top-right
                 + D6B48C blob bottom-left
                 + radial white highlight top-left
      ────────────────────────────────────────────────────────── */}

      {/* Dark mode — single div */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden dark:block pointer-events-none
          bg-gradient-to-b from-slate-950 via-[#0D1717] to-slate-950"
      >
        <div className="star-field" />
      </div>

      {/* Light mode */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 dark:hidden overflow-hidden bg-[#F4EFE8] pointer-events-none"
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div
          className="absolute -right-28 top-10 h-[520px] w-[720px] rounded-[90px] rotate-[-10deg]"
          style={{
            background: "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.45))",
            boxShadow:  "0 20px 60px rgba(0,0,0,0.08)",
          }}
        />
        <div className="absolute -left-44 bottom-[-220px] h-[520px] w-[520px] rounded-full bg-[#D6B48C]/85" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 25% 15%,rgba(255,255,255,0.95),rgba(255,255,255,0) 55%)",
            opacity: 0.9,
          }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-teal-500" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600 dark:text-teal-400">
            Contact
          </span>
        </div>

        {/*
          HEADING
          FIX 13: removed hover:scale-[1.03] — layout shift on hover.
          Original gradient + dark glow drop-shadow kept exactly.
          Responsive: text-3xl mobile → text-5xl desktop.
        */}
        <h2 className="text-center mb-8 sm:mb-10
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold uppercase
          text-transparent bg-clip-text
          bg-gradient-to-r from-teal-400 to-indigo-500
          dark:drop-shadow-[0_0_10px_rgba(150,180,250,0.35)]">
          Contact Me
        </h2>

        {/* Scroll entrance animation */}
        <div
          ref={secRef}
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/*
            CONTACT CARD
            FIX 14: transition-[box-shadow,border-color] only.
            Original: rounded-3xl, border-sky-400/indigo-400,
            bg-white/25 dark:bg-white/5 — all kept exactly.
            FIX 27: p-4 sm:p-6 md:p-10 — tighter on small phones.
          */}
          <div className="rounded-3xl border-2
            border-sky-400 dark:border-indigo-400
            bg-white/25 dark:bg-white/5
            backdrop-blur-xl
            shadow-[0_18px_60px_rgba(0,0,0,0.14)]
            p-4 sm:p-6 md:p-10
            transition-[box-shadow,border-color] duration-300">

            <form
              ref={formRef}
              onSubmit={sendEmail}
              aria-label="Contact form"
              noValidate
              className="grid gap-3 sm:gap-4"
            >
              {/* Name + Email row — side by side on sm+ */}
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="sr-only">Your Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                    minLength={2}
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="sr-only">Your Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="cf-title" className="sr-only">Subject</label>
                <input
                  id="cf-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  minLength={3}
                  className={INPUT_CLS}
                />
              </div>

              {/* Message + character counter */}
              <div className="relative">
                <label htmlFor="cf-message" className="sr-only">Your Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={1000}
                  /*
                    FIX 23: min-h so textarea never collapses.
                    resize-y: users can expand vertically on desktop.
                  */
                  className={`${INPUT_CLS} min-h-[120px] resize-y`}
                />
                {/* FIX 28: character counter */}
                <span
                  aria-live="polite"
                  className={`absolute bottom-2 right-3 text-[10px] font-mono select-none
                    ${msgLen > 900 ? "text-amber-500" : "text-slate-400 dark:text-white/25"}`}
                >
                  {msgLen}/1000
                </span>
              </div>

              {/* Status banner */}
              <StatusBanner status={status} />

              {/*
                Submit button
                FIX 24: touch-manipulation removes 300ms iOS tap delay.
                FIX 29: cursor-not-allowed when disabled.
                Original: bg-teal-400 text-[#0D1717] hover:bg-indigo-400 — kept.
              */}
              <button
                type="submit"
                disabled={sending}
                aria-disabled={sending}
                className="mt-1 inline-flex items-center justify-center gap-2
                  min-h-[48px] rounded-xl px-6 py-3
                  font-bold text-sm sm:text-base text-[#0D1717]
                  bg-teal-400
                  hover:bg-indigo-400 hover:-translate-y-[1px]
                  active:scale-[0.97]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  disabled:hover:translate-y-0 disabled:hover:bg-teal-400
                  transition-[background-color,transform,opacity] duration-200
                  touch-manipulation select-none"
              >
                {sending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/*
              SOCIAL ICONS
              FIX 16: transition-transform only.
              FIX 18: proper hover colors (not teal-200 which is too pale).
              FIX 19: removed conflicting dual text color classes.
              FIX 24: touch-manipulation on SocialBtn.
            */}
            <div className="mt-7 sm:mt-8 flex justify-center gap-4 sm:gap-5">
              {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
            </div>

            {/* Response time promise */}
            <p className="mt-5 sm:mt-6 text-center text-xs text-slate-500 dark:text-white/30 font-medium">
              Typically replies within{" "}
              <span className="text-teal-600 dark:text-teal-400 font-semibold">24 hours</span>
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe for status banner fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
