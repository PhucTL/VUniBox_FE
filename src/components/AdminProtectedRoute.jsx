import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin - handle both string and number
  const isAdmin = user && (user.role === 1 || user.role === "1");

  // Redirect to library if not admin
  if (!isAdmin) {
    return <Navigate to="/library" replace />;
  }

  // Allow access if authenticated and is admin
  return children;
};

export default AdminProtectedRoute;