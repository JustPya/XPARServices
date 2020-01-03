const express = require('express');
const fs = require('fs-extra');
const upload = require('express-fileupload');
const resources = require('./resources');
const Resource = require('../models/Resources');
const router = express.Router();

router.use(upload());

router.post('/video', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.files) {
    const file = req.files.filename;
    const filename = file.name;
    file.mv(process.env.ASSETS_PATH + '/videos/' + filename, async err => {
      console.log(err);
      res.send({ status: 'fail', message: err });
    });
  }
});

router.post('/image', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.files) {
    const file = req.files.filename;
    const filename = file.name;
    file.mv(process.env.ASSETS_PATH + '/images/' + filename, async err => {
      res.json({ status: 'ok', message: err });
    });
  }
});

router.post('/update-resource', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const type = req.body.type;
  const filename = req.body.filename;
  const newFilename = req.body.newFilename;
  const path = process.env.ASSETS_PATH + type + '/';
  try {
    fs.rename(path + filename, path + newFilename);
    res.json({ status: 'ok', message: 'Recurso grabado' });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

async function createRelation(filename) {
  res.header('Access-Control-Allow-Origin', '*');
  const type = filename.split('.');
  const resour = new Resource({
    name: type[0],
    path: process.env.ASSETS_PATH + filename,
    type: type[1]
  });
  const res = await resources.createResource(resour).then();
  return res;
}

module.exports = router;
