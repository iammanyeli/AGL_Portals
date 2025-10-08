import React from 'react';
import DashboardCard from './components/DashboardCard.jsx';
import DoughnutChart from '/src/components/charts/DoughnutChart.jsx';
import BarChart from '/src/components/charts/BarChart.jsx';
import DrillDownChart from './components/DrillDownChart.jsx';
import ExpiringSoon from './components/ExpiringSoon.jsx';
import RecentActivity from './components/RecentActivity.jsx';

const DashboardPage = ({ logActivity, dashboardData, sites, selectedSiteDashboard, setSelectedSiteDashboard, activities, expiringCerts, activeFilter, setActiveFilter, resetFilters, showActivityPage, showDetailedView, processedRecords }) => {

    const NoDataComponent = () => (
      <div className="flex flex-col justify-center items-center h-full text-[var(--color-text-secondary)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-4"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        <h4 className="text-lg font-semibold">No Data to Display</h4>
      </div>
    );
    
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
                <h2 className="text-3xl font-bold text-[var(--color-header)]">Dashboard Overview</h2>
                <div className="flex items-center gap-2 md:gap-4 no-print">
                     {isFilterActive && (
                        <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2 text-[var(--color-button-subtle-destructive-text)] bg-[var(--color-button-subtle-destructive-bg)] border border-[var(--color-button-subtle-destructive-border)] rounded-lg hover:bg-[var(--color-button-subtle-destructive-hover-bg)] transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                        </button>
                    )}
                    <div className="relative w-full md:w-64">
                        <select onChange={(e) => setSelectedSiteDashboard(e.target.value)} value={selectedSiteDashboard} className="block appearance-none w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition">
                            <option value="">Filter by All Sites</option>
                            {sites.map(s => <option key={s.abbreviatedName} value={s.abbreviatedName}>{s.fullName}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-text-secondary)]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <DashboardCard
                    title="Total Certificates"
                    count={dashboardData.counts.total}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4V2h10v2"/><path d="M10 20H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3v1h11V3h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7"/><path d="M12 11h9v9H12z"/></svg>}
                    variant="info"
                    isActive={activeFilter === 'Total'}
                    onClick={() => setActiveFilter('Total')}
                />
                <DashboardCard
                    title="Valid"
                    count={dashboardData.counts.valid}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    variant="success"
                    isActive={activeFilter === 'Valid'}
                    onClick={() => setActiveFilter('Valid')}
                />
                <DashboardCard
                    title="Expiring Soon"
                    count={dashboardData.counts.expiringSoon}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M12 15a4 4 0 0 1-4-4v-1.5a2.5 2.5 0 0 1 5 0V11a4 4 0 0 1-4 4z"/><path d="M2 17a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2-2H4a2 2 0 0 1-2-2v-3z"/><path d="M12 21a2 2 0 0 1-2-2"/></svg>}
                    variant="warning"
                    isActive={activeFilter === 'Expiring Soon'}
                    onClick={() => setActiveFilter('Expiring Soon')}
                />
                <DashboardCard
                    title="Expired"
                    count={dashboardData.counts.expired}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                    variant="danger"
                    isActive={activeFilter === 'Expired'}
                    onClick={() => setActiveFilter('Expired')}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] text-center mb-4">Training Status Breakdown</h3>
                    {noStatusData ? <NoDataComponent /> : <div className="relative flex-grow"><DoughnutChart data={Object.values(dashboardData.statusBreakdown)} labels={Object.keys(dashboardData.statusBreakdown)} useStatusColors={true} /></div>}
                </div>
                <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] text-center mb-4">Training by Province</h3>
                    {noProvinceData ? <NoDataComponent /> : <div className="relative flex-grow"><BarChart data={Object.values(dashboardData.provinceBreakdown)} labels={Object.keys(dashboardData.provinceBreakdown)} label="Certificates" /></div>}
                </div>
                <div className="lg:col-span-2">
                    {noSiteData ? (
                        <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col justify-center items-center h-[400px]">
                            <NoDataComponent />
                        </div>
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