const express = require('express');
const router = express.Router();

// Available templates
const templates = [
    {
        id: 'modern_blue',
        name: 'Modern Blue',
        description: 'Clean and modern design with blue accents',
        thumbnail: '/templates/modern_blue.png',
        colors: {
            primary: '#2563eb',
            secondary: '#1e40af',
            accent: '#3b82f6'
        }
    },
    {
        id: 'minimal_black',
        name: 'Minimal Black',
        description: 'Elegant minimalist design in black and white',
        thumbnail: '/templates/minimal_black.png',
        colors: {
            primary: '#1f2937',
            secondary: '#111827',
            accent: '#4b5563'
        }
    },
    {
        id: 'classic_left',
        name: 'Classic Left',
        description: 'Traditional layout with left sidebar',
        thumbnail: '/templates/classic_left.png',
        colors: {
            primary: '#059669',
            secondary: '#047857',
            accent: '#10b981'
        }
    }
];

// @route   GET /api/templates
// @desc    Get all available templates
// @access  Public
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: templates.length,
        data: templates
    });
});

// @route   GET /api/templates/:id
// @desc    Get single template
// @access  Public
router.get('/:id', (req, res) => {
    const template = templates.find(t => t.id === req.params.id);
    if (!template) {
        return res.status(404).json({
            success: false,
            message: 'Template not found'
        });
    }
    res.json({
        success: true,
        data: template
    });
});

module.exports = router;
