const { useState } = React;

const SiteManager = ({ sites, provinces, certificates, onAddSite, onUpdateSite, onDeleteSite, onAddProvince, onAddCertificate }) => {
    const [editingSite, setEditingSite] = useState(null); // stores the site being edited
    
    return (
            <div className="bg-white p-6 rounded-xl shadow-lg">
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

                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4 border-t pt-4">Existing Sites</h3>
                <ul className="space-y-3 max-h-[40vh] overflow-y-auto">
                {(sites || []).map(site => (
                    <li key={site.abbreviatedName} className="flex justify-between items-start bg-gray-50 p-3 rounded-md">
                        <div>
                            <p className="font-bold text-gray-800">{site.fullName} ({site.abbreviatedName})</p>
                            <p className="text-sm text-gray-600 font-medium">{site.province}</p>
                            <p className="text-xs text-gray-500 mt-1">Offers: {site.certificates.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => setEditingSite(site)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                            <button onClick={() => onDeleteSite(site.abbreviatedName)} className="text-red-500 hover:text-red-700 font-bold text-xl px-2">&times;</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
