import React, { useState } from 'react';
import { User, Mail, Lock } from '../../components/icons';

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
            <Header_Subtitle title="Create an Account" subtitle="Join us to start managing your operations." />
            <form onSubmit={handleSignup} className="space-y-6">
                <TextField_Icon
                    icon={<User className="h-5 w-5 text-slate-400" />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    type="text"
                    placeholder="Full Name"
                />
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
                <Button type="submit">Sign Up</Button>
            </form>
            <Footer_TextLink
                text="Already have an account?"
                linkText="Log in"
                onClick={() => setAuthView('login')}
            />
        </div>
    );
};

export default SignupPage;