"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const servicesList = [
  { id: "01", label: "Design" },
  { id: "02", label: "Engineering" },
  { id: "03", label: "Software" },
  { id: "04", label: "Manufacturing" },
];

const designSection = {
  image: "https://placehold.co/1200x500/e5e7eb/6b7280?text=Design+Hero+Image",
  title: "Design",
  tags: ["Product design", "Branding", "UX/UI", "Design research", "Prototyping", "Modelling", "Packaging"],
  description:
    "We create impactful designs that blend creativity and strategy, from product design and branding to UI/UX and package design. Through research, prototyping, and modeling, we craft user-centered solutions that stand out and inspire.",
  caseStudies: [
    { name: "AtomicForm", detail: "Enclosure, UI and packaging design." },
    { name: "Veba Baby", detail: "Casing and full manufacturing package and assembly." },
    { name: "RCMP", detail: "Design research and development for respirator with religious headwear." },
    { name: "Otis Dental", detail: "Mobile app UI/UX for oral and self care exercises." },
  ],
  bg: "bg-black",
  textColor: "text-white",
  imageBg: "bg-black",
};

const engineeringSection = {
  image: "https://placehold.co/1200x500/1e3a8a/bfdbfe?text=Engineering+Hero+Image",
  title: "Engineering",
  tags: ["Mechanical Design and CAD", "PCB Design and Schematics", "Part Analysis and Testing", "Component Sourcing", "Certification"],
  description:
    "Our engineering expertise spans mechanical design, PCB development, and design for manufacturability (DFM) to create efficient, reliable solutions. We conduct thorough component research, analysis, and testing to ensure optimal performance and seamless integration for every project.",
  caseStudies: [
    { name: "Velavu", detail: "Custom enclosure and PCB development with wireless connectivity." },
    { name: "GaitTronics", detail: "Assisted mobility aid with advanced robotics and user-centered functionality." },
    { name: "BreatheSuite", detail: "Custom PCB and hardware algorithm development." },
    { name: "Handicare", detail: "Developing a fully patented haptic system for hospitals and clinics." },
  ],
  bg: "bg-white",
  textColor: "text-zinc-950",
  imageBg: "bg-white",
};

const softwareSection = {
  image: "https://placehold.co/1200x500/064e3b/6ee7b7?text=Software+Hero+Image",
  title: "Software",
  tags: ["Web Development", "Mobile Apps", "Embedded Firmware", "Cloud & IoT", "UI/UX Engineering"],
  description:
    "We build robust software systems from mobile applications and web platforms to embedded firmware and cloud infrastructure. Our team bridges hardware and software to deliver seamless, connected product experiences.",
  caseStudies: [
    { name: "BreatheSuite", detail: "iOS and Android app with real-time device connectivity." },
    { name: "Velavu", detail: "Cloud dashboard and mobile tracking application." },
    { name: "Otis Dental", detail: "Cross-platform mobile app with guided exercise flows." },
    { name: "AVSS", detail: "Embedded control system and companion mobile interface." },
  ],
  bg: "bg-black",
  textColor: "text-white",
  imageBg: "bg-black",
};

const manufacturingSection = {
  image: "https://placehold.co/1200x500/78350f/fde68a?text=Manufacturing+Hero+Image",
  title: "Manufacturing",
  tags: ["DFM Consulting", "Supplier Sourcing", "Injection Moulding", "PCBA", "Assembly & Fulfilment"],
  description:
    "We take products from design to production, managing supplier relationships, quality control, and logistics. Our manufacturing expertise ensures your product is built to spec, on time, and at scale.",
  caseStudies: [
    { name: "Veba Baby", detail: "Full manufacturing package including moulding and assembly." },
    { name: "AtomicForm", detail: "Production-ready enclosure and packaging assembly." },
    { name: "Handicare", detail: "Medical-grade manufacturing coordination and compliance." },
    { name: "GaitTronics", detail: "Prototype to pilot-run production management." },
  ],
  bg: "bg-white",
  textColor: "text-zinc-950",
  imageBg: "bg-white",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ServiceBlockProps {
  image: string;
  title: string;
  tags: string[];
  description: string;
  caseStudies: { name: string; detail: string }[];
  bg: string;
  textColor: string;
}

function ServiceBlock({ image, title, tags, description, caseStudies, bg, textColor }: ServiceBlockProps) {
  const isLight = bg === "bg-white";
  const tagColor = isLight ? "text-zinc-950" : "text-white";
  const descColor = isLight ? "text-zinc-700" : "text-zinc-300";
  const caseHeaderColor = isLight ? "text-zinc-400" : "text-zinc-500";
  const caseDetailColor = isLight ? "text-zinc-500" : "text-zinc-400";
  const dividerColor = isLight ? "border-zinc-200" : "border-zinc-800";
  const nameBold = isLight ? "text-zinc-950" : "text-white";

  return (
    <section className={`${bg} ${textColor} w-full`}>
      {/* Hero image */}
      <div className="w-full px-6 lg:px-16 pt-10 pb-0">
        <div className="rounded-2xl overflow-hidden w-full">
          <img
            src={image}
            alt={title}
            className="w-full object-cover"
            style={{ maxHeight: "480px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="px-6 lg:px-16 pt-8 pb-2">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight">{title}</h2>
      </div>

      {/* Tags row */}
      <div className="px-6 lg:px-16 pt-4 pb-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
        {tags.map((tag, i) => (
          <span key={tag} className={`text-sm font-bold ${tagColor}`}>
            {tag}
            {i < tags.length - 1 && (
              <span className={`mx-2 font-normal ${caseHeaderColor}`}>·</span>
            )}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="px-6 lg:px-16 pt-4 pb-4">
        <p className={`text-base leading-7 max-w-4xl ${descColor}`}>{description}</p>
      </div>

      {/* Case Studies */}
      <div className={`px-6 lg:px-16 pt-2 pb-16  `}>
        <p className={`text-xs font-semibold uppercase tracking-widest mt-6 mb-5 ${caseHeaderColor}`}>
          Case Studies
        </p>
        <div className="flex flex-col gap-3">
          {caseStudies.map((cs) => (
            <div key={cs.name} className="flex flex-wrap items-baseline gap-x-2">
              <span className={`text-base font-black ${nameBold}`}>{cs.name}</span>
              <span className={`text-sm ${caseDetailColor}`}>{cs.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── "What we do" video section ───────────────────────────────────────────────

function WhatWeDoSection() {
  return (
    <section className="bg-[#a8d5b5] w-full py-16 px-6 lg:px-16 flex flex-col items-center">
      <h2 className="text-3xl lg:text-4xl font-black text-[#1a3a3a] mb-10 text-center">
        What we do.
      </h2>
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-[#f5ede0] relative">
        <img
          src="https://placehold.co/900x500/f5ede0/a0836a?text=What+We+Do+Video+Thumbnail"
          alt="What we do video"
          className="w-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-zinc-900/80 flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* BRASH badge */}
        <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xs font-black tracking-wider">BRASH</span>
        </div>
      </div>
      
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ServicesPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="w-full font-sans bg-white text-zinc-950">

      {/* ── Hero ── */}
      <section className="px-6 lg:px-16 pt-12 pb-6">
        <h1 className="text-[clamp(3rem,9vw,5.5rem)] font-black leading-none tracking-tight">
          Services
        </h1>
        <p className="mt-3 text-base text-zinc-500">Take a peek behind the curtain.</p>
      </section>

      {/* ── Full-width hero image ── */}
      <div className="w-full px-0">
        <img
          src="https://placehold.co/1600x500/1a1a1a/888888?text=Services+Hero+%E2%80%93+Workshop+Photo"
          alt="Services hero"
          className="w-full object-cover"
          style={{ maxHeight: "480px" }}
        />
      </div>

      {/* ── "Whether you need..." intro + numbered list ── */}
      <section className="px-6 lg:px-16 pt-16 pb-10 bg-white">
        <h2 className="text-3xl lg:text-4xl font-black leading-tight max-w-2xl mb-12">
          Whether you need niche expertise or full development, we&apos;ve got you covered.
        </h2>

        <div className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200">
          {servicesList.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center justify-between py-6 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center gap-6">
                <span className="text-sm text-zinc-400 font-medium w-6">{s.id}</span>
                <span className="text-2xl lg:text-3xl font-bold text-zinc-950 group-hover:underline underline-offset-4">
                  {s.label}
                </span>
              </div>
              <span className="text-2xl text-zinc-500 group-hover:text-zinc-950 transition-colors">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Section ── */}
      <ServiceBlock {...designSection} />

      {/* ── Engineering Section ── */}
      <ServiceBlock {...engineeringSection} />

      {/* ── Software Section ── */}
      <ServiceBlock {...softwareSection} />

      {/* ── Manufacturing Section ── */}
      <ServiceBlock {...manufacturingSection} />

      {/* ── What we do video ── */}
      <WhatWeDoSection />

    </main>
  );
}