
import React, { useState, useMemo, useEffect } from 'react';

// --- REUSABLE COMPONENTS ---

const Header = ({ title, onBack }) => (
    <div className="flex items-center justify-between mb-8">
        <div>
            <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-2 no-print">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md no-print">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
    </div>
);

const TabButton = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 font-semibold rounded-lg transition-all duration-300 w-full text-left no-print ${
            isActive
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'text-gray-600 bg-white hover:bg-gray-50 hover:text-blue-600'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    return (
        <div className="flex justify-center items-center space-x-2 mt-6 no-print">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50"
            >
                Prev
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-md border ${
                        currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}
             <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50"
            >
                Next
            </button>
        </div>
    );
};

// --- VIEW-SPECIFIC COMPONENTS ---

const ExpiringSoonView = ({ data, showDetailedView, processedRecords }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredData = useMemo(() =>
        data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.certificate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.site && item.site.toLowerCase().includes(searchTerm.toLowerCase()))
        ), [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() =>
        filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredData, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getDaysLeftColor = (days) => {
        if (days <= 0) return 'text-red-600 bg-red-100 border-red-200';
        if (days <= 30) return 'text-orange-600 bg-orange-100 border-orange-200';
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    };

    const handleRenewClick = (certId) => {
        const recordToView = processedRecords.find(record => record.id === certId);
        if (recordToView) {
            showDetailedView(recordToView);
        }
    };

    return (
        <div className="animate-fade-in">
             <div className="relative mb-6 no-print">
                <input
                    type="text"
                    placeholder="Search by name, certificate, or site..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            {paginatedData.length > 0 ? (
                <>
                <div className="overflow-x-auto subtle-scrollbar">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires On</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider no-print">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedData.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-700">{item.certificate}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{item.site}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.expiryDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full border ${getDaysLeftColor(item.daysLeft)}`}>
                                            {item.daysLeft}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center no-print">
                                        <button onClick={() => handleRenewClick(item.id)} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm shadow-sm hover:shadow-md transform hover:scale-105">
                                            Renew
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            ) : (
                 <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No expiring certificates found.</p>
                </div>
            )}
        </div>
    );
};

const flattenObject = (obj, parent = '', res = {}) => {
    for(let key in obj){
        let propName = parent ? parent + '.' + key : key;
        if(typeof obj[key] == 'object' && obj[key] !== null && !Array.isArray(obj[key])){
            flattenObject(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

const ChangeDetail = ({ title, data, color }) => {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        return null;
    }

    const flatData = flattenObject(data);

    const renderValue = (value) => {
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (value === null || value === undefined || value === '') return <span className="text-gray-400 italic">Not set</span>;
        if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : <span className="text-gray-400 italic">Empty</span>;
        return String(value);
    };

    return (
        <div className={`bg-${color}-50 p-3 rounded-lg border border-${color}-200`}>
            <h5 className={`font-bold text-${color}-700 mb-2 text-sm`}>{title}</h5>
            <dl className="space-y-1">
                {Object.entries(flatData).map(([key, value]) => {
                    if (key.toLowerCase().includes('id')) return null;
                    return (
                        <div key={key} className="grid grid-cols-2 gap-1 items-start">
                            <dt className="text-xs font-medium text-gray-500 capitalize truncate">{key.replace(/([A-Z])/g, ' $1').replace(/[._]/g, ' ').trim()}</dt>
                            <dd className="text-xs text-gray-800 break-words">{renderValue(value)}</dd>
                        </div>
                    );
                })}
            </dl>
        </div>
    );
};


const ActivityItem = ({ activity, expanded, onToggle }) => {
    const iconMap = {
        settings: <svg title="Settings Change" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
        import: <svg title="Import Activity" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
        export: <svg title="Export Activity" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
        record: <svg title="Record Change" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
        default: <svg title="General Activity" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    };
    
    const payload = activity.payload ? JSON.parse(activity.payload) : null;
    const hasDetails = payload && (payload.before || payload.after) && JSON.stringify(payload.before) !== JSON.stringify(payload.after);

    return (
        <div className="pb-6 border-b border-gray-100 last:border-b-0">
            <div className={`flex items-start gap-4 ${hasDetails ? 'cursor-pointer' : ''}`} onClick={hasDetails ? onToggle : undefined}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold border-2 border-white ring-2 ring-indigo-200" title={activity.user_name || 'System'}>
                    {activity.user_initials || 'S'}
                </div>
                <div className="flex-grow">
                     <p className="text-gray-700 text-sm">
                        <span className="font-bold text-gray-800">{activity.user_name || 'System'}</span> {activity.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 text-gray-400">
                    {iconMap[activity.type] || iconMap.default}
                    {hasDetails && (
                        <svg className={`w-5 h-5 transition-transform text-gray-500 ${expanded ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    )}
                </div>
            </div>
            {expanded && hasDetails && (
                <div className="mt-4 ml-14 pl-4 border-l-2 border-gray-200 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ChangeDetail title="Before" data={payload.before} color="red" />
                        <ChangeDetail title="After" data={payload.after} color="green" />
                    </div>
                </div>
            )}
        </div>
    );
};

const RecentActivityView = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedId, setExpandedId] = useState(null);
    const itemsPerPage = 7;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = useMemo(() =>
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [data, currentPage, itemsPerPage]);

    const handleToggle = (id) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="animate-fade-in bg-white p-6 rounded-lg shadow">
            {data.length > 0 ? (
                <>
                <div className="space-y-6">
                    {paginatedData.map((activity) => (
                        <ActivityItem 
                            key={activity.id} 
                            activity={activity}
                            expanded={expandedId === activity.id}
                            onToggle={() => handleToggle(activity.id)}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No activities recorded yet.</p>
                </div>
            )}
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

const ActivityDetailsPage = ({ setCurrentPage, expiringCerts, activities, initialTab, showDetailedView, processedRecords }) => {
    const [activeView, setActiveView] = useState(initialTab || 'expiring');

    const ExpiringIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    );

    const ActivityIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    );

    return (
        <div>
            <Header title="Activity & Expiry Details" onBack={() => setCurrentPage('training-dashboard')} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- Left Navigation --- */}
                <aside className="lg:col-span-3">
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-200/80 space-y-3 sticky top-10 no-print">
                        <TabButton
                            label="Expiring & Expired"
                            icon={<ExpiringIcon />}
                            isActive={activeView === 'expiring'}
                            onClick={() => setActiveView('expiring')}
                        />
                        <TabButton
                            label="All Activity"
                            icon={<ActivityIcon />}
                            isActive={activeView === 'activity'}
                            onClick={() => setActiveView('activity')}
                        />
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <main className="lg:col-span-9">
                    {activeView === 'expiring' && <ExpiringSoonView data={expiringCerts} showDetailedView={showDetailedView} processedRecords={processedRecords} />}
                    {activeView === 'activity' && <RecentActivityView data={activities} />}
                </main>
            </div>
        </div>
    );
};

export default ActivityDetailsPage;