import React from 'react';
import { useEffect } from 'react';
import { useGetUserQuery } from '../store/api';
import { Spinner } from '../utils/Spinner';
import { showToast } from '../utils/toatService';
import { stopLoading } from '../store/loadingSlice';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const isSpinnerLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    if (data) {
      console.log(data);
      showToast({ type: "success", message: data.message });
      stopLoading();
    }
    if (error) {
      console.log(error);
      showToast({ type: "error", message: data.message });
      stopLoading();
    }
  }, [data]); // Runs when `data` changes


  return (
    <Spinner isLoading={isSpinnerLoading} >
      <h1>Dashboard</h1>
    </Spinner>
  );
};

export default Dashboard;