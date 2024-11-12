import React, { useState } from 'react';
import { Product } from '../types/product';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const newProduct: Product = {
      id: '', //generating at backend
      name,
      category,
      price: parseFloat(price),
      description,
      imageUrl,
    };

    try {
      const response = await fetch('/catalog/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response) {
        throw new Error('Failed to add new product');
      }

      setSuccess('Product added sucessfully!');
      console.info('Product addedd Sucessfully')

      // Wait for the message to be shown, then reset the form and hide it
      setTimeout(() => {
        resetForm();
        setIsFormVisible(false); // Hide the form after success message is shown
      }, 2000);

    } catch (error) {
      console.error('Error adding new product;', error);
      setError('Sorry! Cannot add new product at the moment');
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="add-product">
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <h2>Add Product</h2>
          <div>
          <label>
            Product Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </label>
          </div>
          <div>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            ></input>
          </label>
          </div>
          <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </label>
          </div>
          <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </label>
          </div>
          <div>
          <label>
            Image Url:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
          </label>
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Save</button>
          <button onClick={resetForm}>Reset</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
