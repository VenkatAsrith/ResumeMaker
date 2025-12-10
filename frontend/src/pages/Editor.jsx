import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, Eye, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import { resumeAPI } from '../services/api';
import ResumeForm from '../components/ResumeForm';
import LivePreview from '../components/LivePreview';
import TemplateSelector from '../components/TemplateSelector';

function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const printRef = useRef();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [autoSaveTimer, setAutoSaveTimer] = useState(null);

    // Default resume structure
    const defaultResume = {
        title: 'My Resume',
        templateId: 'modern_blue',
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            website: '',
            photo: '',
            summary: '',
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
    };

    useEffect(() => {
        if (id) {
            fetchResume();
        } else {
            setResume(defaultResume);
            setLoading(false);
        }
    }, [id]);

    const fetchResume = async () => {
        try {
            const response = await resumeAPI.getById(id);
            setResume(response.data);
        } catch (error) {
            toast.error('Failed to load resume');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section, data) => {
        const updatedResume = { ...resume };

        if (section === 'root') {
            Object.assign(updatedResume, data);
        } else {
            updatedResume[section] = data;
        }

        setResume(updatedResume);

        // Auto-save after 2 seconds of inactivity
        if (autoSaveTimer) clearTimeout(autoSaveTimer);
        const timer = setTimeout(() => {
            handleSave(updatedResume, true);
        }, 2000);
        setAutoSaveTimer(timer);
    };

    const handleSave = async (resumeData = resume, isAutoSave = false) => {
        if (!id) {
            try {
                const response = await resumeAPI.create(resumeData);
                navigate(`/editor/${response.data._id}`, { replace: true });
                if (!isAutoSave) toast.success('Resume created!');
            } catch (error) {
                toast.error('Failed to create resume');
            }
            return;
        }

        setSaving(true);
        try {
            await resumeAPI.update(id, resumeData);
            if (!isAutoSave) toast.success('Resume saved!');
        } catch (error) {
            toast.error('Failed to save resume');
        } finally {
            setSaving(false);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: resume?.title || 'Resume',
        pageStyle: `
      @page { 
        size: A4; 
        margin: 0; 
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
    });

    const handleTemplateSelect = (templateId) => {
        handleChange('root', { templateId });
        setShowTemplates(false);
        toast.success('Template applied!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b border-dark-700/50 bg-dark-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn-secondary p-2"
                                title="Back to Dashboard"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={resume.title}
                                onChange={(e) => handleChange('root', { title: e.target.value })}
                                className="text-xl font-semibold bg-transparent border-none outline-none focus:ring-0"
                                placeholder="Resume Title"
                            />
                            {saving && (
                                <span className="text-sm text-dark-400 flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowTemplates(true)}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <Edit3 className="w-4 h-4" /> Template
                            </button>
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" /> {showPreview ? 'Edit' : 'Preview'}
                            </button>
                            <button
                                onClick={() => handleSave()}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Save
                            </button>
                            <button
                                onClick={handlePrint}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Form Panel */}
                <div className={`${showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full lg:w-1/2'} overflow-y-auto p-6`}>
                    <ResumeForm
                        resume={resume}
                        onChange={handleChange}
                        onPhotoUpload={async (file) => {
                            if (!id) {
                                toast.error('Please save the resume first');
                                return;
                            }
                            try {
                                const response = await resumeAPI.uploadPhoto(id, file);
                                handleChange('personalInfo', {
                                    ...resume.personalInfo,
                                    photo: response.data.photo,
                                });
                                toast.success('Photo uploaded!');
                            } catch (error) {
                                toast.error('Failed to upload photo');
                            }
                        }}
                    />
                </div>

                {/* Preview Panel */}
                <div className={`${showPreview ? 'w-full' : 'hidden lg:block lg:w-1/2'} bg-dark-800/50 overflow-y-auto p-6`}>
                    <div className="sticky top-0">
                        <LivePreview resume={resume} ref={printRef} />
                    </div>
                </div>
            </main>

            {/* Template Selector Modal */}
            {showTemplates && (
                <TemplateSelector
                    currentTemplate={resume.templateId}
                    onSelect={handleTemplateSelect}
                    onClose={() => setShowTemplates(false)}
                />
            )}
        </div>
    );
}

export default Editor;
