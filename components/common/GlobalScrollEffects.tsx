"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type GlobalScrollEffectsProps = {
  children: ReactNode;
};

export function GlobalScrollEffects({ children }: GlobalScrollEffectsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.7,
      smoothWheel: true,
      wheelMultiplier: 3.0,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateScroll = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    // Single delayed refresh — no MutationObserver which was triggering on every DOM change
    const timeoutId = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 300);

    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(timeoutId);
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return <>{children}</>;
}
