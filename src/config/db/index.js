const mongoose = require('mongoose');
async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hung_books', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("successfully");
    }catch(error){
        console.log('failed to connect');
    }

}

module.exports = { connect }