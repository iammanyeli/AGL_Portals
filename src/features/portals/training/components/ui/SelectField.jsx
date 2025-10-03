const SelectField = ({ label, name, value, onChange, options, required, disabled=false, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-slate-600 mb-1">{label}</label>
        <select id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} 
                className={`w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none ${disabled ? 'bg-slate-200 cursor-not-allowed' : ''}`}>
            <option value="">{placeholder || `Select ${label}...`}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

export default SelectField;