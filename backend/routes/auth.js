const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  console.log('Login attempt', req.body); // Log for debugging
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).send('User not found');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).send('Invalid password');

  req.session.user = user._id;
  res.send({ message: 'Logged in successfully', user: { username: user.username } });
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send({ message: 'Logged out successfully' });
});

// CHECK AUTH
router.get('/auth-check', async (req, res) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user).select('username');
    return res.send({ authenticated: true, user });
  } else {
    return res.send({ authenticated: false });
  }
});


module.exports = router;
