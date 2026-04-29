"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    quote: [
      { text: "First FCC submission,  ", highlight: false },
      { text: "First pass ", highlight: true },
      { text: " I didn't think that was possible.", highlight: false },
    ],
    name: "Founder, USA",
  },
  {
    quote: [
      { text: "Every discipline moved as one,  ", highlight: false },
      { text: "That had never happened before", highlight: true },
    ],
    name: "CEO, Australia",
  },
  {
    quote: [
      { text: "We came in with a concept,  ", highlight: false },
      { text: "Eight weeks later we had something real.", highlight: true },
    ],
    name: "Co-Founder, UK",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Scroll-in animation on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = [badgeRef.current, quoteRef.current, authorRef.current, buttonRef.current];

    // Lock initial states before first paint
    gsap.set(targets, { opacity: 0, y: 35, willChange: "transform, opacity" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 55%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
      onComplete: () => {
        gsap.set(targets, { willChange: "auto" });
      },
    });

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: "power1.out",
      stagger: 0.1,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const handleNext = () => {
    setIsVisible(false);
    window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
      setIsVisible(true);
    }, 300);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-[3rem] bg-zinc-950/80 p-8 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-start">
            <div className="space-y-8">

              {/* Badge */}
              <p
                ref={badgeRef}
                className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white"
              >
                Our clients say it better
              </p>

              {/* Quote */}
              <div ref={quoteRef} className="min-h-[16rem]">
                <div
                  className={`transition duration-300 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    
                    {activeTestimonial.quote.map((segment, index) => (
                      <span
                        key={index}
                        className={segment.highlight ? "text-white" : "text-zinc-400"}
                      >
                        {segment.text}
                      </span>
                    ))}
                    
                  </p>
                </div>
              </div>

              {/* Author */}
              <div ref={authorRef} className="mt-8 flex flex-col gap-1 text-left">
                <span className="text-xl font-medium text-white">
                  {activeTestimonial.name}
                </span>
              </div>
            </div>

            {/* Button */}
            <div ref={buttonRef} className="flex items-start justify-end">
              <button
                onClick={handleNext}
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}