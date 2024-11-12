import React, { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import PaginatedProductCatalogWithSearch from './components/PaginatedProductCatalogWithSearch';

import './styles/App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PaginatedProductCatalogWithSearch />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </>
  )
);



const App: React.FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
