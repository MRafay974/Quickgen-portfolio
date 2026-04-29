"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";

const slides = [
  { id: 1, src: "/images/landingPage/slider_1.png", alt: "Slide 1" },
  { id: 2, src: "/images/landingPage/slider_2.png", alt: "Slide 2" },
  { id: 3, src: "/images/landingPage/slider_3.png", alt: "Slide 3" },
  { id: 4, src: "/images/landingPage/slider_4.png", alt: "Slide 4" },
];

export function ImpactCarousel() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white text-black">
      <div className="py-24">
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
  // grabCursor={true}
  className="hero-swiper h-full! w-full!"
  style={{ paddingLeft: "16px" }}
>
          {[...slides, ...slides].map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`} className="!w-[80%] sm:!w-[55%] lg:!w-[40%]">
              <div className="flex-shrink-0 rounded-[2rem] bg-white group overflow-hidden cursor-default">
                <div className="h-64 sm:h-80 lg:h-110 rounded-[1rem] overflow-hidden relative">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-all duration-500 grayscale-0 group-hover:grayscale"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={textRef} className="mt-16 px-4 sm:px-6 lg:px-10 grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:items-start">
          <div className="flex items-start">
            <span className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff1d1d]">
              The QuickGen Difference
            </span>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
The complete team.
Without the layers.            </h2>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600">
              Our team is structured to deliver top-tier expertise without the
              barriers of a large agency. You work directly with seasoned
              designers, engineers, and researchers who stay involved from
              kickoff to launch. The result is a focused, professional
              partnership, responsive, efficient, and strategically aligned, at
              a cost that keeps innovation within reach.
            </p>
           <Link
  href="/services"
  className="rounded px-6 py-2 text-sm font-semibold text-white bg-[#C0392B] transition hover:bg-[#a93226] inline-flex items-center gap-2"
>
  Explore Services <span>→</span>
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}