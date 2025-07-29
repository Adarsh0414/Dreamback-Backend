const cron = require('node-cron');
const Message = require('../models/Message');
// const { evolveMessage } = require('../utils/aiUtils'); ❌ remove this for now

function startUnlockScheduler() {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    console.log(`[⏰] Checking for messages to unlock at ${now}`);

    try {
      const messages = await Message.find({ unlockDate: { $lte: now }, isUnlocked: false });
      console.log(`[🔍] Found ${messages.length} messages to unlock`);

      for (let msg of messages) {
        // Skip evolving for now
        msg.evolvedMessage = msg.message; // copy original message as-is
        msg.isUnlocked = true;
        await msg.save();
        console.log(`[✅] Unlocked: ${msg.email}`);
      }
    } catch (err) {
      console.error(`[🔥] Unlock scheduler error:`, err.message);
    }
  });
}

module.exports = startUnlockScheduler;
