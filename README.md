# ecommerce-api

this is my backend project for an e-commerce site. i built it using node.js, express, and mongodb to handle stuff like products, the cart, and orders.

## features

* it uses the mvc design pattern to keep the code organized.


* you can manage products and filter them by things like price.


* there is a cart system that updates prices automatically.


* there is an order system that checks stock and creates an order for you.


* i added error handling so the server doesn't crash.


* there is a seed script to add some sample data to the database.



## how to set it up

1. **clone the repo:**
`git clone [https://github.com/omarramyy3/ecommerce-api.git](https://github.com/omarramyy3/ecommerce-api.git)`
`cd ecommerce-api`
2. **install stuff:**
`npm install`
3. **setup the .env file:**
create a `.env` file and put these in it:
* PORT=5000


* MONGO_URI=your_database_url


* NODE_ENV=development


* JWT_SECRET=your_secret


* CORS_ORIGIN=http://localhost:3000




4. **add the sample data:**
`npm run seed`
5. **run it:**
`npm run dev`

## main endpoints

| method | endpoint | what it does |
| --- | --- | --- |
| get | /api/categories | shows all categories |
| post | /api/categories | adds a new category |
| get | /api/products | shows products with filters |
| patch | /api/cart/items/:id | updates item count in cart |
| post | /api/orders | creates an order |