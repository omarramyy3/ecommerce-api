# ecommerce-backend

just a basic e-commerce backend api i made with node, express, and mongodb. it handles categories, a product catalog, putting items in a cart, and checking out to make orders.

## stuff it does
*   mvc setup: split into models, controllers, and routes so it's not a complete mess.
*   product filters: handles search filters for categories, min/max price, stock, and text search.
*   checkout: calculates the total on the server side so people can't fake prices, and drops the stock count automatically when someone buys.
*   errors: global error handler catches validation errors or bad IDs so the server doesn't just crash.
*   security: uses express-mongo-sanitize so people can't mess with the database using NoSQL injections.

---

## how to run it

### prerequisites
*   node.js
*   mongodb (local or an atlas url)

### steps
1. clone the repo:
   ```bash
   git clone <your-repository-url>
   cd <project-folder>