const mongoose = require('mongoose');
const URI = 'mongodb+srv://dbPya:123qweas]@cluster0-69bvy.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async()=>{
    await mongoose.connect(URI,
        {useUnifiedTopology: true,
        useNewUrlParser: true});
    console.log('DB is connected!');
}

module.exports = connectDB;