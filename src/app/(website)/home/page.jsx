
import About from "@/components/website/About";
import ContactCTA from "@/components/website/ContactCTA";
import FeaturedProjects from "@/components/website/FeaturedProjects";
import Hero from "@/components/website/Hero";
import Services from "@/components/website/Services";
import Testimonials from "@/components/website/Testimonials";
import WorkProcess from "@/components/website/WorkProcess";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About/>
      <Services/>
      <FeaturedProjects/>
      <WorkProcess/>
      <Testimonials/>
      <ContactCTA/>
    </main>
  );
}
