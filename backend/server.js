const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const templateRoutes = require('./routes/templates');

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

// CORS Configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || true  // In production, use FRONTEND_URL or allow all
        : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Resume Maker API is running',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from frontend build
    const frontendPath = path.join(__dirname, '../frontend/dist');

    if (fs.existsSync(frontendPath)) {
        app.use(express.static(frontendPath));

        // Handle React Router - serve index.html for all non-API routes
        app.get('*', (req, res) => {
            if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
                res.sendFile(path.join(frontendPath, 'index.html'));
            }
        });

        console.log('📦 Serving frontend from:', frontendPath);
    } else {
        console.log('⚠️  Frontend build not found at:', frontendPath);
        console.log('   Run "npm run build" in the frontend directory first.');
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Something went wrong!'
            : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    // Don't exit in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
});
