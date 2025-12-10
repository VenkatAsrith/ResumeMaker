import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Edit3, LogOut, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../App';
import { resumeAPI } from '../services/api';

function Dashboard() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await resumeAPI.getAll();
            setResumes(response.data);
        } catch (error) {
            toast.error('Failed to load resumes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = async () => {
        try {
            const response = await resumeAPI.create({ title: 'New Resume' });
            navigate(`/editor/${response.data._id}`);
            toast.success('Resume created!');
        } catch (error) {
            toast.error('Failed to create resume');
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this resume?')) return;

        setDeleting(id);
        try {
            await resumeAPI.delete(id);
            setResumes(resumes.filter(r => r._id !== id));
            toast.success('Resume deleted');
        } catch (error) {
            toast.error('Failed to delete resume');
        } finally {
            setDeleting(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-dark-700/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold gradient-text">Resume Maker</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 glass-card-light">
                                <User className="w-4 h-4 text-primary-400" />
                                <span className="text-sm">{user?.name || user?.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold mb-2">My Resumes</h1>
                        <p className="text-dark-400">Manage and edit your resumes</p>
                    </div>
                    <button onClick={handleCreateNew} className="btn-primary flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Create New Resume
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-primary-400" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3">No Resumes Yet</h2>
                        <p className="text-dark-400 mb-6">Create your first resume to get started</p>
                        <button onClick={handleCreateNew} className="btn-primary">
                            Create Your First Resume
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume, index) => (
                            <div
                                key={resume._id}
                                onClick={() => navigate(`/editor/${resume._id}`)}
                                className="glass-card p-6 cursor-pointer hover-lift animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/editor/${resume._id}`);
                                            }}
                                            className="p-2 rounded-lg bg-dark-700/50 hover:bg-primary-500/20 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(resume._id, e)}
                                            disabled={deleting === resume._id}
                                            className="p-2 rounded-lg bg-dark-700/50 hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deleting === resume._id ? (
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                                    {resume.title || 'Untitled Resume'}
                                </h3>

                                {resume.personalInfo?.fullName && (
                                    <p className="text-dark-400 text-sm mb-3 line-clamp-1">
                                        {resume.personalInfo.fullName}
                                    </p>
                                )}

                                <div className="flex items-center gap-4 text-xs text-dark-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Updated {formatDate(resume.updatedAt)}
                                    </span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dark-700/50">
                                    <span className="text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-400">
                                        {resume.templateId?.replace('_', ' ') || 'modern blue'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
