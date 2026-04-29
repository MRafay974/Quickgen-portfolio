"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(textRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
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
    <section ref={sectionRef} className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16">

          {/* Video card */}
          <div className="relative overflow-hidden rounded-[3rem] ">
            <video
              src="/videos/animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text — only animated element */}
          <div ref={textRef} className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Every layer, Every discipline.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              A product is not just what you see. It is the board inside it, the code running on that board, the system connecting it to the world
            </p>
            <div>
<Link
  href="/process"
  className="inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
>
  How We Work
</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}