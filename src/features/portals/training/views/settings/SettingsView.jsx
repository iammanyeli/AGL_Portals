const { useState, useEffect } = React;

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
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
            <p className="mt-1 text-sm text-gray-600 mb-4">Certificates will be marked as 'Expiring Soon' this many days before the expiry date.</p>
            <div className="mt-1 flex items-center gap-4">
                <input 
                    type="number" 
                    className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                    value={localThreshold} 
                    onChange={handleThresholdChange}
                    onBlur={handleBlur}
                    min="0"
                />
                <span className="text-gray-700">days</span>
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
            <button onClick={() => setSettingsView('main')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-semibold mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>Back to Settings</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsMenuItem title="Expiry Reminder" description="Set how many days before expiry a certificate is marked as 'expiring soon'." icon="⏱️" onClick={() => setSettingsView('expiry')} />
                <SettingsMenuItem title="Manage Provinces" description="Add, edit, or remove provinces available for sites." icon="🌍" onClick={() => setSettingsView('provinces')} />
                <SettingsMenuItem title="Manage Certificate Types" description="Define the types of training certificates your organization tracks." icon="📜" onClick={() => setSettingsView('certs')} />
                <SettingsMenuItem title="Manage Sites" description="Configure site names, locations, and the specific certificates offered at each." icon="🏢" onClick={() => setSettingsView('sites')} />
            </div>

            <div className="mt-12 pt-6 border-t border-red-300">
                 <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
                 <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="font-semibold text-red-800">Delete All Application Data</p>
                        <p className="text-red-600 text-sm mt-1">This will permanently delete all employees, certificates, and settings. This action cannot be undone.</p>
                    </div>
                    <button onClick={() => setShowDeleteAllModal(true)} className="mt-2 sm:mt-0 flex-shrink-0 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
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
