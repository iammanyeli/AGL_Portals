import React from 'react';

const TabButton = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 font-semibold rounded-lg transition-all duration-300 w-full text-left no-print ${
            isActive
            ? 'bg-[var(--color-tab-button-active-bg)] text-[var(--color-tab-button-active-text)] shadow-lg scale-105'
            : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default TabButton;
