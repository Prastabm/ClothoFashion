import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    // Handle the case when user is null
    return <div>Please log in to access this page.</div>;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;