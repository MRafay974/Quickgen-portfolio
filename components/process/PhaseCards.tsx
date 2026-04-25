"use client";

import Image from "next/image";
import ScrollRevealCard from "./ScrollRevealCard";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CardLayoutProps {
  bgColor: string;
  accentColor: string;
  imageSrc: string;
  title: React.ReactNode;
  bullets: string[];
  description: string;
  index: number;
  total: number;
}

// Each named card export accepts these so the parent (ProcessScrollSections)
// can pass the correct stack position.
interface CardProps {
  index: number;
  total: number;
}

// ─── Shared Layout ───────────────────────────────────────────────────────────

function CardLayout({
  bgColor,
  accentColor,
  imageSrc,
  title,
  bullets,
  description,
  index,
  total,
}: CardLayoutProps) {
  return (
    <ScrollRevealCard className="w-full" index={index} total={total}>
      <div
        className={`${bgColor} rounded-2xl px-6 py-6 md:px-10 md:py-7 flex flex-col items-center max-w-6xl mx-auto`}
      >
        <h3 className="text-lg md:text-xl lg:text-2xl font-black text-zinc-950 leading-tight text-center mb-4 max-w-xl">
          {title}
        </h3>

        <div className="relative w-full max-w-2xl aspect-[16/7] mb-4 overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-contain"
            sizes="(min-width: 768px) 672px, 100vw"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-0 mb-3">
          {bullets.map((item, i) => (
            <span key={item} className="flex items-center">
              <span className="text-sm font-bold text-zinc-800">{item}</span>
              {i < bullets.length - 1 && (
                <span className={`mx-2 md:mx-3 text-sm font-black ${accentColor}`}>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="text-sm text-zinc-600 leading-relaxed text-center max-w-xl">
          {description}
        </p>
      </div>
    </ScrollRevealCard>
  );
}

// ─── Individual card exports ──────────────────────────────────────────────────
// Every card receives `index` and `total` from its parent so it knows its
// position in the stack. These are no longer hardcoded inside the component.

export function DiscoverCard({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-emerald-50"
      accentColor="text-emerald-500"
      imageSrc="/images/process/1.png"
      title={
        <>
          Strong starts with{" "}
          <span className="text-emerald-500">research and exploration</span>
        </>
      }
      bullets={["Trends", "Market research", "Competitor analysis", "Patents"]}
      description="We begin with a consultation to define your vision, target customer, and key requirements, followed by research into market trends, patents, and emerging technologies. We then explore and present different concepts and/or wireframes to meet your unique needs."
    />
  );
}

export function CreateCard1({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-emerald-50"
      accentColor="text-emerald-500"
      imageSrc="/images/process/2.png"
      title={
        <>
          Grounded{" "}
          <span className="text-emerald-500">concept proposals</span>
        </>
      }
      bullets={["Design concepts", "Technology integrations", "Wireframes"]}
      description="After exploring the market, competition and customer landscape we work with you to propose a variety of concepts. From these we are able to choose what resonates best to move forward with development."
    />
  );
}

export function CreateCard2({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-orange-50"
      accentColor="text-orange-500"
      imageSrc="/images/process/3.png"
      title={
        <>
          Testing brilliance with{" "}
          <span className="text-orange-500">
            prototyping and proof of concept
          </span>
        </>
      }
      bullets={[
        "Component testing",
        "3D printing",
        "In-house mockups",
        "Initial renders",
      ]}
      description="Through a combination of rapid prototyping methods such as 3D printing and off-the-shelf sourced components, we iterate a large variety of low fidelity models. This allows us to quickly and cost effectively weed out what ideas won't work before moving on."
    />
  );
}

export function CreateCard3({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-orange-50"
      accentColor="text-orange-500"
      imageSrc="/images/process/4.png"
      title={
        <>
          Polished with{" "}
          <span className="text-orange-500">models, testing and renders</span>
        </>
      }
      bullets={[
        "High quality models/renders",
        "Low volume PCBs",
        "Product testing",
      ]}
      description="Once we have vetted a few preliminary concepts we create higher fidelity prototypes to test the fit, function, size and aesthetics of the design. By the end of this stage you will have a working, near production looking model and polished renders."
    />
  );
}

export function RefineCard1({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-blue-50"
      accentColor="text-blue-500"
      imageSrc="/images/process/5.png"
      title={
        <>
          Optimizing your{" "}
          <span className="text-blue-500">
            final design, certifications and patents
          </span>
        </>
      }
      bullets={[
        "CMS",
        "Final design tweaks",
        "Patent applications",
        "Industry certifications",
      ]}
      description="Before we go to manufacturing there is often one last round of tweaks and adjustments. This may include material, colour ways and finishes, small aesthetic changes, and hardware/software optimizing. At this phase we also assist in applying for any relevant patents and certifications."
    />
  );
}

export function RefineCard2({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-blue-50"
      accentColor="text-blue-500"
      imageSrc="/images/process/6.png"
      title={
        <>
          Precision{" "}
          <span className="text-blue-500">design for manufacturing (DFM)</span>
        </>
      }
      bullets={[
        "Cost optimization",
        "Assembly analysis",
        "Final PCB",
        "Code updates",
      ]}
      description="The final step refines the design and prepares it for manufacturing (DFM). Our design and engineering teams work together to consider additional costs such as assembly, software and PCB construction to find the best final outcome."
    />
  );
}

export function LaunchCard1({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-cyan-50"
      accentColor="text-cyan-500"
      imageSrc="/images/process/7.png"
      title={
        <>
          Cross the finish with{" "}
          <span className="text-cyan-500">sourcing and manufacturing</span>
        </>
      }
      bullets={[
        "Quotes",
        "Final samples/models",
        "Component sourcing",
        "Logistics",
      ]}
      description="We source and receive multiple quotes and samples from trusted, pre-vetted manufacturers, making adjustments until the product meets your requirements. After samples are approved, we then move to mass production."
    />
  );
}

export function LaunchCard2({ index, total }: CardProps) {
  return (
    <CardLayout
      index={index}
      total={total}
      bgColor="bg-cyan-50"
      accentColor="text-cyan-500"
      imageSrc="/images/process/8.png"
      title={
        <>
          Always here for{" "}
          <span className="text-cyan-500">ongoing support</span>
        </>
      }
      bullets={[
        "New technology integration",
        "Marketing material",
        "V2 Design",
      ]}
      description="Core development is complete, but we continue to provide ongoing support, including engineering and design services throughout the product's lifecycle. Additionally this V2 development may start once the initial product is on the market and creating cash flow."
    />
  );
}