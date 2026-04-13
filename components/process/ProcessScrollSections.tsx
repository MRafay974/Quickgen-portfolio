"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase {
  id: string;
  label: string;
  color: string;          // accent colour for text highlights & progress bar
  bg: string;             // card background colour
  headline: string[];     // [plain part, coloured part]
  subSections: SubSection[];
}

interface SubSection {
  headline: string[];     // [plain, coloured]
  tags: string[];
  description: string;
  image: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const phases: Phase[] = [
  {
    id: "discover",
    label: "Discover",
    color: "#4ade80",           // green
    bg: "#e8f5ee",
    headline: ["Strong starts with ", "research\nand exploration"],
    subSections: [
      {
        headline: ["Strong starts with ", "research\nand exploration"],
        tags: ["Trends", "Market research", "Competitor analysis", "Patents"],
        description:
          "We begin with a consultation to define your vision, target customer, and key requirements, followed by research into market trends, patents, and emerging technologies. We then explore and present different concepts and/or wireframes to meet your unique needs.",
        image: "https://placehold.co/700x420/d1fae5/065f46?text=Research+Board",
      },
      {
        headline: ["Grounded ", "concept\nproposals"],
        tags: ["Design concepts", "Technology integrations", "Wireframes"],
        description:
          "After exploring the market, competition and customer landscape we work with you to propose a variety of concepts. From these we are able to choose what resonates best to move forward with development.",
        image: "https://placehold.co/700x420/d1fae5/065f46?text=Concept+Sketches",
      },
    ],
  },
  {
    id: "create",
    label: "Create",
    color: "#fb923c",           // orange
    bg: "#fde8df",
    headline: ["Testing brilliance with ", "prototyping\nand proof of concept"],
    subSections: [
      {
        headline: ["Testing brilliance with ", "prototyping\nand proof of concept"],
        tags: ["Component testing", "3D printing", "In-house mockups", "Initial renders"],
        description:
          "Through a combination of rapid prototyping methods such as 3D printing and off-the-shelf sourced components, we iterate a large variety of low fidelity models. This allows us to quickly and cost effectively validate concepts before committing to full development.",
        image: "https://placehold.co/700x420/fde8df/9a3412?text=Prototyping+Parts",
      },
      {
        headline: ["Polished with ", "models,\ntesting and renders"],
        tags: ["High-fidelity models", "Functional testing", "3D renders"],
        description:
          "We advance to high-fidelity prototypes and photorealistic renders, giving you a clear picture of the final product before going to manufacturing.",
        image: "https://placehold.co/700x420/fde8df/9a3412?text=Renders+%26+Models",
      },
    ],
  },
  {
    id: "refine",
    label: "Refine",
    color: "#60a5fa",           // blue
    bg: "#dbeafe",
    headline: ["Refined for ", "manufacturing\nand quality"],
    subSections: [
      {
        headline: ["Refined for ", "manufacturing\nand quality"],
        tags: ["DFM review", "Cost optimisation", "Assembly planning"],
        description:
          "We finalize design for manufacturing, making minor adjustments to optimize cost, quality, and assembly. Every detail is reviewed to ensure a smooth transition to production.",
        image: "https://placehold.co/700x420/dbeafe/1e40af?text=DFM+Review",
      },
      {
        headline: ["Certified and ", "ready to ship"],
        tags: ["Certification", "Regulatory compliance", "Final testing"],
        description:
          "We handle certification requirements and regulatory compliance so your product is cleared for market entry across your target regions.",
        image: "https://placehold.co/700x420/dbeafe/1e40af?text=Certification",
      },
    ],
  },
  {
    id: "launch",
    label: "Launch",
    color: "#c084fc",           // purple
    bg: "#f3e8ff",
    headline: ["Launched at ", "scale\nand supported"],
    subSections: [
      {
        headline: ["Launched at ", "scale\nand supported"],
        tags: ["Mass manufacturing", "Supplier management", "Fulfilment"],
        description:
          "Mass manufacturing and ongoing product updates, including potential future upgrades. We manage supplier relationships and quality control so you can focus on growing your business.",
        image: "https://placehold.co/700x420/f3e8ff/6b21a8?text=Manufacturing+Line",
      },
      {
        headline: ["Ongoing ", "product\nevolution"],
        tags: ["Product updates", "Feature additions", "Market expansion"],
        description:
          "Your product launch is just the beginning. We stay engaged with ongoing iterations, feature additions, and market expansion support to keep you ahead of the curve.",
        image: "https://placehold.co/700x420/f3e8ff/6b21a8?text=Product+Evolution",
      },
    ],
  },
];

// ─── Sticky Nav Bar (GSAP-driven) ────────────────────────────────────────────

function StickyNav({
  activePhase,
  expandedProgress,
}: {
  activePhase: number;
  expandedProgress: number;
}) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-4">
        {/* Timeline container */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2">
          {/* Kickoff label */}
          <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">Kickoff</span>

          {/* Timeline track */}
          <div className="flex-1 relative flex items-center min-w-75">
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 w-full" />

            {/* Progress line (fills with color) */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px transition-all"
              style={{
                width: `${expandedProgress}%`,
                backgroundColor: phases[Math.min(activePhase, phases.length - 1)]?.color ?? "#4ade80",
              }}
            />

            {/* Phase dots */}
            <div className="relative w-full flex justify-between">
              {phases.map((phase, i) => {
                const isActive = i <= activePhase;
                return (
                  <div
                    key={phase.id}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? phase.color : "white",
                        borderColor: isActive ? phase.color : "#d1d5db",
                      }}
                    />
                    <span
                      className="text-xs font-semibold mt-2 whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: i === activePhase ? phase.color : "#9ca3af",
                      }}
                    >
                      {phase.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Finished product label */}
          <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">Finished product</span>
        </div>
      </div>
    </div>
  );
}

// ─── Single Sub-section Card ──────────────────────────────────────────────────

function SubCard({
  sub,
  color,
  bg,
}: {
  sub: SubSection;
  color: string;
  bg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full rounded-3xl px-6 lg:px-20 py-16 flex flex-col items-center text-center transition-all duration-700"
      style={{
        backgroundColor: bg,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
      }}
    >
      {/* Headline */}
      <h3 className="text-3xl lg:text-4xl font-black leading-tight mb-8 max-w-lg">
        {sub.headline[0]}
        <span style={{ color }}>{sub.headline[1]}</span>
      </h3>

      {/* Fan of images */}
      <div className="relative flex items-end justify-center mb-10" style={{ height: "300px", width: "100%", maxWidth: "520px" }}>
        {/* Left card — rotated */}
        <div
          className="absolute rounded-2xl overflow-hidden shadow-lg"
          style={{
            width: "200px",
            height: "240px",
            left: "0px",
            bottom: "0",
            transform: "rotate(-8deg)",
            zIndex: 1,
          }}
        >
          <img src={sub.image.replace("700x420", "200x240")} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Centre card — main */}
        <div
          className="absolute rounded-2xl overflow-hidden shadow-xl"
          style={{
            width: "260px",
            height: "260px",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "0",
            zIndex: 2,
          }}
        >
          <img src={sub.image} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Right card — rotated */}
        <div
          className="absolute rounded-2xl overflow-hidden shadow-lg"
          style={{
            width: "200px",
            height: "240px",
            right: "0px",
            bottom: "0",
            transform: "rotate(8deg)",
            zIndex: 1,
          }}
        >
          <img src={sub.image.replace("700x420", "200x240")} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tags */}
      <p className="text-sm font-bold text-zinc-800 mb-4">
        {sub.tags.map((tag, i) => (
          <span key={tag}>
            {tag}
            {i < sub.tags.length - 1 && <span className="mx-2 font-normal text-zinc-400">·</span>}
          </span>
        ))}
      </p>

      {/* Description */}
      <p className="text-sm leading-7 text-zinc-600 max-w-md">{sub.description}</p>
    </div>
  );
}

// ─── Phase Block ─────────────────────────────────────────────────────────────

function PhaseBlock({ phase, phaseIndex }: { phase: Phase; phaseIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} data-phase={phaseIndex} className="w-full flex flex-col gap-6 py-6 px-4 lg:px-12">
      {phase.subSections.map((sub, i) => (
        <SubCard key={i} sub={sub} color={phase.color} bg={phase.bg} />
      ))}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ProcessScrollSections() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedProgress, setExpandedProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const navTriggerRef = useRef<HTMLDivElement>(null);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !timelineContainerRef.current || !navTriggerRef.current) {
      return;
    }

    // Kill previous animations
    if (gsapTimelineRef.current) {
      gsapTimelineRef.current.kill();
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Create the main scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        markers: false,
      },
    });

    gsapTimelineRef.current = tl;

    // Animate progress fill
    tl.to(
      {},
      {
        onUpdate() {
          const progress = tl.progress() * 100;
          setExpandedProgress(progress);
        },
      },
      0
    );

    // Update active phase based on scroll
    const phaseCount = phases.length;
    tl.eventCallback("onUpdate", () => {
      const progress = tl.progress();
      const newPhase = Math.floor(progress * phaseCount);
      const clamped = Math.max(0, Math.min(newPhase, phaseCount - 1));
      setActivePhase(clamped);
    });

    // Animate the timeline container (scale, opacity, y-offset)
    tl.to(
      timelineContainerRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
      },
      0
    );

    // Animate each phase dot's entrance
    phases.forEach((phase, i) => {
      const dot = document.querySelector(`[data-phase-dot="${i}"]`);
      if (dot) {
        const dotProgress = i / (phases.length - 1);
        tl.from(
          dot,
          {
            opacity: 0,
            scale: 0.5,
            y: -20,
            duration: 0.5,
            ease: "back.out",
          },
          dotProgress * 0.7
        );
      }
    });

    // Stagger in the content sections below timeline
    gsap.utils.toArray<HTMLElement>("[data-phase]").forEach((el, i) => {
      tl.from(
        el,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
        },
        0.3 + i * 0.2
      );
    });

    return () => {
      if (gsapTimelineRef.current) {
        gsapTimelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div ref={navTriggerRef} />
      <StickyNav activePhase={activePhase} expandedProgress={expandedProgress} />

      <div ref={containerRef} className="w-full bg-white">
        {/* Horizontal Timeline Section (pinned & morphed) */}
        <div className="sticky top-15 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100 py-8 px-6">
          <div ref={timelineContainerRef} className="max-w-5xl mx-auto">
            <p className="text-sm text-zinc-400 font-medium mb-6">The roadmap</p>

            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap shrink-0">Kickoff</span>

              {/* Timeline track */}
              <div className="flex-1 relative flex items-center min-w-75">
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 w-full" />

                {/* Animated progress line */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
                  style={{
                    width: `${expandedProgress}%`,
                    backgroundColor: phases[activePhase]?.color ?? "#4ade80",
                    transition: "background-color 0.3s ease",
                  }}
                />

                {/* Phase dots */}
                <div className="relative w-full flex justify-between">
                  {phases.map((phase, i) => {
                    const isActive = i <= activePhase;
                    return (
                      <div
                        key={phase.id}
                        data-phase-dot={i}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? phase.color : "white",
                            borderColor: isActive ? phase.color : "#d1d5db",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap shrink-0">Finished product</span>
            </div>

            {/* Step labels */}
            <div className="grid grid-cols-4 gap-6 mt-10">
              {phases.map((step) => (
                <div key={step.id} className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-zinc-950">{step.label}</h3>
                  <p className="text-xs leading-5 text-zinc-500">{step.subSections[0]?.description?.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Blocks with Detail Sections */}
        {phases.map((phase, i) => (
          <PhaseBlock key={phase.id} phase={phase} phaseIndex={i} />
        ))}
      </div>
    </>
  );
}