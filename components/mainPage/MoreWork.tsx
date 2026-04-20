"use client";

import Link from "next/link";
import Image from "next/image";
import { workCards } from "@/constants/work/workCards";

const FEATURED_SPECS = [
  { slug: "pulse_eda",         displayCategory: "HEALTH TECH", image: "/images/landingPage/pulse.png" },
  { slug: "osmart_bms",        displayCategory: "EV & POWER",  image: "/images/landingPage/bms.png" },
  { slug: "ai_pendant",        displayCategory: "WEARABLE",    image: "/images/landingPage/box.png" },
  { slug: "radar_reverse_eng", displayCategory: "DEFENCE",     image: "/images/landingPage/vintage_pcb.png" },
];

export function MoreWork() {
  const projects = FEATURED_SPECS.map((spec) => {
    const card = workCards.find((w) => w.slug === spec.slug);
    return card ? { ...card, displayCategory: spec.displayCategory, image: spec.image } : null;
  }).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              {/* Image area */}
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-zinc-200">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Category + title */}
              <div className="mt-4 space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff1d1d]">
                  {project.displayCategory}
                </p>
                <h3 className="text-base font-bold leading-snug text-black group-hover:text-zinc-600 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="text-sm font-semibold text-black transition-colors duration-200 hover:text-zinc-500"
          >
            View All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
