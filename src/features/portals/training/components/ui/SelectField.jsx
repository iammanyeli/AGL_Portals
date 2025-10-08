const SelectField = ({ label, name, value, onChange, options, required, disabled=false, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{label}</label>
        <select id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} 
                className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] transition-shadow appearance-none ${disabled ? 'bg-[var(--color-control-surface-bg)] cursor-not-allowed' : ''}`}>
            <option value="">{placeholder || `Select ${label}...`}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

export default SelectField;