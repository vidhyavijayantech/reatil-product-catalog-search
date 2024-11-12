# retail-product-search
Retail product search API
This is a REST API for managing products, developed using Java and Spring Boot. It provides endpoints to add, retrieve, search, and get details of products. The application uses an in-memory list for data storage and implements a fuzzy search feature using the Damerau-Levenshtein distance algorithm.

Features
1. Add a new product
2. Retrieve all products with pagination
3. Search for products by name with fuzzy matching
4. Get details of a specific product by ID

Prerequisites
1. Java 17 or later
2. Maven 3.6 or later

Setup Instructions

1. Clone the Repository 
    1. `git clone https://github.com/your-username/retail-product-search.git`
    2. `cd retail-product-search`
2. Build the project
    1. `mvn clean install`
3. Run the application
    1.` mvn spring-boot:run`
4. Test the application
    1. You can test the API endpoints using Postman or any HTTP client

_API Endpoints_

1. Add a new product
    Endpoint: POST /api/add-product
    Description: Add a new product
    Request body:
      `{ "name": "Canvas",
         "category": "Art Supplies",
         "description": "15x15cm Canvas",
         "price": 99.99,
         "imageUrl": "/images/canvas.jpg"
       }`
2. Fetch all products
    1. Endpoint: GET /catalog/products?page=1&size=10
    2. Description: Fetch all products with pagination
    3. Query parameters:
        1. page (integer): Page number 
        2. size (integer): Number of products per page 
3. Search Product by name
    1. Endpoint: GET /catalog/products/search?query={name}
    2. Description: Search products by name using fuzzy search Demerau-Levenshtein Distance
    3. Query Parameter:
        1. name (string): The search name 
4. Fetch product by ID
    1. Endpoint: GET /catalog/products/{id}
    2. Description: Retrieve details of a product by its ID
    

Running Test
    `mvn test`