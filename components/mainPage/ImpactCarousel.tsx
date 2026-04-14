"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { useRef } from "react";

import "swiper/css";

const slides = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
}));

export function ImpactCarousel() {
    const swiperRef = useRef<SwiperInstance | null>(null);
  
  return (
    <section className="bg-white text-black">
      <div className="   py-24 ">
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
          {[...slides, ...slides].map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`} style={{ width: "40%" }}>
              <div className="flex-shrink-0 rounded-[2rem] bg-white">
                <div className="h-110 rounded-[1rem] bg-zinc-200" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:items-start">
          <div className="flex items-start">
            <span className="ml-10 text-sm font-bold uppercase tracking-[0.35em] text-[#ff1d1d]">
              The Brash Impact
            </span>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
              We are the Goldilocks team for real collaboration.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600">
              Our team is structured to deliver top-tier expertise without the
              barriers of a large agency. You work directly with seasoned
              designers, engineers, and researchers who stay involved from
              kickoff to launch. The result is a focused, professional
              partnership, responsive, efficient, and strategically aligned, at
              a cost that keeps innovation within reach.
            </p>
            <button className="inline-flex rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition hover:bg-zinc-900">
              View services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}