"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  total?: number;
}

const STICKY_TOP_BASE = 100;
const STICKY_TOP_STEP = 10;

export default function ScrollRevealCard({
  children,
  className = "",
  index = 0,
  total = 1,
}: ScrollRevealCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (index < total - 1) {
        gsap.to(el, {
          scale: 0.8,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: `top top+=${STICKY_TOP_BASE + index * STICKY_TOP_STEP}px`,
            end: `+=${el.offsetHeight * 0.45}`,
            scrub: 1,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, total]);

  const stickyTop = STICKY_TOP_BASE + index * STICKY_TOP_STEP;

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: 20 + index,
        willChange: "transform",
        borderRadius: "1rem",
        marginBottom: "10rem",
      }}
    >
      {children}
    </div>
  );
}