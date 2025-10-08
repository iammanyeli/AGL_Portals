import React, { useState, useEffect, useMemo } from 'react';
import InputField from '../ui/InputField.jsx';
import SelectField from '../ui/SelectField.jsx';
import Section from '../ui/Section.jsx';

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
            for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
            <div className="relative mx-auto p-6 w-full max-w-2xl shadow-lg rounded-2xl bg-[var(--color-surface-alt)] transform transition-all animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
                    <button onClick={onClose} className="h-8 w-8 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 modal-content overflow-y-auto px-1" style={{maxHeight: '75vh'}}>
                    
                    {(type === 'editRecord' || type === 'addCertificateToEmployee') && (
                         <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Employee</p>
                            <p className="text-lg font-semibold text-[var(--color-text-primary)]">{formData.employee.firstName} {formData.employee.surname} <span className="text-[var(--color-text-secondary)] font-normal">({formData.employee.employeeNumber})</span></p>
                        </div>
                    )}
                    
                    {isAddWizard && step === 1 && (
                        <div>
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Step 1: Select Employee</h3>
                            <div className="space-y-4 pt-6 border-t border-[var(--color-divider)]">
                                <div className="flex items-center justify-center p-1 bg-[var(--color-surface)] rounded-lg">
                                    <button type="button" onClick={() => setIsNewEmployee(false)} className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors ${!isNewEmployee ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] shadow' : 'text-[var(--color-text-secondary)]'}`}>Existing Employee</button>
                                    <button type="button" onClick={() => setIsNewEmployee(true)} className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors ${isNewEmployee ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] shadow' : 'text-[var(--color-text-secondary)]'}`}>New Employee</button>
                                </div>
                                {isNewEmployee ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        <InputField label="EMP #" name="employee.employeeNumber" value={formData.employee.employeeNumber} onChange={handleChange} required />
                                        <InputField label="First Name" name="employee.firstName" value={formData.employee.firstName} onChange={handleChange} required />
                                        <InputField label="Surname" name="employee.surname" value={formData.employee.surname} onChange={handleChange} required />
                                        <SelectField label="Gender" name="employee.gender" value={formData.employee.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                                        <InputField label="Job Title" name="employee.jobTitle" value={formData.employee.jobTitle} onChange={handleChange} />
                                    </div>
                                ) : (
                                    <div>
                                        <InputField label="Search Employee" name="employeeSearch" value={employeeSearch} onChange={(e) => setEmployeeSearch(e.target.value)} placeholder="Search by name or EMP#..." />
                                        <div className="mt-2 border border-[var(--color-border)] rounded-lg max-h-48 overflow-y-auto bg-[var(--color-surface-alt)]">
                                            {filteredEmployees.map(emp => (
                                                <div key={emp.employeeNumber} onClick={() => handleSelectEmployee(emp)} className="p-3 hover:bg-[var(--color-info)]/10 cursor-pointer border-b border-[var(--color-divider)]">
                                                    <p className="font-semibold text-[var(--color-text-primary)]">{emp.firstName} {emp.surname}</p>
                                                    <p className="text-sm text-[var(--color-text-secondary)]">{emp.employeeNumber}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {formData.employee.employeeNumber && (
                                            <div className="mt-4 p-4 bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 rounded-lg">
                                                <p className="font-semibold text-[var(--color-text-primary)]">Selected: {formData.employee.firstName} {formData.employee.surname} ({formData.employee.employeeNumber})</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {((isAddWizard && step === 2) || (type === 'editRecord' || type === 'addCertificateToEmployee')) && (
                         <>
                            <Section title="Training Details">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SelectField label="Site" name="location.site" value={formData.location.site} onChange={handleChange} options={sites.map(s => s.abbreviatedName)} required />
                                    <SelectField label="Training Title" name="trainingTitle" value={formData.trainingTitle} onChange={handleChange} options={availableCerts} required disabled={!formData.location.site} />
                                    <InputField label="Training Provider" name="provider" value={formData.provider} onChange={handleChange} />
                                    <InputField label="Certificate ID" name="certificateId" value={formData.certificateId} onChange={handleChange} />
                                    <InputField label="Issued By" name="issuedBy" value={formData.issuedBy} onChange={handleChange} />
                                </div>
                            </Section>
                            <Section title="Certificate Validity">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputField label="Date of Training" name="status.dateOfTraining" value={formData.status.dateOfTraining} onChange={handleChange} type="date" required />
                                    <InputField label="Date of Expiry" name="status.dateOfExpiry" value={formData.status.dateOfExpiry} onChange={handleChange} type="date" required />
                                </div>
                            </Section>
                        </>
                    )}

                    {type === 'editEmployee' && (
                         <Section title="Employee Information">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="EMP #" name="employee.employeeNumber" value={formData.employee.employeeNumber} onChange={handleChange} required disabled />
                                <InputField label="First Name" name="employee.firstName" value={formData.employee.firstName} onChange={handleChange} required />
                                <InputField label="Surname" name="employee.surname" value={formData.employee.surname} onChange={handleChange} required />
                                <SelectField label="Gender" name="employee.gender" value={formData.employee.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                                <InputField label="Job Title" name="employee.jobTitle" value={formData.employee.jobTitle} onChange={handleChange} />
                            </div>
                        </Section>
                    )}


                    <div className="flex justify-end space-x-4 pt-6 border-t border-[var(--color-divider)]">
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
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CRUDModal;