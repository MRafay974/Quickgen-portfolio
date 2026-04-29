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
      ScrollTrigger.refresh(true);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    // Refresh shortly after mount so in-viewport elements animate correctly
    // on route change (page starts at top, triggers may already be in range).
    const timeoutId = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh(true);
    }, 200);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      // DO NOT call ScrollTrigger.getAll().kill() here.
      // Each component manages its own ScrollTriggers via ctx.revert().
      // Killing all triggers here races with new-page useLayoutEffects that
      // already created their triggers, leaving elements permanently at opacity:0.
    };
  }, [pathname]);

  return <>{children}</>;
}
