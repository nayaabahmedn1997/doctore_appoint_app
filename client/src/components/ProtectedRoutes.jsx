import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../store/api';
import { clearUser } from '../store/userSlice';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const {
    isLoading,
    isError,
    error,
  } = useGetUserQuery(undefined, {
    skip: !token, // Skip call if no token
  });

  useEffect(() => {
    if (isError && (error?.status === 401 || error?.status === 403)) {
      localStorage.removeItem('token');
      dispatch(clearUser());
    }
  }, [isError, error, dispatch]);

  if (!token || isError) return <Navigate to="/login" replace />;
  if (isLoading) return <p>Loading...</p>;

  return children;
};

export default ProtectedRoute;
