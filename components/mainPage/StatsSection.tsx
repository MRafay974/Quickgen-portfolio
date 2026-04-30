"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 150, suffix: "+", label: "Clients" },
  { value: 300, suffix: "+", label: "Projects" },
  { value: 5,   suffix: "",  label: "Continents" },
  { value: null, display: "Zero", label: "Missed Deadlines" },
];

const clientLogos = Array.from({ length: 24 }, (_, index) => ({
  src: `/images/clients/${index + 1}.png`,
  alt: `Client ${index + 1}`,
}));

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const statItems    = gsap.utils.toArray<HTMLElement>(".stat-item");
    const numberEls    = gsap.utils.toArray<HTMLElement>(".stat-number");

    // Lock initial states before first paint
    gsap.set(statItems,       { opacity: 0, y: 40, willChange: "transform, opacity" });
    gsap.set(textRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {

      // ── Fade-in stagger for all stat cards ──────────────────────────────────
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
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      // ── Counting-up effect for each numeric stat ─────────────────────────────
      numberEls.forEach((el) => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix ?? "";

        // Non-numeric ("Zero") — skip counting
        if (isNaN(target)) return;

        // Proxy object GSAP will tween
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 2.2,
          ease: "expo.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            el.textContent = Math.round(proxy.val) + suffix;
          },
          onComplete() {
            // Ensure final value is pixel-perfect
            el.textContent = target + suffix;
          },
        });
      });

      // ── Text block fade-in ───────────────────────────────────────────────────
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
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-24 lg:px-8 lg:pb-12">
        <div className="space-y-16 text-center">

          <div ref={statsRef} className="grid grid-cols-2 gap-6 sm:grid-cols-4 justify-items-center">
            {stats.map((item) => (
              <div key={item.label} className="stat-item space-y-3">
                <div
                  className="stat-number text-5xl font-black tracking-tight text-black sm:text-7xl"
                  data-target={item.value ?? undefined}
                  data-suffix={item.suffix ?? ""}
                >
                  {item.value !== null ? `0${item.suffix}` : item.display}
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
              We&apos;re proud to have partnered with visionary startups and organizations,
              helping them achieve success with award-winning designs and patented
              innovations. Our clients span a range of industries, and our work has been
              recognized for pushing the boundaries of engineering and design excellence.
            </p>
          </div>

        </div>
      </div>

      {/* ── Infinite clients logo strip ─────────────────────────────────────── */}
      <div className="border-t border-zinc-100 pb-12 pt-5 sm:pt-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white via-white/90 to-transparent sm:w-28 lg:w-36" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white via-white/90 to-transparent sm:w-28 lg:w-36" />

            <div className="clients-track flex min-w-max items-center gap-4 py-5 sm:gap-6 lg:gap-8">
              {[0, 1, 2].map((setIdx) => (
                <div key={setIdx} className="flex shrink-0 items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                  {clientLogos.map((logo) => (
                    <div
                      key={`${setIdx}-${logo.src}`}
                      className="flex shrink-0 items-center justify-center "
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={320}
                        height={160}
                        sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 208px"
                        className="h-auto max-h-24 w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 sm:max-h-28 lg:max-h-32"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .clients-track {
            animation: clients-scroll 130s linear infinite;
            will-change: transform;
          }
          @keyframes clients-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .clients-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}