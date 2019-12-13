const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');

//Get all the instruments
router.get('/', async (req, res) =>{
    try{
        const instruments = await 
        Instrument
        .find()
        .populate('resource');
        res.json(instruments);
    }catch(err){
        res.json({message: err});
    }
});

//Create instrument
router.post('/', async (req, res) =>{
    const instrument = new Instrument({
        name: req.body.name,
        resource: req.body.resource
    });
    try{
        const saveInstrument = await instrument.save();
        res.json(saveInstrument);
    }catch(err){
        res.json({message: err});
    }
});

// Get instrument by id
router.get('/:instId', async (req, res) =>{
    try{
        const instrument = await 
        Instrument
        .findById(req.params.instId)
        .populate('resource');
        res.json(instrument);
    }catch(err){
        res.json({message: err});
    }
});

// Delete instrument
router.delete('/:instId', async (req, res) =>{
    try{
        const removedInst = await  Instrument.remove({_id: req.params.instId});
        res.json(removedInst);
    }catch(err){
        res.json({message: err});
    }
});

//Update band
router.patch('/:instId', async (req, res) =>{
    try{
        const updatedInst = await Instrument.updateOne(
            {_id: req.params.instId},
            {$set: {name: req.body.name}},
            {$set: {resource: req.body.resource}}
        );
        res.json(updatedInst);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;