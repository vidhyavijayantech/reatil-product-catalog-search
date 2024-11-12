import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/catalog/products/${id}`);

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details, status: ${response.status}`
          );
        }

        const data = await response.json();

        // Handle case where data might be empty or malformed
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Product details are empty');
        }
        console.log('Fetched Product details: ', data);
        setProduct(data);
      } catch (error: any) {
        console.error('Error fetching product details: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Show loading while fetching data
  if (loading) return <p>Loading product details...</p>;

  // Show error message if there's any error
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  //Show message if product not found
  if (!product) return <p>Product not found.</p>;

  //Handle Back to search button
  const handleBackTosearch = () => {
    navigate(`/`);
  };

  return (
    <div className="product-detail">
      <button onClick={handleBackTosearch}>Back to search</button>

      <h2>Product Details</h2>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
        <tr>
          <td>{product?.name || 'Name not available'}</td>
          <td>{product?.category || 'Uncategorized'}</td>
          <td>{product?.description || 'No description available.'}</td>
          <td>${product?.price || '0.00'}</td>
          <td>
            <img src={product?.imageUrl || 'No Image'} />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductDetail;
