"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type GlobalScrollEffectsProps = {
  children: ReactNode;
};

export function GlobalScrollEffects({ children }: GlobalScrollEffectsProps) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

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

    const refreshScroll = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(refreshScroll);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);

    requestAnimationFrame(refreshScroll);
    const timeoutId = window.setTimeout(refreshScroll, 250);

    const ctx = gsap.context(() => {
      const animatedItems = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']");

      animatedItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", refreshScroll);
      window.removeEventListener("resize", refreshScroll);
      mutationObserver.disconnect();
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
