"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch-primary devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    dot.style.opacity = "0";

    const xSetter = gsap.quickSetter(dot, "x", "px");
    const ySetter = gsap.quickSetter(dot, "y", "px");

    const onMove = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
      if (dot.style.opacity === "0") dot.style.opacity = "1";
    };

    const onLeave = () => gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.in" });
    const onEnter = () => gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#C0392B",
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        opacity: 0,
      }}
    />
  );
}
