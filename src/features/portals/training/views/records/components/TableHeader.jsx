const TableHeader = ({ title, sortKey, sortConfig, onSort }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider cursor-pointer transition-colors hover:text-[var(--color-text-primary)] no-print" onClick={() => onSort(sortKey)}>
        <div className="flex items-center space-x-1">
            <span>{title}</span>
            {sortConfig.key === sortKey && (sortConfig.direction === 'asc' ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>)}
        </div>
    </th>
);

export default TableHeader;