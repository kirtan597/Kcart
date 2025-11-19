import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import PromoBanner from "../components/PromoBanner";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import AppDownload from "../components/AppDownload";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="my-12">
        <LatestCollection />
      </div>
      <div className="my-12">
        <PromoBanner />
      </div>
      <div className="my-12">
        <BestSeller />
      </div>
      <OurPolicy />
      <AppDownload />
    </div>
  );
};

export default Home;
