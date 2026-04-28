"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORY_DISPLAY_NAMES } from "@/constants/work/workCards";

type WorkDetailContentProps = {
  project: {
    slug: string;
    title: string;
    category: string;
    image?: string;
    overview: string;
    details?: string[];
    techStack?: string[];
    tagline?: string;
    detailedFeatures?: Record<string, string> | null;
    highlights?: string | null;
  };
};

export function WorkDetailContent({ project }: WorkDetailContentProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const deepDiveRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const featureItems = gsap.utils.toArray<HTMLElement>(".wd-feature-item");
    const techItems = gsap.utils.toArray<HTMLElement>(".wd-tech-item");
    const deepDiveItems = gsap.utils.toArray<HTMLElement>(".wd-deepdive-item");

    // Lock initial states synchronously before first paint
    gsap.set(backRef.current, { opacity: 0, x: -20 });
    gsap.set(heroRef.current, { opacity: 0, y: 50 });
    gsap.set(imageRef.current, { opacity: 0, y: 40 });
    gsap.set(featureItems, { opacity: 0, y: 40, willChange: "transform, opacity" });
    gsap.set(techItems, { opacity: 0, y: 20, willChange: "transform, opacity" });
    gsap.set(deepDiveItems, { opacity: 0, y: 40, willChange: "transform, opacity" });
    if (highlightsRef.current) {
      gsap.set(highlightsRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });
    }

    const ctx = gsap.context(() => {

      // Back link — immediate on mount
      gsap.to(backRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });

      // Hero text block
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.2,
        onComplete: () => void gsap.set(heroRef.current, { willChange: "auto" }),
      });

      // Hero image
      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.35,
        onComplete: () => void gsap.set(imageRef.current, { willChange: "auto" }),
      });

      // Features grid
      if (featureItems.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => void gsap.set(featureItems, { willChange: "auto" }),
        });
        tl.to(featureItems, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.07,
        });
      }

      // Tech stack chips
      if (techItems.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: techRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => void gsap.set(techItems, { willChange: "auto" }),
        });
        tl.to(techItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05,
        });
      }

      // Deep-dive cards
      if (deepDiveItems.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: deepDiveRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => void gsap.set(deepDiveItems, { willChange: "auto" }),
        });
        tl.to(deepDiveItems, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.1,
        });
      }

      // Highlights block
      if (highlightsRef.current) {
        gsap.to(highlightsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => void gsap.set(highlightsRef.current, { willChange: "auto" }),
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ── Back link ─────────────────────────────────────────────────── */}
      <Link
        ref={backRef}
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-zinc-950 transition mb-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Work
      </Link>

      {/* ── Title + Image row ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 mb-16">
        {/* Left: category, title, tagline, overview */}
        <div ref={heroRef} className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500 mb-3">
            {CATEGORY_DISPLAY_NAMES[project.category] ?? project.category}
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl mb-4">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-xl text-zinc-500 font-medium mb-8">{project.tagline}</p>
          )}
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Overview</h2>
          <p className="text-lg leading-8 text-zinc-600">{project.overview}</p>
        </div>

        {/* Right: image */}
        {project.image && (
          <div ref={imageRef} className="w-full lg:w-[45%] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-3xl"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* ── Features ──────────────────────────────────────────────────── */}
      {project.details && project.details.length > 0 && (
        <div ref={featuresRef} className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.details.map((feat, i) => (
              <div key={i} className="wd-feature-item flex items-start gap-3 rounded-xl bg-zinc-50 border border-zinc-100 px-5 py-4">
                <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-sm leading-6 text-zinc-700">{feat}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tech Stack ────────────────────────────────────────────────── */}
      {project.techStack && project.techStack.length > 0 && (
        <div ref={techRef} className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="wd-tech-item rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Detailed Features ─────────────────────────────────────────── */}
      {project.detailedFeatures && Object.keys(project.detailedFeatures).length > 0 && (
        <div ref={deepDiveRef} className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Deep Dive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(project.detailedFeatures).map(([title, desc]) =>
              typeof desc === "string" ? (
                <div key={title} className="wd-deepdive-item rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                  <h3 className="text-base font-black text-zinc-950 mb-2">{title}</h3>
                  <p className="text-sm leading-6 text-zinc-500">{desc}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* ── Highlights ────────────────────────────────────────────────── */}
      {project.highlights && (
        <div ref={highlightsRef} className="rounded-2xl bg-zinc-950 px-8 py-10 mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Highlights</p>
          <p className="text-lg leading-8 text-white">{project.highlights}</p>
        </div>
      )}
    </div>
  );
}
