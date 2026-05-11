import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ServicesPageContent from "@/components/services/ServicesPageContent";

export const metadata = {
  title: "Services",
  description:
    "Quickgen offers end-to-end product services: hardware engineering, firmware development, PCB design, mobile app development, IoT solutions, and more.",
  alternates: { canonical: "https://quickgentech.com/services" },
  openGraph: {
    title: "Services | Quickgen",
    description: "End-to-end hardware, firmware, PCB, mobile, and IoT product services.",
    url: "https://quickgentech.com/services",
  },
};


export default function ServicesPage() {
  return (
    <div>
      <Navbar currentPage="Services" />
      <ServicesPageContent />
      <RecipeSection />
      <Footer activeLink="Services" />
    </div>
  );
}


