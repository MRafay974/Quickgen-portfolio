"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: [
      { text: "Brash continues to impress by going ", highlight: false },
      { text: "above and beyond", highlight: true },
      { text: " with research, design, and even testing.", highlight: false },
    ],
    name: "Mike",
    title: "Owner, Tramline Travel",
  },
  {
    quote: [
      { text: "They took our idea from sketch to launch ", highlight: false },
      { text: "faster than any team", highlight: true },
      { text: " we’ve worked with before.", highlight: false },
    ],
    name: "Asha",
    title: "Product Lead, Nexo Health",
  },
  {
    quote: [
      { text: "The attention to detail and product polish made our brand feel ", highlight: false },
      { text: "premium instantly", highlight: true },
      { text: ".", highlight: false },
    ],
    name: "Jules",
    title: "Founder, Ember Audio",
  },
  {
    quote: [
      { text: "Every step of the process was ", highlight: false },
      { text: "clear, collaborative, and exceptionally well executed", highlight: true },
      { text: ".", highlight: false },
    ],
    name: "Noah",
    title: "Chief Marketing Officer, Arc Systems",
  },
  {
    quote: [
      { text: "The final experience was ", highlight: false },
      { text: "beautifully engineered", highlight: true },
      { text: " and aligned perfectly with our goals.", highlight: false },
    ],
    name: "Priya",
    title: "Head of Growth, Luma Labs",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    return () => {
      // no cleanup needed beyond state updates
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
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-[3rem] bg-zinc-950/80 p-8 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-start">
            <div className="space-y-8">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white">
                Our clients say it better
              </p>
              <div className="min-h-[16rem]">
                <div
                  className={`transition duration-300 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    “
                    {activeTestimonial.quote.map((segment, index) => (
                      <span
                        key={index}
                        className={segment.highlight ? "text-white" : "text-zinc-400"}
                      >
                        {segment.text}
                      </span>
                    ))}
                    ”
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-1 text-left">
                <span className="text-xl font-medium text-white">
                  {activeTestimonial.name}
                </span>
                <span className="text-sm text-zinc-400">
                  {activeTestimonial.title}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-end">
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
