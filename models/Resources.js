const mongoose = require('mongoose');

const ResourcesSchema = mongoose.Schema({
    name: String,
    path: String,
    type: String
});

module.exports = mongoose.model("resource", ResourcesSchema);
