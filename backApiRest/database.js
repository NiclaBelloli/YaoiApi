const mongoose = require('mongoose');
const uri = "mongodb://admin:secret123@localhost:27017";

mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully to MongoDB server');
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });

module.exports = mongoose;


