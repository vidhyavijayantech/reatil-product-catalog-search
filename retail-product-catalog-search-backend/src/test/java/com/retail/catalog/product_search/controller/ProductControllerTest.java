package com.retail.catalog.product_search.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.retail.catalog.product_search.model.Product;
import com.retail.catalog.product_search.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)  // Automatically set up the context for testing the controller
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddProduct() throws Exception {
        Product product = new Product("PROD1","Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://image.com/canvas.jpg");

        // Mocking service layer behavior for adding a product
        given(productService.addProduct(any(Product.class))).willReturn(product);

        mockMvc.perform(post("/catalog/add-product")
                        .contentType("application/json")
                        .content("{\"name\": \"Canvas\", \"category\": \"Art Supplies\", \"description\": \"15x15cm Canvas board\", \"price\": 99.99, \"imageUrl\": \"https://image.com/canvas.jpg\"}"))
                .andExpect(status().is2xxSuccessful())  // Expect 201 Created
                .andExpect(jsonPath("$.name").value("Canvas"));
    }

    @Test
    void testGetAllProducts() throws Exception {
        Product product1 = new Product("PROD1","Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://image.com/canvas.jpg");
        Product product2 = new Product("PROD2","Pencils", "Art Supplies", "Graphite pencils", 89.99, "https://image.com/pencil.jpg");

        // Mocking service layer response
        given(productService.getProducts(1, 10)).willReturn(new PageImpl<>(List.of(product1, product2), PageRequest.of(1, 10), 50));

        mockMvc.perform(get("/catalog/products?page=1&size=10"))
                .andExpect(status().isOk())  // Expect 200 OK
                .andExpect(jsonPath("$.content[0].name").value("Canvas"))
                .andExpect(jsonPath("$.content[1].name").value("Pencils"));
    }

    @Test
    void testGetProductById() throws Exception {
        Product product = new Product("PROD1","Canvas", "Art Supplies", "15x15cm canvas board", 99.99, "https://image.com/canvas.jpg");

        // Mocking service layer response
        given(productService.getProductById("PROD1")).willReturn(product);

        mockMvc.perform(get("/catalog/products/PROD1"))
                .andExpect(status().isOk())  // Expect 200 OK
                .andExpect(jsonPath("$.name").value("Canvas"));
    }
}
