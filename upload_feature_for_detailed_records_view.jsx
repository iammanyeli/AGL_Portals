import React, { useState, useMemo, useEffect, createContext, useContext, useRef } from 'react';

// --- STYLES ---
/* BEGIN EXTRACT: src/index.css */
const GlobalStyles = () => (
  <style>{`
    @import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";

    :root {
      --font-sans: "Inter", system-ui, sans-serif;

      /* Brand */
      --color-brand-surface: #1B365F;
      --color-brand-gradient-from: #1B365F;
      --color-brand-gradient-to: #122442;

      /* Backgrounds */
      --color-bg: #f1f5f9;
      --color-surface: #ffffff;
      --color-surface-alt: #ffffff;
      --color-surface-subtle: #f8fafc;
      --color-surface-contrast: #f1f5f9;
      --color-surface-hover: #e2e8f0;
      --color-surface-highlight: #e2e8f0;
      --color-input-bg: #f1f5f9;
      --color-control-surface-bg: #e2e8f0;
      --color-surface-destructive: #fee2e2; /* New */

      /* Text */
      --color-header: #1B365F;
      --color-text-primary: #1B365F;
      --color-text-secondary: #64748b;
      --color-text-inverted: #ffffff;
      --color-link: #1B365F;

      /* Accent */
      --color-accent: #EED58E;
      --color-accent-text: #1B365F;
      --color-ring: rgba(238, 213, 142, 0.8);
      --color-highlight: #dbeafe;

      /* Buttons */
      --color-button-primary-bg: #1B365F;
      --color-button-primary-text: #ffffff;
      --color-button-destructive-bg: rgba(239, 68, 68, 0.1);
      --color-button-destructive-hover-bg: rgba(239, 68, 68, 0.2);
      --color-button-destructive-text: #ef4444;
      --color-button-destructive-solid-bg: #dc2626;
      --color-button-destructive-solid-hover-bg: #b91c1c;
      --color-button-destructive-solid-text: #ffffff;
      --color-button-info-bg: #3b82f6;
      --color-button-info-hover-bg: #2563eb;
      --color-button-info-text: #ffffff;
      --color-button-warning-bg: #f97316;
      --color-button-warning-hover-bg: #ea580c;
      --color-button-warning-text: #ffffff;
      --color-button-subtle-destructive-bg: #fee2e2;
      --color-button-subtle-destructive-hover-bg: #fecaca;
      --color-button-subtle-destructive-text: #dc2626;
      --color-button-subtle-destructive-border: #fca5a5;

      /* Icon Containers */
      --color-icon-container-warning-bg: #ffedd5;
      --color-icon-container-warning-text: #f97316;
      --color-icon-container-info-bg: #dbeafe;
      --color-icon-container-info-text: #3b82f6;

      /* Tabs & Toggles */
      --tab-active-bg: #ffffff;
      --tab-active-text: #1B365F;
      --color-icon-toggle-active: var(--color-text-primary);
      --color-tab-container-bg: #f1f5f9;
      --color-tab-button-active-bg: var(--color-text-primary);
      --color-tab-button-active-text: var(--color-text-inverted);

      /* Tables */
      --color-table-header-bg: #f8fafc;
      --color-table-row-hover-bg: #f1f5f9;
      --color-table-row-active-bg: var(--color-highlight);

      /* Borders */
      --color-border: #e2e8f0;
      --color-divider: rgba(0, 0, 0, 0.05);
      --color-border-destructive: #fecaca; /* New */

      /* Navigation */
      --color-nav-bg: rgba(255, 255, 255, 0.7);
      --color-nav-text: #1B365F;
      --color-nav-hover-bg: rgba(238, 213, 142, 0.15);
      --color-nav-active-bg: rgba(238, 213, 142, 0.25);
      --color-nav-tooltip-bg: #1f2937;
      --color-nav-tooltip-text: white;

      /* Shadows */
      --shadow-card: 0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05);

      /* Status & Badges */
      --color-success: #22c55e;
      --color-warning: #f59e0b;
      --color-danger: #ef4444;
      --color-info: #3b82f6;
      --color-badge-success-bg: #dcfce7;
      --color-badge-success-text: #166534;
      --color-badge-warning-bg: #fef3c7;
      --color-badge-warning-text: #92400e;
      --color-badge-danger-bg: #fee2e2;
      --color-badge-danger-text: #991b1b;

      /* Chart Colors */
      --chart-axis-line: rgba(100, 116, 139, 0.6);
      --chart-grid-line: rgba(203, 213, 225, 0.5);
      --chart-label-text: #64748b;
      --chart-tooltip-bg: #ffffff;
      --chart-tooltip-text: #334155;
      --chart-tooltip-border: #e2e8f0;
    }

    .dark {
      /* Brand */
      --color-brand-surface: #1B365F;
      --color-brand-gradient-from: #1B365F;
      --color-brand-gradient-to: #122442;

      /* Backgrounds */
      --color-bg: #1B365F;
      --color-surface: #274067;
      --color-surface-alt: #1B365F;
      --color-surface-subtle: rgba(255, 255, 255, 0.05);
      --color-surface-contrast: #324A6F;
      --color-surface-hover: rgba(255, 255, 255, 0.1);
      --color-surface-highlight: var(--color-surface-contrast);
      --color-input-bg: rgba(255, 255, 255, 0.05);
      --color-control-surface-bg: rgba(255, 255, 255, 0.05);
      --color-surface-destructive: rgba(220, 38, 38, 0.15); /* New */

      /* Text */
      --color-header: #EED58E;
      --color-text-primary: #ffffff;
      --color-text-secondary: #94a3b8;
      --color-text-inverted: #1B365F;
      --color-link: var(--color-accent);

      /* Accent */
      --color-accent: #EED58E;
      --color-accent-text: #1B365F;
      --color-ring: #EED58E;
      --color-highlight: rgba(59, 130, 246, 0.2);

      /* Buttons */
      --color-button-primary-bg: var(--color-accent);
      --color-button-primary-text: var(--color-accent-text);
      --color-button-destructive-bg: rgba(239, 68, 68, 0.1);
      --color-button-destructive-hover-bg: rgba(239, 68, 68, 0.2);
      --color-button-destructive-text: #f87171;
      --color-button-destructive-solid-bg: #dc2626;
      --color-button-destructive-solid-hover-bg: #b91c1c;
      --color-button-destructive-solid-text: #ffffff;
      --color-button-info-bg: #3b82f6;
      --color-button-info-hover-bg: #2563eb;
      --color-button-info-text: #ffffff;
      --color-button-warning-bg: #f97316;
      --color-button-warning-hover-bg: #ea580c;
      --color-button-warning-text: #ffffff;
      --color-button-subtle-destructive-bg: rgba(220, 38, 38, 0.2);
      --color-button-subtle-destructive-hover-bg: rgba(220, 38, 38, 0.3);
      --color-button-subtle-destructive-text: #f87171;
      --color-button-subtle-destructive-border: rgba(248, 113, 113, 0.3);

      /* Icon Containers */
      --color-icon-container-warning-bg: rgba(249, 115, 22, 0.2);
      --color-icon-container-warning-text: #fb923c;
      --color-icon-container-info-bg: rgba(59, 130, 246, 0.2);
      --color-icon-container-info-text: #60a5fa;

      /* Tabs & Toggles */
      --tab-active-bg: var(--color-accent);
      --tab-active-text: var(--color-accent-text);
      --color-icon-toggle-active: var(--color-accent);
      --color-tab-container-bg: var(--color-surface-contrast);
      --color-tab-button-active-bg: var(--color-accent);
      --color-tab-button-active-text: var(--color-accent-text);

      /* Tables */
      --color-table-header-bg: rgba(255, 255, 255, 0.05);
      --color-table-row-hover-bg: rgba(255, 255, 255, 0.1);
      --color-table-row-active-bg: var(--color-highlight);

      /* Borders */
      --color-border: rgba(255, 255, 255, 0.1);
      --color-divider: rgba(255, 255, 255, 0.1);
      --color-border-destructive: rgba(248, 113, 113, 0.2); /* New */

      /* Navigation */
      --color-nav-bg: rgba(27, 54, 95, 0.7);
      --color-nav-text: #EED58E;
      --color-nav-hover-bg: rgba(238, 213, 142, 0.2);
      --color-nav-active-bg: rgba(238, 213, 142, 0.3);
      --color-nav-tooltip-bg: #f8fafc;
      --color-nav-tooltip-text: #1B365F;

      /* Shadows */
      --shadow-card: 0 0 0 1px rgba(255,255,255,0.1), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

      /* Status & Badges */
      --color-success: #22c55e;
      --color-warning: #f59e0b;
      --color-danger: #ef4444;
      --color-info: #3b82f6;
      --color-badge-success-bg: rgba(74, 222, 128, 0.2);
      --color-badge-success-text: #86efac;
      --color-badge-warning-bg: rgba(251, 191, 36, 0.2);
      --color-badge-warning-text: #fcd34d;
      --color-badge-danger-bg: rgba(248, 113, 113, 0.2);
      --color-badge-danger-text: #fda4af;

      /* Chart Colors */
      --chart-axis-line: rgba(150, 166, 189, 0.6);
      --chart-grid-line: rgba(100, 116, 139, 0.5);
      --chart-label-text: #94a3b8;
      --chart-tooltip-bg: #1B365F;
      --chart-tooltip-text: #ffffff;
      --chart-tooltip-border: rgba(255, 255, 255, 0.2);
    }
    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text-primary);
      transition: background-color 0.5s, color 0.5s;
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .cert-list-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .cert-list-scrollbar::-webkit-scrollbar-track {
        background: var(--color-surface-contrast);
        border-radius: 10px;
    }
    .cert-list-scrollbar::-webkit-scrollbar-thumb {
        background: var(--color-text-secondary);
        border-radius: 10px;
    }
    .cert-list-scrollbar::-webkit-scrollbar-thumb:hover {
        background: var(--color-text-primary);
    }
    .modal-content::-webkit-scrollbar {
        width: 8px;
    }
    .modal-content::-webkit-scrollbar-track {
        background: transparent;
    }
    .modal-content::-webkit-scrollbar-thumb {
        background-color: var(--color-border);
        border-radius: 4px;
    }
    .no-print {
      display: revert;
    }
    @media print {
      .no-print, .no-print * { display: none !important; }
      body { background-color: #fff; }
    }
  `}</style>
);
/* END EXTRACT: src/index.css */


// --- DEPENDENCIES ---

// BEGIN EXTRACT: src/providers/ThemeProvider.jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);
// END EXTRACT: src/providers/ThemeProvider.jsx

// BEGIN EXTRACT: src/models/training/record.model.js
/**
 * @file Defines the canonical shape for a single, processed training record.
 * This model represents a training entry after its status (e.g., Valid, Expiring Soon) has been calculated.
 */

/**
 * Creates a Training Record object.
 * @param {object} recordData - The raw record data from an API or source.
 * @returns {object} A structured training record object.
 */
const createRecordModel = (recordData) => ({
  /**
   * Unique identifier for the record.
   * @type {number | string}
   */
  id: recordData.id,

  /**
   * Information about the employee.
   * @type {{employeeNumber: string, firstName: string, surname: string, gender: string, jobTitle: string}}
   */
  employee: { ...recordData.employee },

  /**
   * The title of the training or certification.
   * @type {string}
   */
  trainingTitle: recordData.trainingTitle,

  /**
   * The entity that provided the training.
   * @type {string}
   */
  provider: recordData.provider,

  /**
   * Location where the training took place.
   * @type {{site: string, province: string}}
   */
  location: { ...recordData.location },

  /**
   * Status and date information for the training record.
   * Includes calculated fields like daysLeft and the validity status string.
   * @type {{dateOfTraining: string, dateOfExpiry: string, daysLeft: number, status: 'Valid' | 'Expiring Soon' | 'Expired'}}
   */
  status: { ...recordData.status },

  /**
   * The ID of the certificate.
   * @type {string}
   */
  certificateId: recordData.certificateId,

  /**
    * The entity that issued the certificate.
    * @type {string}
    */
  issuedBy: recordData.issuedBy,
  
  /**
   * BEGIN NEW FEATURE: Certificate Upload Section (Phase 2)
   * An array of uploaded certificate files associated with this record.
   * @type {Array<object>}
   */
  certificates: recordData.certificates || []
});
// END EXTRACT: src/models/training/record.model.js

// BEGIN EXTRACT: src/services/__mocks__/trainingAPI.js
const mockApiModule = (() => {
  // TODO: Replace mockCertificates with data from getRecordById(recordId)
  let records = [
    {
      id: 1,
      employee: { employeeNumber: '1001', firstName: 'Sarah', surname: 'Johnson', gender: 'Female', jobTitle: 'Nurse' },
      trainingTitle: 'CPR & First Aid',
      provider: 'Red Cross',
      location: { site: 'NYC', province: 'New York' },
      status: { dateOfTraining: '2025-09-15', dateOfExpiry: '2027-09-15' },
      certificateId: 'CPR-1001',
      issuedBy: 'Red Cross',
      certificates: [
          { id: 'cert-001', url: 'https://placehold.co/400x300/dbeafe/1B365F?text=CPR_Cert.png', name: 'CPR_Cert.png', uploadedAt: '2024-05-17', type: 'image/png' },
          { id: 'cert-002', url: 'mock/cert2.pdf', name: 'First_Aid_Manual.pdf', uploadedAt: '2024-05-18', type: 'application/pdf' },
      ]
    },
    {
      id: 2,
      employee: { employeeNumber: '1002', firstName: 'James', surname: 'Smith', gender: 'Male', jobTitle: 'Electrician' },
      trainingTitle: 'Electrical Safety',
      provider: 'SafeWork',
      location: { site: 'LA', province: 'California' },
      status: { dateOfTraining: '2025-08-12', dateOfExpiry: '2026-08-12' },
      certificateId: 'ES-1002',
      issuedBy: 'SafeWork',
      certificates: []
    },
    {
      id: 3,
      employee: { employeeNumber: '1003', firstName: 'Aisha', surname: 'Khan', gender: 'Female', jobTitle: 'Lab Technician' },
      trainingTitle: 'Chemical Handling',
      provider: 'BioTrain',
      location: { site: 'CHI', province: 'Illinois' },
      status: { dateOfTraining: '2025-07-10', dateOfExpiry: '2026-07-10' },
      certificateId: 'CH-1003',
      issuedBy: 'BioTrain',
      certificates: []
    },
     {
      id: 4,
      employee: { employeeNumber: '1001', firstName: 'Sarah', surname: 'Johnson', gender: 'Female', jobTitle: 'Nurse' },
      trainingTitle: 'Pediatric Advanced Life Support',
      provider: 'American Heart Association',
      location: { site: 'NYC', province: 'New York' },
      status: { dateOfTraining: '2024-10-20', dateOfExpiry: '2025-10-20' },
      certificateId: 'PALS-1001',
      issuedBy: 'AHA',
      certificates: []
    }
  ];

  let appSettings = {
    provinces: ['New York', 'California', 'Illinois', 'Texas', 'Washington', 'Massachusetts', 'Colorado'],
    sites: [
      { abbreviatedName: 'NYC', fullName: 'New York City', province: 'New York', certificates: ['CPR & First Aid', 'Pediatric Advanced Life Support', 'ISO 9001 Fundamentals', 'Pediatric Care Essentials'] },
      { abbreviatedName: 'LA', fullName: 'Los Angeles', province: 'California', certificates: ['Electrical Safety', 'Lockout/Tagout', 'Workplace Harassment Policy'] },
      { abbreviatedName: 'CHI', fullName: 'Chicago', province: 'Illinois', certificates: ['Chemical Handling', 'Lab Safety Essentials', 'PPE Compliance'] },
    ],
    certificateTypes: [
      'CPR & First Aid', 'Electrical Safety', 'Chemical Handling', 'Conflict Management', 'Pediatric Advanced Life Support',
      'Diversity Training', 'Cybersecurity Basics', 'Leadership Essentials', 'Equipment Safety'
    ],
    settings: { expiryThreshold: 30 }
  };

  const getRecords = async () => {
    console.log("Mock API: Fetching records...");
    return JSON.parse(JSON.stringify(records));
  };
  
  const getAppSettings = async () => {
    console.log("Mock API: Fetching app settings...");
    return JSON.parse(JSON.stringify(appSettings));
  };

  const addRecord = async (data) => {
    console.log("Mock API: Adding record", data);
    const newRecord = { ...data, id: Date.now(), certificates: [] };
    records.push(newRecord);
    return { success: true };
  };
  
  const updateRecord = async (data) => {
    console.log("Mock API: Updating record", data);
    const index = records.findIndex(r => r.id === data.id);
    if (index > -1) {
      records[index] = { ...records[index], ...data };
    }
    return { success: true };
  };
  
  const deleteRecord = async (id) => {
    console.log("Mock API: Deleting record", id);
    records = records.filter(r => r.id !== id);
    return { success: true };
  };
  
  const updateEmployee = async (data) => {
    console.log("Mock API: Updating employee", data);
    records.forEach(r => {
        if(r.employee.employeeNumber === data.employeeNumber){
            r.employee = {...r.employee, ...data};
        }
    });
    return { success: true };
  };

  // BEGIN NEW FEATURE: Certificate Upload Section (Phase 2)
  const uploadCertificate = async (recordId, file) => {
    console.log(`Mock API: Uploading ${file.name} for record ${recordId}`);
    // This would normally upload to a server and return a URL
    return { success: true, url: URL.createObjectURL(file) };
  }

  const deleteCertificate = async(recordId, certId) => {
      console.log(`Mock API: Deleting cert ${certId} for record ${recordId}`);
      return { success: true };
  }
  // END NEW FEATURE

  return { getRecords, getAppSettings, addRecord, updateRecord, deleteRecord, updateEmployee, uploadCertificate, deleteCertificate };
})();
// END EXTRACT: src/services/__mocks__/trainingAPI.js


// --- UI & LOGIC COMPONENTS ---

// BEGIN NEW FEATURE: Certificate Upload Section (Phase 2)
// BEGIN COMPONENT: New Icons
// Creative decision: Adding new icons needed for the feature, following the style of existing icons.
const IconUpload = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const IconTrash = () => <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>;
const IconFileText = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
// END COMPONENT: New Icons

// BEGIN COMPONENT: CertificateUploadArea
// Creative decision: Modeled this after the ImportView's dropzone for UI consistency. Added a dragging state for better user feedback.
const CertificateUploadArea = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const acceptedTypes = ["image/jpeg", "image/png", "application/pdf"];

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => acceptedTypes.includes(file.type));
        if (validFiles.length > 0) {
            onUpload(validFiles);
        }
    };
    
    const handleDrag = (e, isEntering) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEntering) {
             setDragging(true);
        } else {
             setDragging(false);
        }
    };
    
    const handleDrop = (e) => {
        handleDrag(e, false);
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(file => acceptedTypes.includes(file.type));
        if (validFiles.length > 0) {
            onUpload(validFiles);
        }
    };

    return (
        <div 
            className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragging ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'}`}
            onClick={() => fileInputRef.current.click()}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <IconUpload />
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-text-primary)]">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-[var(--color-text-secondary)]">JPG, PNG, or PDF files</p>
            </div>
            <input ref={fileInputRef} type="file" multiple accept={acceptedTypes.join(",")} className="hidden" onChange={handleFileSelect} />
        </div>
    );
};
// END COMPONENT: CertificateUploadArea

// BEGIN REFINEMENT: Certificate Thumbnail Click → Preview Modal (Phase 2.2)
// BEGIN COMPONENT: CertificateThumbnail
// Creative Decision: Added a subtle hover scale animation to make interaction feel more dynamic, matching other hover effects in the portal.
// Thumbnail click opens modal for intuitive interaction; delete functionality is moved inside the modal.
const CertificateThumbnail = ({ file, onPreview }) => {
    const isImage = file.type.startsWith('image/');
    
    return (
        <div 
            className="group relative aspect-4/3 bg-[var(--color-surface-contrast)] rounded-lg overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:scale-105 cursor-pointer"
            onClick={() => onPreview(file)}
        >
            {isImage ? (
                <img src={file.url} alt={file.name} className="w-full h-full object-cover pointer-events-none" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full p-2 text-[var(--color-text-secondary)] pointer-events-none">
                    <IconFileText />
                    <span className="text-xs font-semibold mt-2 text-center break-all">{file.name}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-2 pointer-events-none">
                <p className="text-white text-xs font-medium truncate">{file.name}</p>
                <p className="text-white/70 text-[10px]">{new Date(file.uploadedAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};
// END COMPONENT: CertificateThumbnail
// END REFINEMENT

// BEGIN REFINEMENT: Certificate Thumbnail Click → Preview Modal (Phase 2.2)
// BEGIN COMPONENT: CertificateGrid
const CertificateGrid = ({ certificates, onPreview }) => {
    if (certificates.length === 0) {
        return (
            <div className="text-center py-10 text-[var(--color-text-secondary)]">
                <p>No certificates uploaded yet.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {certificates.map(cert => (
                <CertificateThumbnail key={cert.id} file={cert} onPreview={onPreview} />
            ))}
        </div>
    );
};
// END COMPONENT: CertificateGrid
// END REFINEMENT

// BEGIN REFINEMENT: Certificate Thumbnail Click → Preview Modal (Phase 2.2)
// BEGIN COMPONENT: CertificatePreviewModal
// Creative Decision: A dedicated modal for previews provides a focused, clutter-free viewing experience.
// It separates the view action from the delete action, making the UI more predictable.
const CertificatePreviewModal = ({ certificate, onClose, onDelete }) => {
    if (!certificate) return null;

    const isImage = certificate.type.startsWith('image/');

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative bg-[var(--color-surface)] rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-[var(--color-divider)] flex justify-between items-center">
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)] truncate">{certificate.name}</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onDelete(certificate.id)} title="Delete Certificate" className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-destructive)] rounded-full transition-colors">
                            <IconTrash />
                        </button>
                        <button onClick={onClose} title="Close" className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-auto">
                    {isImage ? (
                        <img src={certificate.url} alt={certificate.name} className="max-w-full max-h-full mx-auto" />
                    ) : (
                        <object data={certificate.url} type="application/pdf" width="100%" height="100%">
                            <div className="p-8 text-center text-[var(--color-text-secondary)]">
                                <p>It appears you don't have a PDF plugin for this browser.</p>
                                <a href={certificate.url} download={certificate.name} className="text-[var(--color-info)] hover:underline mt-2 inline-block">Download PDF instead</a>
                            </div>
                        </object>
                    )}
                </div>

                <div className="p-4 border-t border-[var(--color-divider)] text-sm text-[var(--color-text-secondary)]">
                    Uploaded on: {new Date(certificate.uploadedAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
};
// END COMPONENT: CertificatePreviewModal
// END REFINEMENT

// END NEW FEATURE
// ... existing components ...

// BEGIN EXTRACT: src/features/portals/training/views/records/DetailedView.jsx
const DetailedViewPage = ({ employeeNumber, initialRecordId, processedRecords, setCurrentPage, setModalState, setDeletingRecordId, expiryThreshold }) => {
    const allEmployeeRecords = useMemo(() =>
        processedRecords.filter(r => r.employee.employeeNumber === employeeNumber).sort((a,b) => new Date(b.status.dateOfExpiry) - new Date(a.status.dateOfExpiry)),
        [processedRecords, employeeNumber]
    );

    const employeeDetails = allEmployeeRecords.length > 0 ? allEmployeeRecords[0].employee : null;

    const [activeRecord, setActiveRecord] = useState(
        allEmployeeRecords.find(r => r.id === initialRecordId) || allEmployeeRecords[0]
    );

    const [certSearch, setCertSearch] = useState('');

    // BEGIN REFINEMENT: Certificate Thumbnail Click → Preview Modal (Phase 2.2)
    // This section refactors the certificate management to use a preview modal.
    const [certificates, setCertificates] = useState(activeRecord?.certificates || []);
    const [previewCertificate, setPreviewCertificate] = useState(null);
    const [deletingCertId, setDeletingCertId] = useState(null); // Used for the confirmation step within the modal

    // Creative Decision: This ensures the displayed certificates update if the active record changes (e.g., user selects another from the list).
    useEffect(() => {
        setCertificates(activeRecord?.certificates || []);
    }, [activeRecord]);

    const handleFileUploads = (files) => {
        const newCerts = files.map(file => {
            // TODO: CONNECT to trainingAPI.js → uploadCertificate(activeRecord.id, file)
            const newCert = { id: `cert-${Date.now()}-${Math.random()}`, url: URL.createObjectURL(file), name: file.name, uploadedAt: new Date().toISOString().split('T')[0], type: file.type };
            return newCert;
        });
        setCertificates(prev => [...prev, ...newCerts]);
    };

    // This now just opens the preview modal.
    const handlePreviewCertificate = (cert) => {
        setPreviewCertificate(cert);
    };

    // This is called from the modal, starting the deletion confirmation flow.
    const handleDeleteCertificate = (certId) => {
        setDeletingCertId(certId);
    };

    const confirmDeleteCertificate = () => {
        if (!deletingCertId) return;
        // TODO: CONNECT to trainingAPI.js → deleteCertificate(activeRecord.id, deletingCertId)
        setCertificates(prev => prev.filter(c => c.id !== deletingCertId));
        setDeletingCertId(null);
        setPreviewCertificate(null); // Close the modal after deletion
    };
    // END REFINEMENT


    const filteredEmployeeRecords = useMemo(() =>
        allEmployeeRecords.filter(cert =>
            cert.trainingTitle.toLowerCase().includes(certSearch.toLowerCase())
        ),
        [allEmployeeRecords, certSearch]
    );

    useEffect(() => {
        if (allEmployeeRecords.length > 0 && !allEmployeeRecords.some(r => r.id === activeRecord?.id)) {
            setActiveRecord(allEmployeeRecords[0]);
        }
    }, [allEmployeeRecords, activeRecord]);

    const getValidityStyles = (status) => {
        const styles = {
            'Valid': {
                badge: 'text-[var(--color-badge-success-text)] bg-[var(--color-badge-success-bg)]',
                badgeLg: 'text-green-800 bg-green-200',
                text: 'text-[var(--color-success)]',
                progress: 'bg-[var(--color-success)]',
                description: 'This certificate is currently valid.'
            },
            'Expiring Soon': {
                badge: 'text-[var(--color-badge-warning-text)] bg-[var(--color-badge-warning-bg)]',
                badgeLg: 'text-amber-800 bg-amber-200',
                text: 'text-[var(--color-warning)]',
                progress: 'bg-[var(--color-warning)]',
                description: 'This certificate is expiring soon.'
            },
            'Expired': {
                badge: 'text-[var(--color-badge-danger-text)] bg-[var(--color-badge-danger-bg)]',
                badgeLg: 'text-red-800 bg-red-200',
                text: 'text-[var(--color-danger)]',
                progress: 'bg-[var(--color-danger)]',
                description: 'This certificate has expired.'
            }
        };
        return styles[status] || { badge: 'text-slate-700 bg-slate-100', badgeLg: 'text-slate-800 bg-slate-200', text: 'text-slate-600', progress: 'bg-slate-500', description: 'Status is unknown.' };
    };

    if (!activeRecord || !employeeDetails) {
        return (
            <div className="text-center p-10">
                <p className="text-[var(--color-text-secondary)]">No record found. It might have been deleted.</p>
                <button onClick={() => setCurrentPage('records')} className="mt-4 px-4 py-2 bg-[var(--color-control-surface-bg)] rounded-lg text-[var(--color-text-primary)]">
                    Back to All Records
                </button>
            </div>
        );
    }

    const stats = useMemo(() => {
        return {
            total: allEmployeeRecords.length,
            valid: allEmployeeRecords.filter(r => r.status.status === 'Valid').length,
            expiring: allEmployeeRecords.filter(r => r.status.status === 'Expiring Soon').length,
            expired: allEmployeeRecords.filter(r => r.status.status === 'Expired').length,
        }
    }, [allEmployeeRecords]);

    const { daysLeft, status, dateOfTraining, dateOfExpiry } = activeRecord.status;
    const validityStyles = getValidityStyles(status);

    const progressPercentage = useMemo(() => {
        if (status === 'Expired') {
            return 100;
        }
        const totalDuration = (new Date(dateOfExpiry) - new Date(dateOfTraining)) / (1000 * 60 * 60 * 24);
        const elapsed = (new Date() - new Date(dateOfTraining)) / (1000 * 60 * 60 * 24);
        const percentage = (elapsed / totalDuration) * 100;
        return Math.max(0, Math.min(100, percentage));
    }, [dateOfTraining, dateOfExpiry, status]);

    const daysDisplay = useMemo(() => (daysLeft >= 0 ? daysLeft : Math.abs(daysLeft)), [daysLeft]);
    const daysLabel = useMemo(() => {
        if (daysLeft < 0) return 'days expired';
        if (daysLeft === 0) return 'Expires today';
        if (daysLeft === 1) return 'day remaining';
        return 'days remaining';
    }, [daysLeft]);

    const StatCard = ({label, value, icon}) => (
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl">{icon}</div>
            <div>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium">{label}</p>
                <p className="text-xl font-bold text-[var(--color-text-primary)]">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
            {/* Left Sidebar */}
            <aside className="w-full lg:max-w-md flex flex-col gap-6">
                {/* Employee Dossier */}
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[var(--color-text-primary)]">Employee Dossier</h3>
                        <button onClick={() => setModalState({isOpen: true, type: 'editEmployee', data: {employee: employeeDetails}})} className="h-8 w-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors no-print">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                    <div className="bg-[var(--color-surface-contrast)] p-4 rounded-xl border border-[var(--color-border)]">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-icon-container-info-bg)] text-[var(--color-icon-container-info-text)] flex items-center justify-center font-bold text-xl">
                                {employeeDetails.firstName.charAt(0)}{employeeDetails.surname.charAt(0)}
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-[var(--color-text-primary)]">{employeeDetails.firstName} {employeeDetails.surname}</h2>
                                <p className="text-sm text-[var(--color-text-secondary)]">{employeeDetails.jobTitle}</p>
                                <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1">EMP #: {employeeDetails.employeeNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                     <div className="grid grid-cols-2 gap-5">
                        <StatCard label="Total" value={stats.total} icon={<div className="w-12 h-12 flex items-center justify-center bg-[var(--color-icon-container-info-bg)] rounded-2xl"><svg className="w-6 h-6 text-[var(--color-icon-container-info-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></div>} />
                        <StatCard label="Valid" value={stats.valid} icon={<div className="w-12 h-12 flex items-center justify-center bg-[var(--color-badge-success-bg)] rounded-2xl"><svg className="w-6 h-6 text-[var(--color-badge-success-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>} />
                        <StatCard label="Expiring" value={stats.expiring} icon={<div className="w-12 h-12 flex items-center justify-center bg-[var(--color-badge-warning-bg)] rounded-2xl"><svg className="w-6 h-6 text-[var(--color-badge-warning-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>} />
                        <StatCard label="Expired" value={stats.expired} icon={<div className="w-12 h-12 flex items-center justify-center bg-[var(--color-badge-danger-bg)] rounded-2xl"><svg className="w-6 h-6 text-[var(--color-badge-danger-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg></div>} />
                    </div>
                </div>

                {/* Certificates List */}
                <div className="flex flex-col flex-1 p-6 overflow-hidden bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]" style={{minHeight: '300px'}}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[var(--color-text-primary)]">All Certificates</h3>
                        <button onClick={() => setModalState({isOpen: true, type: 'addCertificateToEmployee', data: {employee: employeeDetails}})} className="bg-[var(--color-button-info-bg)] hover:bg-[var(--color-button-info-hover-bg)] text-[var(--color-button-info-text)] font-semibold text-sm py-2 px-3 rounded-lg flex items-center transition-all duration-200 ease-in-out hover:scale-105 no-print">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg> Add New
                        </button>
                    </div>
                    <div className="relative mb-4 no-print">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        <input type="text" value={certSearch} onChange={(e) => setCertSearch(e.target.value)} placeholder="Search certificates..." className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"/>
                    </div>
                    <div className="flex-1 overflow-y-auto cert-list-scrollbar -mr-4 pr-4">
                        <nav className="space-y-2">
                            {filteredEmployeeRecords.map(cert => {
                                const certStyles = getValidityStyles(cert.status.status);
                                return (
                                    <a href="#" key={cert.id} onClick={(e) => { e.preventDefault(); setActiveRecord(cert); }} className={`block p-3 rounded-lg transition-colors ${activeRecord.id === cert.id ? 'bg-[var(--color-highlight)] border border-[var(--color-info)]/20' : 'hover:bg-[var(--color-surface-hover)]'}`}>
                                        <div className="flex justify-between items-center">
                                            <p className={`font-semibold text-sm ${activeRecord.id === cert.id ? 'text-[var(--color-info)]' : 'text-[var(--color-text-primary)]'}`}>{cert.trainingTitle}</p>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${certStyles.badge}`}>{cert.status.status}</span>
                                        </div>
                                        <p className={`text-xs mt-1 ${activeRecord.id === cert.id ? 'text-[var(--color-info)]/80' : 'text-[var(--color-text-secondary)]'}`}>
                                            {cert.status.daysLeft < 0 ? 'Expired' : 'Expires'}: {new Date(cert.status.dateOfExpiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="p-0 lg:p-6 lg:pt-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                             <button onClick={() => setCurrentPage('records')} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-info)] flex items-center mb-4 no-print">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Back to All Records
                            </button>
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{activeRecord.trainingTitle}</h1>
                                 <span className={`text-sm font-bold px-3 py-1 rounded-full ${validityStyles.badge}`}>{status}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 no-print">
                             <button onClick={() => setModalState({isOpen: true, type: 'editRecord', data: activeRecord})} className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                            </button>
                            <button onClick={() => setDeletingRecordId(activeRecord.id)} className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-badge-danger-bg)] rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Validity Status</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{validityStyles.description}</p>

                        <div className="relative w-full h-3 bg-[var(--color-surface-contrast)] rounded-full">
                            <div className={`absolute top-0 left-0 h-3 rounded-full ${validityStyles.progress}`} style={{width: `${progressPercentage}%`}}></div>
                        </div>

                        <div className="flex justify-between items-center mt-3 text-sm font-medium text-[var(--color-text-secondary)]">
                            <div>
                                <p>Training Date</p>
                                <p className="text-xs">{new Date(dateOfTraining).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                 <p>Expiry Date</p>
                                <p className="text-xs">{new Date(dateOfExpiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <p className={`text-5xl font-bold ${validityStyles.text}`}>{daysDisplay}</p>
                            <p className="font-medium text-[var(--color-text-secondary)]">{daysLabel}</p>
                        </div>
                    </div>

                    <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Certificate Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Training Provider</p>
                                <p className="font-semibold text-[var(--color-text-primary)] mt-1">{activeRecord.provider || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Site</p>
                                <p className="font-semibold text-[var(--color-text-primary)] mt-1">{activeRecord.location.site || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Certificate ID</p>
                                <p className="font-semibold text-[var(--color-text-primary)] mt-1">{activeRecord.certificateId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Issued By</p>
                                <p className="font-semibold text-[var(--color-text-primary)] mt-1">{activeRecord.issuedBy || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    {/* BEGIN REFINEMENT: Certificate Thumbnail Click → Preview Modal (Phase 2.2) */}
                    <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Certificates</h3>
                        <CertificateUploadArea onUpload={handleFileUploads} />
                        <CertificateGrid certificates={certificates} onPreview={handlePreviewCertificate} />
                    </div>
                     {previewCertificate && (
                        <CertificatePreviewModal
                            certificate={previewCertificate}
                            onClose={() => setPreviewCertificate(null)}
                            onDelete={handleDeleteCertificate}
                        />
                    )}
                    {deletingCertId && (
                         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                            <div className="p-8 w-11/12 md:w-1/3 shadow-lg rounded-xl bg-[var(--color-surface-alt)] text-center animate-fade-in">
                                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Delete Certificate?</h3>
                                <p className="text-[var(--color-text-secondary)] mb-6">Are you sure you want to delete this file? This action is permanent.</p>
                                <div className="flex justify-center space-x-4">
                                    <button onClick={() => setDeletingCertId(null)} className="px-6 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)]">Cancel</button>
                                    <button onClick={confirmDeleteCertificate} className="px-6 py-2 rounded-lg bg-[var(--color-button-destructive-solid-bg)] text-[var(--color-button-destructive-solid-text)]">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* END REFINEMENT */}
                </div>
            </main>
        </div>
    )
};
// END EXTRACT: src/features/portals/training/views/records/DetailedView.jsx


// --- MAIN APP COMPONENT ---

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
    const { theme, toggleTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [processedRecords, setProcessedRecords] = useState([]);
    const [expiryThreshold, setExpiryThreshold] = useState(30);

    // This state simulates the parent component managing which employee record to view.
    const [viewingEmployee, setViewingEmployee] = useState({ employeeNumber: '1001', initialRecordId: 1 });
    const [currentPage, setCurrentPage] = useState('detailed-view'); // 'records' or 'detailed-view'
    
    // States for modals
    const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
    const [deletingRecordId, setDeletingRecordId] = useState(null);


    const fetchData = async () => {
        setIsLoading(true);
        const dbRecords = await mockApiModule.getRecords();
        const settings = await mockApiModule.getAppSettings();
        const threshold = settings.settings.expiryThreshold || 30;
        setExpiryThreshold(threshold);

        const processed = dbRecords.map(record => {
            const expiryDate = new Date(record.status.dateOfExpiry);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            let status = 'Valid';
            if (daysLeft < 0) status = 'Expired';
            else if (daysLeft <= threshold) status = 'Expiring Soon';
            return createRecordModel({ ...record, status: { ...record.status, daysLeft, status } });
        });
        setProcessedRecords(processed);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onConfirmDelete = async (recordId) => {
        await mockApiModule.deleteRecord(recordId);
        setDeletingRecordId(null);
        fetchData(); // Refetch data to update UI
         if (viewingEmployee) {
            const remaining = processedRecords.filter(r => r.employee.employeeNumber === viewingEmployee.employeeNumber && r.id !== recordId);
            if (remaining.length === 0) {
                 setCurrentPage('records'); // Go back to list if no records are left
            } else {
                 setViewingEmployee({employeeNumber: viewingEmployee.employeeNumber, initialRecordId: remaining[0].id});
            }
        }
    };

    const handleSetCurrentPage = (page) => {
        if(page === 'records') {
            setViewingEmployee(null);
        }
        // In a real app this would be more complex, but for this demo it's a simple toggle.
    }

    if (isLoading) {
        return <div className="p-8 text-center text-[var(--color-text-secondary)]">Loading Records...</div>
    }

    return (
        <div className={theme}>
            <GlobalStyles />
            <div className="bg-[var(--color-bg)] min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
                 <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Training Record</h1>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-md"
                        >
                            {theme === 'dark' ? '🌞' : '🌜'}
                        </button>
                    </div>
                    {viewingEmployee ? (
                        <DetailedViewPage
                            employeeNumber={viewingEmployee.employeeNumber}
                            initialRecordId={viewingEmployee.initialRecordId}
                            processedRecords={processedRecords}
                            setCurrentPage={handleSetCurrentPage}
                            setModalState={setModalState}
                            setDeletingRecordId={setDeletingRecordId}
                            expiryThreshold={expiryThreshold}
                        />
                    ) : (
                        <div>No employee selected. This would be the records list view.</div>
                    )}
                 </div>
            </div>
             {/* Note: Modals are not part of the original request, but included for completeness of interaction */}
            {deletingRecordId && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <div className="p-8 w-11/12 md:w-1/3 shadow-lg rounded-xl bg-[var(--color-surface-alt)] text-center">
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Confirm Deletion</h3>
                        <p className="text-[var(--color-text-secondary)] mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={() => setDeletingRecordId(null)} className="px-6 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)]">Cancel</button>
                            <button onClick={() => onConfirmDelete(deletingRecordId)} className="px-6 py-2 rounded-lg bg-[var(--color-button-destructive-solid-bg)] text-[var(--color-button-destructive-solid-text)]">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;