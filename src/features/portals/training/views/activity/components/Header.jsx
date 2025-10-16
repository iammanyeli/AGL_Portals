import React from 'react';

// icon: ChevronLeftIcon
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
);

// block: Header
const Header = ({ title, onBack }) => (
    <div className="flex items-center justify-between mb-8">
        <div>
            <button onClick={onBack} className="flex items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors mb-2 no-print">
                <ChevronLeftIcon />
                Back to Dashboard
            </button>
        </div>
    </div>
);

export default Header;