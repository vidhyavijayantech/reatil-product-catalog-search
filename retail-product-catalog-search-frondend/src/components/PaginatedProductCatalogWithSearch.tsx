import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import AddProduct from './AddProductForm';


const PaginatedProductCatalogWithSearch: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  //Function to fetch paginated products
  const fetchPaginatedProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/catalog/products?page=${page}&size=10`);
      if (!response) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data);
    } catch (error) {
      setError('Error Fetching products: ' + error);
    } finally {
      setLoading(false);
    }
  };

  //Function to fetch products by name search with fuzzy search
  const fetchSearchedProducts = async (query: string) => {
    setLoading(true);
    setIsSearching(true);
    try {
      const response = await fetch(`/catalog/search?name=${query}`);
      if (!response) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('Products: ', data);
      console.log('Products: ', data.content);
      setProducts(data);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Error while searching: ' + error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  //Debounce mechanism on the search input to prevent excessive API calls.
  useEffect(() => {
    if (debouncedQuery) {
      const timer = setTimeout(() => {
        fetchSearchedProducts(debouncedQuery);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery]);

  //initial fetch for the paginated products
  useEffect(() => {
    fetchPaginatedProducts(currentPage);
  }, [currentPage]);

  //Handle search query change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setDebouncedQuery(query);
    } else {
      fetchPaginatedProducts(1);
    }
  };

  //Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (debouncedQuery) {
      fetchSearchedProducts(debouncedQuery);
    } else {
      fetchPaginatedProducts(page);
    }
  };

  //Handle Add new product form
  const handleAddProduct = () => {
    setShowAddForm((prev) => !prev);
  };

  //Handle Product click (navigate to product detail view)
  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  // Show error message if there's any error
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Product Catalog</h2>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <button onClick={handleAddProduct}>
        {showAddForm ? 'Cancel' : 'Add New Product'}
      </button>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading products...</p>}
      {isSearching}

      {/* Product Table */}
      {!showAddForm && (
        <div>
          <table className="product-detail">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="product-item"
                  >
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination-control">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Add Product Form */}
      {showAddForm && <AddProduct />}
    </div>
  );
};

export default PaginatedProductCatalogWithSearch;
