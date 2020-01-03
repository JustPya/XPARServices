const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');

//Get all the instruments
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const instruments = await Instrument.find().populate('resource');
    res.json({ status: 'ok', message: instruments });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Create instrument
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const instrument = new Instrument({
    name: req.body.name,
    resource: req.body.resource
  });
  try {
    const saveInstrument = await instrument.save();
    res.json({ status: 'ok', message: saveInstrument });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// CreateInstrument method
async function createInstrument(instrument) {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const saveInstrument = await instrument.save();
    res.json({ status: 'ok', message: saveInstrument });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
}

// Get instrument by id
router.get('/:instId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const instrument = await Instrument.findById(req.params.instId).populate('resource');
    res.json({ status: 'ok', message: instrument });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete instrument
router.delete('/:instId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removedInst = await Instrument.remove({ _id: req.params.instId });
    res.json({ status: 'ok', message: removedInst });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update band
router.patch('/:instId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const inst = await Instrument.findOne({ _id: req.params.instId });
    inst.name = req.body.name;
    inst.resource = req.body.resource;
    inst.save();
    res.json({ status: 'ok', message: inst });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

module.exports = router;
module.exports.createInstrument = createInstrument;
