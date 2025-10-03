import React, { useState, useMemo, useCallback } from 'react';
import useTrainingApi from './hooks/useTrainingApi';

// Import all views and components from the training feature
import DashboardPage from './views/dashboard/DashboardView.jsx';
import RecordsPage from './views/records/RecordsView.jsx';
import ImportPage from './views/import/ImportView.jsx';
import SettingsPage from './views/settings/SettingsView.jsx';
import DetailedViewPage from './views/records/DetailedView.jsx';
import ActivityDetailsPage from './views/activity/ActivityDetailsView.jsx';

import CRUDModal from './components/modals/CRUDModal.jsx';
import DeleteModal from './components/modals/DeleteModal.jsx';

const TrainingPortalApp = ({ portalSubPage, setPortalSubPage }) => {
    // --- Custom hook for all data logic and API interaction ---
    const {
        records, provinces, sites, certificateTypes, expiryThreshold,
        activities, processedRecords, uniqueEmployees, logActivity,
        fetchAllData, handleAddOrUpdateRecord, handleUpdateEmployee,
        handleDeleteRecord, handleSetExpiryThreshold, settingsHandlers,
    } = useTrainingApi();

    // --- UI State Management ---
    // Note: 'currentPage' is now controlled by the `portalSubPage` prop
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
        setPortalSubPage('detailedView'); // Use the setter from props
    };

    const showActivityPage = (tab) => {
        setActivityTab(tab);
        setPortalSubPage('activityDetails'); // Use the setter from props
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
        if (portalSubPage === 'detailedView') {
            const recordToDelete = records.find(r => r.id === recordId);
            const remaining = records.filter(r => r.employee.employeeNumber === recordToDelete?.employee.employeeNumber && r.id !== recordId);
            if (remaining.length <= 1) {
                setPortalSubPage('table'); // Go back to records view
            }
        }
    };

    // --- Memoized Derived State for UI (No changes needed here) ---
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

    // --- Page Rendering Logic based on prop ---
    const renderPage = () => {
        // Map hub sub-pages to training portal pages
        switch (portalSubPage) {
            case 'portal-dashboard': 
                return <DashboardPage logActivity={logActivity} dashboardData={dashboardData} sites={sites} selectedSiteDashboard={selectedSiteDashboard} setSelectedSiteDashboard={setSelectedSiteDashboard} activities={activities} expiringCerts={expiringCertsForDashboard.slice(0,5)} activeFilter={activeDashboardFilter} setActiveFilter={setActiveDashboardFilter} resetFilters={resetDashboardFilters} showActivityPage={showActivityPage} showDetailedView={showDetailedView} processedRecords={processedRecords} />;
            case 'table': 
                return <RecordsPage logActivity={logActivity} filters={filters} setFilters={setFilters} certificateTypes={certificateTypes} sites={sites} filteredAndSortedRecords={filteredAndSortedRecords} sortConfig={sortConfig} handleSort={handleSort} setModalState={setModalState} showDetailedView={showDetailedView} />;
            case 'import': 
                return <ImportPage logActivity={logActivity} sites={sites} provinces={provinces} certificateTypes={certificateTypes} onImportSuccess={fetchAllData} settingsHandlers={settingsHandlers} />;
            case 'portal-settings': 
                return <SettingsPage settingsView={settingsView} setSettingsView={setSettingsView} expiryThreshold={expiryThreshold} setExpiryThreshold={handleSetExpiryThreshold} provinces={provinces} certificateTypes={certificateTypes} sites={sites} {...settingsHandlers} />;
            
            // Internal states of the training portal
            case 'detailedView': 
                return viewingEmployee ? <DetailedViewPage {...viewingEmployee} processedRecords={processedRecords} setCurrentPage={setPortalSubPage} setModalState={setModalState} setDeletingRecordId={setDeletingRecordId} expiryThreshold={expiryThreshold} /> : <RecordsPage/>; // Fallback to records
            case 'activityDetails': 
                return <ActivityDetailsPage setCurrentPage={setPortalSubPage} expiringCerts={expiringCertsForDashboard} activities={activities} initialTab={activityTab} showDetailedView={showDetailedView} processedRecords={processedRecords} />;

            default: 
                return <DashboardPage logActivity={logActivity} dashboardData={dashboardData} sites={sites} selectedSiteDashboard={selectedSiteDashboard} setSelectedSiteDashboard={setSelectedSiteDashboard} activities={activities} expiringCerts={expiringCertsForDashboard.slice(0,5)} activeFilter={activeDashboardFilter} setActiveFilter={setActiveDashboardFilter} resetFilters={resetDashboardFilters} showActivityPage={showActivityPage} showDetailedView={showDetailedView} processedRecords={processedRecords} />;
        }
    };

    return (
        <div>
            <main>
                {renderPage()}
            </main>
            {modalState.isOpen && <CRUDModal modalState={modalState} onClose={() => setModalState({isOpen: false, type: null, data: null})} onSave={onModalSave} onSaveEmployee={onModalSaveEmployee} sites={sites} certificateTypes={certificateTypes} uniqueEmployees={uniqueEmployees} />}
            {deletingRecordId && <DeleteModal onClose={() => setDeletingRecordId(null)} onConfirm={() => onConfirmDelete(deletingRecordId)} />}
        </div>
    );
};

export default TrainingPortalApp;
