"use client";

import Image from "next/image";
import Link from "next/link";
import { workCards, CATEGORY_DISPLAY_NAMES } from "@/constants/work/workCards";

const FEATURED_PROJECT_SPECS = [
  { slug: "motion_track", previewImage: "/images/landingPage/motion_trackk.png", background: "#1A1A1A", hoverBackground: "#3a3a3a" },
  { slug: "provectus_breath", previewImage: "/images/landingPage/usb1.png", background: "#1C1C1E", hoverBackground: null },
  { slug: "iphone_case_lumevue", previewImage: "/images/landingPage/iphone_case.png", background: "#F5F0E8", hoverBackground: null },
] as const;

const FEATURED_PROJECTS = FEATURED_PROJECT_SPECS.map((spec) => {
  const project = workCards.find((item) => item.slug === spec.slug);
  if (!project) return null;
  return { ...project, previewImage: spec.previewImage, background: spec.background, hoverBackground: spec.hoverBackground };
}).filter((project): project is NonNullable<typeof project> => Boolean(project));

function formatCategoryLabel(category: string) {
  return CATEGORY_DISPLAY_NAMES[category] ?? category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ProjectCards() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="space-y-12">
          <div className="grid gap-3 md:grid-cols-3">
            {FEATURED_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block overflow-hidden rounded-4xl"
                style={{ backgroundColor: project.background }}
              >
                <div
                  className="relative h-80 overflow-hidden rounded-4xl md:h-120 transition-colors duration-500"
                  style={
                    project.hoverBackground
                      ? { ['--hover-bg' as string]: project.hoverBackground }
                      : undefined
                  }
                >
                  {/* Background color transition for card 1 */}
                  {project.hoverBackground && (
                    <div
                      className="absolute inset-0 rounded-4xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundColor: project.hoverBackground }}
                    />
                  )}

                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain object-center p-6 transition-[filter,transform] duration-500 ease-out group-hover:grayscale group-hover:scale-[1.01] "
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/55" />

                 
                  {/* Arrow button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[#ff4646] text-white shadow-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        className="h-9 w-9"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12m0 0-5-5m5 5-5 5" />
                      </svg>
                    </span>
                  </div>

                  {/* Title + category */}
                  <div className="absolute bottom-7 left-7 right-7 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-bold leading-none text-white">{project.title}</h3>
                    <p className="mt-3 text-xl font-semibold text-zinc-100/95">
                      {formatCategoryLabel(project.category)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="self-start">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                We make sure our projects pack a punch.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-zinc-400">
                Our team is structured to deliver top-tier expertise without the barriers of a large agency. You work directly with seasoned designers, engineers, and researchers who stay involved from kickoff to launch.
              </p>
              <Link
                href="/work"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-10 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                View all work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}