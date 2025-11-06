// src/pages/Home.jsx
import HomeBanner from "../components/Homecollection/HomeBanner";
import BrandSlider from "../components/Homecollection/BrandSlider";
import FeaturesSection from "../components/Homecollection/FeaturesSection";
import CategorySection from "../components/Homecollection/CategorySection";
import BestSellerSection from "../components/Homecollection/BestSellerSection";
import ProductSection from "../components/Homecollection/ProductSection";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <BrandSlider />
      <FeaturesSection />
      <CategorySection />
      <BestSellerSection />
      <ProductSection />
    </div>
  );
};

export default Home;
