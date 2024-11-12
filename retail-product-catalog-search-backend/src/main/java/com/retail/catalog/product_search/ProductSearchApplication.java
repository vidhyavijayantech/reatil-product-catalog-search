package com.retail.catalog.product_search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ProductSearchApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductSearchApplication.class, args);
    }
}
