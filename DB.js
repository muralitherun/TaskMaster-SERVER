const mongoose = require('mongoose');
require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbURI = 'mongodb+srv://muralitherun:DB_PASSWORD@baz.7o65rrp.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
