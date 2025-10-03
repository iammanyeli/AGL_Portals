import React, { useState } from 'react';
import InputField from '../../../components/ui/InputField.jsx';
import SelectField from '../../../components/ui/SelectField.jsx';

const SiteForm = ({ site, provinces, certificates, onSave, onCancel, onAddProvince, onAddCertificate }) => {
    const [formData, setFormData] = useState(
        site ? {...site} : { abbreviatedName: '', fullName: '', province: '', certificates: [] }
    );
    const [showQuickAdd, setShowQuickAdd] = useState(null); // 'province' or 'certificate'
    const [quickAddValue, setQuickAddValue] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleCertChange = (cert) => {
        const currentCerts = formData.certificates || [];
        const newCerts = currentCerts.includes(cert) 
            ? currentCerts.filter(c => c !== cert)
            : [...currentCerts, cert];
        setFormData({...formData, certificates: newCerts});
    }
    const handleQuickAdd = () => {
        if (quickAddValue.trim() === '') return;
        if (showQuickAdd === 'province') onAddProvince(quickAddValue);
        if (showQuickAdd === 'certificate') onAddCertificate(quickAddValue);
        setQuickAddValue('');
        setShowQuickAdd(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        if (!site) {
            setFormData({ abbreviatedName: '', fullName: '', province: '', certificates: [] }); // Reset form after add
        }
        if (onCancel) {
            onCancel(); // Close edit form
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{site ? 'Edit Site' : 'Add New Site'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Abbreviated Name" name="abbreviatedName" value={formData.abbreviatedName} onChange={handleChange} required placeholder="e.g., JC1" />
                <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g., Johannesburg Central 1"/>
            </div>
            <div className="flex items-end gap-2">
                <div className="flex-grow">
                    <SelectField label="Province" name="province" value={formData.province} onChange={handleChange} options={provinces} required/>
                </div>
                    <button type="button" onClick={() => setShowQuickAdd('province')} className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">+</button>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificates Offered</label>
                <div className="max-h-32 overflow-y-auto border rounded-md p-2 bg-white grid grid-cols-1 sm:grid-cols-2">
                    {(certificates || []).map(cert => (
                        <label key={cert} className="flex items-center space-x-2 p-1">
                            <input type="checkbox" checked={(formData.certificates || []).includes(cert)} onChange={() => handleCertChange(cert)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span>{cert}</span>
                        </label>
                    ))}
                </div>
                <button type="button" onClick={() => setShowQuickAdd('certificate')} className="text-sm text-blue-600 hover:underline mt-1">+ Add new certificate type</button>
            </div>
            <div className="flex justify-end gap-2">
                {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancel</button>}
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">{site ? 'Save Changes' : 'Add Site'}</button>
            </div>
            {showQuickAdd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-xl w-11/12 max-w-sm">
                        <h4 className="font-semibold mb-2">Add New {showQuickAdd}</h4>
                        <input value={quickAddValue} onChange={(e) => setQuickAddValue(e.target.value)} className="block w-full rounded-md border-gray-300" />
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowQuickAdd(null)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                            <button type="button" onClick={handleQuickAdd} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}

export default SiteForm;