import React, { useState } from 'react';
import { Mail, Lock } from '../../components/icons';

// primitive: TextField_Icon
const TextField_Icon = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
        <input
            {...props}
            className="w-full pl-10 pr-3 py-3 text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent placeholder-slate-400"
        />
    </div>
);

// primitive: TextField_Icon_Password
const TextField_Icon_Password = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
        <input
            {...props}
            type="password"
            className="w-full pl-10 pr-3 py-3 text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent placeholder-slate-400"
        />
    </div>
);

// primitive: Button
const Button = (props) => (
    <button
        {...props}
        className="w-full inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:opacity-90 px-4 py-3 text-base"
    />
);

// block: Header_Subtitle
const Header_Subtitle = ({ title, subtitle }) => (
    <div>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h2>
        <p className="text-[var(--color-text-secondary)] mb-8">{subtitle}</p>
    </div>
);

// block: Footer_TextLink
const Footer_TextLink = ({ text, linkText, onClick }) => (
    <div className="mt-8 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
            {text}
            <button onClick={onClick} className="font-semibold text-[var(--color-link)] hover:underline focus:outline-none ml-1">
                {linkText}
            </button>
        </p>
    </div>
);

const LoginPage = ({ setAuthView, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div>
            <Header_Subtitle title="Welcome Back!" subtitle="Log in to continue your work." />
            <form onSubmit={handleLogin} className="space-y-6">
                <TextField_Icon
                    icon={<Mail className="h-5 w-5 text-slate-400" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="Email Address"
                />
                <TextField_Icon_Password
                    icon={<Lock className="h-5 w-5 text-slate-400" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
                <Button type="submit">Log In</Button>
            </form>
            <Footer_TextLink
                text="Don't have an account?"
                linkText="Sign up"
                onClick={() => setAuthView('signup')}
            />
        </div>
    );
};

export default LoginPage;