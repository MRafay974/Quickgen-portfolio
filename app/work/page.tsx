"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import { workCards, CATEGORY_DISPLAY_NAMES } from "@/constants/work/workCards";

// ── Filter taxonomy ──────────────────────────────────────────────────────────
type MainFilter = "All" | "Software" | "Hardware";
const MAIN_FILTERS: MainFilter[] = ["All", "Software", "Hardware"];

type SubCategory = { id: string; label: string; categories: string[] };

const SOFTWARE_SUBS: SubCategory[] = [
  { id: "web", label: "Web", categories: ["web"] },
  { id: "mobile", label: "Mobile", categories: ["mobile"] },
];

const HARDWARE_SUBS: SubCategory[] = [
  { id: "health_tech_wearables", label: "Health Tech and Wearables", categories: ["health_tech_wearables"] },
  { id: "iot_smart_devices", label: "IoT, Smart Devices and Electronics", categories: ["iot_smart_devices"] },
  { id: "battery_systems", label: "Battery Systems", categories: ["ev_battery_power"] },
  { id: "pcb_design", label: "PCB Design and Control Systems", categories: ["pcb_reverse_eng"] },
  { id: "robotics", label: "Robotics, Drones and Autonomous Systems", categories: ["robotics_drones"] },
];

const ALL_SUBS: SubCategory[] = [...SOFTWARE_SUBS, ...HARDWARE_SUBS];
const SOFTWARE_CATEGORIES = ["web", "mobile"];
const HARDWARE_CATEGORIES = [
  "health_tech_wearables",
  "iot_smart_devices",
  "ev_battery_power",
  "pcb_reverse_eng",
  "robotics_drones",
];

function getSubsForMainFilter(main: MainFilter): SubCategory[] {
  if (main === "Software") return SOFTWARE_SUBS;
  if (main === "Hardware") return HARDWARE_SUBS;
  return ALL_SUBS;
}

function formatCategoryLabel(category: string) {
  return (
    CATEGORY_DISPLAY_NAMES[category] ??
    category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

const PAGE_SIZE = 6;

export default function WorkPage() {
  const [activeMainFilter, setActiveMainFilter] = useState<MainFilter>("All");
  const [activeSubFilter, setActiveSubFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ── Close dropdown on outside click / resize ─────────────────────────────
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const panel = document.getElementById("work-sub-dropdown");
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        (!panel || !panel.contains(e.target as Node))
      ) {
        setDropdownOpen(false);
      }
    }
    function handleResize() { setDropdownOpen(false); }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── Hero + filter bar: animate once on mount ──────────────────────────────
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial states immediately (before paint) so there's no flash
    gsap.set([headingRef.current, descRef.current], {
      opacity: 0,
      y: 50,
      willChange: "transform, opacity",
    });

    const filterBtns = filterBarRef.current
      ? Array.from(filterBarRef.current.children)
      : [];
    gsap.set(filterBtns, { opacity: 0, y: 16, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.85 })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.75 }, "-=0.55")
        .to(
          filterBtns,
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          "-=0.45"
        );
    });

    return () => ctx.revert();
  }, []);

  // ── Cards: scroll-triggered reveal for newly rendered cards ──────────────
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const allCards = gsap.utils.toArray<HTMLElement>(".work-card");
    const newCards = allCards.filter(
      (el) => !el.hasAttribute("data-gsap-animated")
    );
    if (newCards.length === 0) return;

    // Mark & hide before any paint so there's no jitter
    newCards.forEach((card) => {
      card.setAttribute("data-gsap-animated", "true");
      // Set invisible immediately — CSS handles the initial hidden state,
      // but we also force it here as a safety net.
      gsap.set(card, { opacity: 0, y: 48, willChange: "transform, opacity" });
    });

    const triggers: ScrollTrigger[] = [];

    newCards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 90%", // fire when card top crosses 90% of viewport height
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            // small stagger offset based on column position within a batch
            delay: (i % 2) * 0.08,
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [activeMainFilter, activeSubFilter, visibleCount]);

  // ── Computed filtered cards ───────────────────────────────────────────────
  const filteredCards = (() => {
    // Sub filter active → filter to its categories, then dedup within that set
    if (activeSubFilter) {
      const sub = ALL_SUBS.find((s) => s.id === activeSubFilter);
      if (sub) {
        const byCategory = workCards.filter((c) => sub.categories.includes(c.category));
        const seen = new Set<string>();
        return byCategory.filter((c) => {
          if (seen.has(c.title)) return false;
          seen.add(c.title);
          return true;
        });
      }
    }

    // No sub filter → dedup all, then apply main filter
    const reversed = [...workCards].reverse();
    const seen = new Set<string>();
    const deduped = reversed.filter((c) => {
      if (seen.has(c.title)) return false;
      seen.add(c.title);
      return true;
    });

    if (activeMainFilter === "Software") {
      return deduped.filter((c) => SOFTWARE_CATEGORIES.includes(c.category));
    }
    if (activeMainFilter === "Hardware") {
      return deduped.filter((c) => HARDWARE_CATEGORIES.includes(c.category));
    }
    return deduped;
  })();

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;

  const currentSubs = getSubsForMainFilter(activeMainFilter);
  const activeSubLabel = currentSubs.find((s) => s.id === activeSubFilter)?.label;
  const dropdownLabel =
    activeSubLabel ??
    (activeMainFilter === "Software"
      ? "All Software"
      : activeMainFilter === "Hardware"
      ? "All Hardware"
      : "All Categories");

  function handleMainFilterChange(filter: MainFilter) {
    setActiveMainFilter(filter);
    setActiveSubFilter("");
    setDropdownOpen(false);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSubFilterChange(subId: string) {
    setActiveSubFilter((prev) => (prev === subId ? "" : subId));
    setDropdownOpen(false);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      {/*
        Global style: cards start invisible via CSS so the very first paint
        never shows a visible card that then flashes to invisible.
        GSAP will override opacity/transform once it runs.
      */}
      <style>{`
        .work-card {
          opacity: 0;
          transform: translateY(48px);
        }
      `}</style>

      <Navbar currentPage="Work" />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
        <section data-animate="fade-up" className="border-b border-zinc-200 pb-10">
          <div className="mb-8 max-w-3xl">
            <h1
              ref={headingRef}
              className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
            >
              Work
            </h1>
            <p
              ref={descRef}
              className="mt-4 max-w-2xl text-base sm:text-xl leading-8 text-zinc-600"
            >
              We love what we do, and it shows.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {/* ── Main filter tabs ── */}
            <div
              ref={filterBarRef}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              {MAIN_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleMainFilterChange(filter)}
                  className={
                    activeMainFilter === filter
                      ? "rounded-full bg-zinc-950 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white"
                      : "rounded-full border border-zinc-200 bg-white px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
                  }
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* ── Subcategory dropdown (right side) ── */}
            <div ref={dropdownRef} className="relative self-start sm:self-auto">
              <button
                ref={triggerRef}
                onClick={() => {
                  if (!dropdownOpen && triggerRef.current) {
                    setDropdownRect(triggerRef.current.getBoundingClientRect());
                  }
                  setDropdownOpen((o) => !o);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium transition ${
                  activeSubFilter
                    ? "bg-zinc-950 text-white"
                    : "border border-zinc-200 bg-white text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <span>{dropdownLabel}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && dropdownRect &&
                createPortal(
                  <div
                    id="work-sub-dropdown"
                    style={{
                      position: "fixed",
                      top: dropdownRect.bottom + 8,
                      right: window.innerWidth - dropdownRect.right,
                      zIndex: 9999,
                    }}
                    className="min-w-60 rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-xl"
                  >
                    {currentSubs.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubFilterChange(sub.id)}
                        className={`block w-full px-4 py-2 text-left text-sm transition ${
                          activeSubFilter === sub.id
                            ? "bg-zinc-950 text-white"
                            : "text-zinc-700 hover:bg-zinc-50"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
            </div>
          </div>
        </section>

        <section data-animate="fade-up" className="mt-12">
          {visibleCards.length === 0 ? (
            <p className="py-16 text-center text-zinc-500">No projects found.</p>
          ) : (
            <>
              {/* ── Mobile: 2-column masonry ── */}
              <div className="columns-2 gap-3 sm:hidden">
                {visibleCards.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="work-card group mb-3 block break-inside-avoid cursor-pointer"
                  >
                    <article className="rounded-2xl bg-zinc-100 overflow-hidden">
                      <div className="relative">
                        {project.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.image}
                            alt={project.title}
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-36 border border-dashed border-zinc-300">
                            <span className="text-xs uppercase tracking-widest text-zinc-500">
                              Placeholder
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <h2 className="text-sm font-bold text-white leading-tight">
                            {project.title}
                          </h2>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* ── Desktop: masonry grid ── */}
              <div className="hidden sm:block">
                <div className="columns-2 gap-6">
                  {visibleCards.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/work/${project.slug}`}
                      className="work-card group mb-6 block break-inside-avoid cursor-pointer"
                    >
                      <article className="rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:shadow-lg overflow-hidden">
                        <div className="relative">
                          {project.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.image}
                              alt={project.title}
                              style={{ width: "100%", height: "auto", display: "block" }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-48 border border-dashed border-zinc-300">
                              <span className="text-sm uppercase tracking-widest text-zinc-500">
                                Image placeholder
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white">
                              {project.title}
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-white/80">
                              {formatCategoryLabel(project.category)}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <div >
        <RecipeSection />
      </div>
      <div >
        <Footer activeLink="Work" />
      </div>
    </div>
  );
}