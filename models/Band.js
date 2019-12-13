const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({ 
    name: String,
    description: String
});

module.exports = mongoose.model("band", BandSchema);