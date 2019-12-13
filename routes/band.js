const express = require('express');
const router = express.Router();
const Band = require('../models/Band');

// Get all the bands
router.get('/', async (req, res) =>{
    try{
        const bands = await Band.find();
        res.json(bands);
    }catch(err){
        res.json({message: err});
    }
});

//Create band
router.post('/', async (req, res) =>{
    const band = new Band({
        name: req.body.name,
        description: req.body.description
    });
    try{
        const saveBand = await band.save();
        res.json(saveBand);
    }catch(err){
        res.json({message: err});
    }
});

// Get band by id band
router.get('/:bandId', async (req, res) =>{
    try{
        const band = await  Band.findById(req.params.bandId);
        res.json(band);
    }catch(err){
        res.json({message: err});
    }
});

// Delete band
router.delete('/:bandId', async (req, res) =>{
    try{
        const removedBand = await  Band.remove({_id: req.params.bandId});
        res.json(removedBand);
    }catch(err){
        res.json({message: err});
    }
});

//Update band
router.patch('/:bandId', async (req, res) =>{
    try{
        const updatedBand = await Band.updateOne(
            {_id: req.params.bandId},
            {$set: {name: req.body.name}}
        );
        res.json(updatedBand);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;