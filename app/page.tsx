import { Featured } from "@/components/mainPage/Featured";
import { Process } from "@/components/mainPage/Process";
import { ProjectCards } from "@/components/mainPage/ProjectCards";
import { Testimonials } from "@/components/mainPage/Testimonials";
import { ImpactCarousel } from "@/components/mainPage/ImpactCarousel";
import { StatsSection } from "@/components/mainPage/StatsSection";
import { RecipeSection } from "@/components/common/RecipeSection";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar currentPage="Home" />

      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-[calc(100vh-100px)] px-6 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Design for Change<span className="text-red-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A collaborative team of passionate designers and engineers relentlessly delivering innovation.
          </p>
        </div>
      </main>

      {/* Featured Section */}
      <Featured />

      {/* Process Section */}
      <Process />

      {/* Project Cards Section */}
      <ProjectCards />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Impact Carousel Section */}
      <ImpactCarousel />

      {/* Stats Section */}
      <StatsSection />

      {/* Recipe Section */}
      <RecipeSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
