import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HowItWorks = forwardRef((props, ref) => {
  const steps = [
    {
      number: 1,
      title: "Describe Your Symptoms",
      description: "Select from our comprehensive list of symptoms or describe what you're experiencing."
    },
    {
      number: 2,
      title: "Provide Details",
      description: "Tell us about severity, duration, and any other relevant health information."
    },
    {
      number: 3,
      title: "Get Insights",
      description: "Receive potential causes, recommended actions, and when to seek medical care."
    }
  ];

  return (
    <section className="how-it-works-section" ref={ref}>
      <div className="section-header">
        <h2>How Our Symptom Checker Works</h2>
        <p className="section-subtitle">Three simple steps to better understand your health</p>
      </div>
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {step.number < steps.length && (
              <div className="step-arrow">
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="center">
        <Link to="/symptom-checker" className="btn btn-primary btn-large">
          Try It Now
        </Link>
      </div>
    </section>
  );
});

export default HowItWorks;