import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Personal Health Assistant</h1>
          <p className="hero-subtitle">
            Get instant health insights and understand your symptoms with our AI-powered symptom checker
          </p>
          <div className="hero-cta">
            <Link to="/symptom-checker" className="btn btn-primary btn-large">
              Check Symptoms Now <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <button 
              onClick={scrollToHowItWorks} 
              className="btn btn-outline btn-large"
            >
              Learn More <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Doctor using digital tablet"
          />
        </div>
      </section>
      
      {/* This empty div will be our scroll target */}
      <div ref={howItWorksRef} />
    </>
  );
};

export default HeroSection;