const express = require('express');
const router = express.Router();
const upload = require('express-fileupload');
router.use(upload());

router.post("/", function(req, res){
    if(req.files){
        console.log(req.files)
        const file =req.files.filename;
        const filename = file.name;
        console.log(filename);
        file.mv(process.env.ASSETS_PATH+filename, function(err){
            if(err){
                console.log(err);
            }
            else{
                res.send("done!");
            }
        });
    }
});

module.exports = router;