import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout';

// Import shared placeholder views
import PortalDashboardView from '../shared/views/PortalDashboardView';
import TableView from '../shared/views/TableView';
import ImportView from '../shared/views/ImportView';
import ExportView from '../shared/views/ExportView';
import PortalSettingsView from '../shared/views/PortalSettingsView';

// Future imports for real components:
// import MaintenanceDashboard from '../features/portals/maintenance/Dashboard';
// import MaintenanceTable from '../features/portals/maintenance/DefectsTable';

/**
 * Top-level page component for the Maintenance Portal.
 * It uses the shared PortalLayout and renders the correct sub-page view
 * based on the portalSubPage state.
 */
const MaintenancePortal = ({ section, setPage, portalSubPage }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'portal-dashboard':
                // return <MaintenanceDashboard section={section} />;
                return <PortalDashboardView section={section} />;
            case 'table':
                // return <MaintenanceTable section={section} />;
                return <TableView section={section} />;
            case 'import':
                return <ImportView section={section} />;
            case 'export':
                return <ExportView section={section} />;
            case 'portal-settings':
                return <PortalSettingsView section={section} />;
            default:
                return <PortalDashboardView section={section} />;
        }
    };

    return (
        <PortalLayout section={section} setPage={setPage} portalSubPage={portalSubPage}>
            {renderContent()}
        </PortalLayout>
    );
};

export default MaintenancePortal;
