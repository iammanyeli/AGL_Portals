import React, { useState } from 'react';
import { User, Mail, Lock } from '../../components/icons';

const SignupPage = ({ setAuthView, onSignup }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        onSignup(fullName, email, password);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-[#1B365F] dark:text-white mb-2">Create an Account</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Join us to start managing your operations.</p>
            <form onSubmit={handleSignup} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="text" placeholder="Full Name"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="email" placeholder="Email Address"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1B365F] dark:bg-[#EED58E] dark:hover:bg-[#EED58E]/90 text-white dark:text-[#1B365F] hover:bg-[#1B365F]/90 px-4 py-3 text-base">Sign Up</button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Already have an account?
                    <button onClick={() => setAuthView('login')} className="font-semibold text-[#1B365F] dark:text-[#EED58E] hover:underline focus:outline-none ml-1">Log in</button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;