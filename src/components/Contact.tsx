"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, MessageCircle } from "lucide-react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setSending(true);

      const result = await emailjs.sendForm(
        "service_4g7h43y",      // Your service ID
        "template_x6p9j8j",     // Your template ID
        formRef.current,         // Form reference
        "ThC4IXXiIkNvj0GUR"     // Your public key
      );

      console.log("EmailJS result:", result.text);

      formRef.current.reset();
      setForm({ name: "", email: "", title: "", message: "" });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-20 px-4">
      {/* DARK BACKGROUND */}
      <div className="absolute inset-0 -z-10 hidden dark:block bg-[#0D1717]" />
      <div className="absolute inset-0 -z-10 hidden dark:block bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="star-field" />
      </div>

      {/* LIGHT BACKGROUND */}
      <div className="absolute inset-0 -z-10 dark:hidden overflow-hidden bg-[#F4EFE8] ">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        <div
          className="absolute -right-28 top-10 h-[520px] w-[720px] rounded-[90px] rotate-[-10deg]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        />
        <div className="absolute -left-44 bottom-[-220px] h-[520px] w-[520px] rounded-full bg-[#D6B48C]/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.95), rgba(255,255,255,0) 55%)",
            opacity: 0.9,
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* ================= TITLE ================= */}
        <h2
          className="
            text-center text-4xl md:text-5xl font-extrabold uppercase mb-10
            text-transparent bg-clip-text
            bg-gradient-to-r from-teal-400 to-indigo-500
            transition duration-300 hover:scale-[1.03]
            dark:drop-shadow-[0_0_10px_rgba(150,180,250,0.35)]
          "
        >
          Contact Me
        </h2>

        {/* ================= CONTACT CARD ================= */}
        <div
          className="
            rounded-3xl border-2 
            border-sky-400 dark:border-indigo-400
            bg-white/25 dark:bg-white/5
            backdrop-blur-xl
            shadow-[0_18px_60px_rgba(0,0,0,0.14)]
            p-6 md:p-10
            transition
          "
        >
          <form ref={formRef} onSubmit={sendEmail} className="grid gap-4">
            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="
                w-full rounded-xl px-4 py-3 text-sm
                bg-white/70 text-slate-900 placeholder:text-slate-500
                border border-sky-300 dark:border-indigo-400/50
                focus:outline-none focus:ring-2 focus:ring-teal-400/60
                dark:bg-[#0f2020] dark:text-white dark:placeholder:text-slate-300
                dark:focus:ring-indigo-400/60
                transition
              "
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="
                w-full rounded-xl px-4 py-3 text-sm
                bg-white/70 text-slate-900 placeholder:text-slate-500
                border border-sky-300 dark:border-indigo-400/50
                focus:outline-none focus:ring-2 focus:ring-teal-400/60
                dark:bg-[#0f2020] dark:text-white dark:placeholder:text-slate-300
                dark:focus:ring-indigo-400/60
                transition
              "
            />

            {/* Subject */}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="
                w-full rounded-xl px-4 py-3 text-sm
                bg-white/70 text-slate-900 placeholder:text-slate-500
                border border-sky-300 dark:border-indigo-400/50
                focus:outline-none focus:ring-2 focus:ring-teal-400/60
                dark:bg-[#0f2020] dark:text-white dark:placeholder:text-slate-300
                dark:focus:ring-indigo-400/60
                transition
              "
            />

            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="
                w-full rounded-xl px-4 py-3 text-sm
                bg-white/70 text-slate-900 placeholder:text-slate-500
                border border-sky-300 dark:border-indigo-400/50
                focus:outline-none focus:ring-2 focus:ring-teal-400/60
                dark:bg-[#0f2020] dark:text-white dark:placeholder:text-slate-300
                dark:focus:ring-indigo-400/60
                transition
              "
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending}
              className="
                mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold
                bg-teal-400 text-[#0D1717]
                transition duration-200
                hover:bg-indigo-400 hover:-translate-y-[1px]
                disabled:opacity-60 disabled:hover:translate-y-0
              "
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-2 rounded-xl bg-emerald-500 text-white px-4 py-3 text-sm font-semibold">
                🎉 Message sent successfully!
              </div>
            )}
          </form>

          {/* ================= SOCIAL ICONS ================= */}
          <div className="mt-8 flex justify-center gap-5">
            <a
              href="https://github.com/Gemechis27"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="
                h-12 w-12 rounded-xl grid place-items-center
                bg-black text-white text-slate-900
                transition duration-200
                hover:scale-110 hover:bg-teal-200
                dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/15
              "
            >
              <Github className="h-6 w-6" />
            </a>

            <a
              href="https://linkedin.com/in/gemechismulisa"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="
                h-12 w-12 rounded-xl grid place-items-center
                bg-blue-500 text-white text-slate-900
                transition duration-200
                hover:scale-110 hover:bg-teal-200
                dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/15
              "
            >
              <Linkedin className="h-6 w-6" />
            </a>

            <a
              href="https://wa.me/251923606867"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="
                h-12 w-12 rounded-xl grid place-items-center
                bg-green-600 text-white text-slate-900
                transition duration-200
                hover:scale-110 hover:bg-teal-200
                dark:bg-white/10 dark:text-teal-400 dark:hover:bg-white/15
              "
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
