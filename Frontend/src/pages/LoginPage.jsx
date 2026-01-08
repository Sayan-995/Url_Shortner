import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { Mail, Lock, User, ArrowRight, Loader, Chrome } from 'lucide-react';

const LoginPage = () => {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInLoaded) return;

    setError('');
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        window.location.href = '/dashboard';
      } else if (result.status === 'needs_factor_one_more_time') {
        setPendingVerification(true);
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Sign in failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        window.location.href = '/dashboard';
      } else if (result.status === 'missing_requirements') {
        setError('Please fill all required fields');
      } else {
        setPendingVerification(true);
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Sign up failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === 'complete') {
          window.location.href = '/dashboard';
        }
      } else {
        // For sign in, verification might be handled differently
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signInLoaded) return;
    
    try {
      setError('');
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/auth-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Google sign in failed');
      console.error(err);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!signUpLoaded) return;
    
    try {
      setError('');
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/auth-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Google sign up failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-vibrant rounded-2xl mb-4 shadow-glow-accent">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SnapURL</h1>
          <p className="text-primary-300 text-sm">Shorten. Share. Track.</p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
          {pendingVerification ? (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
                <p className="text-gray-300 text-sm">Enter the verification code sent to {email}</p>
              </div>

              {error && (
                <div className="bg-danger-500/20 border border-danger-500/50 rounded-lg p-4 text-danger-200 text-sm">
                  {error}
                </div>
              )}

              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                maxLength="6"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-center text-2xl tracking-widest"
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-vibrant text-white font-semibold rounded-lg hover:shadow-glow-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPendingVerification(false)}
                className="w-full py-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                Back to {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-300 text-sm">
                  {isSignUp
                    ? 'Join us to start shortening URLs'
                    : 'Sign in to manage your links'}
                </p>
              </div>

              {error && (
                <div className="bg-danger-500/20 border border-danger-500/50 rounded-lg p-4 text-danger-200 text-sm">
                  {error}
                </div>
              )}

              {isSignUp && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                  disabled={loading}
                  required
                />
              </div>

              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                  disabled={loading}
                  required
                />
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                    disabled={loading}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-vibrant text-white font-semibold rounded-lg hover:shadow-glow-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={isSignUp ? handleGoogleSignUp : handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 bg-white/10 border border-white/20 hover:border-primary-500/50 hover:bg-white/15 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
              >
                <Chrome size={20} className="text-primary-400" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setFirstName('');
                  setLastName('');
                }}
                className="w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Secure authentication powered by industry-leading security standards
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
