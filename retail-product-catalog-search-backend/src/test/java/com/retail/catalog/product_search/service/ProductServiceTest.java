package com.retail.catalog.product_search.service;

import com.retail.catalog.product_search.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();  // Initialize the service, mocking dependencies if needed
    }

    @Test
    void testAddProduct() {
        Product product = new Product("", "Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://example.com/canvas.jpg");

        Product addedProduct = productService.addProduct(product);

        assertNotNull(addedProduct.getId(), "Product ID should not be null after addition");
        assertEquals("Canvas", addedProduct.getName(), "Product name should match");
    }

    @Test
    void testGetAllProducts() {
        Product product1 = new Product("", "Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://example.com/canvas.jpg");
        Product product2 = new Product("", "Pencils", "Art Supplies", "Graphite pencils", 89.99, "https://example.com/pencil.jpg");

        productService.addProduct(product1);
        productService.addProduct(product2);

        Page<Product> products = productService.getProducts(1, 10);

        assertEquals(10, products.getSize(), "There should be 2 products in the list");
        assertTrue(products.getContent().contains(product1), "Product list should contain product1");
        assertTrue(products.getContent().contains(product2), "Product list should contain product2");
    }

    @Test
    void testGetProductById() {
        Product product = new Product("", "Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://example.com/canvas.jpg");

        Product addedProduct = productService.addProduct(product);

        Product foundProduct = productService.getProductById(addedProduct.getId());

        assertNotNull(foundProduct, "Product found by ID");
        assertEquals("Canvas", foundProduct.getName(), "Product name matches");
    }
}
