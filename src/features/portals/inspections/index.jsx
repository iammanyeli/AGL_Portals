import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout';

import DashboardView from './views/dashboard/DashboardView';
import TableView from './views/table/TableView';
import ImportView from './views/import/ImportView';
import ExportView from './views/export/ExportView';
import SettingsView from './views/settings/SettingsView';

const InspectionsPortal = ({ section, setPage, portalSubPage }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'inspections-dashboard':
                return <DashboardView section={section} />;
            case 'inspections-table':
                return <TableView section={section} />;
            case 'inspections-import':
                return <ImportView section={section} />;
            case 'inspections-export':
                return <ExportView section={section} />;
            case 'inspections-settings':
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

export default InspectionsPortal;
