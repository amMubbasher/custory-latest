import React from 'react';
import RequestForm from '../components/ProductRequest/RequestForm';
import Layout from "../components/Layout/Layout";


const ProductRequest = () => {
  return (
      <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold mb-6">Request Product</h1>
        <RequestForm />
      </div>
    </Layout>
  );
};

export default ProductRequest;
