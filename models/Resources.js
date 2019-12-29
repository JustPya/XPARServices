const mongoose = require('mongoose');

const ResourcesSchema = mongoose.Schema({
    name: String,
    path: String,
    type: String,
    description: String, 
    extension: String

});

module.exports = mongoose.model("resource", ResourcesSchema);
