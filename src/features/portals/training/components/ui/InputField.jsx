const InputField = ({ label, name, type = 'text', value, onChange, required = false, disabled = false, placeholder='' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-slate-600 mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} placeholder={placeholder} 
               className={`w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${disabled ? 'bg-slate-200 cursor-not-allowed' : ''}`} />
    </div>
);
