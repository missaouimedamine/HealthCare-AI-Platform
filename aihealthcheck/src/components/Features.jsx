import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStethoscope, 
  faBookMedical, 
  faUserMd, 
  faHistory 
} from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  const features = [
    {
      icon: faStethoscope,
      title: "Symptom Analysis",
      description: "Our advanced algorithm evaluates your symptoms and provides potential causes based on medical knowledge."
    },
    {
      icon: faBookMedical,
      title: "Health Library",
      description: "Access thousands of medically-reviewed articles about conditions, treatments, and wellness."
    },
    {
      icon: faUserMd,
      title: "Doctor Finder",
      description: "Connect with healthcare providers in your area based on your specific needs."
    },
    {
      icon: faHistory,
      title: "Health History",
      description: "Track your symptoms and health concerns over time to identify patterns (with account)."
    }
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <h2>How HealthCheck Pro Helps You</h2>
        <p className="section-subtitle">
          Our comprehensive tools and resources put health information at your fingertips
        </p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;