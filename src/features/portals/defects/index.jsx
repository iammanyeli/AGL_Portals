import React from 'react';
import { defectPortalNavLinks } from './routes.js';
import PortalLayout from '../../../components/layout/PortalLayout';

// Import all of the new, local defect views
import DashboardView from './views/dashboard/DashboardView.jsx';
import TableView from './views/table/TableView.jsx';
import ImportView from './views/import/ImportView.jsx';
import ExportView from './views/export/ExportView.jsx';
import SettingsView from './views/settings/SettingsView.jsx';

/**
 * Top-level page component for the Defects Portal.
 * It uses the shared PortalLayout and renders the correct sub-page view
 * based on the portalSubPage state.
 */
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
