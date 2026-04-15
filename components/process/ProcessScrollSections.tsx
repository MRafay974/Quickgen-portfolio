"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <div className="px-100 py-8 m-0">
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

// ─── Main Export with Single Scroll Controller ──────────────────────────────

export default function ProcessScrollSections() {
  const [activePhase, setActivePhase] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const [blendProgress, setBlendProgress] = useState(0);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const collapsedStepPct = ((activePhase + 1) / phases.length) * 100;
  const collapsedProgressPct =
    blendProgress > 0 ? collapsedStepPct : progressPct;

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot) return;

    const trigger = ScrollTrigger.create({
      trigger: scrollRoot,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const p = Math.max(0, Math.min(1, self.progress));
        const blendStart = SWITCH_POINT - BLEND_RANGE / 2;
        const blendEnd = SWITCH_POINT + BLEND_RANGE / 2;
        const nextBlend = Math.max(
          0,
          Math.min(1, (p - blendStart) / (blendEnd - blendStart))
        );

        setBlendProgress((prev) => (prev === nextBlend ? prev : nextBlend));

        const phaseCount = phases.length;
        const phaseProgress =
          p <= SWITCH_POINT ? 0 : (p - SWITCH_POINT) / (1 - SWITCH_POINT);
        const rawIdx = phaseProgress * phaseCount;
        const nextActive = Math.max(
          0,
          Math.min(phaseCount - 1, Math.floor(rawIdx))
        );
        const nextPct =
          phaseCount > 1 ? (nextActive / (phaseCount - 1)) * 100 : 100;

        setActivePhase((prev) => (prev === nextActive ? prev : nextActive));
        setProgressPct((prev) => (prev === nextPct ? prev : nextPct));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={scrollRootRef} className="w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 z-40 bg-white/97 backdrop-blur-sm border-b border-zinc-100 m-0">
        <div className="relative">
          <div
            className="transition-opacity duration-300 ease-out"
            style={{
              opacity: 1 - blendProgress,
              transform: `translateY(${blendProgress * 8}px)`,
            }}
          >
            <RoadmapExpanded activePhase={activePhase} progressPct={progressPct} />
          </div>

          <div
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: blendProgress,
              transform: `translateY(${(1 - blendProgress) * -8}px)`,
              pointerEvents: blendProgress > 0.5 ? "auto" : "none",
            }}
          >
            <RoadmapCollapsed
              activePhase={activePhase}
              progressPct={collapsedProgressPct}
            />
          </div>
        </div>
      </div>

      <div style={{ height: "400vh" }} />
    </div>
  );
}