// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({ email: '', password: '', name: '' });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isSignIn && !formData.name)) {
      setError('Please fill in all required fields');
      return;
    }

    // Simulated auth check
    if (formData.email === 'missaoui@gmail.com' && formData.password === 'missaoui') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate(from, { replace: true }); // 🔁 Redirect to the intended path
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isSignIn ? 'Sign In' : 'Create an Account'}</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="auth-button">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle">
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleMode}>{isSignIn ? 'Sign Up' : 'Sign In'}</button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
