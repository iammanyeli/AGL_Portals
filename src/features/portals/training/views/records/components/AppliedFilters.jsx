const AppliedFilters = ({ filters, sites }) => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => value !== '');
    if (activeFilters.length === 0) return null;

    const getSiteFullName = (abbr) => sites.find(s => s.abbreviatedName === abbr)?.fullName || abbr;

    return (
        <div className="p-4 bg-gray-100 border-l-4 border-blue-500 mb-4 rounded">
            <h4 className="font-bold text-gray-800">Report generated with the following filters:</h4>
            <ul className="list-disc list-inside text-gray-700 mt-2">
                {activeFilters.map(([key, value]) => {
                    const label = { searchTerm: 'Search Term', status: 'Status', trainingTitle: 'Training', site: 'Site', province: 'Province' }[key];
                    const displayValue = key === 'site' ? `${getSiteFullName(value)} (${value})` : value;
                    return <li key={key}><strong>{label}:</strong> {displayValue}</li>;
                })}
            </ul>
        </div>
    );
}
