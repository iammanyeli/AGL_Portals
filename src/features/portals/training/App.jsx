const { useState, useMemo, useCallback } = React;

const App = () => {
    // --- Custom hook for all data logic and API interaction ---
    const {
        records,
        provinces,
        sites,
        certificateTypes,
        expiryThreshold,
        activities,
        processedRecords,
        uniqueEmployees,
        logActivity,
        fetchAllData,
        handleAddOrUpdateRecord,
        handleUpdateEmployee,
        handleDeleteRecord,
        handleSetExpiryThreshold,
        settingsHandlers,
    } = useTrainingApi();

    // --- UI State Management ---
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [settingsView, setSettingsView] = useState('main');
    const [activityTab, setActivityTab] = useState('expiring');
    const [filters, setFilters] = useState({ searchTerm: '', province: '', site: '', trainingTitle: '', status: '' });
    const [selectedSiteDashboard, setSelectedSiteDashboard] = useState('');
    const [activeDashboardFilter, setActiveDashboardFilter] = useState('Total');
    const [sortConfig, setSortConfig] = useState({ key: 'status.daysLeft', direction: 'asc' });
    const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
    const [deletingRecordId, setDeletingRecordId] = useState(null);
    const [viewingEmployee, setViewingEmployee] = useState(null);

    // --- UI Handlers ---
    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

    const showDetailedView = (record) => {
        setViewingEmployee({ employeeNumber: record.employee.employeeNumber, initialRecordId: record.id });
        setCurrentPage('detailedView');
    };

    const showActivityPage = (tab) => {
        setActivityTab(tab);
        setCurrentPage('activityDetails');
    };
    
    const resetDashboardFilters = () => {
        setSelectedSiteDashboard('');
        setActiveDashboardFilter('Total');
    };
    
    const onModalSave = (recordData) => {
        handleAddOrUpdateRecord(recordData, modalState.type);
        setModalState({ isOpen: false, type: null, data: null });
    };

    const onModalSaveEmployee = (employeeData) => {
        handleUpdateEmployee(employeeData);
        setModalState({ isOpen: false, type: null, data: null });
    }

    const onConfirmDelete = async (recordId) => {
        await handleDeleteRecord(recordId);
        setDeletingRecordId(null);
         if (currentPage === 'detailedView') {
            const recordToDelete = records.find(r => r.id === recordId);
            const remaining = records.filter(r => r.employee.employeeNumber === recordToDelete?.employee.employeeNumber && r.id !== recordId);
            if (remaining.length <= 1) { // <= 1 because state hasn't updated yet
                 setCurrentPage('records');
            }
        }
    };

    // --- Memoized Derived State for UI ---
    const getNestedValue = useCallback((obj, path) => path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : '', obj), []);

    const dashboardData = useMemo(() => {
        const siteFilteredRecords = selectedSiteDashboard
            ? processedRecords.filter(r => r.location.site === selectedSiteDashboard)
            : processedRecords;

        const fullyFilteredRecords = activeDashboardFilter !== 'Total'
            ? siteFilteredRecords.filter(r => r.status.status === activeDashboardFilter)
            : siteFilteredRecords;

        const counts = {
            total: siteFilteredRecords.length,
            valid: siteFilteredRecords.filter(r => r.status.status === 'Valid').length,
            expiringSoon: siteFilteredRecords.filter(r => r.status.status === 'Expiring Soon').length,
            expired: siteFilteredRecords.filter(r => r.status.status === 'Expired').length,
        };

        const statusBreakdown = ['Valid', 'Expiring Soon', 'Expired'].reduce((acc, status) => { 
            acc[status] = fullyFilteredRecords.filter(r => r.status.status === status).length; 
            return acc; 
        }, {});
        
        const provinceBreakdown = fullyFilteredRecords.reduce((acc, r) => {
            const provinceName = r.location.province || 'Unassigned';
            acc[provinceName] = (acc[provinceName] || 0) + 1;
            return acc;
        }, {});

        const totalBySite = fullyFilteredRecords.reduce((acc, r) => {
            const siteName = r.location.site || 'Unassigned';
            acc[siteName] = (acc[siteName] || 0) + 1;
            return acc;
        }, {});

        const trainingBySiteBreakdown = fullyFilteredRecords.reduce((acc, r) => {
            const siteName = r.location.site || 'Unassigned';
            if (!acc[siteName]) acc[siteName] = {};
            acc[siteName][r.trainingTitle] = (acc[siteName][r.trainingTitle] || 0) + 1;
            return acc;
        }, {});

        return { counts, statusBreakdown, provinceBreakdown, totalBySite, trainingBySiteBreakdown };
    }, [processedRecords, selectedSiteDashboard, activeDashboardFilter]);
    
     const expiringCertsForDashboard = useMemo(() => {
        return processedRecords
            .filter(r => r.status.status === 'Expiring Soon' || r.status.status === 'Expired')
            .sort((a, b) => a.status.daysLeft - b.status.daysLeft)
            .map(r => ({
                id: r.id,
                name: `${r.employee.firstName} ${r.employee.surname}`,
                certificate: r.trainingTitle,
                site: r.location.site,
                daysLeft: r.status.daysLeft,
                expiryDate: r.status.dateOfExpiry
            }));
    }, [processedRecords]);

    const filteredAndSortedRecords = useMemo(() => {
        let filtered = processedRecords.filter(record => {
            const searchLower = filters.searchTerm.toLowerCase();
            const matchesSearch = filters.searchTerm === '' ||
                Object.values(record.employee).some(val => String(val).toLowerCase().includes(searchLower)) ||
                record.trainingTitle.toLowerCase().includes(searchLower);
            return matchesSearch &&
                (filters.province === '' || record.location.province === filters.province) &&
                (filters.site === '' || record.location.site === filters.site) &&
                (filters.trainingTitle === '' || record.trainingTitle === filters.trainingTitle) &&
                (filters.status === '' || record.status.status === filters.status);
        });
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [processedRecords, filters, sortConfig, getNestedValue]);

    // --- Page Rendering Logic ---
    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <DashboardPage logActivity={logActivity} dashboardData={dashboardData} sites={sites} selectedSiteDashboard={selectedSiteDashboard} setSelectedSiteDashboard={setSelectedSiteDashboard} activities={activities} expiringCerts={expiringCertsForDashboard.slice(0,5)} activeFilter={activeDashboardFilter} setActiveFilter={setActiveDashboardFilter} resetFilters={resetDashboardFilters} showActivityPage={showActivityPage} showDetailedView={showDetailedView} processedRecords={processedRecords} />;
            case 'records': return <RecordsPage logActivity={logActivity} filters={filters} setFilters={setFilters} certificateTypes={certificateTypes} sites={sites} filteredAndSortedRecords={filteredAndSortedRecords} sortConfig={sortConfig} handleSort={handleSort} setModalState={setModalState} showDetailedView={showDetailedView} />;
            case 'import': return <ImportPage logActivity={logActivity} sites={sites} provinces={provinces} certificateTypes={certificateTypes} onImportSuccess={fetchAllData} settingsHandlers={settingsHandlers} />;
            case 'settings': return <SettingsPage settingsView={settingsView} setSettingsView={setSettingsView} expiryThreshold={expiryThreshold} setExpiryThreshold={handleSetExpiryThreshold} provinces={provinces} certificateTypes={certificateTypes} sites={sites} {...settingsHandlers} />;
            case 'detailedView': return viewingEmployee ? <DetailedViewPage {...viewingEmployee} processedRecords={processedRecords} setCurrentPage={setCurrentPage} setModalState={setModalState} setDeletingRecordId={setDeletingRecordId} expiryThreshold={expiryThreshold} /> : <RecordsPage/>;
            case 'activityDetails': return <ActivityDetailsPage setCurrentPage={setCurrentPage} expiringCerts={expiringCertsForDashboard} activities={activities} initialTab={activityTab} showDetailedView={showDetailedView} processedRecords={processedRecords} />;
            default: return <DashboardPage />;
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-slate-50">
            <div id="printable-area" className="mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-2xl printable-content">
                <header className="mb-8 text-center md:text-left no-print">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">HSE Training Tracker</h1>
                    <p className="mt-2 text-md sm:text-lg text-gray-500">A comprehensive dashboard for managing all training certificates.</p>
                </header>
                <div className="print:block hidden mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">HSE Training Report</h1>
                    <p className="text-sm text-gray-600">Generated on: {new Date().toLocaleString('en-ZA')}</p>
                </div>
                <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} setSettingsView={setSettingsView} />
                <main className="mt-6">
                    {renderPage()}
                </main>
                {modalState.isOpen && <CRUDModal modalState={modalState} onClose={() => setModalState({isOpen: false, type: null, data: null})} onSave={onModalSave} onSaveEmployee={onModalSaveEmployee} sites={sites} certificateTypes={certificateTypes} uniqueEmployees={uniqueEmployees} />}
                {deletingRecordId && <DeleteModal onClose={() => setDeletingRecordId(null)} onConfirm={() => onConfirmDelete(deletingRecordId)} />}
            </div>
        </div>
    );
};
