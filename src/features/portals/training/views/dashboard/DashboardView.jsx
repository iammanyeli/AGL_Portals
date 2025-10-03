// iammanyeli/certificate_tracker/iammanyeli-Certificate_Tracker-c7b517a533971ac919c2f8d5658e1de5988c6f93/src/pages/DashboardPage.js
const { useRef, useMemo, useCallback } = React;

const DashboardPage = ({ logActivity, dashboardData, sites, selectedSiteDashboard, setSelectedSiteDashboard, activities, expiringCerts, activeFilter, setActiveFilter, resetFilters, showActivityPage, showDetailedView, processedRecords }) => {
    const statusChartRef = useRef(null);
    const provinceChartRef = useRef(null);
    const siteChartRef = useRef(null);
    const topicColors = ['#3b82f6', '#10b981', '#f97316', '#ec4899', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'];

    const statusColors = {
        'Valid': '#4ade80',
        'Expiring Soon': '#fbbf24',
        'Expired': '#f87171'
    };
    
    const NoDataComponent = () => (
      <div className="flex flex-col justify-center items-center h-full text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        <h4 className="text-lg font-semibold">No Data to Display</h4>
        <p className="text-sm">There are no records matching the current filters.</p>
      </div>
    );

    const statusChartConfig = {
        type: 'doughnut',
        data: {
            labels: Object.keys(dashboardData.statusBreakdown),
            datasets: [{
                data: Object.values(dashboardData.statusBreakdown),
                backgroundColor: Object.keys(dashboardData.statusBreakdown).map(status => statusColors[status] || '#cccccc')
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, title: {display: true, text: 'Training Status Breakdown'} } }
    };

    const provinceChartConfig = {
        type: 'bar',
        data: { labels: Object.keys(dashboardData.provinceBreakdown), datasets: [{ label: 'Certificates', data: Object.values(dashboardData.provinceBreakdown), backgroundColor: '#60a5fa' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: {display: true, text: 'Training by Province'} }, scales: { y: { beginAtZero: true } } }
    };

    const siteInitialConfig = useCallback((data) => ({
        type: 'bar',
        data: { labels: Object.keys(data.totalBySite), datasets: [{ label: 'Total Certificates', data: Object.values(data.totalBySite), backgroundColor: Object.keys(data.totalBySite).map((_, i) => topicColors[i % topicColors.length]) }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: 'Total Certificates by Site (Click for details)' } }, scales: { y: { beginAtZero: true } } }
    }), []);

    const siteDrillDownConfig = useCallback((site) => {
        const siteData = dashboardData.trainingBySiteBreakdown[site] || {};
        return {
            type: 'bar',
            data: { labels: Object.keys(siteData), datasets: [{ label: 'Certificates', data: Object.values(siteData), backgroundColor: Object.keys(siteData).map((_, i) => topicColors[i % topicColors.length]) }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: `Topic Breakdown for ${site}` } }, scales: { y: { beginAtZero: true } } }
        };
    }, [dashboardData.trainingBySiteBreakdown]);

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
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <div className="flex items-center gap-4 no-print">
                     {isFilterActive && (
                        <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                            <span>Reset Filters</span>
                        </button>
                    )}
                    <div className="relative w-full md:w-64">
                        <select onChange={(e) => setSelectedSiteDashboard(e.target.value)} value={selectedSiteDashboard} className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300">
                            <option value="">Filter by All Sites</option>
                            {sites.map(s => <option key={s.abbreviatedName} value={s.abbreviatedName}>{s.fullName} ({s.abbreviatedName})</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                    </div>
                    <button onClick={handlePdfExport} className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <DashboardCard
                    title="Total Certificates"
                    count={dashboardData.counts.total}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4V2h10v2"/><path d="M10 20H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3v1h11V3h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7"/><path d="M12 11h9v9H12z"/></svg>}
                    color="bg-blue-500"
                    isActive={activeFilter === 'Total'}
                    onClick={() => setActiveFilter('Total')}
                />
                <DashboardCard
                    title="Valid"
                    count={dashboardData.counts.valid}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    color="bg-green-500"
                    isActive={activeFilter === 'Valid'}
                    onClick={() => setActiveFilter('Valid')}
                />
                <DashboardCard
                    title="Expiring Soon"
                    count={dashboardData.counts.expiringSoon}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M12 15a4 4 0 0 1-4-4v-1.5a2.5 2.5 0 0 1 5 0V11a4 4 0 0 1-4 4z"/><path d="M2 17a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2-2H4a2 2 0 0 1-2-2v-3z"/><path d="M12 21a2 2 0 0 1-2-2"/></svg>}
                    color="bg-orange-500"
                    isActive={activeFilter === 'Expiring Soon'}
                    onClick={() => setActiveFilter('Expiring Soon')}
                />
                <DashboardCard
                    title="Expired"
                    count={dashboardData.counts.expired}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                    color="bg-red-500"
                    isActive={activeFilter === 'Expired'}
                    onClick={() => setActiveFilter('Expired')}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col" style={{height: '400px'}}>
                    {noStatusData ? <NoDataComponent /> : <div className="relative flex-grow"><ChartComponent chartRef={statusChartRef} config={statusChartConfig} /></div>}
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col" style={{height: '400px'}}>
                    {noProvinceData ? <NoDataComponent /> : <div className="relative flex-grow"><ChartComponent chartRef={provinceChartRef} config={provinceChartConfig} /></div>}
                </div>
                <div className="lg:col-span-2">
                    {noSiteData ? (
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center" style={{height: '400px'}}>
                            <NoDataComponent />
                        </div>
                    ) : (
                        <DrillDownChart chartRef={siteChartRef} data={dashboardData} initialConfig={siteInitialConfig} drillDownConfigFn={siteDrillDownConfig} />
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
