"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");

    // Lock all initial states synchronously before first paint
    gsap.set(statItems, { opacity: 0, y: 40, willChange: "transform, opacity" });
    gsap.set(textRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {

      // All stat items in one timeline — single shared trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => {
          gsap.set(statItems, { willChange: "auto" });
        },
      });

      tl.to(statItems, {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.1,
      });

      // Text block
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => {
          gsap.set(textRef.current, { willChange: "auto" });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="space-y-16 text-center">

          <div ref={statsRef} className="grid grid-cols-2 gap-6 sm:grid-cols-4 justify-items-center">
            {[
              { value: "150+", label: "Clients" },
              { value: "300+", label: "Projects" },
              { value: "5",    label: "Continents" },
              { value: "Zero", label: "Missed Deadlines" },
            ].map((item) => (
              <div key={item.label} className="stat-item space-y-3">
                <div className="text-5xl font-black tracking-tight text-black sm:text-7xl">
                  {item.value}
                </div>
                <div className="text-lg font-medium text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Numbers talk. We let them.
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-zinc-600">
              We're proud to have partnered with visionary startups and organizations, helping them achieve success with award-winning designs and patented innovations. Our clients span a range of industries, and our work has been recognized for pushing the boundaries of engineering and design excellence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}