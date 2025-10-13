// src/features/portals/training/components/modals/CertificatePreviewModal.jsx
import React from 'react';

// This is a new component for previewing uploaded certificates.
const CertificatePreviewModal = ({ certificate, onClose, onDelete }) => {
  if (!certificate) return null;

  const isPdf = certificate.name.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] bg-[var(--color-surface)] rounded-2xl shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{certificate.name}</h3>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-grow p-4 overflow-auto">
          {isPdf ? (
            <iframe src={certificate.url} className="w-full h-full border-0" title={certificate.name}></iframe>
          ) : (
            <img src={certificate.url} alt={certificate.name} className="max-w-full max-h-full mx-auto object-contain" />
          )}
        </div>
        
        <div className="p-4 border-t border-[var(--color-border)] flex justify-end gap-4">
            <button
                onClick={() => onDelete(certificate.id)}
                className="px-5 py-2 rounded-lg bg-[var(--color-button-destructive-solid-bg)] text-[var(--color-button-destructive-solid-text)] font-semibold shadow-sm hover:bg-[var(--color-button-destructive-solid-hover-bg)] transition duration-200 flex items-center gap-2"
            >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                Delete Certificate
            </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreviewModal;
