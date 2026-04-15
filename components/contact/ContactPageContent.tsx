"use client";

import { useState } from "react";

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission logic to be wired up later
  };

  return (
    <>
      {/* ── Hero image placeholder ─────────────────────────────────────── */}
      <div className="w-full h-[55vh] bg-zinc-200 overflow-hidden">
        {/* Replace with <Image> once the actual photo is available */}
        <div className="w-full h-full bg-zinc-300 flex items-center justify-center">
          <span className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
            Office photo coming soon
          </span>
        </div>
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
              className="inline-flex items-center gap-3 rounded-full bg-[#49c88e] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#3ab87e]"
            >
              Submit
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
            </button>

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
