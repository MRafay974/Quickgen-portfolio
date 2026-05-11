"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RecipeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "Product Brochure",
      image: "/documents/1.png",
      pdf:   "/documents/Product%20Brochure.pdf",
    },
    {
      title: "Hardware Brochure",
      image: "/documents/2.png",
      pdf:   "/documents/Hardware%20Brochure.pdf",
    },
    {
      title: "Software Brochure",
      image: "/documents/3.png",
      pdf:   "/documents/Software%20Brochure.pdf",
    },
    {
      title: "Medical Product Design Brochure",
      image: "/documents/4.png",
      pdf:   "/documents/Medical%20Product%20Design%20Brochure.pdf",
    },
  ];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const cardItems = gsap.utils.toArray<HTMLElement>(".recipe-card");

    gsap.set(headingRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });
    gsap.set(cardItems,          { opacity: 0, y: 50, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {

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

          {/* Heading */}
          <div ref={headingRef} className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Our build philosophy.
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 sm:mt-4 sm:text-lg sm:leading-8">
              Learn how we approach product development — from first schematic to global launch.
            </p>
          </div>

          {/* Cards */}
          <div ref={gridRef} className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {cards.map((card) => (
              <div key={card.title} className="recipe-card flex flex-col gap-2.5 sm:gap-3">

                {/* Card image — border radius applied directly to the image container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#e8353a]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>

                {/* Title + download — sits snugly below the image */}
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