const mongoose = require('mongoose');

// MongoDB connection URI
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri)
.then(async () => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
