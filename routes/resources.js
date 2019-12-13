const express = require('express');
const router = express.Router();
const Resources = require('../models/Resources');

// Get all the bands
router.get('/', async (req, res) =>{
    try{
        const resources = await Resources.find();
        res.json(resources);
    }catch(err){
        res.json({message: err});
    }
});

//Create Resource
router.post('/', async (req, res) =>{
    const resources = new Resources({
        name: req.body.name,
        path: req.body.path,
        type: req.body.type
    });
    try{
        const saveResource = await resources.save();
        res.json(saveResource);
    }catch(err){
        res.json({message: err});
    }
});

// Get resource by id
router.get('/:resoId', async (req, res) =>{
    try{
        const resource = await Resources.findById(req.params.resoId);
        res.json(resource);
    }catch(err){
        res.json({message: err});
    }
});

// Delete resource
router.delete('/:resoId', async (req, res) =>{
    try{
        const removedReso = await Resources.remove({_id: req.params.resoId});
        res.json(removedReso);
    }catch(err){
        res.json({message: err});
    }
});

//Update resource
router.patch('/:resoId', async (req, res) =>{
    try{
        const updatedReso = await Resources.updateOne(
            {_id: req.params.resoId},
            {$set: {name: req.body.name}},
            {$set: {path: req.body.path}},
            {$set: {type: req.body.type}}
        );
        res.json(updatedReso);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;
