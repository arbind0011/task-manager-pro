require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Initialize DB
connectDB();
const app = express();

// Core Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

if (process.env.NODE_ENV === 'production') {
    // 1. Set static folder
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // 2. Catch-all route to serve React's index.html
    app.get(/(.*)/, (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
    );
    
} else {
    // Fallback for development mode
    app.get('/', (req, res) => res.send('API is running...'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));