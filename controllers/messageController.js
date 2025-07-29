const Message = require('../models/Message');
const { analyzeEmotion, evolveMessage } = require('../utils/aiUtils');

exports.createMessage = async (req, res) => {
  try {
    const { userName, content, unlockAt } = req.body;
    const emotion = await analyzeEmotion(content);

    const message = new Message({ userName, content, unlockAt, emotion });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnlockedMessages = async (req, res) => {
  try {
    const messages = await Message.find({ unlocked: true });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.evolveMessageNow = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    const evolved = await evolveMessage(msg.content, msg.emotion);
    msg.evolvedMessage = evolved;
    msg.unlocked = true;
    await msg.save();

    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};