// src/features/portals/training/components/ui/CertificateUpload.jsx
import React, { useState, useCallback } from 'react';

// This component is updated to show image previews and handle clicks for a modal.
const CertificateUpload = ({ certificates = [], onUpload, onPreview, isUploading }) => { // Added onPreview prop
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      onUpload(files[0]);
    }
  }, [onUpload]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      onUpload(files[0]);
    }
  };

  // This function now returns either an image element or an SVG icon within a preview container.
  const renderThumbnail = (cert) => {
    const extension = cert.name.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);

    if (isImage) {
        // Render a proper image preview
        return (
            <div className="w-full h-24 bg-gray-200 rounded-t-lg overflow-hidden flex items-center justify-center">
                <img src={cert.url} alt={cert.name} className="w-full h-full object-cover" />
            </div>
        );
    }

    // Fallback to a larger icon for non-image files
    const FileIcon = () => {
        switch (extension) {
            case 'pdf':
                return <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>;
            default:
                return <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
        }
    }
    return (
        <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
            <FileIcon />
        </div>
    );
  };

  return (
    <div>
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${dragOver ? 'border-[var(--color-info)] bg-[var(--color-info)]/10' : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'}`}
        >
            <input id="certificate-upload-input" type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} accept=".pdf,.png,.jpg,.jpeg,.gif,.webp" />
            <label htmlFor="certificate-upload-input" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                {isUploading ? (
                    <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-info)] mb-2"></div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Uploading...</p>
                    </>
                ) : (
                    <>
                         <svg className="w-8 h-8 mb-2 text-[var(--color-text-secondary)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                        <p className="text-sm text-[var(--color-text-secondary)]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">PDF, PNG, JPG, GIF</p>
                    </>
                )}
            </label>
        </div>

        {certificates.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {certificates.map(cert => (
                    <button 
                        type="button" 
                        key={cert.id} 
                        onClick={() => onPreview(cert)} 
                        className="relative group border border-[var(--color-border)] rounded-lg flex flex-col text-center bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] overflow-hidden shadow-sm hover:shadow-md"
                    >
                        {renderThumbnail(cert)}
                        <div className="p-2 flex flex-col items-center justify-center flex-grow">
                             <p className="text-xs text-[var(--color-text-primary)] font-semibold break-all w-full truncate">{cert.name}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{new Date(cert.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </button>
                ))}
            </div>
        )}
    </div>
  );
};

export default CertificateUpload;

