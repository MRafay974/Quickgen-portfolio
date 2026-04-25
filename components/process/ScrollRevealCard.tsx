"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
  /** 0-based index of this card in the stack */
  index?: number;
  /** Total number of cards in the stack */
  total?: number;
}

// Card 0 sticks near the top of the viewport.
// Card 1 starts further DOWN the viewport so it scrolls UP and covers card 0.
//
// Mental model:
//   - lower `top`  → sticks higher → stays visible UNDERNEATH (bottom of stack)
//   - higher `top` → arrives later from below → ends up ON TOP
//
// Card 0 → top: 100px  (sticks early, becomes the base of the stack)
// Card 1 → top: 120px  (sticks later, slides in from below, lands on top)
const STICKY_TOP_BASE = 100;
const STICKY_TOP_STEP = 20;

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
      // Only the card(s) beneath get scaled down as the next card covers them
      if (index < total - 1) {
        gsap.to(el, {
          scale: 0.95,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: `top top+=${STICKY_TOP_BASE + index * STICKY_TOP_STEP}px`,
            end: `+=${el.offsetHeight * 0.7}`,
            scrub: 0.6,
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
      className={`card ${className}`}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        // CRITICAL: higher index = higher z-index = visually on top
        zIndex: 20 + index,
        willChange: "transform",
        boxShadow: `0 ${8 + index * 6}px ${24 + index * 12}px rgba(0,0,0,${0.07 + index * 0.04})`,
        borderRadius: "1rem",
      }}
    >
      {children}
    </div>
  );
}