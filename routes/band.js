const express = require('express');
const router = express.Router();
const Band = require('../models/Band');

// Get all the bands
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const bands = await Band.find();
    res.json({ status: 'ok', message: bands });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Create band
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const band = new Band({
    name: req.body.name,
    description: req.body.description,
    resources: req.body.resources
  });
  try {
    const saveBand = await band.save();
    res.json({ status: 'ok', message: saveBand });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Get band by id band
router.get('/:bandId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const band = await Band.findById(req.params.bandId);
    res.json({ status: 'ok', message: band });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete band
router.delete('/:bandId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removedBand = await Band.remove({ _id: req.params.bandId });
    res.json({ status: 'ok', message: removedBand });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update band
router.patch('/:bandId', async (req, res) => {
  try {
    const band = await Band.findOne({ _id: req.params.bandId });
    band.name = req.body.name;
    band.description = req.body.description;
    console.log(req.body.name);
    await band.save();
    res.json({ status: 'ok', message: band });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

module.exports = router;
