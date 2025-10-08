// src/features/authentication/index.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import useAuth from '../../hooks/useAuth';

const AuthPage = () => {
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const { login, signup } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-[var(--color-surface)] backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center items-center text-center bg-[var(--color-brand-surface)]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-brand-gradient-from)] to-[var(--color-brand-gradient-to)] opacity-50 z-0"></div>
          <div className="relative z-10">
            <img src="/agl_white_logo.svg" alt="AGL Logo" className="max-w-xs w-full mx-auto mb-4" />
            <h1 className="text-3xl font-bold tracking-wider mb-3 text-[var(--color-accent)]">Portal System</h1>
          </div>
        </div>
        <div className="w-full lg:w-7/12 p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={authView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {authView === 'login' ? <LoginPage setAuthView={setAuthView} onLogin={login} /> : <SignupPage setAuthView={setAuthView} onSignup={signup} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;