import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../App';
import { authAPI } from '../services/api';

function AuthForm({ mode, onModeChange, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (mode === 'register' && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            let response;
            if (mode === 'register') {
                response = await authAPI.register(formData);
                toast.success('Account created successfully!');
            } else {
                response = await authAPI.login({
                    email: formData.email,
                    password: formData.password,
                });
                toast.success('Welcome back!');
            }

            login(response.data, response.data.token);
            onClose();
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative glass-card w-full max-w-md p-8 animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold mb-2">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-dark-400">
                        {mode === 'login'
                            ? 'Sign in to access your resumes'
                            : 'Get started with your professional resume'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'register' && (
                        <div>
                            <label className="input-label">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`input-field pl-12 ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="input-label">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input-field pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="john@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="input-label">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`input-field pl-12 ${errors.password ? 'border-red-500' : ''}`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                            </>
                        ) : mode === 'login' ? (
                            'Sign In'
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-dark-400">
                        {mode === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => onModeChange('register')}
                                    className="text-primary-400 hover:text-primary-300 font-medium"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={() => onModeChange('login')}
                                    className="text-primary-400 hover:text-primary-300 font-medium"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
