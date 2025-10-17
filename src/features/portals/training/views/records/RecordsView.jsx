import React, { useState } from 'react';
import TextField from '../../components/ui/TextField.jsx';
import SelectField from '../../components/ui/SelectField.jsx';
import ExportDropdown from '../../components/ui/ExportDropdown.jsx';
import AppliedFilters from './components/AppliedFilters.jsx';
import TableHeader from './components/TableHeader.jsx';

// --- ICONS ---
// icon: FilterIcon
const FilterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

// icon: AddRecordIcon
const AddIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

// icon: ResetFilterIcon
const ResetIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
);


// --- PRIMITIVES ---

// primitive: Button_Subtle_Icon
const Button_Subtle_Icon = ({ icon, children, ...props }) => (
    <button {...props} className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg hover:bg-opacity-80 transition">
        {icon}
        <span>{children}</span>
    </button>
);

// primitive: Button_Primary_Icon
const Button_Primary_Icon = ({ icon, children, ...props }) => (
    <button {...props} className="w-full md:w-auto flex-shrink-0 px-6 py-2 bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-button-info-hover-bg)] transition flex items-center justify-center">
        {icon}
        {children}
    </button>
);

// primitive: Button_Icon_Destructive
const Button_Icon_Destructive = ({ icon, children, ...props }) => (
    <button {...props} className="flex items-center gap-2 px-4 py-2 text-[var(--color-button-subtle-destructive-text)] bg-[var(--color-button-subtle-destructive-bg)] border border-[var(--color-button-subtle-destructive-border)] rounded-lg hover:bg-[var(--color-button-subtle-destructive-hover-bg)] transition">
        {icon}
        <span>{children}</span>
    </button>
);


// --- BLOCKS ---

// block: HeaderBlock
const HeaderBlock = ({ onFilterToggle, onAddRecord, onPdfExport, onExcelExport }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 no-print">
        <div></div>
        <div className="flex items-center gap-4">
            <Button_Subtle_Icon icon={<FilterIcon />} onClick={onFilterToggle}>
                Filter
            </Button_Subtle_Icon>
            <ExportDropdown onPdf={onPdfExport} onExcel={onExcelExport} />
            <Button_Primary_Icon icon={<AddIcon />} onClick={onAddRecord}>
                Add Record
            </Button_Primary_Icon>
        </div>
    </div>
);

// block: FilterBlock
const FilterBlock = ({ filters, onFilterChange, onReset, certificateTypes, sites, isFilterActive }) => (
    <div className="p-4 bg-[var(--color-surface-contrast)] rounded-lg mb-6 shadow-sm no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
                <TextField label="Search" name="searchTerm" value={filters.searchTerm} onChange={onFilterChange} placeholder="Search by name, EMP#, title..."/>
            </div>
            <SelectField label="Status" name="status" value={filters.status} onChange={onFilterChange} options={['Valid', 'Expiring Soon', 'Expired']} />
            <SelectField label="Training" name="trainingTitle" value={filters.trainingTitle} onChange={onFilterChange} options={certificateTypes} />
            <SelectField label="Site" name="site" value={filters.site} onChange={onFilterChange} options={sites.map(s => s.abbreviatedName)} />
        </div>
        <div className="flex justify-end mt-4">
            {isFilterActive && (
                <Button_Icon_Destructive icon={<ResetIcon />} onClick={onReset}>
                    Reset Filters
                </Button_Icon_Destructive>
            )}
        </div>
    </div>
);

// block: TableItem
const TableItem = ({ record, onRowClick }) => {
    const getStatusBadgeColor = (status) => {
        const colors = {
            'Valid': 'text-[var(--color-badge-success-text)] bg-[var(--color-badge-success-bg)]',
            'Expiring Soon': 'text-[var(--color-badge-warning-text)] bg-[var(--color-badge-warning-bg)]',
            'Expired': 'text-[var(--color-badge-danger-text)] bg-[var(--color-badge-danger-bg)]'
        };
        return colors[status] || 'text-gray-800 bg-gray-100';
    };

    return (
        <tr className="hover:bg-[var(--color-table-row-hover-bg)] transition-colors cursor-pointer" onClick={() => onRowClick(record)}>
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
    );
};

// block: EmptyStateBlock
const EmptyStateBlock = () => (
     <tr><td colSpan="7" className="text-center py-12 text-[var(--color-text-secondary)] text-lg">No records found.</td></tr>
);


// --- LAYOUTS ---

// layout: TableLayout
const TableLayout = ({ children, headers, sortConfig, onSort }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
            <thead className="bg-[var(--color-table-header-bg)]">
                <tr>
                    {headers.map(h => <TableHeader key={h.key} title={h.title} sortKey={h.key} sortConfig={sortConfig} onSort={onSort} />)}
                </tr>
            </thead>
            <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
                {children}
            </tbody>
        </table>
    </div>
);


// --- MAIN VIEW ---

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
    
    const tableHeaders = [
        {title: "EMP #", key: "employee.employeeNumber"},
        {title: "Name", key: "employee.surname"},
        {title: "Training Title", key: "trainingTitle"},
        {title: "Site", key: "location.site"},
        {title: "Expiry Date", key: "status.dateOfExpiry"},
        {title: "Days Left", key: "status.daysLeft"},
        {title: "Status", key: "status.status"}
    ];

    return (
        <div className="w-full">
            <HeaderBlock
                onFilterToggle={() => setShowFilters(f => !f)}
                onAddRecord={() => setModalState({ isOpen: true, type: 'addRecord', data: null })}
                onPdfExport={handlePdfExport}
                onExcelExport={handleExcelExport}
            />

            {showFilters && (
                <FilterBlock
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                    certificateTypes={certificateTypes}
                    sites={sites}
                    isFilterActive={isFilterActive}
                />
            )}

            <div className="hidden print:block">
                <AppliedFilters filters={filters} sites={sites}/>
            </div>

            <TableLayout headers={tableHeaders} sortConfig={sortConfig} onSort={handleSort}>
                {filteredAndSortedRecords.length > 0 ? (
                    filteredAndSortedRecords.map(record => (
                        <TableItem key={record.id} record={record} onRowClick={showDetailedView} />
                    ))
                ) : (
                   <EmptyStateBlock />
                )}
            </TableLayout>
        </div>
    );
};

export default RecordsPage;