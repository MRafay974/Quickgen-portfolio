import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { RecipeSection } from "@/components/common/RecipeSection";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the Quickgen team. We'd love to hear about your project — from concept to production.",
  alternates: { canonical: "https://quickgentech.com/contact" },
  openGraph: {
    title: "Contact | Quickgen",
    description: "Get in touch with the Quickgen team. We'd love to hear about your project.",
    url: "https://quickgentech.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar currentPage="Contact" />
      <div ><ContactPageContent /></div>
      <div ><RecipeSection /></div>
      <div ><Footer activeLink="Contact" /></div>
    </div>
  );
}
