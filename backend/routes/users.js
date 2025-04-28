const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// CREATE USER
router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashedPassword });

  try {
    const saved = await user.save();
    res.send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // don't return passwords
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
  const updates = { username: req.body.username };
  if (req.body.password) {
    updates.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
