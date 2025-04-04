import React, { useContext, useState, useRef } from 'react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Turnstile from 'react-turnstile';

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    const checkPasswordStrength = (password) => {
        const length = password.length >= 6;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordStrength({ length, uppercase, lowercase, number, special });
    };

    const getPasswordStrengthText = () => {
        const { length, uppercase, lowercase, number, special } = passwordStrength;
        const fulfilled = [length, uppercase, lowercase, number, special].filter(Boolean).length;

        if (fulfilled === 0) return '';
        if (fulfilled < 3) return 'Weak password';
        if (fulfilled < 5) return 'Medium password';
        return 'Strong password';
    };

    const isPasswordValid = () => {
        const { length, uppercase, lowercase, number, special } = passwordStrength;
        return length && uppercase && lowercase && number && special;
    };

    const handleTurnstileVerify = (token) => {
        setTurnstileToken(token);
    };

    const handleTurnstileExpire = () => {
        setTurnstileToken('');
        toast.warning('Verification expired, please verify again.');
    };

    const handleTurnstileError = () => {
        toast.error('Verification failed, please try again.');
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter both email and password.');
            return;
        }

        if (state === 'Sign Up' && !isPasswordValid()) {
            toast.error('Please enter a strong password.');
            return;
        }

        if (!turnstileToken) {
            toast.error('Please complete the security verification.');
            return;
        }

        try {
            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
                    name,
                    email,
                    password,
                    cfTurnstileResponse: turnstileToken
                });

                if (data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/email-verify');
                    toast.success(data.message || 'Registration successful!');
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
                    email,
                    password,
                    cfTurnstileResponse: turnstileToken
                });

                if (data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                    toast.success(data.message || 'Login successful!');
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (Array.isArray(errorData.message)) {
                    errorData.message.forEach(err => toast.error(err.msg || err));
                } else {
                    toast.error(errorData.message || 'Authentication failed');
                }
            } else {
                toast.error('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-plant-green-lightest to-earth-light">
            <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt="Plant Care Logo"
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
            />
            
            {/* Decorative plant elements */}
            <div className="absolute bottom-10 left-10 opacity-70 hidden md:block">
                <div className="animate-plant-wiggle">
                    <span className="text-6xl">🌿</span>
                </div>
            </div>
            <div className="absolute top-20 right-10 opacity-70 hidden md:block">
                <div className="animate-plant-grow">
                    <span className="text-6xl">🌱</span>
                </div>
            </div>
            
            <div className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96 text-plant-green-dark border-2 border-plant-green-light">
                <h2 className="text-3xl font-primary font-bold text-plant-green-darkest text-center mb-3">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>
                <p className="text-center font-secondary text-sm mb-6 text-text-secondary">
                    {state === 'Sign Up' ? 'Create your account to get started with plant care' : 'Welcome back to your plant care journey!'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-earth-light border border-earth-medium">
                            <img src={assets.person_icon} alt="" />
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="bg-transparent outline-none font-secondary w-full"
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-earth-light border border-earth-medium">
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="bg-transparent outline-none font-secondary w-full"
                            type="text"
                            placeholder="Email id"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-earth-light border border-earth-medium">
                            <img src={assets.lock_icon} alt="" />
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    checkPasswordStrength(e.target.value);
                                }}
                                value={password}
                                className="bg-transparent outline-none font-secondary w-full"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        {state === 'Sign Up' && password && (
                            <div className="mt-2 px-2">
                                <p className="text-xs font-primary font-semibold text-plant-green-dark">
                                    Password Strength: 
                                    <span className={`ml-1 ${
                                        getPasswordStrengthText() === 'Strong password' ? 'text-healthy' : 
                                        getPasswordStrengthText() === 'Medium password' ? 'text-warning' : 'text-danger'
                                    }`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </p>
                                <div className="flex justify-between mt-1 gap-1">
                                    {['length', 'uppercase', 'lowercase', 'number'].map((key, index) => (
                                        <div
                                            key={key}
                                            className={`h-2 rounded-full flex-grow ${
                                                Object.values(passwordStrength).slice(0, index + 1).every((v) => v)
                                                    ? 'bg-healthy'
                                                    : 'bg-earth-medium'
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                                <ul className="mt-2 text-xs font-secondary">
                                    <li className={passwordStrength.length ? 'text-healthy' : 'text-danger'}>
                                        At least 6 characters
                                    </li>
                                    <li className={passwordStrength.uppercase ? 'text-healthy' : 'text-danger'}>
                                        Contains uppercase letter
                                    </li>
                                    <li className={passwordStrength.lowercase ? 'text-healthy' : 'text-danger'}>
                                        Contains lowercase letter
                                    </li>
                                    <li className={passwordStrength.number ? 'text-healthy' : 'text-danger'}>
                                        Contains a number
                                    </li>
                                    <li className={passwordStrength.special ? 'text-healthy' : 'text-danger'}>
                                        Contains a special character
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {state === 'Login' && (
                        <p
                            onClick={() => navigate('/reset-password')}
                            className="mb-4 text-accent-blue-dark cursor-pointer font-secondary hover:underline"
                        >
                            Forgot password?
                        </p>
                    )}

                    {/* Cloudflare Turnstile Widget */}
                    <div className="mb-4 flex justify-center">
                        <Turnstile
                            sitekey="0x4AAAAAABD1iQKPVltwxRGa" // Replace with your actual site key
                            onVerify={handleTurnstileVerify}
                            onExpire={handleTurnstileExpire}
                            onError={handleTurnstileError}
                            theme="light"
                            className="w-full"
                        />
                    </div>

                    <button className="w-full py-3 rounded-full bg-gradient-to-r from-plant-green-medium to-plant-green-dark text-white font-primary font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        {state}
                    </button>
                </form>

                {state === 'Sign Up' ? (
                    <p className="text-text-secondary text-center text-sm mt-4 font-secondary">
                        Already have an account?{' '}
                        <span onClick={() => setState('Login')} className="text-plant-green-dark cursor-pointer hover:underline font-semibold">
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-text-secondary text-center text-sm mt-4 font-secondary">
                        Don't have an account?{' '}
                        <span onClick={() => setState('Sign Up')} className="text-plant-green-dark cursor-pointer hover:underline font-semibold">
                            Sign up
                        </span>
                    </p>
                )}
                
                {/* Plant decorative element */}
                <div className="text-center mt-6 opacity-80">
                    <span className="text-2xl">🌱</span>
                </div>
            </div>
        </div>
    );
};

export default Login;