import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add all brands icons to library
library.add(fab);

// Then use with prefix "fab"

import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <FontAwesomeIcon icon={faHeartbeat} />
            <span>AIHealthCheck</span>
          </div>
          <p className="footer-description">
            Providing reliable health information and tools to help you make better healthcare decisions.
          </p>
          <div className="social-links">
            <a href="https://github.com/missaouimedamine/HealthCare-AI-Platform" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        {/* Rest of your footer content */}
      </div>
    </footer>
  );
};

export default Footer;