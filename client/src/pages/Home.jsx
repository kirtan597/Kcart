import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BrandCarousel from "../components/BrandCarousel";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import AppDownload from "../components/AppDownload";

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <div className="bg-white">
        <LatestCollection />
        <BrandCarousel />
      </div>
      <div className="bg-white py-12">
        <BestSeller />
      </div>
      <div className="bg-white">
        <BrandCarousel />
      </div>
      <div className="bg-white">
        <OurPolicy />
      </div>
      <div className="bg-white">
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
