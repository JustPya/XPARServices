const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) =>{
    const filepath = process.env.ASSETS_PATH+req.params.name;
    res.download(filepath, (err)=>{
        res.send(err);
    });
});

module.exports = router;