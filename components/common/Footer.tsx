"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FooterProps = {
  activeLink?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Footer({ activeLink: _activeLink }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set([ctaRef.current, infoRef.current], { opacity: 0, y: 35, willChange: "transform, opacity" });
    gsap.set(wordmarkRef.current, { opacity: 0, y: 60, willChange: "transform, opacity" });

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

      gsap.to(infoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.to(wordmarkRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: "top 95%",
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

      {/* Main footer info */}
      <div ref={infoRef} className="px-6 pt-14 pb-10 sm:px-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

            {/* Offices — left side */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">

              {/* Australia */}
              <div className="max-w-[200px]">
                <p className="mb-3 text-m font-semibold text-[#C0392B]">Australia Office</p>
                <p className="font-bold text-white">Toowoomba, Queensland</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <p className="text-sm text-white">+61 431 816 698</p>
                  <a href="mailto:info@quickgentech.com" className="text-sm text-white transition-colors hover:text-[#C0392B]">info@quickgentech.com</a>
                  <p className="text-sm text-white">Suite 96, 58–62 Water Street</p>
                </div>
              </div>

              {/* Pakistan */}
              <div className="max-w-[200px]">
                <p className="mb-3 text-m font-semibold text-[#C0392B]">Pakistan Office</p>
                <p className="font-bold text-white">Islamabad</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <p className="text-sm text-white">+92 335 5367422</p>
                  <a href="mailto:info@quickgentech.com" className="text-sm text-white transition-colors hover:text-[#C0392B]">info@quickgentech.com</a>
                  <p className="text-sm text-white">Office 1307, National Science &amp; Technology Park, H–12</p>
                </div>
              </div>

              {/* Dubai */}
              <div className="max-w-[200px]">
                <p className="mb-3 text-m font-semibold text-[#C0392B]">Dubai Office</p>
                <p className="font-bold text-white">Dubai Silicon Oasis</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <p className="text-sm text-white">+971 50 561 0698</p>
                  <a href="mailto:info@quickgentech.com" className="text-sm text-white transition-colors hover:text-[#C0392B]">info@quickgentech.com</a>
                  <p className="text-sm text-white">Quickgen Technologies FZCO,<br />Dubai, United Arab Emirates</p>
                </div>
              </div>

            </div>

            {/* Nav + Socials — right side */}
            <div className="flex gap-16">
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Work", href: "/work" },
                  { label: "Services", href: "/services" },
                  { label: "Process", href: "/process" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => {
                  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-m transition-colors ${isActive ? "text-[#C0392B]" : "text-white hover:text-zinc-300"}`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3">
                <span className="text-m font-semibold text-white">Socials</span>
                <a href="https://www.linkedin.com/company/quickgentech" target="_blank" rel="noopener noreferrer" className="text-base text-zinc-400 transition-colors hover:text-white">LinkedIn</a>
                <a href="https://clutch.co" target="_blank" rel="noopener noreferrer" className="text-base text-zinc-400 transition-colors hover:text-white">Clutch</a>
                <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className="text-base text-zinc-400 transition-colors hover:text-white">Upwork</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Big wordmark cut at bottom */}
      <div ref={wordmarkRef} className="mt-10 overflow-hidden leading-none sm:mt-14 lg:mt-16">
        <p
          className="select-none text-center font-black uppercase text-white"
          style={{ fontSize: "clamp(38px, 18vw, 260px)", lineHeight: 0.75, marginBottom: "-0.22em" }}
        >
          QUICKGEN
        </p>
      </div>

    </footer>
  );
}