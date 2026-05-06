"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  "Incredible experience. Sardar was fast, responsive, and the output was of extreme quality. Thank you.",
  "Very helpful and deeply insightful! Would definitely work with Sardar again.",
  "It has been a genuine pleasure working with Sardar on this project. His technical skill is superb, and his ability to pivot quickly when research or design takes a new direction is remarkable.",
  "QGT has been great in their timeliness and quality of work. Their engineers have the knowledge and experience to get the job done, whether it be mechanical, electrical, or both.",
  "Very easy to communicate with. Happy to start another project with him!",
  "We have been working together for years. His communication, punctuality, and quality of work is outstanding. I highly recommend him and will definitely hire again.",
  "Usairem is an expert on schematics. I had him prevetted from other American engineers and he completed the project with the boards functioning. If you need someone that has deep knowledge in this area, look no further.",
  "We really liked working with Usairem! He knows his stuff and gets things done fast. Incredible work! He went out of his way to get it working, even when we threw curveballs at him.",
  "Great company, great work, fast and speedy team. Will use again.",
  "I had the privilege of working with Usairem on Upwork to bring a product I had designed to life, and I cannot recommend them highly enough. From the very beginning, it was clear that Usairem is not only incredibly skilled as an engineer but also a true professional who genuinely cares about the success of the project.",
  "Very knowledgeable. Gave me valuable suggestions to improve the product he helped me design.",
  "Usairem has been super helpful bringing my project to life. Great communication and very adaptable to changes. I would recommend him for any project.",
  "Great guy. Good comms and easy to work with. Unfortunately my project was cut short but will work with Usairem again. Thanks!",
  "I recently hired Usairem to develop the PCB for a mini digital smart watch, and I couldn't be more impressed. From the start, he was professional, knowledgeable, and super responsive.",
  "Usairem have done really great work completing my project on very short time. I would highly recommend Usairem for any PCB design work. He is very responsive and very fluent in communication.",
  "Excellent work! We would do business again! Highly recommend!",
  "Here is a consummate professional. He always made himself available when I needed help, and was more than willing to provide guidance when needed. I would recommend him to anyone!",
  "Usairem was essential and incredibly helpful for our project. Communication was outstanding. I definitely recommend.",
  "Excellent work ethic and results. Usairem has been an excellent member of this project.",
  "Usairem is professional, hard working, and a joy to work with. He worked on our schedule and delivered exactly what we needed on time. We will work with him again.",
  "Usairem is a go getter as well as an excellent communicator and engineer. He went to great lengths to understand our product and became part of our globally distributed team.",
  "Usairem is a capable engineer who is able to quickly understand the requirements and deliver. I will work with Usairem again.",
  "Usairem completed another project successfully. He was able to research many options, consolidate the results and present them in a clear and concise manner. Will use Usairem again.",
  "Excellent communication skills, excellent understanding of project requirements, excellent technical skills, and happy to make sure the work is completed to time and quality. Highly recommended!",
  "Usairem is an incredibly passionate and talented electrical engineer. I highly recommend him!",
  "I took Usairem's help with fabricating a PCB board for my project. From the start he was very communicative — we had a video chat where I could explain what was needed. He put together the board, sourced the printing, and handled a modification immediately. He accommodated this work between his exams and I appreciate it very much.",
  "Very talented engineer. Worked towards the specifications to achieve the goals, and succeeded.",
  "I have hired Usairem multiple times, and he again was an excellent freelancer, dealing with the work quickly and enthusiastically. I look forward to working with him again.",
  "We just finished up a second round working together. The quality of the output was very high. Very responsive and very professional.",
  "Usairem delivered better than expected quality faster than expected. Wouldn't hesitate to work with him again.",
  "Usairem did excellent work. He responds very quickly and communicated very well.",
  "Very prompt communications. Very knowledgeable in electrical design and PCB. He made proper improvements to my original prototype design and helped me take it all the way to the printed version.",
  "Everything was fine according to expectations. Good work.",
  "Great work. Super cooperative and available any time of the day. Would definitely use your services again and highly recommend to others.",
  "Usairem has again been very dedicated to fulfilling all my detailed requirements for PCB part creation. His enthusiasm and energy make him a pleasure to work with.",
  "Very good specialist, nice person and it was a pleasure to work with him. I will definitely recommend him to others and will hire him again in the future.",
  "Usairem's quality of work and early deliverance of the project truly astounded me. The designs and simulations were extremely commendable. The project was completely free of errors and of the top-most quality. 10/10.",
  "Considering my lack of experience with electronics, Usairem was really patient when explaining what is possible and why. He was willing to redo the PCB design several times until it matched my requirements. He communicates well and is always quickly available.",
  "Usairem performed excellent work on time and for a reasonable price. He is very intelligent and very quick at PCB design and board layout. Fixed any issues immediately. Extremely responsive.",
  "Job completed faster than expected. Easy to work with.",
  "Usairem went above and beyond for this project. Consistent communication, patience, and persistence was at the forefront throughout the project — these were the cause of a successful outcome.",
  "Usairem reached out on his own accord when an electronics supplier was taking too long. He worked with me to get the PCB created elsewhere. We really feel as if Usairem and his team are on our side, looking out proactively to safeguard our success!",
  "Usairem was in time and proactive communicating. He simulated the schematics, checked them thoroughly, and really tried to understand the project goal. He was the best delivering, communicative, and available PCB designer we've hired until now.",
  "Thanks for all your hard work. Look forward to working again soon.",
  "Usairem has been the most available freelancer I have yet worked with. His work was thorough and filled in my team's need for EE work very competently.",
  "He is very knowledgeable in PCB design and got my project back on track. He was able to help me avoid some pitfalls which really helped me out.",
  "Usairem and his team were exceptionally responsive to my project, created quality work, and will be enjoying my continued support in future projects!",
  "From the first minute he has shown serious & excellent communication and technical skills. He is very flexible and I must admire his quality of getting over issues and proposing alternate solutions. What a young energetic professional he is.",
  "Performed as expected. We would use him again for other projects.",
  "Usairem worked hard to learn the skills required to complete this task, putting in many extra hours and remaining responsive to messages and feedback. I look forward to continuing to work with him.",
  "Fantastic job on board layouts. As clean as it could be. Absolutely need to hire again.",
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial black background on the section itself
    gsap.set(sectionRef.current, { backgroundColor: "#000000" });

    const ctx = gsap.context(() => {
      // Fast black → white transition: fires over a short scroll window at the
      // bottom of THIS section, so both Testimonials and ImpactCarousel flip together.
      gsap.to(sectionRef.current, {
        backgroundColor: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start when the bottom of the section is 20% above the viewport bottom
          start: "bottom 80%",
          // End when the bottom of the section exits the viewport — short window = fast flip
          end: "bottom 20%",
          scrub: 0.1,           // low scrub = near-instant response to scroll
          invalidateOnRefresh: true,
        },
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = [badgeRef.current, quoteRef.current, authorRef.current, buttonRef.current];
      gsap.set(targets, { opacity: 0, y: 35, willChange: "transform, opacity" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => { gsap.set(targets, { willChange: "auto" }); },
      });

      tl.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power1.out",
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setIsVisible(false);
    window.setTimeout(() => {
      setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
      setIsVisible(true);
    }, 300);
  };

  const handleNext = () => {
    setIsVisible(false);
    window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
      setIsVisible(true);
    }, 300);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
<div className="p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-start">
            <div className="space-y-8">

              {/* Badge */}
              <p
                ref={badgeRef}
                className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white"
              >
                Our clients say it better
              </p>

              {/* Quote */}
              <div ref={quoteRef} className="min-h-[16rem]">
                <div
                  className={`transition duration-300 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    &ldquo;{activeTestimonial}&rdquo;
                  </p>
                </div>
              </div>

              {/* Counter */}
              {/* <div ref={authorRef} className="mt-8 flex flex-col gap-1 text-left">
                <span className="text-sm font-medium text-zinc-500">
                  {activeIndex + 1} / {testimonials.length}
                </span>
              </div> */}
            </div>

            {/* Buttons */}
            <div ref={buttonRef} className="flex items-start justify-end gap-3">
              <button
                onClick={handlePrev}
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}