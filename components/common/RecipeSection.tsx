"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RecipeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "Product Brochure",
      pdf:   "/documents/Product%20Brochure.pdf",
      bg:    "bg-slate-800",
    },
    {
      title: "Hardware Brochure",
      pdf:   "/documents/Hardware%20Brochure.pdf",
      bg:    "bg-blue-950",
    },
    {
      title: "Software Brochure",
      pdf:   "/documents/Software%20Brochure.pdf",
      bg:    "bg-stone-100",
    },
    {
      title: "Medical Product Design Brochure",
      pdf:   "/documents/Medical%20Product%20Design%20Brochure.pdf",
      bg:    "bg-gray-100",
    },
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
          invalidateOnRefresh: true,
        },
      });

      // Cards — single shared timeline, one trigger on the grid container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
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
        <div className="rounded-4xl bg-[#f4f4f4] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] sm:rounded-[3rem] sm:p-12">

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

                {/* Card placeholder */}
                <div className={`rounded-3xl sm:rounded-4xl aspect-3/4 ${card.bg}`} />

                {/* Title + download */}
                <div className="flex items-start justify-center gap-2 px-1 text-center">
                  <h3 className="text-sm font-bold leading-snug text-slate-700 sm:text-base">
                    {card.title}
                  </h3>
                  <a
                    href={card.pdf}
                    download
                    aria-label={`Download ${card.title}`}
                    className="mt-0.5 shrink-0 text-slate-600 hover:text-red-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}