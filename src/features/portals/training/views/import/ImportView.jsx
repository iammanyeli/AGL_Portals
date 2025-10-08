import React, { useState, useMemo, useCallback } from 'react';
import InputField from '../../components/ui/InputField.jsx';
import SelectField from '../../components/ui/SelectField.jsx';
import Section from '../../components/ui/Section.jsx';

const ImportPage = ({ logActivity, sites, provinces, certificateTypes, onImportSuccess, settingsHandlers }) => {
    const [step, setStep] = useState(1); // 1: Upload, 2: Map, 2.5: Validate, 3: Preview, 4: Result
    const [file, setFile] = useState(null);
    const [fileHeaders, setFileHeaders] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [mappings, setMappings] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [importResult, setImportResult] = useState(null);
    
    // State for validation
    const [validationData, setValidationData] = useState({
        newSites: [],
        newCertTypes: [],
        siteCertMap: {},
        newLinksForExistingSites: {}
    });
    const [siteCreationData, setSiteCreationData] = useState({});

    // State for on-the-fly additions
    const [newlyAddedProvinces, setNewlyAddedProvinces] = useState([]);
    const [showQuickAddModal, setShowQuickAddModal] = useState(false);
    const [quickAddValue, setQuickAddValue] = useState('');
    
    const allAvailableProvinces = useMemo(() => {
        return [...new Set([...(provinces || []), ...newlyAddedProvinces])];
    }, [provinces, newlyAddedProvinces]);

    const appDataFields = useMemo(() => [
        { key: 'employee.employeeNumber', label: 'Employee Number', required: true },
        { key: 'employee.firstName', label: 'First Name', required: true },
        { key: 'employee.surname', label: 'Surname', required: true },
        { key: 'employee.gender', label: 'Gender' },
        { key: 'employee.jobTitle', label: 'Job Title' },
        { key: 'trainingTitle', label: 'Training Title', required: true },
        { key: 'provider', label: 'Provider' },
        { key: 'location.site', label: 'Site (Abbr.)', required: true },
        { key: 'status.dateOfTraining', label: 'Training Date', required: true },
        { key: 'status.dateOfExpiry', label: 'Expiry Date', required: true }
    ], []);

    const resetState = useCallback(() => {
        setStep(1); setFile(null); setFileHeaders([]); setFileData([]);
        setMappings({}); setError(''); setIsLoading(false); setImportResult(null);
        setValidationData({ newSites: [], newCertTypes: [], siteCertMap: {}, newLinksForExistingSites: {} });
        setSiteCreationData({}); setNewlyAddedProvinces([]);
    }, []);
    
    const convertExcelDate = (excelDate) => {
        if (typeof excelDate !== 'number' || excelDate < 1) return excelDate;
        const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
        return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : excelDate;
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        resetState(); setIsLoading(true); setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                let data, headers;
                if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.txt')) {
                    const parsed = window.Papa.parse(event.target.result, { header: true, skipEmptyLines: true });
                    headers = parsed.meta.fields; data = parsed.data;
                } else if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
                    const workbook = window.XLSX.read(event.target.result, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    data = window.XLSX.utils.sheet_to_json(worksheet); 
                    headers = data.length > 0 ? Object.keys(data[0]) : [];
                } else { throw new Error("Unsupported file type. Please upload CSV or XLSX."); }

                if (!headers || data.length === 0) throw new Error("Could not read file or file is empty.");

                setFileHeaders(headers); setFileData(data);
                const initialMappings = {};
                headers.forEach(header => {
                    const matchedField = appDataFields.find(field => field.label.toLowerCase() === header.toLowerCase().trim());
                    if (matchedField) initialMappings[header] = matchedField.key;
                });
                setMappings(initialMappings);
                setStep(2);
            } catch (err) { setError(`Error parsing file: ${err.message}`); resetState();
            } finally { setIsLoading(false); }
        };
        reader.onerror = () => { setError("Failed to read the file."); setIsLoading(false); };
        reader.readAsArrayBuffer(selectedFile);
    };
    
    const transformedData = useMemo(() => {
        if (fileData.length === 0) return [];
        const setNestedValue = (obj, path, value) => {
            const keys = path.split('.'); let current = obj;
            for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]] = current[keys[i]] || {}; }
            current[keys[keys.length - 1]] = value;
        };
        
        return fileData.map(row => {
            const newRecord = {};
            for (const fileHeader in mappings) {
                const appFieldKey = mappings[fileHeader];
                if (appFieldKey && row[fileHeader] !== undefined) {
                    let value = row[fileHeader];
                    if (appFieldKey.includes('date')) { 
                        value = convertExcelDate(value); 
                    }
                    if (appFieldKey === 'employee.gender') {
                        const lowerVal = String(value).toLowerCase().trim();
                        if (lowerVal === 'm') value = 'Male';
                        if (lowerVal === 'f') value = 'Female';
                    }
                    setNestedValue(newRecord, appFieldKey, String(value).trim());
                }
            }
            return newRecord;
        });
    }, [fileData, mappings]);
    
    const handleValidate = async () => {
        const siteHeader = Object.keys(mappings).find(h => mappings[h] === 'location.site');
        const certHeader = Object.keys(mappings).find(h => mappings[h] === 'trainingTitle');
        if (!siteHeader || !certHeader) {
            setError("You must map both 'Site (Abbr.)' and 'Training Title' to continue."); return;
        }

        setIsLoading(true);
        try {
            const freshSettings = await window.api.getAppSettings();
            const existingSiteAbbrs = (freshSettings.sites || []).map(s => s.abbreviatedName.trim().toLowerCase());
            const existingCertTitles = (freshSettings.certificateTypes || []).map(t => t.trim().toLowerCase());

            const importedSites = [...new Set(fileData.map(row => String(row[siteHeader] || '').trim()).filter(Boolean))];
            const importedCerts = [...new Set(fileData.map(row => String(row[certHeader] || '').trim()).filter(Boolean))];

            const newSites = importedSites.filter(abbr => !existingSiteAbbrs.includes(abbr.toLowerCase()));
            const newCertTypes = importedCerts.filter(title => !existingCertTitles.includes(title.toLowerCase()));

            const siteCertMap = {};
            fileData.forEach(row => {
                const site = String(row[siteHeader] || '').trim();
                const cert = String(row[certHeader] || '').trim();
                if (site && cert) {
                    if (!siteCertMap[site]) siteCertMap[site] = new Set();
                    siteCertMap[site].add(cert);
                }
            });

            const allNewData = { newSites, newCertTypes, siteCertMap };
            setValidationData(allNewData);

            if (newSites.length > 0 || newCertTypes.length > 0) {
                setStep(2.5);
            } else {
                setStep(3); // Go to preview even if nothing new
            }
        } catch (err) {
            setError(`Validation failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCreateNewItemsAndContinue = async () => {
        setIsLoading(true);
        try {
            for (const province of newlyAddedProvinces) {
                await settingsHandlers.onAddProvince(province);
            }
            for (const cert of validationData.newCertTypes) {
                await settingsHandlers.onAddCertificate(cert);
            }
            for (const abbr of validationData.newSites) {
                const siteData = siteCreationData[abbr];
                if (!siteData || !siteData.fullName || !siteData.province) throw new Error(`Please provide a full name and province for new site: ${abbr}`);
                
                const certsForThisSite = Array.from(validationData.siteCertMap[abbr] || []);
                await settingsHandlers.onAddSite({ 
                    abbreviatedName: abbr, 
                    fullName: siteData.fullName, 
                    province: siteData.province, 
                    certificates: certsForThisSite 
                });
            }
            
            await onImportSuccess();
            setStep(3);
        } catch(err) {
            setError(`Error creating new items: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAddProvince = () => {
        if(quickAddValue && !allAvailableProvinces.includes(quickAddValue)) {
            setNewlyAddedProvinces(prev => [...prev, quickAddValue]);
        }
        setQuickAddValue('');
        setShowQuickAddModal(false);
    }

    const handleDownloadTemplate = async (format) => {
        const headers = appDataFields.map(field => field.label);
        if (format === 'csv') {
            const csv = window.Papa.unparse([headers]);
            await window.api.saveTemplate(csv, 'csv');
        } else if (format === 'xlsx') {
            const worksheet = window.XLSX.utils.aoa_to_sheet([headers]);
            const workbook = window.XLSX.utils.book_new();
            window.XLSX.utils.book_append_sheet(workbook, worksheet, "Training Records");
            const xlsxData = window.XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            await window.api.saveTemplate(xlsxData, 'xlsx');
        }
    };

    const handleBackup = async () => {
        const result = await window.api.backupDatabase();
        if(result.success) {
            logActivity('settings', `Created a database backup at ${result.path}`);
            alert(`Database successfully backed up to:\n${result.path}`);
        }
        else if (!result.canceled) alert(`Backup failed: ${result.error}`);
    };
    
    const handleFinalImport = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            // Link any new certs to existing sites from the file
            const existingSitesInFile = Object.keys(validationData.siteCertMap)
                .filter(abbr => !validationData.newSites.includes(abbr));

            for (const siteAbbr of existingSitesInFile) {
                const certsForThisSite = Array.from(validationData.siteCertMap[siteAbbr] || []);
                if(certsForThisSite.length > 0) {
                    await window.api.addCertificateLinksToSite(siteAbbr, certsForThisSite);
                }
            }

            const result = await window.api.addBulkRecords(transformedData);
            setImportResult(result);
            
            const newSitesCount = validationData.newSites.length;
            const newCertsCount = validationData.newCertTypes.length;
            const details = `Imported ${result?.count || 0} records from ${file.name}.`;
            const payload = {
                before: { summary: "N/A (Bulk Import)" }, 
                after: {
                    records_imported: result?.count || 0,
                    new_sites_created: newSitesCount > 0 ? validationData.newSites.join(', ') : 'None',
                    new_certificate_types_created: newCertsCount > 0 ? validationData.newCertTypes.join(', ') : 'None',
                }
            };
            logActivity('import', details, payload);
            
            await onImportSuccess(); 
            setStep(4);
        } catch (err) {
            setError(`Import failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderValidationStep = () => (
        <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">New Items Detected</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">Your file contains sites or training titles not in the database. Please provide details for new sites and confirm creation of new training titles.</p>
            
            {validationData.newSites.length > 0 && <Section title="New Sites to Create">{validationData.newSites.map(abbr => (
                <div key={abbr} className="p-4 border border-[var(--color-border)] rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
                    <InputField label="Abbreviation" name={`${abbr}.abbr`} value={abbr} disabled />
                    <InputField label="Full Name" name={`${abbr}.fullName`} value={siteCreationData[abbr]?.fullName || ''} onChange={(e) => setSiteCreationData(p => ({...p, [abbr]: {...p[abbr], fullName: e.target.value}}))} required />
                    <div className="flex items-end gap-2">
                         <div className="flex-grow">
                            <SelectField label="Province" name={`${abbr}.province`} value={siteCreationData[abbr]?.province || ''} onChange={(e) => setSiteCreationData(p => ({...p, [abbr]: {...p[abbr], province: e.target.value}}))} options={allAvailableProvinces} required />
                         </div>
                        <button type="button" onClick={() => setShowQuickAddModal(true)} className="px-3 py-2 bg-[var(--color-control-surface-bg)] text-[var(--color-text-primary)] rounded-md hover:opacity-80">+</button>
                    </div>
                </div>
            ))}</Section>}

            {validationData.newCertTypes.length > 0 && <Section title="New Training Titles to Add">{ (
                <ul className="list-disc list-inside bg-[var(--color-surface-contrast)] p-4 rounded-md text-[var(--color-text-secondary)]">
                    {validationData.newCertTypes.map(title => <li key={title} className="text-[var(--color-text-primary)]">{title}</li>)}
                </ul>
            )}</Section>}

             <div className="flex justify-end gap-4 mt-8">
                <button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-opacity-80" disabled={isLoading}>Back to Mapping</button>
                <button onClick={handleCreateNewItemsAndContinue} className="px-6 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold flex items-center" disabled={isLoading}>
                    {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                    Create Items & Go to Preview
                </button>
            </div>
            {showQuickAddModal && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[var(--color-surface-alt)] p-4 rounded-lg shadow-xl w-11/12 max-w-sm">
                        <h4 className="font-semibold mb-2 text-[var(--color-text-primary)]">Add New Province</h4>
                        <InputField value={quickAddValue} onChange={(e) => setQuickAddValue(e.target.value)} placeholder="e.g. Gauteng" />
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowQuickAddModal(false)} className="px-3 py-1 bg-[var(--color-control-surface-bg)] rounded text-[var(--color-text-primary)]">Cancel</button>
                            <button type="button" onClick={handleQuickAddProvince} className="px-3 py-1 bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep = () => {
        switch(step) {
            case 1:  return (
                <div>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--color-border)] rounded-lg cursor-pointer bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] ${isLoading ? 'opacity-50' : ''}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-info)] mb-4"></div>
                                        <p className="text-sm text-[var(--color-text-secondary)]">Processing file...</p>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-8 h-8 mb-4 text-[var(--color-text-secondary)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                        <p className="mb-2 text-sm text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-text-primary)]">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-[var(--color-text-secondary)]">XLSX or CSV files</p>
                                    </>
                                )}
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelect} accept=".xlsx, .xls, .csv, .txt" disabled={isLoading} />
                        </label>
                    </div>
                    <div className="mt-8 p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
                        <h3 className="font-semibold text-[var(--color-text-secondary)] mb-3 text-center">Templates & Data Management</h3>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button onClick={() => handleDownloadTemplate('csv')} className="w-full sm:w-auto px-4 py-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition">Download CSV Template</button>
                            <button onClick={() => handleDownloadTemplate('xlsx')} className="w-full sm:w-auto px-4 py-2 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition">Download Excel Template</button>
                            <button onClick={handleBackup} className="w-full sm:w-auto px-4 py-2 bg-[var(--color-success)] text-white rounded-md hover:opacity-90 transition">Share/Backup DB</button>
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Map Your Columns</h3>
                    <p className="text-[var(--color-text-secondary)] mb-6">Match columns from <span className="font-medium">{file.name}</span> to the required fields (*).</p>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {appDataFields.map(field => {
                            const mappedHeader = Object.keys(mappings).find(h => mappings[h] === field.key);
                            return (
                                <div key={field.key} className="grid grid-cols-2 gap-4 items-center">
                                    <div className="font-medium text-[var(--color-text-primary)]">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </div>
                                    <SelectField
                                        name={field.key}
                                        value={mappedHeader || ''}
                                        onChange={(e) => {
                                            const newMappings = {...mappings};
                                            const oldHeaderKey = Object.keys(newMappings).find(key => newMappings[key] === field.key);
                                            if (oldHeaderKey) delete newMappings[oldHeaderKey];
                                            if (e.target.value) newMappings[e.target.value] = field.key;
                                            setMappings(newMappings);
                                        }}
                                        options={fileHeaders}
                                        placeholder="-- Don't Import --"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={resetState} className="px-6 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]">Cancel</button>
                        <button onClick={handleValidate} className="px-6 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold flex items-center" disabled={isLoading}>
                             {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                            Validate & Continue
                        </button>
                    </div>
                </div>
            );
            case 2.5: return renderValidationStep();
            case 3: return (
                <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Preview & Confirm Import</h3>
                    <p className="text-[var(--color-text-secondary)] mb-6">Review the first 5 rows. If everything looks good, proceed to import all <span className="font-bold">{fileData.length}</span> records.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
                            <thead className="bg-[var(--color-table-header-bg)]"><tr>{appDataFields.map(f => <th key={f.key} className="px-4 py-2 text-left font-medium text-[var(--color-text-secondary)] uppercase">{f.label}</th>)}</tr></thead>
                            <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
                                {transformedData.slice(0, 5).map((record, idx) => (
                                    <tr key={idx}>
                                        {appDataFields.map(f => {
                                            let value = f.key.split('.').reduce((o, i) => o?.[i], record);
                                            if (f.key.includes('date') && value) {
                                                const d = new Date(value);
                                                value = d.toLocaleDateString('en-CA');
                                            }
                                            return <td key={f.key} className="px-4 py-2 whitespace-nowrap text-[var(--color-text-secondary)]">{value || '---'}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]" disabled={isLoading}>Back to Mapping</button>
                        <button onClick={() => handleFinalImport()} className="px-6 py-2 rounded-lg bg-[var(--color-success)] text-white font-semibold flex items-center" disabled={isLoading}>
                            {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                            Confirm and Import All Records
                        </button>
                    </div>
                </div>
            );
            case 4: return (
                <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-md text-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[var(--color-badge-success-bg)] mb-4">
                        <svg className="h-6 w-6 text-[var(--color-badge-success-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Import Complete</h3>
                    <p className="text-[var(--color-text-secondary)] mt-2">Successfully added <span className="font-semibold text-[var(--color-success)]">{importResult?.count || 0}</span> new training records to the database.</p>
                    <button onClick={resetState} className="mt-6 px-6 py-2 rounded-lg bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold">Import Another File</button>
                </div>
            );
            default: return null;
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-[var(--color-header)] mb-6">Import & Export Records</h2>
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert"><p>{error}</p></div>}
            {step < 4 && (
                <ol className="flex items-center w-full text-sm font-medium text-center text-[var(--color-text-secondary)] mb-8 no-print">
                    {['Upload', 'Map', 'Validate', 'Preview', 'Complete'].map((title, index) => {
                        let stepNumber = index + 1;
                        if (step === 2.5 && index === 2) stepNumber = 2.5;

                        const isCompleted = step > stepNumber;
                        const isCurrent = step === stepNumber || (step === 2.5 && index === 2);
                        
                        return(
                        <li key={title} className={`flex md:w-full items-center ${isCompleted ? 'text-[var(--color-info)]' : ''} ${index < 4 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-[var(--color-border)] after:border-1 after:inline-block" : ''}`}>
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 mr-2 text-xs border ${isCurrent || isCompleted ? 'border-[var(--color-info)] bg-[var(--color-icon-container-info-bg)]' : 'border-[var(--color-border)]'}`}>
                               {index + 1}
                            </span>
                             <span className="hidden sm:inline-flex sm:ml-2">{title}</span>
                        </li>
                    )})}
                </ol>
            )}
            {renderStep()}
        </div>
    );
};

export default ImportPage;