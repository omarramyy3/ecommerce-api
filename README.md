# ecommerce-api

this is my backend project for an e-commerce site. i used node.js, express, and mongodb to handle products, the cart, and orders.

## project features

* it uses the mvc design pattern to keep everything organized.


* you can manage products and filter them by price.


* there is a cart system that updates prices automatically.


* it has an order system that checks stock and creates an order.


* i included error handling so the server doesn't crash.


* there is a seed script to add sample data to the database.



## setup instructions

1. **clone the repo:**
`git clone [https://github.com/omarramyy3/ecommerce-api.git](https://github.com/omarramyy3/ecommerce-api.git)`
`cd ecommerce-api`
2. **install dependencies:**
`npm install`
3. **setup the .env file:**
create a `.env` file with these variables:
* PORT=5000


* MONGO_URI=your_database_url


* NODE_ENV=development


* JWT_SECRET=your_secret


* CORS_ORIGIN=http://localhost:3000




4. **add sample data:**
`npm run seed`
5. **run the server:**
`npm run dev`

## api endpoints

| method | url | description |
| --- | --- | --- |
| get | /api/categories | get all categories |
| post | /api/categories | create category |
| get | /api/products | get products with filters |
| patch | /api/cart/items/:id | update cart item |
| post | /api/orders | checkout and create order |
* the link of the github repository again https://github.com/omarramyy3/ecommerce-api