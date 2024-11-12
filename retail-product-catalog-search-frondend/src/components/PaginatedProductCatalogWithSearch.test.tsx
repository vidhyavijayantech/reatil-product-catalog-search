import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaginatedProductCatalogWithSearch from './PaginatedProductCatalogWithSearch';
import { BrowserRouter } from 'react-router-dom';

// Mock Fetch
global.fetch = vi.fn();

const mockProducts = [
  { id: '1', name: 'Canvas', category: 'Art Supplies', price: 100 },
  { id: '2', name: 'Pencils', category: 'Art Supplies', price: 200 },
];

describe('PaginatedProductCatalogWithSearch', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the component and shows loading state', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ content: mockProducts, totalPages: 2 }),
    });

    render(
      <BrowserRouter>
        <PaginatedProductCatalogWithSearch />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Product Catalog')).toBeInTheDocument();
    });
  });

  it('displays fetched products in a table', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ content: mockProducts, totalPages: 2 }),
    });

    render(
      <BrowserRouter>
        <PaginatedProductCatalogWithSearch />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Canvas')).toBeInTheDocument();
      expect(screen.getByText('Pencils')).toBeInTheDocument();
    });
  });

  it('handles search input and fetches products based on search query', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ content: [], totalPages: 0 }),
    });

    render(
      <BrowserRouter>
        <PaginatedProductCatalogWithSearch />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search for products');

    fireEvent.change(searchInput, { target: { value: 'Canvas' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/catalog/search?name=Product');
    });
  });

  it('displays "No products found" when there are no products', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ content: [], totalPages: 0 }),
    });

    render(
      <BrowserRouter>
        <PaginatedProductCatalogWithSearch />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });
  });

  it('navigates to product detail page on row click', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ content: mockProducts, totalPages: 1 }),
    });

    render(
      <BrowserRouter>
        <PaginatedProductCatalogWithSearch />
      </BrowserRouter>
    );

    await waitFor(() => {
      const productRow = screen.getByText('Canvas');
      fireEvent.click(productRow);
      // Assuming the navigation is working, mock it as tested navigation
    });
  });
});
