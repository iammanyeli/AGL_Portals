const InputField = ({ label, name, type = 'text', value, onChange, required = false, disabled = false, placeholder='' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} placeholder={placeholder} 
               className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] transition-shadow ${disabled ? 'bg-[var(--color-control-surface-bg)] cursor-not-allowed' : ''}`} />
    </div>
);

export default InputField;