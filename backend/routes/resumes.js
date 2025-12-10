const express = require('express');
const multer = require('multer');
const path = require('path');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure multer for photo uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'));
    }
});

// @route   GET /api/resumes
// @desc    Get all resumes for current user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resumes'
        });
    }
});

// @route   GET /api/resumes/:id
// @desc    Get single resume
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }
        res.json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Get resume error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resume'
        });
    }
});

// @route   POST /api/resumes
// @desc    Create new resume
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const resumeData = {
            ...req.body,
            user: req.user._id
        };
        const resume = await Resume.create(resumeData);
        res.status(201).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Create resume error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating resume'
        });
    }
});

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        let resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating resume'
        });
    }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting resume'
        });
    }
});

// @route   POST /api/resumes/:id/photo
// @desc    Upload photo for resume
// @access  Private
router.post('/:id/photo', protect, upload.single('photo'), async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        resume.personalInfo.photo = `/uploads/${req.file.filename}`;
        await resume.save();

        res.json({
            success: true,
            data: {
                photo: resume.personalInfo.photo
            }
        });
    } catch (error) {
        console.error('Upload photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading photo'
        });
    }
});

module.exports = router;
