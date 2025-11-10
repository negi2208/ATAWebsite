// src/pages/Home.jsx
import HomeBanner from "../components/Homecollection/HomeBanner";
import BrandSlider from "../components/Homecollection/BrandSlider";
import FeaturesSection from "../components/Homecollection/FeaturesSection";
import CategorySection from "../components/Homecollection/CategorySection";
import BestSellerSection from "../components/Homecollection/BestSellerSection";
import ProductSection from "../components/Homecollection/ProductSection";
import FAQSection from "../components/Homecollection/FAQSection";
import ReviewsSection from "../components/Homecollection/ReviewsSection";
import KitHighlightSection from "../components/Homecollection/KitHighlightSection";
import GlobalFootprint from "@/components/AboutSection/GlobalFootprint";


const Home = () => {
  return (
    <div>
      <HomeBanner />
      <FeaturesSection />
      <CategorySection />
      <BestSellerSection />
      <KitHighlightSection />
      <ProductSection />
      <GlobalFootprint />
      <FAQSection />
      <ReviewsSection />
      <BrandSlider />
    
    </div>
  );
};

export default Home;
