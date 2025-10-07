import { useState, useEffect, useMemo, useCallback } from 'react';
import * as api from '../../../../services/__mocks__/trainingAPI.js';
import { createDashboardModel } from '../../../../models/training/dashboard.model.js';

const useTrainingApi = () => {
    // --- Core Data State ---
    const [records, setRecords] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [sites, setSites] = useState([]);
    const [certificateTypes, setCertificateTypes] = useState([]);
    const [expiryThreshold, setExpiryThreshold] = useState(30);
    const [activities, setActivities] = useState([]);
    const [currentUser] = useState({ name: 'Jane Doe', initials: 'JD' });

    // --- Activity Logging ---
    const logActivity = useCallback(async (type, details, payload = null) => {
        if (!details) return;
        try {
            await api.addActivity({ user: currentUser, type, details, payload });
        } catch (error) {
            console.error("Failed to log activity:", error);
        }
    }, [currentUser]);

    // --- Data Fetching ---
    const fetchAllData = useCallback(async () => {
        try {
            const [settingsData, dbRecords, dbActivities] = await Promise.all([
                api.getAppSettings(),
                api.getRecords(),
                api.getActivities()
            ]);

            setRecords(dbRecords);
            setProvinces(settingsData.provinces);
            setSites(settingsData.sites);
            setCertificateTypes(settingsData.certificateTypes);
            setActivities(dbActivities);
            if (settingsData.settings && settingsData.settings.expiryThreshold) {
                setExpiryThreshold(Number(settingsData.settings.expiryThreshold));
            }
        } catch (error) {
            console.error("Failed to fetch data from mock API:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // --- Memoized Data Processing ---
    const processedRecords = useMemo(() => {
        return records.map(record => {
            const expiryDate = new Date(record.status.dateOfExpiry);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            let status = 'Valid';
            if (daysLeft < 0) status = 'Expired';
            else if (daysLeft <= expiryThreshold) status = 'Expiring Soon';
            return { ...record, status: { ...record.status, daysLeft, status } };
        });
    }, [records, expiryThreshold]);

    const uniqueEmployees = useMemo(() => {
        const employeeMap = new Map();
        processedRecords.forEach(record => {
            if (!employeeMap.has(record.employee.employeeNumber)) {
                employeeMap.set(record.employee.employeeNumber, record.employee);
            }
        });
        return Array.from(employeeMap.values());
    }, [processedRecords]);

    // --- Model-Driven Dashboard Data ---
    const dashboardModelData = useMemo(() => {
        const stats = {
            total: processedRecords.length,
            valid: processedRecords.filter(r => r.status.status === 'Valid').length,
            expiringSoon: processedRecords.filter(r => r.status.status === 'Expiring Soon').length,
            expired: processedRecords.filter(r => r.status.status === 'Expired').length,
        };

        const statusBreakdown = {
            labels: ['Valid', 'Expiring Soon', 'Expired'],
            data: [stats.valid, stats.expiringSoon, stats.expired]
        };

        const provinceBreakdown = processedRecords.reduce((acc, r) => {
            const provinceName = r.location.province || 'Unassigned';
            acc[provinceName] = (acc[provinceName] || 0) + 1;
            return acc;
        }, {});

        const expiringSoon = processedRecords
            .filter(r => r.status.status === 'Expiring Soon' || r.status.status === 'Expired')
            .sort((a, b) => a.status.daysLeft - b.status.daysLeft);

        const drillDownData = {
             totalBySite: processedRecords.reduce((acc, r) => {
                const siteName = r.location.site || 'Unassigned';
                acc[siteName] = (acc[siteName] || 0) + 1;
                return acc;
            }, {}),
            trainingBySiteBreakdown: processedRecords.reduce((acc, r) => {
                const siteName = r.location.site || 'Unassigned';
                if (!acc[siteName]) acc[siteName] = {};
                acc[siteName][r.trainingTitle] = (acc[siteName][r.trainingTitle] || 0) + 1;
                return acc;
            }, {})
        };


        const dashboardPayload = {
            stats,
            charts: [
                {
                    type: 'doughnut',
                    title: 'Training Status Breakdown',
                    labels: statusBreakdown.labels,
                    datasets: [{ data: statusBreakdown.data }],
                },
                {
                    type: 'bar',
                    title: 'Training by Province',
                    labels: Object.keys(provinceBreakdown),
                    datasets: [{ label: 'Certificates', data: Object.values(provinceBreakdown) }],
                }
            ],
            expiringSoon: expiringSoon.slice(0, 5), // For the dashboard widget
            recentActivity: activities.slice(0, 5),
            drillDownData,
        };

        return createDashboardModel(dashboardPayload);

    }, [processedRecords, activities]);


    // --- Handlers (Kept Original Logic) ---
    const handleAddOrUpdateRecord = async (recordData, modalType) => {
        try {
            if (modalType === 'addRecord' || modalType === 'addCertificateToEmployee') {
                await api.addRecord(recordData);
                await logActivity('record', `Added certificate '${recordData.trainingTitle}' for ${recordData.employee.firstName} ${recordData.employee.surname}.`, { after: recordData });
            } else { // 'editRecord'
                const recordBefore = records.find(r => r.id === recordData.id);
                await api.updateRecord(recordData);
                await logActivity('record', `Updated certificate '${recordData.trainingTitle}' for ${recordBefore.employee.firstName} ${recordBefore.employee.surname}.`, { before: recordBefore, after: recordData });
            }
        } catch (error) {
            console.error("Failed to save record:", error);
        } finally {
            fetchAllData();
        }
    };

    const handleUpdateEmployee = async (employeeData) => {
        try {
            const employeeBefore = uniqueEmployees.find(e => e.employeeNumber === employeeData.employeeNumber);
            await api.updateEmployee(employeeData);
            await logActivity('record', `Updated employee profile for ${employeeData.firstName} ${employeeData.surname}.`, { before: employeeBefore, after: employeeData });
        } catch (error) {
            console.error("Failed to update employee:", error);
        } finally {
            fetchAllData();
        }
    };

    const handleDeleteRecord = async (recordId) => {
        try {
            const recordToDelete = records.find(r => r.id === recordId);
            if (recordToDelete) {
                await api.deleteRecord(recordId);
                await logActivity('record', `Deleted certificate '${recordToDelete.trainingTitle}' for ${recordToDelete.employee.firstName} ${recordToDelete.employee.surname}.`, { before: recordToDelete });
            }
        } catch (error) {
            console.error("Failed to delete record:", error);
        } finally {
            fetchAllData();
        }
    };

    const handleSetExpiryThreshold = async (days) => {
        const oldThreshold = expiryThreshold;
        setExpiryThreshold(days);
        await api.saveSetting('expiryThreshold', days);
        await logActivity('settings', `Set expiry reminder threshold to ${days} days.`, { before: { threshold: oldThreshold }, after: { threshold: days } });
        fetchAllData();
    };

    const createSettingsHandler = (apiCall, activityLogGenerator) => async (...args) => {
        try {
            const logDetails = activityLogGenerator(...args);
            await apiCall(...args);
            if (logDetails && logDetails.details) {
                await logActivity(logDetails.type || 'settings', logDetails.details, logDetails.payload);
            }
            await fetchAllData();
        } catch(error) {
            console.error("Failed to update settings:", error);
        }
    };

    const settingsHandlers = {
        onAddProvince: createSettingsHandler(api.addProvince, (name) => ({ details: `Added new province: '${name}'.`, payload: { after: { name } } })),
        onUpdateProvince: createSettingsHandler(api.updateProvince, (originalName, newName) => ({ details: `Updated province from '${originalName || 'N/A'}' to '${newName || 'N/A'}'.`, payload: { before: { name: originalName }, after: { name: newName } } })),
        onDeleteProvince: createSettingsHandler(api.deleteProvince, (name) => ({ details: `Deleted province: '${name}'.`, payload: { before: { name } } })),
        onAddCertificate: createSettingsHandler(api.addCertificateType, (title) => ({ details: `Added new certificate type: '${title}'.`, payload: { after: { title } } })),
        onUpdateCertificate: createSettingsHandler(api.updateCertificateType, (originalTitle, newTitle) => ({ details: `Updated certificate type from '${originalTitle || 'N/A'}' to '${newTitle || 'N/A'}'.`, payload: { before: { title: originalTitle }, after: { title: newTitle } } })),
        onDeleteCertificate: createSettingsHandler(api.deleteCertificateType, (title) => ({ details: `Deleted certificate type: '${title}'.`, payload: { before: { title } } })),
        onAddSite: createSettingsHandler(api.addSite, (site) => ({ details: `Added new site: ${site.fullName} (${site.abbreviatedName}).`, payload: { after: site } })),
        onUpdateSite: createSettingsHandler(api.updateSite, (originalAbbr, site) => {
            const siteBefore = sites.find(s => s.abbreviatedName === originalAbbr);
            return { details: `Updated site details for ${site.fullName} (${site.abbreviatedName}).`, payload: { before: siteBefore, after: site } };
        }),
        onDeleteSite: createSettingsHandler(api.deleteSite, (abbr) => {
            const siteBefore = sites.find(s => s.abbreviatedName === abbr);
            return { details: `Deleted site: '${siteBefore?.fullName || abbr} (${abbr})'.`, payload: { before: siteBefore } };
        }),
        onDeleteAllData: createSettingsHandler(api.deleteAllData, () => ({ type: 'settings', details: 'Deleted all application data.' }))
    };

    return {
        // State
        records, provinces, sites, certificateTypes, expiryThreshold, activities,
        // Processed & Modeled Data
        processedRecords, uniqueEmployees, dashboardModelData,
        // Handlers
        logActivity, fetchAllData, handleAddOrUpdateRecord, handleUpdateEmployee,
        handleDeleteRecord, handleSetExpiryThreshold, settingsHandlers,
    };
};

/**
 * Adapter function to transform the new dashboard model data into the
 * simplified format expected by the Home Hub's chart components (`App.jsx`).
 * @param {object} dashboardModel - The dashboard data model instance.
 * @returns {object} An object containing metrics, charts, and updates for the hub.
 */
export const adaptDashboardDataForHub = (dashboardModel) => {
    if (!dashboardModel) {
        return { metrics: [], charts: [], updates: [] };
    }

    const { stats, recentActivity, drillDownData, charts: modelCharts } = dashboardModel;

    const metrics = [
        { label: "Total Records", value: stats.total },
        { label: "Valid", value: stats.valid },
        { label: "Expiring", value: stats.expiringSoon },
        { label: "Expired", value: stats.expired },
    ];

    const statusChart = modelCharts.find(c => c.title.includes("Status Breakdown"));

    const pieChart = {
        type: 'pie',
        title: 'Overall Training Status',
        data: statusChart ? statusChart.labels.map((label, index) => ({
            name: label,
            value: statusChart.datasets[0].data[index],
        })) : [],
    };
    
    // FIX: Using the correct title and the generic 'value' key.
    const barChart = {
        type: 'bar',
        title: 'Total Certificates by Site',
        data: Object.entries(drillDownData.totalBySite).map(([siteName, count]) => ({
            name: siteName,
            value: count, 
        })),
    };


    const updates = recentActivity.map(activity => ({
        user: activity.user_name || 'System',
        action: activity.details,
        time: new Date(activity.timestamp).toLocaleDateString(),
    }));

    return { metrics, charts: [pieChart, barChart], updates };
};


export default useTrainingApi;