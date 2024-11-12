import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddProduct from './AddProductForm';

// Mocking the global fetch function
global.fetch = vi.fn();

describe('AddProduct Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the form correctly', () => {
    render(<AddProduct />);

    // Check if input fields and buttons are in the document
    expect(screen.getByLabelText('Product Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Category:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Image Url:')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Product added successfully' }),
    });

    render(<AddProduct />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Product Name:'), {
      target: { value: 'Canvas' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: 'Art Supplies' },
    });
    fireEvent.change(screen.getByLabelText('Price:'), {
      target: { value: '59.99' },
    });
    fireEvent.change(screen.getByLabelText('Description:'), {
      target: { value: 'Canvas' },
    });
    fireEvent.change(screen.getByLabelText('Image Url:'), {
      target: { value: 'http://example.com/image.jpg' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Check if fetch was called with correct parameters
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/catalog/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '',
          name: 'Canvas',
          category: 'Art Supplies',
          price: 59.99,
          description: 'Canvas',
          imageUrl: 'http://example.com/image.jpg',
        }),
      });

      // Check success message
      expect(screen.getByText('Product added sucessfully!')).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<AddProduct />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Product Name:'), {
      target: { value: 'Canvas' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: 'Art Supplies' },
    });
    fireEvent.change(screen.getByLabelText('Price:'), {
      target: { value: '59.99' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Sorry! Cannot add new product at the moment')).toBeInTheDocument();
    });
  });

  it('resets the form fields', () => {
    render(<AddProduct />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Product Name:'), {
      target: { value: 'Test Product' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: 'Test Category' },
    });
    fireEvent.change(screen.getByLabelText('Price:'), {
      target: { value: '50' },
    });

    // Click reset
    fireEvent.click(screen.getByText('Reset'));

    // Check if the form fields are reset
    expect(screen.getByLabelText('Product Name:')).toHaveValue('');
    expect(screen.getByLabelText('Category:')).toHaveValue('');
    expect(screen.getByLabelText('Description:')).toHaveValue('');
    expect(screen.getByLabelText('Image Url:')).toHaveValue('');
  });

  it('cancels the form and hides it', () => {
    render(<AddProduct />);

    // Click cancel
    fireEvent.click(screen.getByText('Cancel'));

    // Check if form is no longer visible
    expect(screen.queryByLabelText('Product Name:')).not.toBeInTheDocument();
  });
});