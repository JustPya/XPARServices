const mongoose = require('mongoose');

const TypeSchema = mongoose.Schema({
    type: String
});

module.exports = mongoose.model("type", AuthSchema);