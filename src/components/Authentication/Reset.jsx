/* eslint-disable react-hooks/immutability */
// ForgotPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const schoolName = "JAWABU SCHOOL";

// Dummy data for OTP verification
const DUMMY_OTP_STORAGE = {
  // In real app, this would be handled by backend
  generateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // Step state: 1-request, 2-otp verification, 3-new password
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });
  
  const [email, setEmail] = useState(''); // This would come from auth context/state
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // In a real app, you'd get the user's email from auth context or route state
  useEffect(() => {
    // For demo purposes, let's simulate getting email from logged-in user's session
    // In production, this would come from your auth context
    const userEmail = "john.doe@jawabu.com"; // This would be from your auth system
    setEmail(userEmail);
    
    // Automatically send OTP when page loads
    handleSendOTP();
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOTP = async () => {
    setIsLoading(true);
    
    // Simulate API call to send OTP to registered email
    setTimeout(() => {
      const otp = DUMMY_OTP_STORAGE.generateOTP();
      setGeneratedOTP(otp);
      
      // In production, this OTP would be sent via email by your backend
      console.log(`OTP sent to ${email}: ${otp}`);
      
      setStep(2);
      setTimer(60);
      setCanResend(false);
      setErrors({});
      setMessage(`Verification ${otp} code has been sent`);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const otp = DUMMY_OTP_STORAGE.generateOTP();
      setGeneratedOTP(otp);
      setTimer(60);
      setCanResend(false);
      
      console.log(`New OTP sent to ${email}: ${otp}`);
      setMessage(`New verification code sent to ${email}`);
      setIsLoading(false);
      
      // Clear OTP inputs
      setFormData({
        ...formData,
        otp: ['', '', '', '', '', '']
      });
    }, 1000);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOTP = [...formData.otp];
    newOTP[index] = value;
    
    setFormData({
      ...formData,
      otp: newOTP
    });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors({});
    }
  };

  const handleOTPKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear password errors
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    
    const enteredOTP = formData.otp.join('');
    
    if (enteredOTP.length !== 6) {
      setErrors({ otp: 'Please enter complete verification code' });
      return;
    }

    setIsLoading(true);

    // Simulate API verification
    setTimeout(() => {
      if (enteredOTP === generatedOTP) {
        setStep(3);
        setErrors({});
        setMessage('');
        // Clear OTP for security
        setFormData({
          ...formData,
          otp: ['', '', '', '', '', '']
        });
      } else {
        setErrors({ otp: 'Invalid verification code. Please try again.' });
      }
      setIsLoading(false);
    }, 1000);
  };

  const validatePasswords = () => {
    const { newPassword, confirmPassword } = formData;
    const errors = {};

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase and number';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    const passwordErrors = validatePasswords();
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login page with success message
      navigate('/login', { 
        state: { 
          message: 'Password reset successfully! Please login with your new password.' 
        } 
      });
    }, 1500);
  };

  const handleGoBack = () => {
    if (step === 2) {
      setStep(1);
      setTimer(60);
      setCanResend(false);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - CBE Curriculum Information */}
      <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
          alt="Education concept"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Deep Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/80"></div>
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Curved border effect */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-82 bg-red-800" 
             style={{ 
               clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
               opacity: '0.95'
             }}>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-8 lg:p-16 h-full text-center">
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
              JOINT ADVANCED WEB ANALYTICS AND BEHAVIORAL UNIT
            </h1>
            <p className="text-lg lg:text-2xl font-light text-green-300">
              Competency-Based Education
            </p>
            <div className="mt-6 flex justify-center">
              <span className="w-24 h-1.5 bg-green-500 rounded-full shadow-lg"></span>
            </div>
          </div>

          <div className="mb-12 max-w-xl">
            <p className="text-base lg:text-xl text-gray-100 leading-relaxed font-medium">
              Reset your password securely with two-factor authentication.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-8 w-full max-w-sm text-left">
            {[
              "Secure Two-Factor Authentication",
              "Encrypted Password Reset",
              "Instant Email Verification"
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-5">
                <div className="text-green-400 flex-shrink-0">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg lg:text-xl font-semibold text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Password Reset Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="max-w-md w-full">
          <div className="bg-gray-50 rounded-2xl shadow-2xl p-7 border border-blue-600">
            {/* Logo and Title */}
            <div className="text-center mb-6">
              <div className="mx-auto h-20 w-20 mb-4">
                <img 
                  src="/logo.jpeg" 
                  alt="school logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-blue-800">{schoolName}</h2>
              <p className="text-xs text-red-500 mt-1 font-semibold">STRIVING FOR EXCELLENCE</p>
            </div>

            {/* Step Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      s < 3 ? 'flex-1' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= s
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 px-1">
                <span>Verification</span>
                <span>OTP</span>
                <span>Reset</span>
              </div>
            </div>

            {/* Success/Info Message */}
            {message && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {message}
              </div>
            )}

            {/* Step 1: Auto-sent OTP Message */}
            {step === 1 && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sending Verification Code</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please wait while we send a verification code to your registered email:
                </p>
                <p className="text-sm font-medium text-blue-600 bg-blue-50 py-2 px-4 rounded-lg inline-block">
                  {email}
                </p>
                {isLoading && (
                  <div className="mt-6">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit verification code sent to your email:
                  </p>
                  {/* <p className="text-sm font-semibold text-blue-600 mt-1">{email}</p> */}
                </div>

                {/* OTP Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                    Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-xs mt-2 text-center">{errors.otp}</p>
                  )}
                </div>

                {/* Timer and Resend */}
                <div className="text-center mb-6">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend code in <span className="font-semibold text-blue-600">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={!canResend || isLoading}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                    >
                      Resend verification code
                    </button>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Verified Successfully!</h3>
                  <p className="text-sm text-gray-600 mt-1">Enter your new password below</p>
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition duration-200"
                      placeholder="Enter new password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition duration-200"
                      placeholder="Confirm new password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li className="flex items-center">
                      <span className={`mr-2 ${formData.newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-2 ${/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                      At least one lowercase letter
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-2 ${/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-2 ${/(?=.*\d)/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                      At least one number
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {/* Link to Login */}
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700">
                ← Back to Login
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} jawabu. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Powered by Syntelsafe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;