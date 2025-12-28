const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully to MongoDB server');
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });

module.exports = mongoose;


