// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
