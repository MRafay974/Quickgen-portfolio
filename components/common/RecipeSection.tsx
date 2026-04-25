"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RecipeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cards = [
    { title: "Hardware Dev Guide", subtitle: "Product",  accent: "bg-slate-950 text-white" },
    { title: "Software Brochure",  subtitle: "Software", accent: "bg-amber-50 text-slate-950" },
    { title: "Product Dev Guide",  subtitle: "Design",   accent: "bg-slate-900 text-white" },
    { title: "GTM Playbook",       subtitle: "Medical",  accent: "bg-slate-200 text-slate-950" },
  ];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const cardItems = gsap.utils.toArray<HTMLElement>(".recipe-card");

    // Lock all initial states synchronously before first paint
    gsap.set(headingRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });
    gsap.set(cardItems,          { opacity: 0, y: 50, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {

      // Heading text
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Cards — single shared timeline, one trigger on the grid container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(cardItems, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] bg-[#f4f4f4] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] sm:rounded-[3rem] sm:p-12">

          {/* Heading — animated */}
          <div ref={headingRef} className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Our build philosophy.
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 sm:mt-4 sm:text-lg sm:leading-8">
              Learn how we approach product development — from first schematic to global launch.
            </p>
          </div>

          {/* Cards — animated */}
          <div ref={gridRef} className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {cards.map((card) => (
              <div key={card.title} className="recipe-card space-y-3 sm:space-y-4">
                <div className={`relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ${card.accent} p-4 sm:p-6`}>
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white sm:right-6 sm:top-6 sm:h-10 sm:w-10 sm:text-sm">
                    BRASH
                  </div>
                  <div className="h-36 rounded-[1.25rem] bg-white/5 sm:h-52 sm:rounded-[1.75rem]" />
                </div>
                <div className="text-center">
                  <h3 className="mt-2 text-sm font-semibold text-slate-950 sm:mt-3 sm:text-lg">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}