import React, { useState, useEffect, useRef } from 'react';

// icon: DownloadIcon
const DownloadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// primitive: Button_Toggle
const Button_Toggle = ({ onClick, children }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg hover:bg-opacity-80 transition">
    {children}
  </button>
);

// primitive: DropDownItem
const DropDownItem = ({ onClick, children }) => (
  <li>
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">
      {children}
    </a>
  </li>
);

// block: DropDownLayout
const DropDownLayout = ({ children }) => (
  <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface-alt)] rounded-md shadow-lg z-10 border border-[var(--color-border)]">
    <ul className="py-1">
      {children}
    </ul>
  </div>
);

// block: ExportDropdown
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
      <Button_Toggle onClick={() => setIsOpen(o => !o)}>
        <DownloadIcon />
        <span>Export</span>
      </Button_Toggle>

      {isOpen && (
        <DropDownLayout>
          <DropDownItem onClick={() => { onPdf(); setIsOpen(false); }}>Export as PDF</DropDownItem>
          <DropDownItem onClick={() => { onExcel(); setIsOpen(false); }}>Export as Excel</DropDownItem>
        </DropDownLayout>
      )}
    </div>
  );
};

export default ExportDropdown;
