import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout';



import DashboardView from './views/dashboard/DashboardView';
import TableView from './views/table/TableView';
import ImportView from './views/import/ImportView';
import ExportView from './views/export/ExportView';
import SettingsView from './views/settings/SettingsView';



const DefectsPortal = ({ section, setPage, portalSubPage }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'portal-dashboard':
                // return <DefectsDashboard section={section} />;
                return <DashboardView section={section} />;
            case 'table':
                // return <DefectsTable section={section} />;
                return <TableView section={section} />;
            case 'import':
                return <ImportView section={section} />;
            case 'export':
                return <ExportView section={section} />;
            case 'portal-settings':
                return <SettingsView section={section} />;
            default:
                return <DashboardView section={section} />;
        }
    };

    return (
        <PortalLayout section={section} setPage={setPage} portalSubPage={portalSubPage}>
            {renderContent()}
        </PortalLayout>
    );
};

export default DefectsPortal;
