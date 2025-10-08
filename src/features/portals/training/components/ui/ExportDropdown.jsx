import React, { useState, useEffect, useRef } from 'react';

const ExportDropdown = ({ onPdf, onExcel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(o => !o)} className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg hover:bg-opacity-80 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Export</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface-alt)] rounded-md shadow-lg z-10 border border-[var(--color-border)]">
                    <ul className="py-1">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onPdf(); setIsOpen(false); }} className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">Export as PDF</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onExcel(); setIsOpen(false); }} className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">Export as Excel</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExportDropdown;