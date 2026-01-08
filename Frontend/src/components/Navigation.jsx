import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/clerk-react';

const Navigation = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-vibrant rounded-lg flex items-center justify-center text-white font-bold shadow-glow group-hover:shadow-glow-accent transition-all">
              <Zap size={20} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent hidden sm:inline">
              SnapURL
            </span>
          </Link>

          {/* User Section */}
          {isSignedIn && (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: undefined,
                elements: {
                  avatarBox: 'w-8 h-8 rounded-full border border-white/20 hover:border-primary-400 transition-colors',
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
