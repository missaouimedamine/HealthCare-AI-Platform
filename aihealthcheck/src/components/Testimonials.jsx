import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      quote: "The symptom checker helped me identify that my persistent headache might be related to vision problems. Saw an optometrist and got glasses - problem solved!",
      author: "Sarah J.",
      location: "New York, USA",
      avatar: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
      id: 2,
      rating: 4.5,
      quote: "As a busy mom, I don't always have time to visit the doctor for every little symptom. This service helps me decide when it's really necessary.",
      author: "Maria L.",
      location: "London, UK",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 3,
      rating: 5,
      quote: "The health library is incredibly comprehensive. I've learned so much about managing my chronic condition between doctor visits.",
      author: "David K.",
      location: "Toronto, Canada",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} style={{ opacity: 0.3 }} />);
    }

    return stars;
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>What Our Users Say</h2>
        <p className="section-subtitle">Trusted by thousands of users worldwide</p>
      </div>
      <div className="testimonial-cards">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-content">
              <div className="rating">
                {renderStars(testimonial.rating)}
              </div>
              <p>"{testimonial.quote}"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src={testimonial.avatar} alt={testimonial.author} />
              </div>
              <div className="author-info">
                <h4>{testimonial.author}</h4>
                <span>{testimonial.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials