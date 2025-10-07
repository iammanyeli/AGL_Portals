export const getRecords = async () => {
  console.log("Mock API: Fetching records...");
  return [
    {
      id: 1,
      employee: { employeeNumber: '1001', firstName: 'Sarah', surname: 'Johnson', gender: 'Female', jobTitle: 'Nurse' },
      trainingTitle: 'CPR & First Aid',
      provider: 'Red Cross',
      location: { site: 'NYC', province: 'New York' },
      status: { dateOfTraining: '2025-09-15', dateOfExpiry: '2027-09-15' },
      certificateId: 'CPR-1001',
      issuedBy: 'Red Cross'
    },
    {
      id: 2,
      employee: { employeeNumber: '1002', firstName: 'James', surname: 'Smith', gender: 'Male', jobTitle: 'Electrician' },
      trainingTitle: 'Electrical Safety',
      provider: 'SafeWork',
      location: { site: 'LA', province: 'California' },
      status: { dateOfTraining: '2025-08-12', dateOfExpiry: '2026-08-12' },
      certificateId: 'ES-1002',
      issuedBy: 'SafeWork'
    },
    {
      id: 3,
      employee: { employeeNumber: '1003', firstName: 'Aisha', surname: 'Khan', gender: 'Female', jobTitle: 'Lab Technician' },
      trainingTitle: 'Chemical Handling',
      provider: 'BioTrain',
      location: { site: 'CHI', province: 'Illinois' },
      status: { dateOfTraining: '2025-07-10', dateOfExpiry: '2026-07-10' },
      certificateId: 'CH-1003',
      issuedBy: 'BioTrain'
    },
    {
      id: 4,
      employee: { employeeNumber: '1004', firstName: 'Michael', surname: 'Lee', gender: 'Male', jobTitle: 'Security Officer' },
      trainingTitle: 'Conflict Management',
      provider: 'SecurePro',
      location: { site: 'HOU', province: 'Texas' },
      status: { dateOfTraining: '2025-06-05', dateOfExpiry: '2026-06-05' },
      certificateId: 'CM-1004',
      issuedBy: 'SecurePro'
    },
    {
      id: 5,
      employee: { employeeNumber: '1005', firstName: 'Emily', surname: 'Davis', gender: 'Female', jobTitle: 'HR Coordinator' },
      trainingTitle: 'Diversity Training',
      provider: 'InclusiveWorks',
      location: { site: 'SEA', province: 'Washington' },
      status: { dateOfTraining: '2025-05-20', dateOfExpiry: '2027-05-20' },
      certificateId: 'DT-1005',
      issuedBy: 'InclusiveWorks'
    },
    {
      id: 6,
      employee: { employeeNumber: '1006', firstName: 'Daniel', surname: 'Brown', gender: 'Male', jobTitle: 'IT Specialist' },
      trainingTitle: 'Cybersecurity Basics',
      provider: 'TechSafe',
      location: { site: 'ATL', province: 'Georgia' },
      status: { dateOfTraining: '2025-04-18', dateOfExpiry: '2026-04-18' },
      certificateId: 'CB-1006',
      issuedBy: 'TechSafe'
    },
    {
      id: 7,
      employee: { employeeNumber: '1007', firstName: 'Zoe', surname: 'Nguyen', gender: 'Female', jobTitle: 'Operations Manager' },
      trainingTitle: 'Leadership Essentials',
      provider: 'LeadSmart',
      location: { site: 'BOS', province: 'Massachusetts' },
      status: { dateOfTraining: '2025-03-10', dateOfExpiry: '2026-03-10' },
      certificateId: 'LE-1007',
      issuedBy: 'LeadSmart'
    },
    {
      id: 8,
      employee: { employeeNumber: '1008', firstName: 'Carlos', surname: 'Martinez', gender: 'Male', jobTitle: 'Maintenance Lead' },
      trainingTitle: 'Equipment Safety',
      provider: 'MechTrain',
      location: { site: 'DEN', province: 'Colorado' },
      status: { dateOfTraining: '2025-02-14', dateOfExpiry: '2026-02-14' },
      certificateId: 'ES-1008',
      issuedBy: 'MechTrain'
    },
    {
      id: 9,
      employee: { employeeNumber: '1009', firstName: 'Priya', surname: 'Patel', gender: 'Female', jobTitle: 'Pharmacist' },
      trainingTitle: 'Medication Handling',
      provider: 'MedEdu',
      location: { site: 'SF', province: 'California' },
      status: { dateOfTraining: '2025-01-25', dateOfExpiry: '2026-01-25' },
      certificateId: 'MH-1009',
      issuedBy: 'MedEdu'
    },
    {
      id: 10,
      employee: { employeeNumber: '1010', firstName: 'John', surname: 'O\'Connor', gender: 'Male', jobTitle: 'Warehouse Worker' },
      trainingTitle: 'Manual Handling',
      provider: 'SafeLift',
      location: { site: 'DAL', province: 'Texas' },
      status: { dateOfTraining: '2024-12-05', dateOfExpiry: '2025-12-05' },
      certificateId: 'MH-1010',
      issuedBy: 'SafeLift'
    },
    {
      id: 11,
      employee: { employeeNumber: '1013', firstName: 'Noah', surname: 'Walker', gender: 'Male', jobTitle: 'Logistics Coordinator' },
      trainingTitle: 'Forklift Operation',
      provider: 'SafeLift',
      location: { site: 'DEN', province: 'Colorado' },
      status: { dateOfTraining: '2023-10-05', dateOfExpiry: '2025-10-05' },
      certificateId: 'FO-1013',
      issuedBy: 'SafeLift'
    },
    {
      id: 12,
      employee: { employeeNumber: '1006', firstName: 'Daniel', surname: 'Brown', gender: 'Male', jobTitle: 'IT Specialist' },
      trainingTitle: 'Data Encryption',
      provider: 'TechSafe',
      location: { site: 'ATL', province: 'Georgia' },
      status: { dateOfTraining: '2025-09-10', dateOfExpiry: '2026-09-10' },
      certificateId: 'DE-1006',
      issuedBy: 'TechSafe'
    },
    {
      id: 13,
      employee: { employeeNumber: '1014', firstName: 'Grace', surname: 'Mokoena', gender: 'Female', jobTitle: 'Site Supervisor' },
      trainingTitle: 'Risk Assessment',
      provider: 'SecurePro',
      location: { site: 'HOU', province: 'Texas' },
      status: { dateOfTraining: '2023-05-10', dateOfExpiry: '2024-05-10' },
      certificateId: 'RA-1014',
      issuedBy: 'SecurePro'
    },
    {
      id: 14,
      employee: { employeeNumber: '1009', firstName: 'Priya', surname: 'Patel', gender: 'Female', jobTitle: 'Pharmacist' },
      trainingTitle: 'Cold Chain Management',
      provider: 'MedEdu',
      location: { site: 'SF', province: 'California' },
      status: { dateOfTraining: '2025-01-15', dateOfExpiry: '2026-01-15' },
      certificateId: 'CCM-1009',
      issuedBy: 'MedEdu'
    },
    {
      id: 15,
      employee: { employeeNumber: '1011', firstName: 'Olivia', surname: 'King', gender: 'Female', jobTitle: 'Chemist' },
      trainingTitle: 'Lab Safety Essentials',
      provider: 'BioTrain',
      location: { site: 'CHI', province: 'Illinois' },
      status: { dateOfTraining: '2023-09-10', dateOfExpiry: '2025-09-10' },
      certificateId: 'LSE-1011',
      issuedBy: 'BioTrain'
    },
    {
      id: 16,
      employee: { employeeNumber: '1002', firstName: 'James', surname: 'Smith', gender: 'Male', jobTitle: 'Electrician' },
      trainingTitle: 'Lockout/Tagout',
      provider: 'SafeWork',
      location: { site: 'LA', province: 'California' },
      status: { dateOfTraining: '2024-10-01', dateOfExpiry: '2025-10-01' },
      certificateId: 'LT-1002',
      issuedBy: 'SafeWork'
    },
    {
      id: 17,
      employee: { employeeNumber: '1015', firstName: 'Thabo', surname: 'Dlamini', gender: 'Male', jobTitle: 'Warehouse Supervisor' },
      trainingTitle: 'Fire Drill Procedures',
      provider: 'FireSmart',
      location: { site: 'DAL', province: 'Texas' },
      status: { dateOfTraining: '2025-02-20', dateOfExpiry: '2026-02-20' },
      certificateId: 'FDP-1015',
      issuedBy: 'FireSmart'
    },
    {
      id: 18,
      employee: { employeeNumber: '1003', firstName: 'Aisha', surname: 'Khan', gender: 'Female', jobTitle: 'Lab Technician' },
      trainingTitle: 'PPE Compliance',
      provider: 'BioTrain',
      location: { site: 'CHI', province: 'Illinois' },
      status: { dateOfTraining: '2023-03-11', dateOfExpiry: '2024-03-11' },
      certificateId: 'PPEC-1003',
      issuedBy: 'BioTrain'
    },
    {
      id: 19,
      employee: { employeeNumber: '1016', firstName: 'Mia', surname: 'Chen', gender: 'Female', jobTitle: 'Quality Inspector' },
      trainingTitle: 'ISO 9001 Fundamentals',
      provider: 'QualityFirst',
      location: { site: 'NYC', province: 'New York' },
      status: { dateOfTraining: '2024-09-22', dateOfExpiry: '2025-09-22' },
      certificateId: 'ISO-1016',
      issuedBy: 'QualityFirst'
    },
    {
      id: 20,
      employee: { employeeNumber: '1001', firstName: 'Sarah', surname: 'Johnson', gender: 'Female', jobTitle: 'Nurse' },
      trainingTitle: 'Pediatric Care Essentials',
      provider: 'Red Cross',
      location: { site: 'NYC', province: 'New York' },
      status: { dateOfTraining: '2025-06-01', dateOfExpiry: '2026-06-01' },
      certificateId: 'PCE-1001',
      issuedBy: 'Red Cross'
    },
    {
      id: 21,
      employee: { employeeNumber: '1013', firstName: 'Noah', surname: 'Walker', gender: 'Male', jobTitle: 'Logistics Coordinator' },
      trainingTitle: 'Manual Lifting Techniques',
      provider: 'SafeLift',
      location: { site: 'DEN', province: 'Colorado' },
      status: { dateOfTraining: '2025-01-15', dateOfExpiry: '2026-01-15' },
      certificateId: 'MLT-1013',
      issuedBy: 'SafeLift'
    },
    {
      id: 22,
      employee: { employeeNumber: '1014', firstName: 'Grace', surname: 'Mokoena', gender: 'Female', jobTitle: 'Site Supervisor' },
      trainingTitle: 'Emergency Evacuation',
      provider: 'SafeWork',
      location: { site: 'HOU', province: 'Texas' },
      status: { dateOfTraining: '2025-07-12', dateOfExpiry: '2026-07-12' },
      certificateId: 'EE-1014',
      issuedBy: 'SafeWork'
    },
    {
      id: 23,
      employee: { employeeNumber: '1006', firstName: 'Daniel', surname: 'Brown', gender: 'Male', jobTitle: 'IT Specialist' },
      trainingTitle: 'Email Phishing Awareness',
      provider: 'TechSafe',
      location: { site: 'ATL', province: 'Georgia' },
      status: { dateOfTraining: '2023-10-01', dateOfExpiry: '2024-10-01' },
      certificateId: 'EPA-1006',
      issuedBy: 'TechSafe'
    },
    {
      id: 24,
      employee: { employeeNumber: '1015', firstName: 'Thabo', surname: 'Dlamini', gender: 'Male', jobTitle: 'Warehouse Supervisor' },
      trainingTitle: 'Working at Heights',
      provider: 'SafetyEdge',
      location: { site: 'DAL', province: 'Texas' },
      status: { dateOfTraining: '2024-09-22', dateOfExpiry: '2025-09-22' },
      certificateId: 'WAH-1015',
      issuedBy: 'SafetyEdge'
    },
    {
      id: 25,
      employee: { employeeNumber: '1012', firstName: 'Ahmed', surname: 'Yusuf', gender: 'Male', jobTitle: 'Safety Officer' },
      trainingTitle: 'Workplace Harassment Policy',
      provider: 'InclusiveWorks',
      location: { site: 'LA', province: 'California' },
      status: { dateOfTraining: '2025-08-15', dateOfExpiry: '2026-08-15' },
      certificateId: 'WHP-1012',
      issuedBy: 'InclusiveWorks'
    }
  ];
};

export const getAppSettings = async () => {
  console.log("Mock API: Fetching app settings...");
  return {
    provinces: ['Gauteng', 'Western Cape', 'Limpopo', 'KwaZulu-Natal', 'New York', 'California', 'Illinois', 'Texas', 'Washington', 'Massachusetts', 'Colorado'],
    sites: [
      { abbreviatedName: 'JHB-1', fullName: 'Johannesburg Central', province: 'Gauteng', certificates: ['First Aid', 'Fire Fighting'] },
      { abbreviatedName: 'CPT-1', fullName: 'Cape Town Downtown', province: 'Western Cape', certificates: ['Working at Heights'] },
      { abbreviatedName: 'DUR-1', fullName: 'Durban Port', province: 'KwaZulu-Natal', certificates: ['First Aid', 'Working at Heights'] },
      { abbreviatedName: 'NYC', fullName: 'New York City', province: 'New York', certificates: ['CPR & First Aid', 'ISO 9001 Fundamentals', 'Pediatric Care Essentials'] },
      { abbreviatedName: 'LA', fullName: 'Los Angeles', province: 'California', certificates: ['Electrical Safety', 'Lockout/Tagout', 'Workplace Harassment Policy'] },
      { abbreviatedName: 'CHI', fullName: 'Chicago', province: 'Illinois', certificates: ['Chemical Handling', 'Lab Safety Essentials', 'PPE Compliance'] },
      { abbreviatedName: 'HOU', fullName: 'Houston', province: 'Texas', certificates: ['Conflict Management', 'Risk Assessment', 'Emergency Evacuation'] },
      { abbreviatedName: 'SEA', fullName: 'Seattle', province: 'Washington', certificates: ['Diversity Training'] },
      { abbreviatedName: 'ATL', fullName: 'Atlanta', province: 'Georgia', certificates: ['Cybersecurity Basics', 'Data Encryption', 'Email Phishing Awareness'] },
      { abbreviatedName: 'BOS', fullName: 'Boston', province: 'Massachusetts', certificates: ['Leadership Essentials'] },
      { abbreviatedName: 'DEN', fullName: 'Denver', province: 'Colorado', certificates: ['Equipment Safety', 'Forklift Operation', 'Manual Lifting Techniques'] },
      { abbreviatedName: 'SF', fullName: 'San Francisco', province: 'California', certificates: ['Medication Handling', 'Cold Chain Management'] },
      { abbreviatedName: 'DAL', fullName: 'Dallas', province: 'Texas', certificates: ['Manual Handling', 'Fire Drill Procedures', 'Working at Heights'] }
    ],
    certificateTypes: [
      'CPR & First Aid', 'Electrical Safety', 'Chemical Handling', 'Conflict Management', 
      'Diversity Training', 'Cybersecurity Basics', 'Leadership Essentials', 'Equipment Safety', 
      'Medication Handling', 'Manual Handling', 'Forklift Operation', 'Data Encryption', 
      'Risk Assessment', 'Cold Chain Management', 'Lab Safety Essentials', 'Lockout/Tagout', 
      'Fire Drill Procedures', 'PPE Compliance', 'ISO 9001 Fundamentals', 'Pediatric Care Essentials', 
      'Manual Lifting Techniques', 'Emergency Evacuation', 'Email Phishing Awareness', 
      'Working at Heights', 'Workplace Harassment Policy'
    ],
    settings: { expiryThreshold: 30 }
  };
};

export const getActivities = async () => {
  console.log("Mock API: Fetching activities...");
  return [
      { id: 1, timestamp: new Date(Date.now() - 3600000).toISOString(), user_name: 'System', user_initials: 'SY', type: 'system', details: "Application initialized." },
      { id: 2, timestamp: new Date(Date.now() - 1800000).toISOString(), user_name: 'Jane Doe', user_initials: 'JD', type: 'record', details: "Added certificate 'First Aid' for John Doe." },
      { id: 3, timestamp: new Date(Date.now() - 900000).toISOString(), user_name: 'Admin', user_initials: 'AD', type: 'settings', details: "Updated expiry threshold to 30 days." }
  ];
}

// Mock functions for actions (they don't need to do anything but can log to the console)
export const addRecord = async (data) => { console.log("Mock API: Adding record", data); return { success: true }; };
export const updateRecord = async (data) => { console.log("Mock API: Updating record", data); return { success: true }; };
export const deleteRecord = async (id) => { console.log("Mock API: Deleting record", id); return { success: true }; };
export const updateEmployee = async (data) => { console.log("Mock API: Updating employee", data); return { success: true }; };
export const addBulkRecords = async (records) => { console.log("Mock API: Bulk adding records", records); return { success: true, count: records.length }; };
export const saveSetting = async (key, value) => { console.log("Mock API: Saving setting", key, value); return { success: true }; };
export const addProvince = async (name) => { console.log("Mock API: Adding province", name); return { success: true }; };
export const updateProvince = async (originalName, newName) => { console.log("Mock API: Updating province", originalName, newName); return { success: true }; };
export const deleteProvince = async (name) => { console.log("Mock API: Deleting province", name); return { success: true }; };
export const addCertificateType = async (title) => { console.log("Mock API: Adding cert type", title); return { success: true }; };
export const updateCertificateType = async (originalTitle, newTitle) => { console.log("Mock API: Updating cert type", originalTitle, newTitle); return { success: true }; };
export const deleteCertificateType = async (title) => { console.log("Mock API: Deleting cert type", title); return { success: true }; };
export const addSite = async (site) => { console.log("Mock API: Adding site", site); return { success: true }; };
export const updateSite = async (originalAbbr, site) => { console.log("Mock API: Updating site", originalAbbr, site); return { success: true }; };
export const deleteSite = async (abbr) => { console.log("Mock API: Deleting site", abbr); return { success: true }; };
export const addCertificateLinksToSite = async (siteAbbr, certTitles) => { console.log("Mock API: Adding cert links", siteAbbr, certTitles); return { success: true }; };
export const deleteAllData = async () => { console.log("Mock API: Deleting all data"); return { success: true }; };
export const addActivity = async (activityData) => { console.log("Mock API: Adding activity", activityData); return { success: true }; };
export const saveTemplate = async () => { alert("Mock Action: Download Template"); return { success: true }; };
export const exportData = async () => { alert("Mock Action: Export Data"); return { success: true }; };
export const backupDatabase = async () => { alert("Mock Action: Backup Database"); return { success: true }; };