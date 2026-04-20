"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
      <div className="relative w-full h-[80vh] overflow-hidden">
        <Image
          src="/images/contact/contact.png"
          alt="QuickGen office"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Contact form ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl">
            First chat is on us
            <span className="text-red-500">.</span>
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-500">
            We know its important to understand if we are the right fit. Drop us a line for any questions or
            inquiries about your big idea. We&apos;ll put together a quote and discuss how we can meet your
            budget and timeline.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-2xl space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full rounded-2xl bg-zinc-100 px-6 py-4 text-base text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="w-full rounded-2xl bg-zinc-100 px-6 py-4 text-base text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={8}
            required
            className="w-full rounded-2xl bg-zinc-100 px-6 py-4 text-base text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition resize-none"
          />

          <div className="flex flex-col items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-3 rounded-full bg-[#C0392B] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#a93226] disabled:opacity-60"
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
              className="text-base font-semibold text-red-500 hover:text-red-600 transition"
            >
              hello@quickgentech.com
            </a>
          </div>
        </form>
      </section>
    </>
  );
}

