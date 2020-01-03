const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const filepath = process.env.ASSETS_PATH + 'videos/' + req.params.name;
  res.download(filepath, err => {
    if (err) {
      res.json({ status: 'fail', message: err });
    }
  });
});

module.exports = router;
