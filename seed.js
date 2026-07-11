const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const Category = require('./models/Category.js');
const Product = require('./models/Product.js');
const Order = require('./models/Order.js'); 

const CLOUD_URI = "mongodb+srv://lastmeeting06_db_user:7xvQOJQrjUtnN5UD@cluster0.fzdkado.mongodb.net/ecommerce?retryWrites=true&w=majority";

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(CLOUD_URI);
    console.log('Connected successfully!');

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Old records cleared.');

    const categories = await Category.create([
      { name: 'Electronics', description: 'Gears, gadgets, laptops and devices' },
      { name: 'Books', description: 'Physical books, guides, and manuals' },
      { name: 'Clothing', description: 'Apparel, garments, and casual wear' }
    ]);
    
    const productsData = [
      { name: 'Gaming Laptop', description: 'High performance gaming machine', price: 1200, stock: 10, category: categories[0]._id },
      { name: 'Wireless Headset', description: 'Noise cancelling overhead headphones', price: 150, stock: 25, category: categories[0]._id },
      { name: 'Node.js Complete Guide', description: 'Learn server-side JavaScript architecture', price: 45, stock: 50, category: categories[1]._id },
      { name: 'MongoDB Mastery', description: 'Deep dive into NoSQL modeling', price: 50, stock: 0, category: categories[1]._id }, 
      { name: 'Oversized Black Hoodie', description: '100% premium cotton streetwear outfit', price: 65, stock: 30, category: categories[2]._id },
      { name: 'Slim Fit Denim Jeans', description: 'Classic styled durable denim blue jeans', price: 80, stock: 15, category: categories[2]._id }
    ];

    await Product.create(productsData);
    console.log('Successfully seeded data.');
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
};

seedData();