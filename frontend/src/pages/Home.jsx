import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Shield, Download, ArrowRight, ChevronRight } from 'lucide-react';
import { AuthContext } from '../App';
import AuthForm from '../components/AuthForm';

function Home() {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const features = [
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Professional Templates',
            description: 'Choose from beautifully designed templates that stand out to recruiters.',
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: 'Easy to Use',
            description: 'Intuitive form-based input. Just fill in your details and watch your resume come to life.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Smart Handling',
            description: 'Mark fields as "NA" to exclude them. Only show what matters.',
        },
        {
            icon: <Download className="w-8 h-8" />,
            title: 'Export Anywhere',
            description: 'Download as PDF or print directly. Your resume, your way.',
        },
    ];

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            setShowAuth(true);
            setAuthMode('register');
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse-soft"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-700/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                </div>

                <nav className="relative z-10 container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold gradient-text">Resume Maker</span>
                        </div>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    Dashboard <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowAuth(true);
                                            setAuthMode('login');
                                        }}
                                        className="btn-secondary"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={handleGetStarted}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        Get Started <ArrowRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <div className="relative z-10 container mx-auto px-6 py-20 text-center">
                    <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Create <span className="gradient-text">Professional</span>
                            <br />
                            Resumes in Minutes
                        </h1>
                        <p className="text-xl text-dark-400 max-w-2xl mx-auto mb-10">
                            Build stunning resumes that get you noticed. Choose from beautiful templates,
                            fill in your details, and download your perfect resume instantly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={handleGetStarted}
                                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
                            >
                                Create Your Resume <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="btn-secondary text-lg px-8 py-4"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Preview Card */}
                    <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-card p-2 max-w-4xl mx-auto shadow-2xl">
                            <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl p-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {['Modern Blue', 'Minimal Black', 'Classic Left'].map((template, i) => (
                                        <div
                                            key={template}
                                            className="glass-card-light p-4 hover-lift cursor-pointer"
                                            style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                                        >
                                            <div className="aspect-[3/4] bg-white rounded-lg mb-3 overflow-hidden shadow-lg">
                                                <div className="h-full flex flex-col p-3">
                                                    <div className={`h-8 w-20 rounded ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-gray-800' : 'bg-emerald-500'
                                                        } mb-2`}></div>
                                                    <div className="space-y-1.5">
                                                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                                    </div>
                                                    <div className="mt-auto space-y-1.5">
                                                        <div className="h-2 bg-gray-100 rounded w-full"></div>
                                                        <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-center">{template}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-4xl font-display font-bold mb-4">
                            Everything You Need to <span className="gradient-text">Succeed</span>
                        </h2>
                        <p className="text-dark-400 max-w-xl mx-auto">
                            Our resume maker provides all the tools you need to create a professional resume that lands interviews.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="glass-card p-6 hover-lift animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-dark-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="glass-card p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-display font-bold mb-4">
                                Ready to Build Your Resume?
                            </h2>
                            <p className="text-dark-400 max-w-xl mx-auto mb-8">
                                Join thousands of professionals who have created stunning resumes with our easy-to-use builder.
                            </p>
                            <button
                                onClick={handleGetStarted}
                                className="btn-primary text-lg px-10 py-4"
                            >
                                Start Building Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-dark-700/50">
                <div className="container mx-auto px-6 text-center text-dark-500">
                    <p>&copy; {new Date().getFullYear()} Resume Maker. All rights reserved.</p>
                </div>
            </footer>

            {/* Auth Modal */}
            {showAuth && (
                <AuthForm
                    mode={authMode}
                    onModeChange={setAuthMode}
                    onClose={() => setShowAuth(false)}
                />
            )}
        </div>
    );
}

export default Home;
