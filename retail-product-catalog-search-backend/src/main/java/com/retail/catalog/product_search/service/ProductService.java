package com.retail.catalog.product_search.service;

import com.retail.catalog.product_search.model.Product;
import com.retail.catalog.product_search.util.ProductSearchUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    //In-memory store of products
    private List<Product> products = new ArrayList<Product>();

    public Product addProduct(Product product) {
        product.setId(UUID.randomUUID().toString());
        products.add(product);
        return product;
    }

    public Page<Product> getProducts(int page, int size) {
        int start = (page-1) * size;
        if (page < 0 || size <= 0 || start >= products.size()) {
            return new PageImpl<>(new ArrayList<>(), PageRequest.of(page, size), products.size());
        }
        int end = Math.min(start + size, products.size());
        List<Product> subList = products.subList(start, end);
        return new PageImpl<>(subList, PageRequest.of(page, size), products.size());
    }

    public List<Product> searchProductsByName(String name) {
        int threshold = 3;
        //Remove spaces from query for listing multi worded product with names
        String normalizedSearchingName = name.replaceAll("\\s+", "").toLowerCase();

        List<Product> results = new ArrayList<>();
        for (Product product : products) {
            String normalizedProductName = product.getName().replaceAll("\\s+", "").toLowerCase();
            if (ProductSearchUtil.damerauLevenshteinDistance(normalizedProductName, normalizedSearchingName) <= threshold) {
                results.add(product);
            }
        }
        return results;
    }

    public Product getProductById(String id) {
       return products.stream().filter(product -> product.getId().equals(id)).findFirst().orElse(null);
    }
}
