import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// Production Imports from existing repo
import Button from '/src/components/primitives/Button.jsx';
import Switch from '/src/components/primitives/Switch.jsx';
import { Settings, ChevronLeft, Sun, Moon, BookOpen, Wrench } from '/src/components/icons';
import ConfirmationModal from '/src/features/portals/training/components/modals/ConfirmationModal.jsx';
import useTheme from '/src/hooks/useTheme.js';

// Import the new redesigned components
import ManageProvinces from './components/ManageProvinces.jsx';
import ManageCertificates from './components/ManageCertificates.jsx';

// Production sub-components (unchanged, but paths are corrected)
import SiteManager from './components/SiteManager.jsx';

// Sub-component for Expiry Settings (remains the same as production)
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
    const { theme, toggleTheme } = useTheme();
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [localThreshold, setLocalThreshold] = useState(expiryThreshold);

     useEffect(() => {
        setLocalThreshold(expiryThreshold);
    }, [expiryThreshold]);

    const handleThresholdChange = (e) => {
        setLocalThreshold(e.target.value);
    };

    const handleThresholdSave = () => {
        const newThreshold = Math.max(0, Number(localThreshold));
        if (newThreshold !== expiryThreshold) {
            setExpiryThreshold(newThreshold);
        }
    };

    // Layout wrapper remains the same
    const SettingsLayout = ({ children }) => (
        <div>
            <button onClick={() => setSettingsView('main')} className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors font-semibold mb-6">
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Settings</span>
            </button>
            {children}
        </div>
    );

    // --- Integrating new components based on settingsView ---
    if (settingsView === 'provinces') {
        return (
            <SettingsLayout>
                <ManageProvinces
                    items={provinces}
                    onAdd={onAddProvince}
                    onUpdate={onUpdateProvince}
                    onDelete={onDeleteProvince}
                    placeholder="e.g. Gauteng"
                />
            </SettingsLayout>
        );
    }
    if (settingsView === 'certs') {
        return (
            <SettingsLayout>
                <ManageCertificates
                    items={certificateTypes}
                    onAdd={onAddCertificate}
                    onUpdate={onUpdateCertificate}
                    onDelete={onDeleteCertificate}
                    placeholder="e.g. First Aid Training"
                />
            </SettingsLayout>
        );
    }
    // Other views remain the same
    if (settingsView === 'expiry') {
        return (
            <SettingsLayout>
                <ExpirySettingsView initialThreshold={expiryThreshold} onSaveThreshold={setExpiryThreshold} />
            </SettingsLayout>
        );
    }
    if (settingsView === 'sites') {
        return <SettingsLayout>
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

    // Main settings page remains the same
    return (
        <div style={{ minHeight: '100vh', padding: '0' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <div className="p-0">
                        {/* === GENERAL SETTINGS === */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">General</h3>
                            <div className="divide-y divide-[var(--color-divider)] border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)]">
                                <div className="p-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-[var(--color-text-primary)]">Theme</h4>
                                        <p className="text-sm text-[var(--color-text-secondary)]">Switch between light and dark mode for the application.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />
                                        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                                        <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />
                                    </div>
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-[var(--color-text-primary)]">Expiry Reminder Threshold</h4>
                                        <p className="text-sm text-[var(--color-text-secondary)]">Days before expiry to mark a certificate as "Expiring Soon".</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={localThreshold}
                                            onChange={handleThresholdChange}
                                            onBlur={handleThresholdSave}
                                            className="w-20 rounded-md border-[var(--color-border)] shadow-sm focus:border-[var(--color-info)] focus:ring-[var(--color-info)] sm:text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] text-center"
                                            style={{backgroundColor: 'var(--color-surface-contrast)', borderColor: 'var(--color-border)'}}
                                        />
                                        <span className="text-sm text-[var(--color-text-secondary)]">days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* === MANAGEMENT SETTINGS === */}
                        <div className="p-6">
                             <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Management</h3>
                             <div className="divide-y divide-[var(--color-divider)] border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)]">
                                <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-hover)] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <Settings className="w-5 h-5 text-[var(--color-text-secondary)]" />
                                        <div>
                                            <h4 className="font-semibold text-[var(--color-text-primary)]">Manage Provinces</h4>
                                            <p className="text-sm text-[var(--color-text-secondary)]">Add, edit, or remove provinces available for sites.</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => setSettingsView('provinces')} className="flex items-center gap-2">Manage</Button>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-hover)] transition-colors">
                                     <div className="flex items-center gap-4">
                                        <BookOpen className="w-5 h-5 text-[var(--color-text-secondary)]" />
                                        <div>
                                            <h4 className="font-semibold text-[var(--color-text-primary)]">Manage Certificate Types</h4>
                                            <p className="text-sm text-[var(--color-text-secondary)]">Define the training certificates your organization tracks.</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => setSettingsView('certs')} className="flex items-center gap-2">Manage</Button>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-hover)] transition-colors">
                                     <div className="flex items-center gap-4">
                                        <Wrench className="w-5 h-5 text-[var(--color-text-secondary)]" />
                                        <div>
                                            <h4 className="font-semibold text-[var(--color-text-primary)]">Manage Sites</h4>
                                            <p className="text-sm text-[var(--color-text-secondary)]">Configure site details and their available certificates.</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => setSettingsView('sites')} className="flex items-center gap-2">Manage</Button>
                                </div>
                            </div>
                        </div>
                        
                        {/* === DANGER ZONE === */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-[var(--color-danger)] uppercase tracking-wider mb-4">Danger Zone</h3>
                            <div className="p-4 border border-[var(--color-border-destructive)] rounded-lg flex items-center justify-between" style={{backgroundColor: 'var(--color-surface-destructive)'}}>
                                <div>
                                    <h4 className="font-semibold text-[var(--color-button-destructive-text)]">Delete All Training Data</h4>
                                    <p className="text-sm text-[var(--color-danger)]/80">Permanently delete all records, sites, and settings in this portal.</p>
                                </div>
                                <Button onClick={() => setShowDeleteAllModal(true)} style={{backgroundColor: 'var(--color-button-destructive-solid-bg)', color: 'var(--color-button-destructive-solid-text)'}} className="flex items-center gap-2">
                                    Delete All Data
                                </Button>
                            </div>
                        </div>
                    </div>
            </motion.div>
            
            {showDeleteAllModal && (
                 <ConfirmationModal 
                    title="Confirm Permanent Deletion"
                    message="Are you sure you want to delete ALL application data? This includes every record, employee, site, etc. This is irreversible."
                    onConfirm={() => { onDeleteAllData(); setShowDeleteAllModal(false); }}
                    onClose={() => setShowDeleteAllModal(false)}
                 />
            )}
        </div>
    );
}

export default SettingsPage;

