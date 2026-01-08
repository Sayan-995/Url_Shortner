import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/store';
import Alert from '../components/Alert';
import { validators } from '../utils/validators';
import apiClient from '../api/client';

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validators.email(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validators.password(password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend authentication endpoint
      const response = await apiClient.post('/auth/signin', {
        email,
        password,
      });

      const { user, token } = response.data;
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('clerkToken', token);
      
      setUser(user);
      setSuccess('Signed in successfully!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to sign in. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-main rounded-2xl text-white mb-4">
            <span className="text-3xl font-bold">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SnapURL</h1>
          <p className="text-gray-600 mt-2">Professional URL Shortener</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm mb-8">Sign in to your account to continue</p>

          {error && <Alert type="error" message={error} onClose={() => setError('')} autoClose={false} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-main text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-lg text-center text-sm text-gray-600">
          Using your Clerk authentication credentials
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
