import React from 'react';
import { Spinner } from '../utils/Spinner';

import { useSelector } from 'react-redux';
import Layout from '../components/Layout';


const Dashboard = () => {
  
  const isSpinnerLoading = useSelector((state) => state.loader.isLoading);
  

  

  return (
    <Spinner isLoading={isSpinnerLoading} >
      <Layout>
        <h1>Dashboard</h1>
      </Layout>
    </Spinner>
  );
};

export default Dashboard;