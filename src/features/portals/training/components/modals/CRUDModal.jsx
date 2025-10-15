import React, { useState, useEffect, useMemo } from 'react';

// --- Inlined Primitives to resolve build errors & align with registry ---

// primitive: TextField
const TextField = ({ label, name, type = 'text', value, onChange, required = false, disabled = false, placeholder='' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled} placeholder={placeholder}
               className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] transition-shadow ${disabled ? 'bg-[var(--color-control-surface-bg)] cursor-not-allowed' : ''}`} />
    </div>
);

// primitive: SelectField
const SelectField = ({ label, name, value, onChange, options, required, disabled=false, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{label}</label>
        <div className="relative">
            <select
                id={name} name={name} value={value || ''} onChange={onChange} required={required} disabled={disabled}
                className={`block appearance-none w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <option value="">{placeholder || `Select ${label}...`}</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-text-secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
        </div>
    </div>
);

// block: Section
const Section = ({ title, children }) => (
    <div className="border-t border-[var(--color-divider)] pt-6">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">{title}</h3>
        {children}
    </div>
);

// icon: CloseIcon
const CloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// layout: ModalLayout
const ModalLayout = ({ title, onClose, children, footer }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
        <div className="relative mx-auto p-6 w-full max-w-2xl shadow-lg rounded-2xl bg-[var(--color-surface-alt)] transform transition-all animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
                <button onClick={onClose} className="h-8 w-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-full transition-colors">
                    <CloseIcon />
                </button>
            </div>
            {children}
            <div className="flex justify-end space-x-4 pt-6 border-t border-[var(--color-divider)]">
                {footer}
            </div>
        </div>
    </div>
);

// Enum for Gender
const GenderEnum = Object.freeze({
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
});

// --- New Decoupled Blocks ---

// block: ListItem
const ListItem = ({ title, subtitle, onClick }) => (
    <div onClick={onClick} className="p-3 hover:bg-[var(--color-info)]/10 cursor-pointer border-b border-[var(--color-divider)]">
        <p className="font-semibold text-[var(--color-text-primary)]">{title}</p>
        {subtitle && <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>}
    </div>
);

// block: EmployeeCreateBlock
const EmployeeCreateBlock = ({ formData, onFormChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <TextField label="EMP #" name="employee.employeeNumber" value={formData.employee.employeeNumber} onChange={onFormChange} required />
        <TextField label="First Name" name="employee.firstName" value={formData.employee.firstName} onChange={onFormChange} required />
        <TextField label="Surname" name="employee.surname" value={formData.employee.surname} onChange={onFormChange} required />
        <SelectField label="Gender" name="employee.gender" value={formData.employee.gender} onChange={onFormChange} options={Object.values(GenderEnum)} />
        <TextField label="Job Title" name="employee.jobTitle" value={formData.employee.jobTitle} onChange={onFormChange} />
    </div>
);

// block: EmployeeSearchBlock
const EmployeeSearchBlock = ({ onSelect, employeeSearch, onSearchChange, filteredEmployees, selectedEmployee }) => (
    <div>
        <TextField label="Search Employee" name="employeeSearch" value={employeeSearch} onChange={onSearchChange} placeholder="Search by name or EMP#..." />
        <div className="mt-2 border border-[var(--color-border)] rounded-lg max-h-48 overflow-y-auto bg-[var(--color-surface-highlight)]">
            {filteredEmployees.map(emp => (
                <ListItem
                    key={emp.employeeNumber}
                    onClick={() => onSelect(emp)}
                    title={`${emp.firstName} ${emp.surname}`}
                    subtitle={emp.employeeNumber}
                />
            ))}
        </div>
        {selectedEmployee.employeeNumber && (
            <div className="mt-4 p-4 bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 rounded-lg">
                <p className="font-semibold text-[var(--color-text-primary)]">Selected: {selectedEmployee.firstName} {selectedEmployee.surname} ({selectedEmployee.employeeNumber})</p>
            </div>
        )}
    </div>
);

// block: EmployeeSelectorBlock
const EmployeeSelectorBlock = ({ isNew, onToggle, ...props }) => (
    <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Step 1: Select Employee</h3>
        <div className="space-y-4 pt-6 border-t border-[var(--color-divider)]">
            <div className="flex items-center justify-center p-1 bg-[var(--color-surface)] rounded-lg">
                <button type="button" onClick={() => onToggle(false)} className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors ${!isNew ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] shadow' : 'text-[var(--color-text-secondary)]'}`}>Existing Employee</button>
                <button type="button" onClick={() => onToggle(true)} className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors ${isNew ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] shadow' : 'text-[var(--color-text-secondary)]'}`}>New Employee</button>
            </div>
            {isNew ? (
                <EmployeeCreateBlock {...props} />
            ) : (
                <EmployeeSearchBlock {...props} selectedEmployee={props.formData.employee} />
            )}
        </div>
    </div>
);

// Helper to get nested values from formData
const getNestedValue = (obj, path) => path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : '', obj);

// block: DetailsBlock
const DetailsBlock = ({ title, fields, formData, onFormChange }) => (
    <Section title={title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(field => {
                const value = getNestedValue(formData, field.name);
                return field.type === 'select' ? (
                    <SelectField key={field.name} {...field} value={value} onChange={onFormChange} />
                ) : (
                    <TextField key={field.name} {...field} value={value} onChange={onFormChange} />
                );
            })}
        </div>
    </Section>
);

// block: ExpiryValidityBlock
const ExpiryValidityBlock = ({ formData, onFormChange }) => (
    <Section title="Certificate Validity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Date of Training" name="status.dateOfTraining" value={formData.status.dateOfTraining} onChange={onFormChange} type="date" required />
            <TextField label="Date of Expiry" name="status.dateOfExpiry" value={formData.status.dateOfExpiry} onChange={onFormChange} type="date" required />
        </div>
    </Section>
);

// block: DetailsFormLayout
const DetailsFormLayout = ({ formData, onFormChange, sites, availableCerts }) => {
    const trainingFields = [
       { type: 'select', label: 'Site', name: 'location.site', options: sites.map(s => s.abbreviatedName), required: true },
       { type: 'select', label: 'Training Title', name: 'trainingTitle', options: availableCerts, required: true, disabled: !formData.location.site },
       { type: 'text', label: 'Training Provider', name: 'provider', placeholder: 'e.g. Red Cross' },
       { type: 'text', label: 'Certificate ID', name: 'certificateId' },
       { type: 'text', label: 'Issued By', name: 'issuedBy' },
    ];

    return (
        <>
            <DetailsBlock title="Training Details" fields={trainingFields} formData={formData} onFormChange={onFormChange} />
            <ExpiryValidityBlock formData={formData} onFormChange={onFormChange} />
        </>
    );
};


const CRUDModal = ({ onClose, onSave, onSaveEmployee, modalState, sites, certificateTypes, uniqueEmployees }) => {
    const { type, data } = modalState;
    const isEmployeeEdit = type === 'editEmployee';
    const isAddingCertToEmployee = type === 'addCertificateToEmployee';
    
    const [step, setStep] = useState(1);
    const [isNewEmployee, setIsNewEmployee] = useState(false);
    const [employeeSearch, setEmployeeSearch] = useState('');

    const initialRecord = isAddingCertToEmployee 
        ? { employee: data.employee } 
        : (data || {});

    const [formData, setFormData] = useState({
        id: initialRecord.id || null,
        employee: { ...initialRecord.employee },
        trainingTitle: initialRecord.trainingTitle || '',
        provider: initialRecord.provider || '',
        location: { site: initialRecord.location?.site || '' },
        status: { dateOfTraining: initialRecord.status?.dateOfTraining || '', dateOfExpiry: initialRecord.status?.dateOfExpiry || '' },
        certificateId: initialRecord.certificateId || '',
        issuedBy: initialRecord.issuedBy || ''
    });

    const [availableCerts, setAvailableCerts] = useState([]);
    
    const filteredEmployees = useMemo(() => 
        (uniqueEmployees || []).filter(emp => 
            `${emp.firstName} ${emp.surname} ${emp.employeeNumber}`.toLowerCase().includes(employeeSearch.toLowerCase())
        ), 
    [uniqueEmployees, employeeSearch]);

    useEffect(() => {
        if (formData.location.site) {
            const site = sites.find(s => s.abbreviatedName === formData.location.site);
            setAvailableCerts(site ? site.certificates : []);
        } else {
            setAvailableCerts([]);
        }
    }, [formData.location.site, sites]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        setFormData(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]] = current[keys[i]] || {}; }
            current[keys[keys.length - 1]] = value;
            return newState;
        });
    };

    const handleSelectEmployee = (employee) => {
        setFormData(prev => ({ ...prev, employee }));
        setEmployeeSearch('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmployeeEdit) {
            onSaveEmployee(formData.employee);
        } else {
            onSave(formData);
        }
    };
    
    const title = {
        addRecord: 'Add New Training Record',
        editRecord: 'Edit Certificate Details',
        editEmployee: `Edit Profile: ${formData.employee.firstName} ${formData.employee.surname}`,
        addCertificateToEmployee: `Add Certificate for ${formData.employee.firstName}`
    }[type] || 'Modal';
    
    const isAddWizard = type === 'addRecord';

    const renderFooter = () => (
        <>
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-opacity-80 transition duration-200 font-semibold">Cancel</button>
            {isAddWizard ? (
                <>
                    {step === 2 && <button type="button" onClick={() => setStep(1)} className="px-5 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-opacity-80 transition duration-200 font-semibold">Back</button>}
                    {step === 1 ? <button type="button" onClick={() => setStep(2)} className="px-5 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold shadow-sm hover:bg-[var(--color-button-info-hover-bg)] transition duration-200">Next</button> :
                        <button type="submit" className="px-5 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold shadow-sm hover:bg-[var(--color-button-info-hover-bg)] transition duration-200">Save Record</button>
                    }
                </>
            ) : (
                <button type="submit" className="px-5 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold shadow-sm hover:bg-[var(--color-button-info-hover-bg)] transition duration-200">Save Changes</button>
            )}
        </>
    );

    return (
        <ModalLayout title={title} onClose={onClose} footer={renderFooter()}>
            <form onSubmit={handleSubmit} className="space-y-8 modal-content overflow-y-auto px-1" style={{maxHeight: '75vh'}}>
                
                {(type === 'editRecord' || type === 'addCertificateToEmployee') && (
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">Employee</p>
                        <p className="text-lg font-semibold text-[var(--color-text-primary)]">{formData.employee.firstName} {formData.employee.surname} <span className="text-[var(--color-text-secondary)] font-normal">({formData.employee.employeeNumber})</span></p>
                    </div>
                )}
                
                {isAddWizard && step === 1 && (
                    <EmployeeSelectorBlock 
                        isNew={isNewEmployee}
                        onToggle={setIsNewEmployee}
                        formData={formData}
                        onFormChange={handleChange}
                        onSelect={handleSelectEmployee}
                        employeeSearch={employeeSearch}
                        onSearchChange={(e) => setEmployeeSearch(e.target.value)}
                        filteredEmployees={filteredEmployees}
                    />
                )}

                {((isAddWizard && step === 2) || (type === 'editRecord' || type === 'addCertificateToEmployee')) && (
                    <DetailsFormLayout
                        formData={formData}
                        onFormChange={handleChange}
                        sites={sites}
                        availableCerts={availableCerts}
                    />
                )}

                {isEmployeeEdit && (
                    <Section title="Employee Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextField label="EMP #" name="employee.employeeNumber" value={formData.employee.employeeNumber} onChange={handleChange} required disabled />
                            <TextField label="First Name" name="employee.firstName" value={formData.employee.firstName} onChange={handleChange} required />
                            <TextField label="Surname" name="employee.surname" value={formData.employee.surname} onChange={handleChange} required />
                            <SelectField label="Gender" name="employee.gender" value={formData.employee.gender} onChange={handleChange} options={Object.values(GenderEnum)} />
                            <TextField label="Job Title" name="employee.jobTitle" value={formData.employee.jobTitle} onChange={handleChange} />
                        </div>
                    </Section>
                )}
            </form>
        </ModalLayout>
    );
};


export default CRUDModal;

