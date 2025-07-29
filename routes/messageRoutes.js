const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Save a new message
router.post('/', async (req, res) => {
  try {
    const { email, message, unlockDate } = req.body;
    const newMessage = new Message({ email, message, unlockDate });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Get locked messages (isUnlocked: false)
router.get('/locked', async (req, res) => {
  try {
    const lockedMessages = await Message.find({ isUnlocked: false });
    res.json({ success: true, data: lockedMessages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Get unlocked messages (isUnlocked: true and unlockDate passed)
router.get('/unlocked', async (req, res) => {
  try {
    const now = new Date();
    const unlockedMessages = await Message.find({
      isUnlocked: true,
      unlockDate: { $lte: now }
    });
    res.json({ success: true, data: unlockedMessages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Get messages for a specific user
router.get('/:email', async (req, res) => {
  try {
    const userMessages = await Message.find({ email: req.params.email });
    res.json({ success: true, data: userMessages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
