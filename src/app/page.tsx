import Navbar from "@/components/layout/Navbar";
import HeroSlider from "@/components/sections/HeroSlider";
import TeamSlider from "@/components/sections/TeamSlider";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
 
        <Navbar />
      <HeroSlider />
     
      <TeamSlider />
      <TestimonialSlider />
      <Footer />
    </>
  );
}
