const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({ 
    name: String,
    description: String,
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource"
    }]
});

module.exports = mongoose.model("band", BandSchema);