import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Zap, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        {/* Left side - Branding & Features */}
        <div className="text-white space-y-8 hidden md:block">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">SnapURL</h1>
            </div>
            <p className="text-gray-300 text-lg">Lightning-fast URL shortening with powerful analytics</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-semibold">Instant Shortening</h3>
              </div>
              <p className="text-gray-400 ml-11">Create shortened URLs in a single click</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Analytics</h3>
              </div>
              <p className="text-gray-400 ml-11">Track clicks, locations, and user behavior in real-time</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-semibold">QR Code Generator</h3>
              </div>
              <p className="text-gray-400 ml-11">Generate QR codes for your shortened URLs instantly</p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Join thousands of users who are already shortening their URLs with SnapURL.
            </p>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="glass p-8 space-y-6">
            {/* Tab switcher */}
            <div className="flex gap-2 bg-white/10 p-1 rounded-lg">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isSignUp
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isSignUp
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Clerk Components - Hidden by default, shown via CSS */}
            <div className="space-y-4">
              {!isSignUp ? (
                <div className="[&_iframe]:rounded-lg [&_div]:text-white [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-gray-400">
                  <SignIn
                    appearance={{
                      baseTheme: undefined,
                      elements: {
                        card: 'bg-transparent shadow-none border-0',
                        cardBox: 'bg-transparent',
                        socialButtonsBlockButton: 'border border-white/20 text-white hover:bg-white/10',
                        formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
                        footerAction: 'text-gray-400',
                        footerActionLink: 'text-purple-400 hover:text-purple-300',
                      },
                      layout: {
                        socialButtonsPlacement: 'bottom',
                      },
                    }}
                    routing="virtual"
                  />
                </div>
              ) : (
                <div className="[&_iframe]:rounded-lg [&_div]:text-white [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-gray-400">
                  <SignUp
                    appearance={{
                      baseTheme: undefined,
                      elements: {
                        card: 'bg-transparent shadow-none border-0',
                        cardBox: 'bg-transparent',
                        socialButtonsBlockButton: 'border border-white/20 text-white hover:bg-white/10',
                        formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
                        footerAction: 'text-gray-400',
                        footerActionLink: 'text-purple-400 hover:text-purple-300',
                      },
                      layout: {
                        socialButtonsPlacement: 'bottom',
                      },
                    }}
                    routing="virtual"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile branding */}
          <div className="md:hidden text-center mt-8 text-white">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold">SnapURL</h1>
            </div>
            <p className="text-gray-400 text-sm">Fast • Analytics • Professional</p>
          </div>
        </div>
      </div>
    </div>
  );
}
