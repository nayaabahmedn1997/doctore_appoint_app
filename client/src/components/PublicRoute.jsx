import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../store/api';
import { clearUser } from '../store/userSlice';
import { Navigate } from 'react-router-dom';


const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { isLoading, isError, error } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isError && (error?.status === 401 || error?.status === 403)) {
      localStorage.removeItem('token');
      dispatch(clearUser());
    }
  }, [isError, error, dispatch]);

  if (isLoading) return <p>Validating session...</p>;

  // If token exists and is valid, redirect
  if (token && !isError) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
