import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [showDropdown, setShowDropdown] = useState(false);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const username = 'admin'; // You can later pull from actual auth data

  const menuItems = [
    { id: '/', title: 'Home' },
    { id: '/symptom-checker', title: 'Symptom Checker' },
    { id: '/health-assistant', title: 'Health Assistant' },
    { id: '/find-doctor', title: 'Find Healthcare' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setShowDropdown(false);
    navigate('/auth');
  };

  const toggleDropdown = () => {
    if (isAuthenticated) {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <FontAwesomeIcon icon={faHeartbeat} />
        <span>AIHealthCheck</span>
      </div>

      <nav className="nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={active === item.id ? 'active' : ''}
              onClick={() => setActive(item.id)}
            >
              <Link to={item.id}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="user-actions">
        <div
          className={`user-panel ${isAuthenticated ? '' : 'disabled'}`}
          onClick={toggleDropdown}
          title={isAuthenticated ? 'Account' : 'Please login'}
          style={{ cursor: isAuthenticated ? 'pointer' : 'not-allowed' }}
        >
          <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
        </div>

        {isAuthenticated && showDropdown && (
          <ul className="user-dropdown">
            <li className="dropdown-item username">👤 {username}</li>
            <li className="dropdown-item logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
