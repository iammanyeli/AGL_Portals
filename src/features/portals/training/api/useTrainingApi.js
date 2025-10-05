import { useState, useEffect, useMemo, useCallback } from 'react';
import * as api from '../../../../services/__mocks__/trainingAPI.js';

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

    // --- Memoized Data Processing (No Changes Here) ---
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
        // Processed Data
        processedRecords, uniqueEmployees,
        // Handlers
        logActivity, fetchAllData, handleAddOrUpdateRecord, handleUpdateEmployee, 
        handleDeleteRecord, handleSetExpiryThreshold, settingsHandlers,
    };
};

export default useTrainingApi;