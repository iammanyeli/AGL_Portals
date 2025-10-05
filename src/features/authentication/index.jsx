import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const AuthPage = ({ onLogin, onSignup }) => {
    const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
             <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-white dark:bg-[#1B365F]/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center items-center text-center bg-[#1B365F] dark:bg-black/20">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1B365F] to-[#122442] opacity-50 z-0"></div>
                     <div className="relative z-10">
                        <img src="/agl_white_logo.svg" alt="AGL Logo" className="max-w-xs w-full mx-auto mb-4" />

                        <h1 className="text-3xl font-bold tracking-wider mb-3 text-[#EED58E]">Portal System</h1>
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
                                {authView === 'login' ? <LoginPage setAuthView={setAuthView} onLogin={onLogin} /> : <SignupPage setAuthView={setAuthView} onSignup={onSignup} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;