// src/features/portals/training/components/ui/CertificateUpload.jsx
import React, { useState, useCallback } from 'react';

// This is a new component created to handle certificate uploads.
const CertificateUpload = ({ certificates = [], onUpload, isUploading }) => {
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

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
    }
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
            <input id="certificate-upload-input" type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} />
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
                        <p className="text-xs text-[var(--color-text-secondary)]">PDF, PNG, JPG</p>
                    </>
                )}
            </label>
        </div>

        {certificates.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {certificates.map(cert => (
                    <div key={cert.id} className="relative group border border-[var(--color-border)] rounded-lg p-2 flex flex-col items-center text-center bg-[var(--color-surface-subtle)]">
                         <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                            <div className="w-12 h-12 flex items-center justify-center">
                                {getFileIcon(cert.name)}
                            </div>
                            <p className="text-xs text-[var(--color-text-primary)] mt-2 break-all">{cert.name}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{new Date(cert.uploadedAt).toLocaleDateString()}</p>
                        </a>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CertificateUpload;
