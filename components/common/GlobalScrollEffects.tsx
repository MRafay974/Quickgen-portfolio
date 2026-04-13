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

    const revealSelector = [
      "[data-animate='fade-up']",
      "main section",
      "main article",
      "main h1",
      "main h2",
      "main h3",
      "main p",
      "main li",
      "main img",
    ].join(",");

    const registerRevealAnimations = () => {
      const revealTargets = gsap.utils.toArray<HTMLElement>(revealSelector);

      revealTargets.forEach((item) => {
        if (item.dataset.gsapRevealInit === "true") return;
        if (item.dataset.animate === "none") return;

        item.dataset.gsapRevealInit = "true";

        gsap.fromTo(
          item,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    };

    const refreshScroll = () => {
      registerRevealAnimations();
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
      registerRevealAnimations();
    });

    return () => {
      ctx.revert();

      const revealTargets = document.querySelectorAll<HTMLElement>(revealSelector);
      revealTargets.forEach((item) => {
        delete item.dataset.gsapRevealInit;
      });

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
