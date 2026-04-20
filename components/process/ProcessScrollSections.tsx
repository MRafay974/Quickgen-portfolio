"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DiscoverCard,
  CreateCard1,
  CreateCard2,
  CreateCard3,
  RefineCard1,
  RefineCard2,
  LaunchCard1,
  LaunchCard2,
} from "./PhaseCards";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase {
  id: string;
  label: string;
  description: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const phases: Phase[] = [
  {
    id: "discover",
    label: "Discover",
    description: "Tailored research and background for your big ideas",
    color: "#4ade80",
  },
  {
    id: "create",
    label: "Create",
    description:
      "Validate design through a mix of models, renders and component testing.",
    color: "#fb923c",
  },
  {
    id: "refine",
    label: "Refine",
    description:
      "Finalize design for manufacturing, making minor adjustments to optimize cost, quality, and assembly.",
    color: "#60a5fa",
  },
  {
    id: "launch",
    label: "Launch",
    description:
      "Mass manufacturing and ongoing product updates, including potential future upgrades.",
    color: "#c084fc",
  },
];

const SWITCH_POINT = 0.22;
const BLEND_RANGE = 0.08;

interface SharedRoadmapProps {
  activePhase: number;
  progressPct: number;
}

function TimelineTrack({
  activePhase,
  progressPct,
  showEdgeLabels,
  includeTerminalPoint = false,
}: SharedRoadmapProps & {
  showEdgeLabels: boolean;
  includeTerminalPoint?: boolean;
}) {
  const terminalActive = activePhase >= phases.length - 1;

  return (
    <div className="flex items-center gap-5">
      {showEdgeLabels && (
        <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap shrink-0">
          Kickoff
        </span>
      )}

      <div className="relative flex items-center flex-1">
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 w-full" />

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
          style={{
            width: `${progressPct}%`,
            backgroundColor: phases[activePhase].color,
          }}
        />

        <div className="relative w-full flex justify-between">
          {phases.map((phase, i) => {
            const active = i <= activePhase;

            return (
              <div key={phase.id}>
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: active ? phase.color : "white",
                    borderColor: active ? phase.color : "#d1d5db",
                  }}
                />
              </div>
            );
          })}

          {includeTerminalPoint && (
            <div>
              <div
                className="w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: terminalActive
                    ? phases[phases.length - 1].color
                    : "white",
                  borderColor: terminalActive
                    ? phases[phases.length - 1].color
                    : "#d1d5db",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {showEdgeLabels && (
        <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap shrink-0">
          Finished product
        </span>
      )}
    </div>
  );
}

// ─── Expanded Roadmap Component ──────────────────────────────────────────────

function RoadmapExpanded({ activePhase, progressPct }: SharedRoadmapProps) {
  return (
    <div className="px-16 py-16">
      <div className="overflow-hidden" style={{ marginBottom: 16 }}>
        <p className="text-sm font-semibold text-zinc-400 mb-2">The roadmap</p>
        <h2 className="text-4xl lg:text-5xl font-black leading-tight text-zinc-950">
          Timelines that are <br /> tailored to you.
        </h2>
      </div>

      <div className="mt-40">
        <TimelineTrack
          activePhase={activePhase}
          progressPct={progressPct}
          showEdgeLabels={true}
        />
      </div>

      <div className="grid grid-cols-4 gap-6" style={{ paddingTop: 24, paddingBottom: 16 }}>
        {phases.map((phase) => (
          <div key={phase.id}>
            <h3 className="text-xl font-black text-zinc-950 mb-1.5">{phase.label}</h3>
            <p className="text-xs leading-relaxed text-zinc-500">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Collapsed Roadmap Component ─────────────────────────────────────────────

function RoadmapCollapsed({ activePhase, progressPct }: SharedRoadmapProps) {
  return (
    <div className="px-100 py-5 m-0">
      <TimelineTrack
        activePhase={activePhase}
        progressPct={progressPct}
        showEdgeLabels={false}
        includeTerminalPoint={true}
      />

      <div className="grid grid-cols-4 gap-6 mt-8">
        {phases.map((phase, i) => (
          <div key={phase.id}>
            <h3
              className="text-sm font-black"
              style={{ color: i <= activePhase ? phase.color : "#d1d5db" }}
            >
              {phase.label}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Phase Cards Map (2 cards per phase = 2 cards per fill segment) ─────────
//
// 5 dots / 4 segments:
//  Phase 0 (Discover) → segment 1: DiscoverCard + CreateCard1
//  Phase 1 (Create)   → segment 2: CreateCard2  + CreateCard3
//  Phase 2 (Refine)   → segment 3: RefineCard1  + RefineCard2
//  Phase 3 (Launch)   → segment 4: LaunchCard1  + LaunchCard2

const phaseCardContent: Record<number, React.ReactNode> = {
  0: (
    <div className="space-y-6 md:space-y-6">
      <DiscoverCard />
      <CreateCard1 />
    </div>
  ),
  1: (
    <div className="space-y-6 md:space-y-6">
      <CreateCard2 />
      <CreateCard3 />
    </div>
  ),
  2: (
    <div className="space-y-6 md:space-y-6">
      <RefineCard1 />
      <RefineCard2 />
    </div>
  ),
  3: (
    <div className="space-y-6 md:space-y-6">
      <LaunchCard1 />
      <LaunchCard2 />
    </div>
  ),
};

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ProcessScrollSections() {
  const [activePhase, setActivePhase] = useState(0);
  const [blendProgress, setBlendProgress] = useState(0);

  // Section 1 ref: drives the expand→collapse animation only
  const animSectionRef = useRef<HTMLDivElement>(null);
  // Section 2 ref: for scroll position
  const section2Ref = useRef<HTMLElement>(null);
  // Section 2 refs: one per phase, drives phase indicator via IntersectionObserver
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  // blendProgress reaches exactly 1 when collapse is complete
  const isCollapsed = blendProgress >= 1;
  // 5-dot track: each phase fills to its segment end-dot (25%, 50%, 75%, 100%)
  const collapsedStepPct = ((activePhase + 1) / phases.length) * 100;

  // ── Collapse animation (Section 1 only) ────────────────────────────────────
  useEffect(() => {
    const el = animSectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate(self) {
        const p = Math.max(0, Math.min(1, self.progress));
        const blendStart = SWITCH_POINT - BLEND_RANGE / 2;
        const blendEnd = SWITCH_POINT + BLEND_RANGE / 2;
        const next = Math.max(0, Math.min(1, (p - blendStart) / (blendEnd - blendStart)));
        setBlendProgress((prev) => (prev === next ? prev : next));
      },
    });

    return () => trigger.kill();
  }, []);

  // ── Phase tracking (Section 2: IntersectionObserver on each phase section) ─
  useEffect(() => {
    if (!isCollapsed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-phase-idx"));
            setActivePhase(idx);
          }
        });
      },
      // trigger when the phase section is at least 30% in the viewport center
      { threshold: 0.15, rootMargin: "-10% 0px -50% 0px" }
    );

    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isCollapsed]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — Shows expanded roadmap, 300vh drives the GSAP trigger
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={animSectionRef} className="w-full" style={{ display: isCollapsed ? "none" : "block" }}>
        <RoadmapExpanded activePhase={0} progressPct={0} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — Cards in normal document flow (only after collapse)
          Sticky roadmap header updates as user scrolls through phases.
      ══════════════════════════════════════════════════════════════════════ */}
      {isCollapsed && (
        <section ref={section2Ref} className="mt-70">
          {/* Sticky collapsed roadmap — stays at top while reading cards */}
          <div className="sticky top-0 z-40 bg-white/97 backdrop-blur-sm  border-zinc-100">
            <RoadmapCollapsed
              activePhase={activePhase}
              progressPct={collapsedStepPct}
            />
          </div>

          {/* One section per phase — IntersectionObserver updates activePhase */}
          {phases.map((phase, i) => (
            <div
              key={phase.id}
              ref={(el) => { phaseRefs.current[i] = el; }}
              data-phase-idx={i}
              className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24"
            >
              {phaseCardContent[i]}
            </div>
          ))}
        </section>
      )}
    </>
  );
}