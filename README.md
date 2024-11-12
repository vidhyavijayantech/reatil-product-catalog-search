# reatil-product-catalog-search
Retail product catalog search backend and frontend projects


# retail-product-search-backend
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
    1. `git clone https://github.com/vidhyavijayantech/reatil-product-catalog-search.git`
    2. `cd retail-product-catalog-search-backend`
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


# retail-product-search-frontend
Retail product search frontend application
This is a React application bootstrapped with Vite and written in TypeScript. Vite is a fast frontend build tool that focuses on speed and performance, making development smoother and faster.

Features
1. List all products with pagination
2. Search barwhere users can type in product names.
3. Display search results dynamically as the user types (consider throttling requests).
4. Display the product details when click on any listed product

Setup Instructions

1. Clone the Repository 
    1. `git clone https://github.com/vidhyavijayantech/reatil-product-catalog-search.git`
    2. `cd retail-product-catalog-search-frontend`
2. Install dependencies
    1. `npm install`
3. Run the application
    1.` npm run dev`
4. Test the application
    1. `npx vitest`
  
