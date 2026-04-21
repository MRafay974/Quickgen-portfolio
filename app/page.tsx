"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import Link from "next/link";
import "swiper/css";

import { Featured } from "@/components/mainPage/Featured";
import { Process } from "@/components/mainPage/Process";
import { ProjectCards } from "@/components/mainPage/ProjectCards";
import { MoreWork } from "@/components/mainPage/MoreWork"
import { Testimonials } from "@/components/mainPage/Testimonials";
import { ImpactCarousel } from "@/components/mainPage/ImpactCarousel";
import { StatsSection } from "@/components/mainPage/StatsSection";
import { RecipeSection } from "@/components/common/RecipeSection";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

// ─── Card data ────────────────────────────────────────────────────────────────
// Drop your image paths into `imageSrc` when ready.
const CARDS = [
  { bg: "#FF3B3B", imageSrc: "/images/landingPage/usb.png" },   // bright red
  { bg: "#FF8C00", imageSrc: "/images/landingPage/glasses.png" },   // vivid orange
  { bg: "#FFD600", imageSrc: "/images/landingPage/drone.png" },   // bright yellow
  { bg: "#FFFFF0", imageSrc: "/images/landingPage/pulse.png" },   // neon green
  { bg: "#2979FF", imageSrc: "/images/landingPage/box.png" },   // bright blue
];

export default function Home() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar currentPage="Home" />

      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden">

        {/* ── Swiper carousel ── */}
        <div
          className="absolute inset-0 z-0"
        >
          
         <Swiper
  modules={[Autoplay]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  slidesPerView="auto"
  spaceBetween={16}
  loop={true}
  freeMode={true}
  centeredSlides={false}
  allowTouchMove={true}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
  speed={10000}
  grabCursor={true}
  className="hero-swiper h-full! w-full!"
  style={{ paddingLeft: "16px" }}
>
            {[...CARDS, ...CARDS, ...CARDS].map((card, i) => (
              <SwiperSlide key={i} style={{ width: 420 }} className="h-full!">
                <div className="relative w-full h-full flex items-center py-10">
                  <div
                    className="relative w-full overflow-hidden carousel-card"
                    style={{
                      height: 400,
                      backgroundColor: card.bg,
                      borderRadius: "1.75rem",
                      transition: "border-radius 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {card.imageSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.imageSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain object-center p-4"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Scrim ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.42)" }}
        />

        {/* ── Heading — centred vertically ── */}
        <div className="relative z-20 w-full flex flex-col items-center text-center px-4 select-none">
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            Build for Real
<span className="text-red-500">.</span>
          </h1>
          <Link
  href="/contact"
  className="mt-3 rounded px-8 py-4 text-m font-semibold text-white bg-[#C0392B] transition hover:bg-[#a93226] inline-flex items-center gap-2"
>
  Book Your Free Discovery Call →
</Link>
        </div>

        {/* ── Subtitle — pinned to bottom ── */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6 pointer-events-none">
          <p className="text-lg md:text-xl text-zinc-400  text-center max-w-xl font-bold leading-tight">
           We turn what exists
in your mind into what
exists in the market.
          </p>
        </div>

        {/* Hover border-radius style */}
        <style>{`
          .carousel-card:hover {
            border-radius: 3rem !important;
          }

          .hero-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
      </section>

      {/* ── Rest of page ── */}
      <Featured />
      <Process />
      <ProjectCards />
      <Testimonials />
      <ImpactCarousel />
            <MoreWork />
      <StatsSection />
      <RecipeSection />
      <Footer />
    </div>
  );
}