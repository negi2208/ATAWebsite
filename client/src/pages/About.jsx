import React from 'react'
import AboutHero from "@/components/AboutSection/AboutHero";
import AboutCompanyOverview from "@/components/AboutSection/AboutCompanyOverview";
import WhyChooseUs from "@/components/AboutSection/WhyChooseUs";
import GlobalFootprint from "@/components/AboutSection/GlobalFootprint";
import ReviewsSection from '@/components/Homecollection/ReviewsSection';
import BrandSlider from '@/components/Homecollection/BrandSlider';
const About = () => {
  return (
    <div>
      <AboutHero />
      <AboutCompanyOverview />
      <WhyChooseUs />
      <GlobalFootprint />
      <ReviewsSection />
      <BrandSlider />
    </div>
  )
}

export default About
