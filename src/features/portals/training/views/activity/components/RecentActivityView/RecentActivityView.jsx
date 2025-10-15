import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';

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

const ChangeDetail = ({ title, variant }) => {
    if (!variant.data || typeof variant.data !== 'object' || Object.keys(variant.data).length === 0) {
        return null;
    }

    const flatData = flattenObject(variant.data);
    
    const renderValue = (value) => {
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (value === null || value === undefined || value === '') return <span className="text-gray-400 italic">Not set</span>;
        if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : <span className="text-gray-400 italic">Empty</span>;
        return String(value);
    };

    return (
        <div className={`bg-[var(--color-${variant.type})]/10 p-3 rounded-lg border border-[var(--color-${variant.type})]/20`}>
            <h5 className={`font-bold text-[var(--color-${variant.type})] mb-2 text-sm`}>{title}</h5>
            <dl className="space-y-1">
                {Object.entries(flatData).map(([key, value]) => {
                    if (key.toLowerCase().includes('id')) return null;
                    return (
                        <div key={key} className="grid grid-cols-2 gap-1 items-start">
                            <dt className="text-xs font-medium text-[var(--color-text-secondary)] capitalize truncate">{key.replace(/([A-Z])/g, ' $1').replace(/[._]/g, ' ').trim()}</dt>
                            <dd className="text-xs text-[var(--color-text-primary)] break-words">{renderValue(value)}</dd>
                        </div>
                    );
                })}
            </dl>
        </div>
    );
};

const ActivityItem = ({ activity, expanded, onToggle }) => {
    const iconMap = {
        settings: <svg title="Settings Change" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
        import: <svg title="Import Activity" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
        export: <svg title="Export Activity" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
        record: <svg title="Record Change" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
        default: <svg title="General Activity" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    };
    
    const payload = activity.payload ? JSON.parse(activity.payload) : null;
    const hasDetails = payload && (payload.before || payload.after) && JSON.stringify(payload.before) !== JSON.stringify(payload.after);

    return (
        <div className="pb-6 border-b border-[var(--color-border)] last:border-b-0">
            <div className={`flex items-start gap-4 ${hasDetails ? 'cursor-pointer' : ''}`} onClick={hasDetails ? onToggle : undefined}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-icon-container-info-bg)] text-[var(--color-icon-container-info-text)] flex items-center justify-center font-bold border-2 border-white ring-2 ring-blue-200" title={activity.user_name || 'System'}>
                    {activity.user_initials || 'S'}
                </div>
                <div className="flex-grow">
                     <p className="text-[var(--color-text-secondary)] text-sm">
                        <span className="font-bold text-[var(--color-text-primary)]">{activity.user_name || 'System'}</span> {activity.details}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1">{new Date(activity.timestamp).toLocaleString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 text-[var(--color-text-secondary)]">
                    {iconMap[activity.type] || iconMap.default}
                    {hasDetails && (
                        <svg className={`w-5 h-5 transition-transform ${expanded ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    )}
                </div>
            </div>
            {expanded && hasDetails && (
                <div className="mt-4 ml-14 pl-4 border-l-2 border-[var(--color-border)] animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ChangeDetail title="Before" variant={{ type: 'danger', data: payload.before }} />
                        <ChangeDetail title="After" variant={{ type: 'success', data: payload.after }} />
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
        <div className="animate-fade-in bg-[var(--color-surface)] p-6 rounded-lg shadow-[var(--shadow-card)]">
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
                    <p className="text-[var(--color-text-secondary)]">No activities recorded yet.</p>
                </div>
            )}
        </div>
    );
};


export default RecentActivityView;

