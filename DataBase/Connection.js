const mongoose = require('mongoose');
//require('dotenv/config');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://dbPya:123qweas]@cluster0-69bvy.mongodb.net/xpar?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('DB is connected!');
};
module.exports = connectDB;
