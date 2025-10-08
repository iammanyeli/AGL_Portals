import React, { useState } from 'react';
import SiteForm from './SiteForm.jsx';

const SiteManager = ({ sites, provinces, certificates, onAddSite, onUpdateSite, onDeleteSite, onAddProvince, onAddCertificate }) => {
    const [editingSite, setEditingSite] = useState(null); // stores the site being edited
    
    return (
            <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-[var(--shadow-card)]">
            {editingSite ? 
                <SiteForm 
                    key={editingSite.abbreviatedName}
                    site={editingSite}
                    provinces={provinces}
                    certificates={certificates}
                    onSave={(updatedData) => {
                        onUpdateSite(editingSite.abbreviatedName, updatedData);
                        setEditingSite(null);
                    }}
                    onCancel={() => setEditingSite(null)}
                    onAddProvince={onAddProvince}
                    onAddCertificate={onAddCertificate}
                /> :
                <SiteForm 
                    provinces={provinces}
                    certificates={certificates}
                    onSave={onAddSite}
                    onAddProvince={onAddProvince}
                    onAddCertificate={onAddCertificate}
                />
            }

                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-8 mb-4 border-t border-[var(--color-divider)] pt-4">Existing Sites</h3>
                <ul className="space-y-3 max-h-[40vh] overflow-y-auto">
                {(sites || []).map(site => (
                    <li key={site.abbreviatedName} className="flex justify-between items-start bg-[var(--color-surface-contrast)] p-3 rounded-md">
                        <div>
                            <p className="font-bold text-[var(--color-text-primary)]">{site.fullName} ({site.abbreviatedName})</p>
                            <p className="text-sm text-[var(--color-text-secondary)] font-medium">{site.province}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Offers: {site.certificates.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => setEditingSite(site)} className="text-[var(--color-info)] hover:opacity-80 font-semibold text-sm">Edit</button>
                            <button onClick={() => onDeleteSite(site.abbreviatedName)} className="text-[var(--color-danger)] hover:opacity-80 font-bold text-xl px-2">&times;</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SiteManager;