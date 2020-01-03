const express = require('express');
const router = express.Router();
const Resources = require('../models/Resources');

// Get all the bands
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const resources = await Resources.find();
    res.json({ status: 'ok', message: resources });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Create Resource
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const resources = new Resources({
    name: req.body.name,
    path: req.body.path,
    type: req.body.type,
    description: req.body.description,
    extension: req.body.extension
  });
  try {
    const saveResource = await resources.save();
    res.json({ status: 'ok', message: saveResource });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Create Resource method
async function createResource(resources) {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const saveResource = await resources.save();
    console.log('Resource guardado ', saveResource);
    return saveResource;
  } catch (err) {
    console.log('Resource no guardado', err);
  }
}

// Get resource by id
router.get('/:resoId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const resource = await Resources.findById(req.params.resoId);
    res.json({ status: 'ok', message: resource });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete resource
router.delete('/:resoId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removedReso = await Resources.remove({ _id: req.params.resoId });
    res.json({ status: 'ok', message: removedReso });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update resource
router.patch('/:resoId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const resour = await Resources.findOne({ _id: req.params.resoId });
    resour.name = req.body.name;
    resour.path = req.body.path;
    resour.type = req.body.type;
    resour.description = req.body.description;
    resour.extension = req.body.extension;
    await resour.save();
    res.json({ status: 'ok', message: resour });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

module.exports = router;
module.exports.createResource = createResource;
