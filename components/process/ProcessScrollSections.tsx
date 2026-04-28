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
    color: "#06b6d4",
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

      <div
        className="grid grid-cols-4 "
        style={{ paddingTop: 24, paddingBottom: 16 }}
      >
        {phases.map((phase) => (
          <div key={phase.id}>
            <h3 className="text-xl font-black text-zinc-950 mb-1.5">
              {phase.label}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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

// ─── Phase card content ───────────────────────────────────────────────────────
//
// CRITICAL: Cards must be DIRECT siblings with NO wrapper div between them
// and the scroll container. `position: sticky` is relative to the nearest
// scrolling ancestor — any intervening block (like a `space-y` div) breaks
// the stacking because sticky elements inside that wrapper stack relative to
// the wrapper, not the viewport.
//
// Wrong ✗:  <div className="space-y-6"><Card0 /><Card1 /></div>
// Right ✓:  <><Card0 /><Card1 /></>   (React fragment, no DOM node)
//
// Each card also needs the correct index/total so ScrollRevealCard knows:
//   - which sticky `top` offset to use  (index 0 → 100px, index 1 → 120px)
//   - which z-index to use             (index 0 → z-20,  index 1 → z-21)
//   - whether to apply the scale-down  (only index < total-1)

// Continuous indices 0-7 across all 8 cards, total=8.
// This ensures EVERY card except the very last gets the shrink-down effect
// (condition: index < total - 1). With total=2 per pair, index=1 never shrank.
const phaseCardContent: Record<number, React.ReactNode> = {
  0: (
    <>
      <DiscoverCard index={0} total={8} />
      <CreateCard1 index={1} total={8} />
    </>
  ),
  1: (
    <>
      <CreateCard2 index={2} total={8} />
      <CreateCard3 index={3} total={8} />
    </>
  ),
  2: (
    <>
      <RefineCard1 index={4} total={8} />
      <RefineCard2 index={5} total={8} />
    </>
  ),
  3: (
    <>
      <LaunchCard1 index={6} total={8} />
      <LaunchCard2 index={7} total={8} />
    </>
  ),
};

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ProcessScrollSections() {
  const [activePhase, setActivePhase] = useState(0);
  const [blendProgress, setBlendProgress] = useState(0);

  const animSectionRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isCollapsed = blendProgress >= 1;
  const collapsedStepPct = ((activePhase + 1) / phases.length) * 100;

  // ── Collapse animation ────────────────────────────────────────────────────
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
        const next = Math.max(
          0,
          Math.min(1, (p - blendStart) / (blendEnd - blendStart))
        );
        setBlendProgress((prev) => (prev === next ? prev : next));
      },
    });

    return () => trigger.kill();
  }, []);

  // ── Phase tracking via IntersectionObserver ───────────────────────────────
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
          MOBILE LAYOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden w-full px-6 py-12">
        <p className="text-sm font-semibold text-zinc-400 mb-2">The roadmap</p>
        <h2 className="text-3xl font-black leading-tight text-zinc-950 mb-10">
          Timelines that are <br /> tailored to you.
        </h2>

        <div className="relative mb-14 pl-6">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-200" />
          {phases.map((phase) => (
            <div key={phase.id} className="relative mb-8 last:mb-0">
              <div
                className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2 z-10"
                style={{ backgroundColor: "black", borderColor: "black" }}
              />
              <h3 className="text-base font-black text-zinc-950">{phase.label}</h3>
              <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {phases.map((phase, i) => (
          <div key={phase.id} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: phase.color }}
              />
              <h3 className="text-xl font-black text-zinc-950">{phase.label}</h3>
            </div>
            <div>{phaseCardContent[i]}</div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Section 1 — expanded roadmap, drives collapse trigger */}
        <div
          ref={animSectionRef}
          className="w-full"
          style={{ display: isCollapsed ? "none" : "block" }}
        >
          <RoadmapExpanded activePhase={0} progressPct={0} />
        </div>

        {/* Section 2 — sticky roadmap header + stacking phase cards */}
        {isCollapsed && (
          <section ref={section2Ref} className="mt-70">
            {/* Sticky collapsed roadmap */}
            <div className="sticky top-0 z-40 bg-white/97 backdrop-blur-sm border-zinc-100">
              <RoadmapCollapsed
                activePhase={activePhase}
                progressPct={collapsedStepPct}
              />
            </div>

            {/* Phase sections — each is a stacking pair of cards */}
            {phases.map((phase, i) => (
              <div
                key={phase.id}
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                data-phase-idx={i}
                className="w-full"
                style={{
                  paddingTop: "4rem",
                  paddingBottom: "8vh",
                }}
              >
                {phaseCardContent[i]}
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}