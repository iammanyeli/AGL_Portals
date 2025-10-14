import React from 'react';

// New UI enhancement: Search Icon component, self-contained here.
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

// New UI enhancement: A dedicated component for the search bar with an icon.
const SearchInputField = ({ className, ...props }) => (
    <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-text-secondary)] pointer-events-none">
            <SearchIcon />
        </span>
        <input 
            type="text"
            {...props}
            className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] transition-shadow pl-10 ${className || ''}`} 
        />
    </div>
);

export default SearchInputField;
