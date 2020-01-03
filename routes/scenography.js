const express = require('express');
const router = express.Router();
const Scenography = require('../models/Scenography');

//Get all the scen
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const scen = await Scenography.find().populate('resource');
    res.json({ status: 'ok', message: scen });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Create Scenography
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const scen = new Scenography({
    name: req.body.name,
    resource: req.body.resource
  });
  try {
    const saveScen = await scen.save();
    res.json({ status: 'ok', message: saveScen });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Get by id
router.get('/:scenId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const scen = await Scenography.findById(req.params.scenId).populate('resource');
    res.json({ status: 'ok', message: scen });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete scen
router.delete('/:scenId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removeScen = await Scenography.remove({ _id: req.params.scenId });
    res.json({ status: 'ok', message: removeScen });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update scen
router.patch('/:scenId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const scen = await Scenography.findOne({ _id: req.params.scenId });
    scen.name = req.body.name;
    scen.resource = req.body.resource;
    await scen.save();
    res.json({ status: 'ok', message: scen });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
