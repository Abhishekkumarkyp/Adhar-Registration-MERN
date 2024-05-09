// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateUID = require('../utils/uidGenerator');

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { username } = req.body;

  try {
    // Generate a unique UID
    let uid = generateUID();
    
    // Ensure UID is unique
    while (await User.exists({ uid })) {
      uid = generateUID();
    }

    // Create new user with unique UID
    const newUser = new User({ username, uid });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', uid });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

module.exports = router;
