import React, { useMemo, useState, useEffect } from 'react';

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

    const filteredEmployeeRecords = useMemo(() =>
        allEmployeeRecords.filter(cert =>
            cert.trainingTitle.toLowerCase().includes(certSearch.toLowerCase())
        ),
        [allEmployeeRecords, certSearch]
    );

    // **THE FIX**: This hook is now simplified. It ONLY handles the case where the
    // active record is deleted while being viewed. It no longer tries to navigate.
    useEffect(() => {
        if (allEmployeeRecords.length > 0 && !allEmployeeRecords.some(r => r.id === activeRecord?.id)) {
            setActiveRecord(allEmployeeRecords[0]);
        }
    }, [allEmployeeRecords, activeRecord]);

    const getValidityStyles = (status) => {
        const styles = {
            'Valid': {
                badge: 'text-green-700 bg-green-100',
                badgeLg: 'text-green-800 bg-green-200',
                text: 'text-green-600',
                progress: 'bg-green-500',
                description: 'This certificate is currently valid.'
            },
            'Expiring Soon': {
                badge: 'text-amber-700 bg-amber-100',
                badgeLg: 'text-amber-800 bg-amber-200',
                text: 'text-amber-600',
                progress: 'bg-amber-500',
                description: 'This certificate is expiring soon.'
            },
            'Expired': {
                badge: 'text-red-700 bg-red-100',
                badgeLg: 'text-red-800 bg-red-200',
                text: 'text-red-600',
                progress: 'bg-red-500',
                description: 'This certificate has expired.'
            }
        };
        return styles[status] || { badge: 'text-slate-700 bg-slate-100', badgeLg: 'text-slate-800 bg-slate-200', text: 'text-slate-600', progress: 'bg-slate-500', description: 'Status is unknown.' };
    };

    if (!activeRecord || !employeeDetails) {
        return (
            <div className="text-center p-10">
                <p>Loading employee data...</p>
                <button onClick={() => setCurrentPage()} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">
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
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-2xl">{icon}</div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <p className="text-xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
            {/* Left Sidebar */}
            <aside className="w-full lg:max-w-md flex flex-col gap-6">
                {/* Employee Dossier */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">Employee Dossier</h3>
                        <button onClick={() => setModalState({isOpen: true, type: 'editEmployee', data: {employee: employeeDetails}})} className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors no-print">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                                {employeeDetails.firstName.charAt(0)}{employeeDetails.surname.charAt(0)}
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-slate-900">{employeeDetails.firstName} {employeeDetails.surname}</h2>
                                <p className="text-sm text-slate-500">{employeeDetails.jobTitle}</p>
                                <p className="text-xs text-slate-400 mt-1">EMP #: {employeeDetails.employeeNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                     <div className="grid grid-cols-2 gap-5">
                        <StatCard label="Total" value={stats.total} icon={<div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-2xl"><svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></div>} />
                        <StatCard label="Valid" value={stats.valid} icon={<div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-2xl"><svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>} />
                        <StatCard label="Expiring" value={stats.expiring} icon={<div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-2xl"><svg className="w-6 h-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>} />
                        <StatCard label="Expired" value={stats.expired} icon={<div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-2xl"><svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg></div>} />
                    </div>
                </div>

                {/* Certificates List */}
                <div className="flex flex-col flex-1 p-6 overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200" style={{minHeight: '300px'}}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">All Certificates</h3>
                        <button onClick={() => setModalState({isOpen: true, type: 'addCertificateToEmployee', data: {employee: employeeDetails}})} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-3 rounded-lg flex items-center transition-all duration-200 ease-in-out hover:scale-105 no-print">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg> Add New
                        </button>
                    </div>
                    <div className="relative mb-4 no-print">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        <input type="text" value={certSearch} onChange={(e) => setCertSearch(e.target.value)} placeholder="Search certificates..." className="w-full bg-slate-100 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex-1 overflow-y-auto cert-list-scrollbar -mr-4 pr-4">
                        <nav className="space-y-2">
                            {filteredEmployeeRecords.map(cert => {
                                const certStyles = getValidityStyles(cert.status.status);
                                return (
                                    <a href="#" key={cert.id} onClick={(e) => { e.preventDefault(); setActiveRecord(cert); }} className={`block p-3 rounded-lg transition-colors ${activeRecord.id === cert.id ? 'bg-blue-100 border border-blue-500' : 'hover:bg-slate-100'}`}>
                                        <div className="flex justify-between items-center">
                                            <p className={`font-semibold text-sm ${activeRecord.id === cert.id ? 'text-blue-800' : 'text-slate-800'}`}>{cert.trainingTitle}</p>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${certStyles.badge}`}>{cert.status.status}</span>
                                        </div>
                                        <p className={`text-xs mt-1 ${activeRecord.id === cert.id ? 'text-blue-600' : 'text-slate-500'}`}>
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
                             <button onClick={() => setCurrentPage()} className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center mb-4 no-print">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Back to All Records
                            </button>
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-bold text-slate-900">{activeRecord.trainingTitle}</h1>
                                 <span className={`text-sm font-bold px-3 py-1 rounded-full ${validityStyles.badgeLg}`}>{status}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 no-print">
                             <button onClick={() => setModalState({isOpen: true, type: 'editRecord', data: activeRecord})} className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                            </button>
                            <button onClick={() => setDeletingRecordId(activeRecord.id)} className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                        <h3 className="font-semibold text-slate-900 mb-1">Validity Status</h3>
                        <p className="text-sm text-slate-500 mb-4">{validityStyles.description}</p>

                        <div className="relative w-full h-3 bg-slate-200 rounded-full">
                            <div className={`absolute top-0 left-0 h-3 rounded-full ${validityStyles.progress}`} style={{width: `${progressPercentage}%`}}></div>
                        </div>

                        <div className="flex justify-between items-center mt-3 text-sm font-medium text-slate-600">
                            <div>
                                <p>Training Date</p>
                                <p className="text-slate-500 text-xs">{new Date(dateOfTraining).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                 <p>Expiry Date</p>
                                <p className="text-slate-500 text-xs">{new Date(dateOfExpiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <p className={`text-5xl font-bold ${validityStyles.text}`}>{daysDisplay}</p>
                            <p className="text-slate-500 font-medium">{daysLabel}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-4">Certificate Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Training Provider</p>
                                <p className="font-semibold text-slate-800 mt-1">{activeRecord.provider || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Site</p>
                                <p className="font-semibold text-slate-800 mt-1">{activeRecord.location.site || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Certificate ID</p>
                                <p className="font-semibold text-slate-800 mt-1">{activeRecord.certificateId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Issued By</p>
                                <p className="font-semibold text-slate-800 mt-1">{activeRecord.issuedBy || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default DetailedViewPage;
