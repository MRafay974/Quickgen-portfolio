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
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateScroll = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    // Refresh after all resources (images, fonts) are loaded so ScrollTrigger
    // calculates trigger positions against the final page height, not a partial one.
    const onLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      // Already loaded (e.g. hard-refresh with cache) — run immediately
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    // Fallback: also refresh shortly after mount in case load already fired
    const timeoutId = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 500);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return <>{children}</>;
}
