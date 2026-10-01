require('dotenv').config();          // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Import the database connection

// Import route files
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const scanRoutes = require('./routes/scans');
const emergencyRoutes = require('./routes/emergency');
const smsRoutes = require('./routes/sms');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/sms', smsRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));