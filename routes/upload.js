const express = require('express');
const router = express.Router();
const upload = require('express-fileupload');
const resources = require('./resources');
const Resource = require('../models/Resources');
const instruments = require('./instrument');
const Instrument = require('../models/Instrument');


router.use(upload());

router.post("/", function(req, res){
    if(req.files){
        const file =req.files.filename;
        const filename = file.name;
        file.mv(process.env.ASSETS_PATH+filename, async function(err){
            if(!err){
                const respond = await createRelation(filename);
                res.json(respond);
            }
            else{
                res.send(err);
            }
        });
    }
});
async function createRelation(filename){
    const type = filename.split('.');
    const resour = new Resource({
        name: type[0],
        path: process.env.ASSETS_PATH+filename,
        type: type[1]
    });
    const res = await resources.createResource(resour).then();
    return res;
}

module.exports = router;