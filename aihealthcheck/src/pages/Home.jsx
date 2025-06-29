import { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  const howItWorksRef = useRef(null);

  return (
    <div className="home-page">
      <HeroSection />
      <Features />
      <HowItWorks ref={howItWorksRef} />
      <Testimonials />
    </div>
  );
};

export default HomePage;