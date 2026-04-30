"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Featured() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial states synchronously BEFORE first paint
    // This prevents the "flash of unstyled content" that causes jitter
    gsap.set(imageRef.current, { opacity: 0, x: -35, willChange: "transform, opacity" });
    gsap.set(textRef.current, { opacity: 0, x: 35, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
          // Prevents ScrollTrigger from recalculating mid-animation
          once: true,
          invalidateOnRefresh: true,
        },
        // Clean up will-change after animation to free GPU memory
        onComplete: () => {
          gsap.set([imageRef.current, textRef.current], { willChange: "auto" });
        },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.3,
        ease: "power1.out",
      }).to(
        textRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: "power1.out",
        },
        // Overlap by 0.75s — single coordinated timeline, no independent delays
        "-=0.75"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center">

          {/* Left: Image */}
          <div ref={imageRef} className="relative flex items-center justify-center">
            <div className="relative overflow-hidden rounded-[3rem]">
              <img
                src="/images/landingPage/HEADLAMPS.png"
                alt="Featured project"
                className="h-[30rem] w-full object-contain"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div ref={textRef} className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Featured project
              </p>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                We transform your big ideas into a reality.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-zinc-600">
              Our team has helped entrepreneurs, startups and established
              companies develop meaningful solutions for over a decade. From
              concept to launch, we craft intuitive, scalable, and market-ready
              products.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}