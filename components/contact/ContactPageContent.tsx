"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero image
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        }
      );

      // Text block
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── Hero image ─────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative w-full h-[50vh] sm:h-[65vh] overflow-hidden">
        <Image
          src="/images/contact/contact.png"
          alt="QuickGen office"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Contact form ───────────────────────────────────────────────── */}
      <section className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20">
        <div ref={textRef} className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            First chat is on us
            <span className="text-red-500">.</span>
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-500 sm:mt-6 sm:text-base">
            We know its important to understand if we are the right fit. Drop us a line for any questions or
            inquiries about your big idea. We&apos;ll put together a quote and discuss how we can meet your
            budget and timeline.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-2xl space-y-3 sm:mt-12 sm:space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={6}
            required
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition resize-none sm:px-6 sm:py-4 sm:text-base sm:rows-8"
          />

          <div className="flex flex-col items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-3 rounded-full bg-[#C0392B] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a93226] disabled:opacity-60 sm:px-10 sm:py-4 sm:text-base"
            >
              {status === "sending" ? "Sending…" : "Submit"}
              {status !== "sending" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" />
                </svg>
              )}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-green-600">
                Message sent! We&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-500">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <a
              href="mailto:hello@quickgentech.com"
              className="text-sm font-semibold text-red-500 hover:text-red-600 transition sm:text-base"
            >
              hello@quickgentech.com
            </a>
          </div>
        </form>
      </section>
    </>
  );
}

