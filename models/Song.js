const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
     songName: String,
     band: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "band"
     },
     instruments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "instrument"
     }],
     resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource"
     }]
});

module.exports = mongoose.model("song", SongSchema);