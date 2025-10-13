import React, { useMemo, useState, useEffect } from 'react';
// From Phase 3: Import new components for certificate management
import CertificateUpload from '../../components/ui/CertificateUpload.jsx';
import CertificatePreviewModal from '../../components/modals/CertificatePreviewModal.jsx';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';
import * as api from '../../../../../services/__mocks__/trainingAPI.js'; // Using mock API directly for certificate actions

const DetailedViewPage = ({ employeeNumber, initialRecordId, processedRecords, onBack, setModalState, setDeletingRecordId, expiryThreshold }) => {
    const allEmployeeRecords = useMemo(() =>
        processedRecords.filter(r => r.employee.employeeNumber === employeeNumber).sort((a,b) => new Date(b.status.dateOfExpiry) - new Date(a.status.dateOfExpiry)),
        [processedRecords, employeeNumber]
    );

    const employeeDetails = allEmployeeRecords.length > 0 ? allEmployeeRecords[0].employee : null;

    const [activeRecord, setActiveRecord] = useState(
        allEmployeeRecords.find(r => r.id === initialRecordId) || allEmployeeRecords[0]
    );

    const [certSearch, setCertSearch] = useState('');
    
    // --- NEW STATE FOR CERTIFICATE MANAGEMENT (from Phase 3) ---
    const [certificates, setCertificates] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [previewCert, setPreviewCert] = useState(null);
    const [deletingCertId, setDeletingCertId] = useState(null);
    // --- END NEW STATE ---

    const filteredEmployeeRecords = useMemo(() =>
        allEmployeeRecords.filter(cert =>
            cert.trainingTitle.toLowerCase().includes(certSearch.toLowerCase())
        ),
        [allEmployeeRecords, certSearch]
    );

    // --- NEW EFFECT TO FETCH CERTIFICATES (from Phase 3) ---
    useEffect(() => {
        if (activeRecord) {
            const fetchCerts = async () => {
                // In a real app, this would be an API call. Here we get it from the record.
                setCertificates(activeRecord.certificates || []);
            };
            fetchCerts();
        }
    }, [activeRecord]);
    // --- END NEW EFFECT ---

    useEffect(() => {
        if (allEmployeeRecords.length > 0 && !allEmployeeRecords.some(r => r.id === activeRecord?.id)) {
            setActiveRecord(allEmployeeRecords[0]);
        }
    }, [allEmployeeRecords, activeRecord]);
    
    // --- NEW HANDLERS FOR CERTIFICATE ACTIONS (from Phase 3) ---
    const handleUpload = async (file) => {
        if (!activeRecord) return;
        setIsUploading(true);
        try {
            const newCert = await api.uploadCertificate(activeRecord.id, file);
            setCertificates(prev => [...prev, newCert]);
            // Here you would typically also update the parent state or re-fetch records
        } catch (error) {
            console.error("Upload failed:", error);
            // Show an error message to the user
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteCertificate = async () => {
        if (!deletingCertId || !activeRecord) return;
        try {
            await api.deleteCertificate(activeRecord.id, deletingCertId);
            setCertificates(prev => prev.filter(c => c.id !== deletingCertId));
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingCertId(null);
            setPreviewCert(null);
        }
    };
    // --- END NEW HANDLERS ---


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
                <p>Loading employee data...</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-[var(--color-control-surface-bg)] rounded-lg">
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
        const fullyValidDays = expiryThreshold * 3;
        const percentage = (daysLeft / fullyValidDays) * 100;
        return Math.max(0, Math.min(100, percentage));
    }, [daysLeft, status, expiryThreshold]);

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

    const openPreview = (cert) => {
        setPreviewCert(cert);
    };

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
                             <button onClick={onBack} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-info)] flex items-center mb-4 no-print">
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
                    
                    {/* --- NEW, SEPARATE CONTAINER FOR UPLOAD SECTION (from Phase 3) --- */}
                    <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]">
                        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Uploaded Certificates</h3>
                        <CertificateUpload certificates={certificates} onUpload={handleUpload} isUploading={isUploading} />
                    </div>
                    {/* --- END NEW CONTAINER --- */}

                </div>
            </main>
            
            {/* --- NEW MODALS FOR CERTIFICATE MANAGEMENT (from Phase 3) --- */}
            {previewCert && (
                <CertificatePreviewModal
                    certificate={previewCert}
                    onClose={() => setPreviewCert(null)}
                    onDelete={() => setDeletingCertId(previewCert.id)}
                />
            )}
            {deletingCertId && (
                <ConfirmationModal
                    title="Delete Certificate"
                    message="Are you sure you want to permanently delete this certificate file? This action cannot be undone."
                    onConfirm={handleDeleteCertificate}
                    onClose={() => setDeletingCertId(null)}
                />
            )}
             {/* --- END NEW MODALS --- */}
        </div>
    )
};


export default DetailedViewPage;

