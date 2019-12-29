const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Instrument = require('../models/Instrument');


// Get all songs
router.get('/', async (req, res) =>{
    try{
        const songs = await 
        Song
        .find()
        .populate('band')
        .populate('instruments')
        .populate('resources');
        
        console.log(songs);
        const song = {
            songs: songs
        }
        res.json(song);
        
    }catch(err){
        res.json({message: err});
    }
});

// Create a song
router.post('/', async (req, res) =>{
    console.log(req.body);
    const song = new Song({
        songName: req.body.songName,
        band: req.body.band,
        instruments: req.body.instruments,
        resources: req.body.resources
    });
    try{
        const saveSong = await song.save();
        res.json(saveSong);
    }catch(err){
        res.json({message: err});
    }
});

//Get a song by id
router.get('/:songId', async (req, res) =>{
    try{
        const songs = await
        Song
        .findById(req.params.songId)
        .populate('band')
        .populate('instruments')
        .populate('resources');
        console.log(songs);
        const res2 = {
            band: songs.instruments    
        };
        res.json(songs);
    }catch(err){    
        res.json({message: err});
    }
});

// Delete song
router.delete('/:songId', async (req, res) =>{
    try{
        const removedSong = await Song.remove({_id: req.params.songId});
        res.json(removedSong);
    }catch(err){
        res.json({message: err});
    }
});

//Update song
router.patch('/:songId', async (req, res) =>{
    try{
        const song = await Song.findOne({_id: req.params.songId});
        song.songName = req.body.songName;
        song.band = req.body.band;
        song.resources = req.body.resources;
        song.instruments = req.body.instruments;
        await song.save();
        res.json(song);
    }catch(err){
        res.json({message: err});
    }
});



module.exports = router;