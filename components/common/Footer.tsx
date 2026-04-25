"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FooterProps = {
  activeLink?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Footer({ activeLink: _activeLink }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Lock initial state synchronously before first paint
    gsap.set(ctaRef.current, { opacity: 0, y: 35, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white">

      {/* CTA */}
      <div ref={ctaRef} className="flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Let&apos;s build <br /> what&apos;s next.
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded bg-[#C0392B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a93226] sm:mt-10 sm:px-12 sm:py-4 sm:text-base lg:px-16"
        >
          Book Your Free Discovery Call →
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 py-5 sm:px-8 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center text-xs text-zinc-400 sm:flex-row sm:justify-between sm:text-left sm:text-sm">
          <span>QuickGen Technology</span>
          <span>


            Dubai, UAE &nbsp;·&nbsp;{" "}
            <a 
              href="mailto:hello@quickgentech.com"
              className="transition-colors duration-200 hover:text-red-500"
            >
              hello@quickgentech.com
            </a>
          </span>
        </div>
      </div>

    </footer>
  );
}