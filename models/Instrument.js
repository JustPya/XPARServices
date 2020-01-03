const mongoose = require('mongoose');

const InstrumentSchema = mongoose.Schema({
  name: String,
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource'
  }
});

module.exports = mongoose.model('instrument', InstrumentSchema);
