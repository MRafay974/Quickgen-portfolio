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

// logo 20.png is absent from the assets — skip it
const clientLogos: { src: string; alt: string; href: string }[] = [
  { src: "/images/clients/1.png", alt: "Client 1", href: "https://aquamonix.com.au/" },
  { src: "/images/clients/2.png", alt: "Client 2", href: "https://www.aeyron.com/" },
  { src: "/images/clients/3.png", alt: "Client 3", href: "https://litrek.com.au/" },
  { src: "/images/clients/4.png", alt: "Client 4", href: "https://www.rtechinc.co/" },
  { src: "/images/clients/5.png", alt: "Client 5", href: "https://simplifiautomation.com/" },
  { src: "/images/clients/6.png", alt: "Client 6", href: "https://naly.ai/en" },
  { src: "/images/clients/7.png", alt: "Client 7", href: "https://www.adelehealth.com/" },
  { src: "/images/clients/8.png", alt: "Client 8", href: "https://www.uplyftwearables.com/" },
  { src: "/images/clients/9.png", alt: "Client 9", href: "https://www.flux.ai/p/" },
  { src: "/images/clients/10.png", alt: "Client 10", href: "https://innotech.com/" },
  { src: "/images/clients/11.png", alt: "Client 11", href: "https://www.nak.com.tw/" },
  { src: "/images/clients/12.png", alt: "Client 12", href: "https://microclimate.com/" },
  { src: "/images/clients/13.png", alt: "Client 13", href: "https://livello.com/" },
  { src: "/images/clients/14.png", alt: "Client 14", href: "https://www.honeypoint3d.com/" },
  { src: "/images/clients/15.png", alt: "Client 15", href: "https://www.asteroidtechs.com/en/home" },
  { src: "/images/clients/16.png", alt: "Client 16", href: "https://www.studiobassing.com/" },
  { src: "/images/clients/17.png", alt: "Client 17", href: "https://designengineerconstruct.com/" },
  { src: "/images/clients/18.png", alt: "Client 18", href: "https://pacmotor.com/" },
  { src: "/images/clients/19.png", alt: "Client 19", href: "https://www.zeroemissionfuels.com/" },
  { src: "/images/clients/21.png", alt: "Client 21", href: "https://www.atsnuc.com/" },
  { src: "/images/clients/22.png", alt: "Client 22", href: "https://remimb.com/" },
  { src: "/images/clients/23.png", alt: "Client 23", href: "https://www.edutech.com/" },
  { src: "/images/clients/24.png", alt: "Client 24", href: "https://www.instagram.com/apollovisiongolf/" },
];

// Row 1 → right-to-left  |  Row 2 → left-to-right (reversed order for variety)
const row1Logos = clientLogos;
const row2Logos = [...clientLogos].reverse();

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

      {/* ── Infinite clients logo strips ─────────────────────────────────── */}
      <div className="border-t border-zinc-100 pb-12 pt-5 sm:pt-6 space-y-4">

        {/* Row 1 — scrolls right to left */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white via-white/90 to-transparent sm:w-28 lg:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white via-white/90 to-transparent sm:w-28 lg:w-36" />
          <div className="clients-track-rtl flex min-w-max items-center gap-4 py-3 sm:gap-10 lg:gap-20">
            {[0, 1, 2].map((setIdx) => (
              <div key={setIdx} className="flex shrink-0 items-center gap-4 sm:gap-10 lg:gap-20">
                {row1Logos.map((logo) => (
                  <a
                    key={`r1-${setIdx}-${logo.src}`}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group shrink-0 flex items-center justify-center"
                    aria-label={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={380}
                      height={190}
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 260px, 182px"
                      className="h-auto max-h-20 w-auto max-w-44 object-contain grayscale opacity-75 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 sm:max-h-28 sm:max-w-56 lg:max-h-36 lg:max-w-72"
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls left to right */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white via-white/90 to-transparent sm:w-28 lg:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white via-white/90 to-transparent sm:w-28 lg:w-36" />
          <div className="clients-track-ltr flex min-w-max items-center gap-4 py-3 sm:gap-10 lg:gap-20">
            {[0, 1, 2].map((setIdx) => (
              <div key={setIdx} className="flex shrink-0 items-center gap-4 sm:gap-10 lg:gap-20">
                {row2Logos.map((logo) => (
                  <a
                    key={`r2-${setIdx}-${logo.src}`}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group shrink-0 flex items-center justify-center"
                    aria-label={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={380}
                      height={190}
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 260px, 182px"
                      className="h-auto max-h-20 w-auto max-w-44 object-contain grayscale opacity-75 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 sm:max-h-28 sm:max-w-56 lg:max-h-36 lg:max-w-72"
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .clients-track-rtl {
            animation: clients-scroll-rtl 120s linear infinite;
            will-change: transform;
          }
          .clients-track-ltr {
            animation: clients-scroll-ltr 120s linear infinite;
            will-change: transform;
          }
          @keyframes clients-scroll-rtl {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
          @keyframes clients-scroll-ltr {
            0%   { transform: translateX(-33.333333%); }
            100% { transform: translateX(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .clients-track-rtl,
            .clients-track-ltr {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}