import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import DashboardCard from './components/DashboardCard.jsx';
import DoughnutChart from '../../../../../components/charts/DoughnutChart.jsx';
import BarChart from '../../../../../components/charts/BarChart.jsx';
import DrillDownChart from './components/DrillDownChart.jsx';
import ExpiringSoon from './components/ExpiringSoon.jsx';
import RecentActivity from './components/RecentActivity.jsx';

// --- ICONS ---

// icon: EmptyStateIcon
const EmptyStateIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-4" {...props}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
);

// icon: ResetFilterIcon
const ResetFilterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>
    </svg>
);

// icon: ChevronDownIcon
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

// icon: TotalCertsIcon
const TotalCertsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 4V2h10v2"/><path d="M10 20H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3v1h11V3h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7"/><path d="M12 11h9v9H12z"/>
    </svg>
);

// icon: ValidIcon
const ValidIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

// icon: ExpiringSoonIcon
const ExpiringSoonIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M12 15a4 4 0 0 1-4-4v-1.5a2.5 2.5 0 0 1 5 0V11a4 4 0 0 1-4 4z"/><path d="M2 17a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2-2H4a2 2 0 0 1-2-2v-3z"/><path d="M12 21a2 2 0 0 1-2-2"/>
    </svg>
);

// icon: ExpiredIcon
const ExpiredIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);

// --- PRIMITIVES ---

// primitive: Header
const Header = ({ children }) => <h3 className="text-xl font-semibold text-[var(--color-text-primary)] text-center mb-4">{children}</h3>;
// primitive: Subtitle
const Subtitle = ({ children }) => <p className="text-sm italic text-[var(--color-text-secondary)]">{children}</p>;

// primitive: Header_Subtitle
const Header_Subtitle = ({ header, subtitle }) => (
    <div className="text-center">
        <Header>{header}</Header>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </div>
);

// primitive: Button_Icon_Destructive
const Button_Icon_Destructive = ({ icon, children, ...props }) => (
    <button {...props} className="flex items-center gap-2 px-4 py-2 text-[var(--color-button-subtle-destructive-text)] bg-[var(--color-button-subtle-destructive-bg)] border border-[var(--color-button-subtle-destructive-border)] rounded-lg hover:bg-[var(--color-button-subtle-destructive-hover-bg)] transition">
        {icon}{children}
    </button>
);

// primitive: DropDownItem
const DropDownItem = ({ onClick, children }) => (
    <li>
      <button onClick={onClick} className="block w-full text-left px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors">
        {children}
      </button>
    </li>
);

// --- LAYOUTS ---

// layout: CardLayout
const CardLayout = ({ children, header, subtitle }) => (
    <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
        {(header || subtitle) && <Header_Subtitle header={header} subtitle={subtitle} />}
        {children}
    </div>
);

// block: DropDownLayout
const DropDownLayout = ({ children }) => (
    <div className="absolute right-0 mt-2 w-64 bg-[var(--color-surface-alt)] rounded-lg shadow-lg z-10 border border-[var(--color-border)] overflow-hidden">
        <ul className="py-1">
            {children}
        </ul>
    </div>
);

// --- BLOCKS ---

// block: EmptyStateBlock
const EmptyStateBlock = () => (
    <div className="flex flex-col justify-center items-center h-full text-[var(--color-text-secondary)]">
        <EmptyStateIcon />
        <h4 className="text-lg font-semibold">No Data to Display</h4>
    </div>
);

// block: FilterBlock
const FilterBlock = ({ isFilterActive, resetFilters, selectedSiteDashboard, setSelectedSiteDashboard, sites }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        setSelectedSiteDashboard(value);
        setIsDropdownOpen(false);
    };

    const selectedSiteLabel = selectedSiteDashboard
        ? sites.find(s => s.abbreviatedName === selectedSiteDashboard)?.fullName
        : "Filter by All Sites";

    return (
        <div className="flex items-center gap-2 md:gap-4 no-print">
            {isFilterActive && (
                <Button_Icon_Destructive onClick={resetFilters} icon={<ResetFilterIcon />} />
            )}
            <div className="relative w-full md:w-64" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className="flex items-center justify-between w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] py-2 px-4 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                >
                    <span className="truncate">{selectedSiteLabel}</span>
                    <ChevronDownIcon className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                    <DropDownLayout>
                        <DropDownItem onClick={() => handleSelect('')}>
                            All Sites
                        </DropDownItem>
                        {sites.map(site => (
                            <DropDownItem
                                key={site.abbreviatedName}
                                onClick={() => handleSelect(site.abbreviatedName)}
                            >
                                {site.fullName}
                            </DropDownItem>
                        ))}
                    </DropDownLayout>
                )}
            </div>
        </div>
    );
};

// --- MAIN VIEW ---

const DashboardPage = ({ logActivity, dashboardData, sites, selectedSiteDashboard, setSelectedSiteDashboard, activities, expiringCerts, activeFilter, setActiveFilter, resetFilters, showActivityPage, showDetailedView, processedRecords }) => {
    
    const handlePdfExport = () => {
        logActivity('export', 'Exported the Dashboard view to PDF.');
        window.print();
    };
    
    const isFilterActive = activeFilter !== 'Total' || selectedSiteDashboard !== '';
    
    const noStatusData = Object.values(dashboardData.statusBreakdown).every(v => v === 0);
    const noProvinceData = Object.keys(dashboardData.provinceBreakdown).length === 0;
    const noSiteData = Object.keys(dashboardData.totalBySite).length === 0;

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div />
                <FilterBlock 
                    isFilterActive={isFilterActive} 
                    resetFilters={resetFilters} 
                    selectedSiteDashboard={selectedSiteDashboard} 
                    setSelectedSiteDashboard={setSelectedSiteDashboard} 
                    sites={sites} 
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard title="Total Certificates" count={dashboardData.counts.total} icon={<TotalCertsIcon />} variant="info" isActive={activeFilter === 'Total'} onClick={() => setActiveFilter('Total')} />
                <DashboardCard title="Valid" count={dashboardData.counts.valid} icon={<ValidIcon />} variant="success" isActive={activeFilter === 'Valid'} onClick={() => setActiveFilter('Valid')} />
                <DashboardCard title="Expiring Soon" count={dashboardData.counts.expiringSoon} icon={<ExpiringSoonIcon />} variant="warning" isActive={activeFilter === 'Expiring Soon'} onClick={() => setActiveFilter('Expiring Soon')} />
                <DashboardCard title="Expired" count={dashboardData.counts.expired} icon={<ExpiredIcon />} variant="danger" isActive={activeFilter === 'Expired'} onClick={() => setActiveFilter('Expired')} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CardLayout header="Training Status Breakdown">
                    {noStatusData ? <EmptyStateBlock /> : <div className="relative flex-grow"><DoughnutChart data={Object.values(dashboardData.statusBreakdown)} labels={Object.keys(dashboardData.statusBreakdown)} useStatusColors={true} /></div>}
                </CardLayout>
                <CardLayout header="Training by Province">
                    {noProvinceData ? <EmptyStateBlock /> : <div className="relative flex-grow"><BarChart data={Object.values(dashboardData.provinceBreakdown)} labels={Object.keys(dashboardData.provinceBreakdown)} label="Certificates" /></div>}
                </CardLayout>

                <div className="lg:col-span-2">
                    {noSiteData ? (
                        <CardLayout><EmptyStateBlock /></CardLayout>
                    ) : (
                        <DrillDownChart data={dashboardData} />
                    )}
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:col-span-2">
                    <ExpiringSoon expiringCerts={expiringCerts} showActivityPage={showActivityPage} showDetailedView={showDetailedView} processedRecords={processedRecords} />
                    <RecentActivity activities={activities} showActivityPage={showActivityPage} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

