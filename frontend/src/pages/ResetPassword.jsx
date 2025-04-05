//ResetPassword.jsx:

import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('OTP:', otp);
    console.log('New Password:', password);
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword: password });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-plant-green-lightest to-earth-light">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96 text-plant-green-dark border-2 border-plant-green-light">
          <h1 className="text-3xl font-primary font-bold text-plant-green-darkest text-center mb-3">Reset password</h1>
          <p className="text-center font-secondary text-sm mb-6 text-text-secondary">Enter your registered email address</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-earth-light border border-earth-medium">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none font-secondary w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-plant-green-medium to-plant-green-dark text-white font-primary font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            Submit
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP} className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96 text-plant-green-dark border-2 border-plant-green-light">
          <h1 className="text-3xl font-primary font-bold text-plant-green-darkest text-center mb-3">Reset password OTP</h1>
          <p className="text-center font-secondary text-sm mb-6 text-text-secondary">Enter the 6-digit code sent to your email id.</p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-earth-light text-plant-green-dark text-center text-xl rounded-md border border-earth-medium"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-plant-green-medium to-plant-green-dark text-white font-primary font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-96 text-plant-green-dark border-2 border-plant-green-light">
          <h1 className="text-3xl font-primary font-bold text-plant-green-darkest text-center mb-3">New password</h1>
          <p className="text-center font-secondary text-sm mb-6 text-text-secondary">Enter the New Password below</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-earth-light border border-earth-medium">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="password"
              className="bg-transparent outline-none font-secondary w-full"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-plant-green-medium to-plant-green-dark text-white font-primary font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;