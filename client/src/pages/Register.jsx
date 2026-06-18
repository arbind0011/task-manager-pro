import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            await register(formData.name, formData.email, formData.password);
            setSuccessMessage('Account created successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    Join us and start managing your tasks efficiently
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
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleChange}
                        style={{
                            borderColor: errors.name ? '#dc3545' : '#ccc',
                            width: '100%'
                        }}
                        aria-label="Full Name"
                    />
                    {errors.name && (
                        <p style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.name}
                        </p>
                    )}
                </div>

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
                        placeholder="Password (min. 6 characters)" 
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

                <div>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange}
                        style={{
                            borderColor: errors.confirmPassword ? '#dc3545' : '#ccc',
                            width: '100%'
                        }}
                        aria-label="Confirm Password"
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.confirmPassword}
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
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p style={{ 
                    fontSize: '0.9rem', 
                    marginTop: '1rem',
                    color: '#666'
                }}>
                    Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;