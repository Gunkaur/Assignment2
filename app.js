// app.js

// Import required libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product');
const productRoutes = require('./routes/productRoutes');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS support to allow cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to the MongoDB database named 'Marketplace'
mongoose.connect('mongodb://localhost:27017/Marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', (error) => console.error(error)); // Log errors
db.once('open', () => console.log('Connected to MongoDB')); // Log when connected

// Define a route for the root URL '/'
app.use('/', (req, res, next) => {
    if (req.url === '/') {
      // Respond with a welcome message
      res.send('{"message":"Welcome to DressStore application"}');
    } else {
      // Pass control to the next middleware if the URL is not '/'
      next();
    }
  });

// Define routes for handling product-related operations under '/api/products'
app.use('/api/products', productRoutes);

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
