package com.retail.catalog.product_search.controller;

import com.retail.catalog.product_search.model.Product;
import com.retail.catalog.product_search.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

/*
    Product controller
        - Add new product
        - Get all products with pagination
        - Search products by name using fuzzy search
        - Get details of a specific product
 */

@RestController
@RequestMapping("/catalog")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    // Add new product
    @PostMapping("/add-product")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // Get all products with pagination
    @GetMapping("/products")
    public Page<Product> getAllProducts(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "10") int size) {
        return productService.getProducts(page, size);
    }

    //Search products by name using fuzzy search
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(defaultValue = "q") String name) {
        logger.info("Searched name is: {} ", name);
        return productService.searchProductsByName(URLEncoder.encode(name, StandardCharsets.UTF_8));
    }

    //Get details of a specific product
    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable String id) {
        logger.info("Product details for by id: {} ", id);
        return productService.getProductById(id);
    }
}
