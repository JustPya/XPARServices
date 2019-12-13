const express = require('express');
const router = express.Router();
const Authentication = require('../models/Authentication');

// Get all the users
router.get('/', async (req, res) =>{
    try{
        const users = await Authentication.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

//Create
router.post('/', async (req, res) =>{
    const user = new Authentication({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const saveUser = await user.save();
        res.json(saveUser);
    }catch(err){
        res.json({message: err});
    }
});

// Get specifici band
router.get('/:authId', async (req, res) =>{
    try{
        const user = await  Authentication.findById(req.params.authId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

// Delete user
router.delete('/:authId', async (req, res) =>{
    try{
        const removedUser = await  Authentication.remove({_id: req.params.authId});
        res.json(removedUser);
    }catch(err){
        res.json({message: err});
    }
});

//Update username
router.patch('/username/:authId', async (req, res) =>{
    try{
        const updatedUser = await Authentication.updateOne(
            {_id: req.params.authId},
            {$set: {username: req.body.username}}
        );
        res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }
});

//Update password
router.patch('/pass/:authId', async (req, res) =>{
    try{
        const updatedUser = await Authentication.updateOne(
            {_id: req.params.authId},
            {$set: {password: req.body.password}}
        );
        res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;