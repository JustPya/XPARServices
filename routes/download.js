const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) =>{
    const filepath = process.env.ASSETS_PATH+"videos/"+req.params.name;
    res.download(filepath, (err)=>{
        if(err){
            res.send(err);
        }
    });
});

module.exports = router;