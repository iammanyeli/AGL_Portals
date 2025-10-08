import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout';
import DashboardView from './views/dashboard/DashboardView';
import TableView from './views/table/TableView';
import ImportView from './views/import/ImportView';
import ExportView from './views/export/ExportView';
import SettingsView from './views/settings/SettingsView';

const DefectsPortal = ({ section, setPage, portalSubPage, viewTitle, viewIcon }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'defects-dashboard':
                return <DashboardView section={section} />;
            case 'defects-table':
                return <TableView section={section} />;
            case 'defects-import':
                return <ImportView section={section} />;
            case 'defects-export':
                return <ExportView section={section} />;
            case 'defects-settings':
                return <SettingsView section={section} />;
            default:
                return <DashboardView section={section} />;
        }
    };

    return (
        <PortalLayout 
            section={section} 
            setPage={setPage} 
            portalSubPage={portalSubPage} 
            viewTitle={viewTitle} 
            viewIcon={viewIcon}
        >
            {renderContent()}
        </PortalLayout>
    );
};

export default DefectsPortal;