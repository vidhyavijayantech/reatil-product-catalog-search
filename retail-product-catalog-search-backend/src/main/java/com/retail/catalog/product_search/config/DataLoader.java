package com.retail.catalog.product_search.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.retail.catalog.product_search.model.Product;
import com.retail.catalog.product_search.service.ProductService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader {

    private final ProductService productService;
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    @Autowired
    public DataLoader(ProductService productService) {
        this.productService = productService;
    }

    @PostConstruct
    public void loadData() {
        // Load data.json from resources
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Product>> typeReference = new TypeReference<>() {};
        InputStream inputStream = getClass().getResourceAsStream("/data/data.json");
        logger.info("InputStream: {}", inputStream);

        try {
            List<Product> products = objectMapper.readValue(inputStream, typeReference);
            products.forEach(productService::addProduct);
            logger.info("Data loaded successfully.");
        } catch (Exception e) {
            logger.error("Unable to load data: {}", e.getMessage());
        }
    }
}