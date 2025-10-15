import React from 'react';

// icon: ChevronDownIcon
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"/></svg>
);

// primitive: SelectField
const SelectField = ({ label, name, value, onChange, options, required, disabled=false, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{label}</label>
        <div className="relative">
            <select 
                id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} 
                className={`block appearance-none w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <option value="">{placeholder || `Select ${label}...`}</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-text-secondary)]">
                <ChevronDownIcon />
            </div>
        </div>
    </div>
);

export default SelectField;
