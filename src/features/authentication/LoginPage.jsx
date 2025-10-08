import React, { useState } from 'react';
import { Mail, Lock } from '../../components/icons';

const LoginPage = ({ setAuthView, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Welcome Back!</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Log in to continue your work.</p>
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent placeholder-slate-400" type="email" placeholder="Email Address"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent placeholder-slate-400" type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:opacity-90 px-4 py-3 text-base">Log In</button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-[var(--color-text-secondary)]">Don't have an account?
                    <button onClick={() => setAuthView('signup')} className="font-semibold text-[var(--color-link)] hover:underline focus:outline-none ml-1">Sign up</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;