import React, { useState } from 'react';
import InputField from '../../components/ui/InputField.jsx';
import SelectField from '../../components/ui/SelectField.jsx';
import ExportDropdown from '../../components/ui/ExportDropdown.jsx';
import AppliedFilters from './components/AppliedFilters.jsx';
import TableHeader from './components/TableHeader.jsx';

const RecordsPage = ({ logActivity, filters, setFilters, certificateTypes, sites, filteredAndSortedRecords, sortConfig, handleSort, setModalState, showDetailedView }) => {
    const [showFilters, setShowFilters] = useState(false);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    }

    const handleResetFilters = () => {
        setFilters({ searchTerm: '', province: '', site: '', trainingTitle: '', status: '' });
    };

    const isFilterActive = Object.values(filters).some(val => val !== '');

    const getStatusBadgeColor = (status) => {
        const colors = {
            'Valid': 'text-[var(--color-badge-success-text)] bg-[var(--color-badge-success-bg)]',
            'Expiring Soon': 'text-[var(--color-badge-warning-text)] bg-[var(--color-badge-warning-bg)]',
            'Expired': 'text-[var(--color-badge-danger-text)] bg-[var(--color-badge-danger-bg)]'
        };
        return colors[status] || 'text-gray-800 bg-gray-100';
    };

    const handlePdfExport = () => {
        logActivity('export', 'Exported the records list to PDF.');
        window.print();
    };

    const handleExcelExport = async () => {
        try {
            const dataToExport = filteredAndSortedRecords.map(r => ({
                "Employee Number": r.employee.employeeNumber,
                "First Name": r.employee.firstName,
                "Surname": r.employee.surname,
                "Job Title": r.employee.jobTitle,
                "Training Title": r.trainingTitle,
                "Provider": r.provider,
                "Site": r.location.site,
                "Province": r.location.province,
                "Training Date": r.status.dateOfTraining,
                "Expiry Date": r.status.dateOfExpiry,
                "Status": r.status.status,
            }));

            if (dataToExport.length === 0) {
                alert("No data to export.");
                return;
            }

            const csv = window.Papa.unparse(dataToExport);
            await window.api.exportData(csv);
            logActivity('export', `Exported ${dataToExport.length} records to Excel/CSV.`);
        } catch (error) {
            alert(`An error occurred during export: ${error.message}`);
        }
    };

    return (
        <div className="bg-[var(--color-surface)] p-6 sm:p-8 rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 no-print">
                <h2 className="text-3xl font-bold text-[var(--color-header)]">Training Records</h2>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowFilters(f => !f)} className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg hover:bg-opacity-80 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        <span>Filter</span>
                    </button>
                    <ExportDropdown onPdf={handlePdfExport} onExcel={handleExcelExport} />
                    <button onClick={() => setModalState({ isOpen: true, type: 'addRecord', data: null })} className="w-full md:w-auto flex-shrink-0 px-6 py-2 bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-button-info-hover-bg)] transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Record
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="p-4 bg-[var(--color-surface-contrast)] rounded-lg mb-6 shadow-sm no-print">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2">
                            <InputField label="Search" name="searchTerm" value={filters.searchTerm} onChange={handleFilterChange} placeholder="Search by name, EMP#, title..."/>
                        </div>
                        <SelectField label="Status" name="status" value={filters.status} onChange={handleFilterChange} options={['Valid', 'Expiring Soon', 'Expired']} />
                        <SelectField label="Training" name="trainingTitle" value={filters.trainingTitle} onChange={handleFilterChange} options={certificateTypes} />
                        <SelectField label="Site" name="site" value={filters.site} onChange={handleFilterChange} options={sites.map(s => s.abbreviatedName)} />
                    </div>
                    <div className="flex justify-end mt-4">
                        {isFilterActive && (
                            <button onClick={handleResetFilters} className="flex items-center gap-2 px-4 py-2 text-[var(--color-button-subtle-destructive-text)] bg-[var(--color-button-subtle-destructive-bg)] border border-[var(--color-button-subtle-destructive-border)] rounded-lg hover:bg-[var(--color-button-subtle-destructive-hover-bg)] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                                <span>Reset Filters</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="hidden print:block">
                <AppliedFilters filters={filters} sites={sites}/>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--color-border)]">
                    <thead className="bg-[var(--color-table-header-bg)]">
                        <tr>
                        {[ {title: "EMP #", key: "employee.employeeNumber"}, {title: "Name", key: "employee.surname"}, {title: "Training Title", key: "trainingTitle"}, {title: "Site", key: "location.site"}, {title: "Expiry Date", key: "status.dateOfExpiry"}, {title: "Days Left", key: "status.daysLeft"}, {title: "Status", key: "status.status"}
                        ].map(h => <TableHeader key={h.key} title={h.title} sortKey={h.key} sortConfig={sortConfig} onSort={handleSort} />)}
                        </tr>
                    </thead>
                    <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
                        {filteredAndSortedRecords.length > 0 ? (
                            filteredAndSortedRecords.map(record => (
                                <tr key={record.id} className="hover:bg-[var(--color-table-row-hover-bg)] transition-colors cursor-pointer" onClick={() => showDetailedView(record)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-primary)]">{record.employee.employeeNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">{record.employee.firstName} {record.employee.surname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">{record.trainingTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-surface-contrast)] text-[var(--color-text-secondary)]">{record.location.site}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">{new Date(record.status.dateOfExpiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                         <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full border ${getStatusBadgeColor(record.status.status)}`}>
                                            {record.status.daysLeft}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(record.status.status)}`}>{record.status.status}</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="text-center py-12 text-[var(--color-text-secondary)] text-lg">No records found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecordsPage;