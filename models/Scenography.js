const mongoose = require('mongoose');

const ScenSchema = mongoose.Schema({
    name: String,
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource"
    }
});

module.exports = mongoose.model("scenography", ScenSchema);