import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse Quickgen's portfolio of hardware, firmware, PCB, mobile, IoT, and wearable projects delivered for clients across 15+ countries.",
  alternates: { canonical: "https://quickgentech.com/work" },
  openGraph: {
    title: "Our Work | Quickgen",
    description:
      "Hardware, firmware, PCB, mobile, IoT and wearable projects delivered globally.",
    url: "https://quickgentech.com/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
