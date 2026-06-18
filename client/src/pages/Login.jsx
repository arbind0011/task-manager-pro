import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        
        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            setSuccessMessage('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    Sign in to your account and continue managing your tasks
                </p>

                {successMessage && (
                    <div style={{
                        padding: '0.8rem',
                        borderRadius: '4px',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        border: '1px solid #c3e6cb'
                    }}>
                        ✓ {successMessage}
                    </div>
                )}

                {errors.submit && (
                    <div style={{
                        padding: '0.8rem',
                        borderRadius: '4px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        border: '1px solid #f5c6cb'
                    }}>
                        ✗ {errors.submit}
                    </div>
                )}

                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange}
                        style={{
                            borderColor: errors.email ? '#dc3545' : '#ccc',
                            width: '100%'
                        }}
                        aria-label="Email Address"
                    />
                    {errors.email && (
                        <p style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange}
                        style={{
                            borderColor: errors.password ? '#dc3545' : '#ccc',
                            width: '100%'
                        }}
                        aria-label="Password"
                    />
                    {errors.password && (
                        <p style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.password}
                        </p>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isLoading}
                    style={{
                        opacity: isLoading ? 0.6 : 1,
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <p style={{ 
                    fontSize: '0.9rem', 
                    marginTop: '1rem',
                    color: '#666'
                }}>
                    Need an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;