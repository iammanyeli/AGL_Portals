import React from 'react';
import useTheme from '../../hooks/useTheme';

const AppBar = ({ user }) => {
  const { theme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#1B365F]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={theme === 'dark' ? '/agl_white_logo.svg' : '/agl_blue_logo.svg'} 
            alt="AGL Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-[#1B365F] dark:text-white tracking-wider">PORTAL SYSTEM</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-slate-300 font-medium hidden sm:block">{user?.fullName || 'User'}</span>
          <img src={user?.photoURL || "https://placehold.co/40x40/d1d5db/4b5563?text=U"} alt="Profile Thumbnail" className="w-10 h-10 rounded-full border-2 border-[#EED58E] object-cover"/>
        </div>
      </div>
    </header>
  );
}
export default AppBar;
