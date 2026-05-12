"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



// ─── Component ────────────────────────────────────────────────────────────────

export default function CareersPageContent() {
  const [form, setForm]             = useState({ name: "", email: "", phone: "", position: "", otherPosition: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus]         = useState<"idle" | "sending" | "success" | "error">("idle");

  // ── Refs ───────────────────────────────────────────────────────────────────
  const heroHeadRef    = useRef<HTMLDivElement>(null);
  const heroSubRef     = useRef<HTMLDivElement>(null);
  const heroImgRef     = useRef<HTMLDivElement>(null);
  const valuesHeadRef  = useRef<HTMLDivElement>(null);
  const valuesGridRef  = useRef<HTMLDivElement>(null);
  const rolesHeadRef   = useRef<HTMLHeadingElement>(null);
  const rolesListRef   = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const formRef        = useRef<HTMLFormElement>(null);

  // ── GSAP ───────────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroHeadRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      );
      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.2 },
      );

      gsap.fromTo(
        heroImgRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out", delay: 0.3,
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      gsap.fromTo(
        valuesHeadRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: valuesHeadRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      const valueCards = gsap.utils.toArray<HTMLElement>(".careers-value-card");
      gsap.set(valueCards, { opacity: 0, y: 50, willChange: "transform, opacity" });
      gsap.timeline({
        scrollTrigger: {
          trigger: valuesGridRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      }).to(valueCards, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1 });

      gsap.fromTo(
        rolesHeadRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: rolesHeadRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      const roleItems = gsap.utils.toArray<HTMLElement>(".careers-role-item");
      gsap.set(roleItems, { opacity: 0, y: 35, willChange: "transform, opacity" });
      gsap.timeline({
        scrollTrigger: {
          trigger: rolesListRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      }).to(roleItems, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.09 });

      gsap.fromTo(
        formSectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && isAllowedFile(file)) setResumeFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && isAllowedFile(file)) setResumeFile(file);
  };

  const isAllowedFile = (file: File) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxBytes = 10 * 1024 * 1024;
    return allowed.includes(file.type) && file.size <= maxBytes;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const fd = new FormData();
      fd.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
      const appliedPosition = form.position === "other" ? form.otherPosition : form.position;
      fd.append("subject",    `Career Application — ${appliedPosition}`);
      fd.append("name",       form.name);
      fd.append("email",      form.email);
      fd.append("phone",      form.phone);
      fd.append("position",   appliedPosition);
      if (resumeFile) fd.append("resume", resumeFile, resumeFile.name);

      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", position: "", otherPosition: "" });
        setResumeFile(null);
        const input = document.getElementById("resume-input") as HTMLInputElement | null;
        if (input) input.value = "";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <main className="w-full font-sans bg-white text-zinc-950">

      {/* ── Hero heading — centered ──────────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-10 pb-0 flex flex-col items-center text-center">
        <div ref={heroHeadRef}>
          <h1 className="text-[clamp(3rem,9vw,5.5rem)] font-black leading-none tracking-tight">
            Work with us<span className="text-red-500">.</span>
          </h1>
        </div>
        <div ref={heroSubRef}>
          <p className="mt-4 text-base text-zinc-500 max-w-2xl">
            We&apos;re a team of engineers, designers, and builders who love making real things.
            If you get excited about taking products from napkin sketch to production — you&apos;ll fit right in.
          </p>
        </div>
      </section>

      {/* ── Application form ──────────────────────────────────────────────── */}
      <section id="apply-form" className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20">
        <form
          ref={formRef}
          id="careers-form"
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-3 sm:space-y-4"
          noValidate
        >
          {/* Full name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            autoComplete="name"
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            autoComplete="email"
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            autoComplete="tel"
            className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
          />

          {/* Job position */}
          <div className="relative">
            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              required
              className={`w-full appearance-none rounded-2xl bg-zinc-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base pr-10 ${
                form.position ? "text-zinc-950" : "text-zinc-400"
              }`}
            >
              <option value="" disabled>Job position you&apos;re applying for</option>
              <option value="Hardware Engineer">Hardware Engineer</option>
              <option value="Firmware Engineer">Firmware Engineer</option>
              <option value="Software Engineer - Full Stack">Software Engineer - Full Stack</option>
              <option value="Software Engineer - Backend">Software Engineer - Backend</option>
              <option value="Software Engineer - Frontend UI/UX">Software Engineer - Frontend UI/UX</option>
              <option value="Graphics Designer">Graphics Designer</option>
              <option value="Mechanical Engineer">Mechanical Engineer</option>
              <option value="Business Development">Business Development</option>
              <option value="Project Management">Project Management</option>
              <option value="Hardware - Intern">Hardware - Intern</option>
              <option value="Software - Intern">Software - Intern</option>
              <option value="Business Management - Intern">Business Management - Intern</option>
              <option value="other">Other - Please Specify</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Other position text box */}
          {form.position === "other" && (
            <input
              type="text"
              name="otherPosition"
              value={form.otherPosition}
              onChange={handleChange}
              placeholder="Please specify your position"
              required
              autoComplete="off"
              className="w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 transition sm:px-6 sm:py-4 sm:text-base"
            />
          )}

          {/* Resume/CV upload */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume"
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById("resume-input")?.click()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") document.getElementById("resume-input")?.click(); }}
            className={`w-full rounded-2xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition select-none ${
              dragActive
                ? "border-red-400 bg-red-50"
                : resumeFile
                ? "border-zinc-300 bg-zinc-50"
                : "border-zinc-200 bg-zinc-100 hover:border-zinc-300"
            }`}
          >
            <input
              id="resume-input"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
            {resumeFile ? (
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-500 mb-1" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <p className="text-sm font-semibold text-zinc-950">{resumeFile.name}</p>
                <p className="text-xs text-zinc-400">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB · Click to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-zinc-400 mb-1" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-sm font-semibold text-zinc-500">Drag &amp; drop your resume here</p>
                <p className="text-xs text-zinc-400 mt-0.5">PDF, DOC, DOCX · max 10 MB · click to browse</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-3 rounded-full bg-[#C0392B] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a93226] disabled:opacity-60 sm:px-10 sm:py-4 sm:text-base"
            >
              {status === "sending" ? "Submitting…" : "Submit Application"}
              {status !== "sending" && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" />
                </svg>
              )}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-green-600">
                Application received! We&apos;ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-500">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <a
              href="mailto:jobs@quickgentech.com"
              className="text-sm font-semibold text-red-500 hover:text-red-600 transition sm:text-base"
            >
              jobs@quickgentech.com
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}