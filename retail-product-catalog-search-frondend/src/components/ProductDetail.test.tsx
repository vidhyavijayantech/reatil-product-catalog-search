import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductDetail from './ProductDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mocking global fetch
global.fetch = vi.fn();

const mockProduct = {
  id: '1',
  name: 'Canvas',
  category: 'Art Supplies',
  description: 'canvas',
  price: 59.99,
  imageUrl: 'http://example.com/test-image.jpg',
};

describe('ProductDetail Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading product details...')).toBeInTheDocument();
  });

  it('displays product details after fetching', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
      expect(screen.getByText('Canvas')).toBeInTheDocument();
      expect(screen.getByText('Art Supplies')).toBeInTheDocument();
      expect(screen.getByText('canvas')).toBeInTheDocument();
      expect(screen.getByText('$59.99')).toBeInTheDocument();
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image.src).toBe('http://example.com/test-image.jpg');
    });
  });

  it('handles API fetch error and displays error message', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  it('navigates back to the search page when clicking "Back to search" button', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/" element={<p>Search Page</p>} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });

    const backButton = screen.getByText('Back to search');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Search Page')).toBeInTheDocument();
    });
  });
});
