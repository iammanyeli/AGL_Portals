import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout';

// Import shared placeholder views
import PortalDashboardView from '../shared/views/PortalDashboardView';
import TableView from '../shared/views/TableView';
import ImportView from '../shared/views/ImportView';
import ExportView from '../shared/views/ExportView';
import PortalSettingsView from '../shared/views/PortalSettingsView';

// Future imports for real components:
// import InspectionsDashboard from '../features/portals/inspections/InspectionsDashboard';
// import InspectionsTable from '../features/portals/inspections/InspectionsTable';

/**
 * Top-level page component for the Inspections Portal.
 * It uses the shared PortalLayout and renders the correct sub-page view
 * based on the portalSubPage state.
 */
const InspectionsPortal = ({ section, setPage, portalSubPage }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'portal-dashboard':
                // return <InspectionsDashboard section={section} />;
                return <PortalDashboardView section={section} />;
            case 'table':
                // return <InspectionsTable section={section} />;
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

export default InspectionsPortal;
