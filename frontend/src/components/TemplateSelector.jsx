import { X, Check } from 'lucide-react';

const templates = [
    {
        id: 'modern_blue',
        name: 'Modern Blue',
        description: 'Clean and modern design with blue accents. Perfect for tech and creative roles.',
        preview: (
            <div className="h-full flex flex-col p-4 bg-white rounded-lg">
                <div className="text-center border-b-2 border-blue-500 pb-3 mb-3">
                    <div className="h-5 w-28 bg-blue-600 rounded mx-auto mb-2"></div>
                    <div className="flex justify-center gap-2">
                        <div className="h-2 w-16 bg-gray-300 rounded"></div>
                        <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-3 w-20 bg-blue-500 rounded"></div>
                    <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        ),
        colors: ['#2563eb', '#1e40af', '#3b82f6'],
    },
    {
        id: 'minimal_black',
        name: 'Minimal Black',
        description: 'Elegant minimalist design in black and white. Great for traditional industries.',
        preview: (
            <div className="h-full flex flex-col p-4 bg-white rounded-lg">
                <div className="border-b border-gray-800 pb-3 mb-3">
                    <div className="h-6 w-32 bg-gray-100 rounded mb-1"></div>
                    <div className="flex gap-2">
                        <div className="h-2 w-14 bg-gray-300 rounded"></div>
                        <div className="h-2 w-14 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-3 w-24 bg-gray-800 rounded"></div>
                    <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                    </div>
                </div>
            </div>
        ),
        colors: ['#1f2937', '#111827', '#4b5563'],
    },
    {
        id: 'classic_left',
        name: 'Classic Left',
        description: 'Traditional layout with left sidebar. Ideal for comprehensive resumes.',
        preview: (
            <div className="h-full flex bg-white rounded-lg overflow-hidden">
                <div className="w-1/3 bg-emerald-600 p-3">
                    <div className="w-10 h-10 bg-white/30 rounded-full mx-auto mb-2"></div>
                    <div className="h-3 w-full bg-white/20 rounded mb-3"></div>
                    <div className="space-y-1">
                        <div className="h-2 bg-white/20 rounded w-full"></div>
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                    </div>
                </div>
                <div className="flex-1 p-3">
                    <div className="h-3 w-16 bg-emerald-500 rounded mb-2"></div>
                    <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        ),
        colors: ['#059669', '#047857', '#10b981'],
    },
];

function TemplateSelector({ currentTemplate, onSelect, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative glass-card w-full max-w-4xl p-8 animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold mb-2">Choose a Template</h2>
                    <p className="text-dark-400">
                        Select a template that best fits your style and profession
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => onSelect(template.id)}
                            className={`relative glass-card-light p-4 text-left transition-all hover-lift ${currentTemplate === template.id
                                    ? 'ring-2 ring-primary-500'
                                    : 'hover:ring-1 hover:ring-dark-500'
                                }`}
                        >
                            {currentTemplate === template.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}

                            {/* Preview */}
                            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                {template.preview}
                            </div>

                            <h3 className="font-semibold mb-1">{template.name}</h3>
                            <p className="text-sm text-dark-400 mb-3">{template.description}</p>

                            {/* Color Swatches */}
                            <div className="flex gap-2">
                                {template.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-5 h-5 rounded-full border border-white/20"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TemplateSelector;
