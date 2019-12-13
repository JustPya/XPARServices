const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model("authentication", AuthSchema);