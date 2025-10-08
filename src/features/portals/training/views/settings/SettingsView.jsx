import React, { useState, useEffect } from 'react';
import SettingsListManager from './components/SettingsListManager.jsx';
import SiteManager from './components/SiteManager.jsx';
import SettingsMenuItem from './components/SettingsMenuItem.jsx';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';

// --- Sub-component for Expiry Settings ---
const ExpirySettingsView = ({ initialThreshold, onSaveThreshold }) => {
    const [localThreshold, setLocalThreshold] = useState(initialThreshold);

    useEffect(() => {
        setLocalThreshold(initialThreshold);
    }, [initialThreshold]);

    const handleThresholdChange = (e) => {
        setLocalThreshold(e.target.value);
    };

    const handleBlur = () => {
        const newThreshold = Math.max(0, Number(localThreshold));
        setLocalThreshold(newThreshold);
        onSaveThreshold(newThreshold);
    };

    return (
        <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-[var(--shadow-card)] max-w-md">
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] mb-4">Certificates will be marked as 'Expiring Soon' this many days before the expiry date.</p>
            <div className="mt-1 flex items-center gap-4">
                <input 
                    type="number" 
                    className="block w-32 rounded-md border-[var(--color-border)] shadow-sm focus:border-[var(--color-info)] focus:ring-[var(--color-info)] sm:text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)]" 
                    value={localThreshold} 
                    onChange={handleThresholdChange}
                    onBlur={handleBlur}
                    min="0"
                />
                <span className="text-[var(--color-text-secondary)]">days</span>
            </div>
        </div>
    );
};


const SettingsPage = ({ 
    settingsView, setSettingsView, 
    expiryThreshold, setExpiryThreshold, 
    provinces, certificateTypes, sites,
    onAddProvince, onUpdateProvince, onDeleteProvince,
    onAddCertificate, onUpdateCertificate, onDeleteCertificate,
    onAddSite, onUpdateSite, onDeleteSite,
    onDeleteAllData
}) => {
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    
    const SettingsLayout = ({title, children}) => (
        <div>
            <button onClick={() => setSettingsView('main')} className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors font-semibold mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>Back to Settings</span>
            </button>
            <h2 className="text-3xl font-bold text-[var(--color-header)] mb-6">{title}</h2>
            {children}
        </div>
    );

    if (settingsView === 'expiry') {
        return (
            <SettingsLayout title="Expiry Reminder Threshold">
                <ExpirySettingsView initialThreshold={expiryThreshold} onSaveThreshold={setExpiryThreshold} />
            </SettingsLayout>
        );
    }

    if (settingsView === 'provinces') {
        return <SettingsLayout title="Manage Provinces">
            <SettingsListManager 
                items={provinces} 
                onAdd={onAddProvince} 
                onUpdate={onUpdateProvince}
                onDelete={onDeleteProvince} 
                placeholder="New Province Name"
            />
        </SettingsLayout>
    }
    if (settingsView === 'certs') {
        return <SettingsLayout title="Manage Certificate Types">
            <SettingsListManager 
                items={certificateTypes} 
                onAdd={onAddCertificate} 
                onUpdate={onUpdateCertificate}
                onDelete={onDeleteCertificate} 
                placeholder="New Certificate Title"
            />
        </SettingsLayout>
    }
    if (settingsView === 'sites') {
        return <SettingsLayout title="Manage Sites">
            <SiteManager 
                sites={sites} 
                provinces={provinces} 
                certificates={certificateTypes} 
                onAddSite={onAddSite} 
                onUpdateSite={onUpdateSite}
                onDeleteSite={onDeleteSite}
                onAddProvince={onAddProvince}
                onAddCertificate={onAddCertificate}
            />
        </SettingsLayout>
    }

    return (
        <div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsMenuItem title="Expiry Reminder" description="Set how many days before expiry a certificate is marked as 'expiring soon'." icon="⏱️" onClick={() => setSettingsView('expiry')} />
                <SettingsMenuItem title="Manage Provinces" description="Add, edit, or remove provinces available for sites." icon="🌍" onClick={() => setSettingsView('provinces')} />
                <SettingsMenuItem title="Manage Certificate Types" description="Define the types of training certificates your organization tracks." icon="📜" onClick={() => setSettingsView('certs')} />
                <SettingsMenuItem title="Manage Sites" description="Configure site names, locations, and the specific certificates offered at each." icon="🏢" onClick={() => setSettingsView('sites')} />
            </div>

            <div className="mt-12 pt-6 border-t border-[var(--color-border-destructive)]">
                 <h3 className="text-lg font-semibold text-[var(--color-danger)]">Danger Zone</h3>
                 <div className="bg-[var(--color-surface-destructive)] border border-[var(--color-border-destructive)] p-4 rounded-lg mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="font-semibold text-[var(--color-button-destructive-text)]">Delete All Application Data</p>
                        <p className="text-[var(--color-danger)]/80 text-sm mt-1">This will permanently delete all employees, certificates, and settings. This action cannot be undone.</p>
                    </div>
                    <button onClick={() => setShowDeleteAllModal(true)} className="mt-2 sm:mt-0 flex-shrink-0 px-4 py-2 bg-[var(--color-button-destructive-solid-bg)] text-[var(--color-button-destructive-solid-text)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-button-destructive-solid-hover-bg)] transition">
                        Delete All Data
                    </button>
                 </div>
            </div>

            {showDeleteAllModal && (
                 <ConfirmationModal 
                    title="Confirm Permanent Deletion"
                    message="Are you absolutely sure you want to delete ALL application data? This includes every record, employee, site, etc. This is irreversible."
                    onConfirm={() => { onDeleteAllData(); setShowDeleteAllModal(false); }}
                    onClose={() => setShowDeleteAllModal(false)}
                 />
            )}
        </div>
    );
};

export default SettingsPage;