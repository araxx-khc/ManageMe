// This file handle connection logic to the MongoDB database

const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/ManageMe';

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB successfully :)');
}).catch((e) => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
});

module.exports = {
    mongoose
};