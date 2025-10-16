import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination.jsx';

//
// ─── PRIMITIVES ────────────────────────────────────────────────────────────────
//

// primitive: TextField_Icon
const TextField_Icon = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
        <input
            {...props}
            className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
        />
    </div>
);

// primitive: Button_Warning
const Button_Warning = ({ children, ...props }) => (
    <button
        {...props}
        className="bg-[var(--color-button-warning-bg)] text-[var(--color-button-warning-text)] font-bold py-2 px-4 rounded-lg hover:bg-[var(--color-button-warning-hover-bg)] transition-colors text-sm shadow-sm hover:shadow-md transform hover:scale-105"
    >
        {children}
    </button>
);

// primitive: Badge_Status
const Badge_Status = ({ days }) => {
    const getDaysLeftColor = (days) => {
        if (days <= 0) return 'text-[var(--color-badge-danger-text)] bg-[var(--color-badge-danger-bg)] border-[var(--color-danger)]/20';
        if (days <= 30) return 'text-[var(--color-badge-warning-text)] bg-[var(--color-badge-warning-bg)] border-[var(--color-warning)]/20';
        return 'text-[var(--color-badge-success-text)] bg-[var(--color-badge-success-bg)] border-[var(--color-success)]/20';
    };
    return (
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full border ${getDaysLeftColor(days)}`}>
            {days}
        </span>
    );
};

// icon: SearchIcon
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

//
// ─── BLOCKS ────────────────────────────────────────────────────────────────────
//

// block: TableItem
const TableItem = ({ item, onRenew }) => (
    <tr key={item.id} className="hover:bg-[var(--color-table-row-hover-bg)] transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-[var(--color-text-secondary)]">{item.certificate}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-surface-contrast)] text-[var(--color-text-primary)]">
                {item.site}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">
            {new Date(item.expiryDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
            <Badge_Status days={item.daysLeft} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center no-print">
            <Button_Warning onClick={() => onRenew(item.id)}>Renew</Button_Warning>
        </td>
    </tr>
);

// block: EmptyStateBlock
const EmptyStateBlock = ({ message }) => (
    <div className="text-center py-10 bg-[var(--color-surface)] rounded-lg shadow-[var(--shadow-card)]">
        <p className="text-[var(--color-text-secondary)]">{message}</p>
    </div>
);

//
// ─── LAYOUT ───────────────────────────────────────────────────────────────────
//

// layout: TableLayout
const TableLayout = ({ searchTerm, setSearchTerm, children }) => (
    <div className="animate-fade-in">
        <div className="relative mb-6 no-print">
            <TextField_Icon
                icon={<SearchIcon />}
                type="text"
                placeholder="Search by name, certificate, or site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        {children}
    </div>
);

//
// ─── MAIN VIEW ────────────────────────────────────────────────────────────────
//

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

    const handleRenewClick = (certId) => {
        const recordToView = processedRecords.find(record => record.id === certId);
        if (recordToView) {
            showDetailedView(recordToView);
        }
    };

    return (
        <TableLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            {paginatedData.length > 0 ? (
                <>
                    <div className="overflow-x-auto subtle-scrollbar">
                        <table className="min-w-full bg-[var(--color-surface)] rounded-lg shadow-[var(--shadow-card)] overflow-hidden">
                            <thead className="bg-[var(--color-table-header-bg)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Employee</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Certificate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Site</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Expires On</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Days Left</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider no-print">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border)]">
                                {paginatedData.map(item => (
                                    <TableItem key={item.id} item={item} onRenew={handleRenewClick} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            ) : (
                <EmptyStateBlock message="No expiring certificates found." />
            )}
        </TableLayout>
    );
};

export default ExpiringSoonView;
