const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });

  res.status(200).json({ success: true, user });
});

module.exports = router;
