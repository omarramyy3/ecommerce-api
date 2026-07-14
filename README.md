# ecommerce-api

this is a backend api for an e-commerce platform. it handles product management, shopping carts, and order processing using node.js, express.js, mongodb, and mongoose.

## features

* categories api


* products api


* cart api


* orders api



## prerequisites

* node.js


* mongodb (local or atlas)


* npm or yarn



## installation

1. git clone https://github.com/omarramyy3/ecommerce-api

2. npm install


3. setup .env


4. npm run seed


5. npm run dev



## environment variables

| variable | explanation |
| --- | --- |
| PORT | port the server runs on

 |
| MONGO_URI | connection string for mongodb

 |
| NODE_ENV | environment mode

 |
| JWT_SECRET | secret for tokens

 |
| CORS_ORIGIN | allowed origin for cors

 |

## api endpoints

| method | url | description |
| --- | --- | --- |
| get | /api/categories | list all categories

 |
| post | /api/categories | add new category

 |
| get | /api/products | list products with filters

 |
| patch | /api/cart/items/:id | update cart item

 |
| post | /api/orders | checkout and create order

 |

## project structure

* config/ (database connection)


* controllers/ (request logic)


* models/ (database schemas)


* routes/ (api routes)


* middleware/ (custom middleware)


* utils/ (helper functions)


* seed.js (seed script)


* app.js (server setup)


* postman/ (api documentation)