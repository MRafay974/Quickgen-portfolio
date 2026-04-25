"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Data ────────────────────────────────────────────────────────────────────

const servicesList = [
  { id: "01", label: "Design",        subtitle: "Crafting form through function, aesthetics, and usability.",  preview: "/images/service/1.png" },
  { id: "02", label: "Engineering",   subtitle: "Turning ideas into precise, manufacturable hardware solutions.", preview: "/images/service/2.png" },
  { id: "03", label: "Software",      subtitle: "Building seamless digital experiences from app to firmware.",   preview: "/images/service/3.png" },
  { id: "04", label: "Manufacturing", subtitle: "Taking products from prototype to production at scale.",          preview: "/images/service/4.png" },
];

const designSection = {
  image: "/images/service/1.png",
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
  image: "/images/service/2.png",
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
  image: "/images/service/3.png",
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
  image: "/images/service/4.png",
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
  id: string;
  image: string;
  title: string;
  tags: string[];
  description: string;
  caseStudies: { name: string; detail: string }[];
  bg: string;
  textColor: string;
}

function ServiceBlock({ id, image, title, tags, description, caseStudies, bg, textColor }: ServiceBlockProps) {
  const isLight = bg === "bg-white";
  const tagColor = isLight ? "text-zinc-950" : "text-white";
  const descColor = isLight ? "text-zinc-700" : "text-zinc-300";
  const caseHeaderColor = isLight ? "text-zinc-400" : "text-zinc-500";

  return (
    <section id={id} className={`${bg} ${textColor} w-full`}>
      {/* Hero image */}
      <div className="sb-image w-full px-6 lg:px-16 pt-10 pb-0">
        <div className="rounded-2xl overflow-hidden w-full">
          <img
            src={image}
            alt={title}
            className="w-full object-contain"
          />
        </div>
      </div>

      <div className="sb-content">
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
        <div className="px-6 lg:px-16 pt-4 pb-20">
          <p className={`text-base leading-7 max-w-4xl ${descColor}`}>{description}</p>
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-zinc-900/80 flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xs font-black tracking-wider">BRASH</span>
        </div>
      </div>
    </section>
  );
}

// ─── Cursor follower ─────────────────────────────────────────────────────────

function CursorFollower({ src, visible }: { src: string; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        if (ref.current) {
          ref.current.style.transform = `translate(${pos.current.x + 20}px, ${pos.current.y - 60}px)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-xl transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

const serviceIds = ["design", "engineering", "software", "manufacturing"];

export default function ServicesPageContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const listItems = gsap.utils.toArray<HTMLElement>(".service-list-item");
    const sbImages  = gsap.utils.toArray<HTMLElement>(".sb-image");
    const sbContents = gsap.utils.toArray<HTMLElement>(".sb-content");

    // Lock ALL initial states synchronously before first paint
    gsap.set(heroImgRef.current,  { opacity: 0, y: 60,  willChange: "transform, opacity" });
    gsap.set(introRef.current,    { opacity: 0, y: 60,  willChange: "transform, opacity" });
    gsap.set(listItems,           { opacity: 0, y: 30,  willChange: "transform, opacity" });
    gsap.set(sbImages,            { opacity: 0, y: 60,  willChange: "transform, opacity" });
    gsap.set(sbContents,          { opacity: 0, y: 50,  willChange: "transform, opacity" });

    const ctx = gsap.context(() => {

      // Hero image
      gsap.to(heroImgRef.current, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: heroImgRef.current, start: "top 85%", toggleActions: "play none none none", once: true },
      });

      // Intro section
      gsap.to(introRef.current, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: introRef.current, start: "top 85%", toggleActions: "play none none none", once: true },
      });

      // Service list items — single timeline on the list container
      const listTl = gsap.timeline({
        scrollTrigger: { trigger: listRef.current, start: "top 90%", toggleActions: "play none none none", once: true },
      });
      listTl.to(listItems, { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", stagger: 0.1 });

      // Service block images — each triggers on itself (different scroll positions)
      sbImages.forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none", once: true },
        });
      });

      // Service block text content
      sbContents.forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none", once: true },
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={mainRef} className="w-full font-sans bg-white text-zinc-950">

      {/* ── Hero ── */}
      <section className="px-6 lg:px-16 pt-12 pb-6">
        <h1 className="text-[clamp(2.5rem,9vw,5.5rem)] font-black leading-none tracking-tight">
          Services
        </h1>
        <p className="mt-3 text-base text-zinc-500">Take a peek behind the curtain.</p>
      </section>

      {/* ── Full-width hero image ── */}
      <div ref={heroImgRef} className="w-full px-0">
        <img
          src="/images/service/top.png"
          alt="Services hero"
          className="w-full object-contain"
        />
      </div>

      {/* ── "Whether you need..." intro + numbered list ── */}
      <section ref={introRef} className="px-6 lg:px-16 pt-16 pb-10 bg-white">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight max-w-2xl mb-12 text-center lg:text-left">
          Whether you need niche expertise or full development, we&apos;ve got you covered.
        </h2>

        <div ref={listRef} className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200">
          {servicesList.map((s, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={s.id}
                className="service-list-item flex items-center justify-between py-6 cursor-pointer md:cursor-none group"
                onClick={() => scrollToSection(serviceIds[i])}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-6">
                  <span
                    className="text-sm font-medium w-6 transition-colors duration-200"
                    style={{ color: isHovered ? "#e53e3e" : "#a1a1aa" }}
                  >
                    {s.id}
                  </span>
                  <span
                    className="text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200"
                    style={{ color: isHovered ? "#e53e3e" : "#09090b" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-sm text-zinc-500 transition-all duration-300 hidden lg:block"
                    style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? "translateX(0)" : "translateX(-8px)" }}
                  >
                    {s.subtitle}
                  </span>
                </div>
                <span
                  className="text-2xl transition-colors duration-200"
                  style={{ color: isHovered ? "#e53e3e" : "#71717a" }}
                >
                  →
                </span>
              </div>
            );
          })}
        </div>

        {/* Cursor-following circle images — desktop only */}
        <div className="hidden md:block">
          {servicesList.map((s, i) => (
            <CursorFollower key={s.id} src={s.preview} visible={hoveredIndex === i} />
          ))}
        </div>
      </section>

      {/* ── Service Sections ── */}
      <ServiceBlock id="design"         {...designSection} />
      <ServiceBlock id="engineering"    {...engineeringSection} />
      <ServiceBlock id="software"       {...softwareSection} />
      <ServiceBlock id="manufacturing"  {...manufacturingSection} />

      {/* ── What we do video ── */}
      {/* <WhatWeDoSection /> */}

    </main>
  );
}