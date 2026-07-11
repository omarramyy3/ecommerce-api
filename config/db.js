const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const cloudURI = "mongodb+srv://lastmeeting06_db_user:7xvQOJQrjUtnN5UD@cluster0.fzdkado.mongodb.net/ecommerce?retryWrites=true&w=majority";
    
    console.log('Connecting to MongoDB Atlas Cloud...');
    const conn = await mongoose.connect(cloudURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;