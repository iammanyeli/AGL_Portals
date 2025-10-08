const AppliedFilters = ({ filters, sites }) => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => value !== '');
    if (activeFilters.length === 0) return null;

    const getSiteFullName = (abbr) => sites.find(s => s.abbreviatedName === abbr)?.fullName || abbr;

    return (
        <div className="p-4 bg-[var(--color-info)]/10 border-l-4 border-[var(--color-info)] mb-4 rounded">
            <h4 className="font-bold text-[var(--color-text-primary)]">Report generated with the following filters:</h4>
            <ul className="list-disc list-inside text-[var(--color-text-secondary)] mt-2">
                {activeFilters.map(([key, value]) => {
                    const label = { searchTerm: 'Search Term', status: 'Status', trainingTitle: 'Training', site: 'Site', province: 'Province' }[key];
                    const displayValue = key === 'site' ? `${getSiteFullName(value)} (${value})` : value;
                    return <li key={key}><strong>{label}:</strong> {displayValue}</li>;
                })}
            </ul>
        </div>
    );
}

export default AppliedFilters;