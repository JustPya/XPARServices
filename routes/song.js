const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Instrument = require('../models/Instrument');

// Get all songs
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const songs = await Song.find()
      .populate('band')
      .populate('instruments')
      .populate('resources');

    console.log(songs);
    const song = {
      songs: songs
    };
    res.json({ status: 'ok', message: songs });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Create a song
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  const song = new Song({
    songName: req.body.songName,
    band: req.body.band,
    instruments: req.body.instruments,
    resources: req.body.resources
  });
  try {
    const saveSong = await song.save();
    res.json({ status: 'ok', message: saveSong });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Get a song by id
router.get('/:songId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const songs = await Song.findById(req.params.songId)
      .populate('band')
      .populate('instruments')
      .populate('resources');
    console.log(songs);
    res.json({ status: 'ok', message: songs });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete song
router.delete('/:songId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removedSong = await Song.remove({ _id: req.params.songId });
    res.json({ status: 'ok', message: removedSong });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update song
router.patch('/:songId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const song = await Song.findOne({ _id: req.params.songId });
    song.songName = req.body.songName;
    song.band = req.body.band;
    song.resources = req.body.resources;
    song.instruments = req.body.instruments;
    await song.save();
    res.json({ status: 'ok', message: song });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

module.exports = router;
