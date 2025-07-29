const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/auth');
const startUnlockScheduler = require('./scheduler/unlockChecker');

dotenv.config();
console.log("DEBUG: OPENAI KEY =", process.env.OPENAI_API_KEY); 

// Initialize app FIRST
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Use routes AFTER app is defined
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Start the unlock scheduler
startUnlockScheduler();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
