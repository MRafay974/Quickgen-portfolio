"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollRevealCard({
  children,
  className = "",
}: ScrollRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`scroll-reveal-card ${className}`}
      style={{
        opacity: 0,
        transform: "translateY(48px)",
        transition:
          "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .scroll-reveal-card {
            transition:
              opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            transform: translateY(24px) !important;
          }
          
          .scroll-reveal-card.reveal-active {
            transform: translateY(0) !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}

// Add reveal-active styles globally
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .scroll-reveal-card.reveal-active {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  if (!document.head.querySelector("style[data-scroll-reveal]")) {
    style.setAttribute("data-scroll-reveal", "true");
    document.head.appendChild(style);
  }
}
