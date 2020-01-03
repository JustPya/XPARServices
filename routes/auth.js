const express = require('express');
const router = express.Router();
const Authentication = require('../models/Authentication');

// Get all the users
router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const users = await Authentication.find();
    res.json({ status: 'ok', message: users });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Create
router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const user = new Authentication({
    username: req.body.username,
    password: req.body.password
  });
  try {
    const saveUser = await user.save();
    res.json({ status: 'ok', message: saveUser });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Get specifici band
router.get('/:authId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const user = await Authentication.findById(req.params.authId);
    res.json({ status: 'ok', message: user });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

// Delete user
router.delete('/:authId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const removedUser = await Authentication.remove({ _id: req.params.authId });
    res.json({ status: 'ok', message: removedUser });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update username
router.patch('/username/:authId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const updatedUser = await Authentication.updateOne({ _id: req.params.authId }, { $set: { username: req.body.username } });
    res.json({ status: 'ok', message: updatedUser });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

//Update password
router.patch('/pass/:authId', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  try {
    const updatedUser = await Authentication.updateOne({ _id: req.params.authId }, { $set: { password: req.body.password } });
    res.json({ status: 'ok', message: updatedUser });
  } catch (err) {
    res.json({ status: 'fail', message: err });
  }
});

router.get('/login/:user/:pass', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  try {
    const user = req.params.user;
    const pass = req.params.pass;

    const auth = await Authentication.findOne({ username: user });
    console.log(auth);
    if (auth == null) {
      res.json({ status: 'fail', message: 'Usuario y contraseña incorrectos' });
    } else {
      if (user == auth.username && pass == auth.password) {
        res.json({ status: 'ok', message: 'Login satisfactorio' });
      } else {
        res.json({ status: 'fail', message: 'Usuario y contraseña incorrectos' });
      }
    }
  } catch (err) {
    res.json({ status: 'fail', message: 'Usuario no encontrado.' });
  }
});

module.exports = router;
