import React from 'react';
import PortalLayout from '../features/portals/shared/components/PortalLayout';

// Import shared placeholder views
import PortalDashboardView from '../features/portals/shared/views/PortalDashboardView';
import TableView from '../features/portals/shared/views/TableView';
import ImportView from '../features/portals/shared/views/ImportView';
import ExportView from '../features/portals/shared/views/ExportView';
import PortalSettingsView from '../features/portals/shared/views/PortalSettingsView';

// Future imports for real components:
// import TrainingDashboard from '../features/portals/training/TrainingDashboard';
// import TrainingTable from '../features/portals/training/TrainingTable';

/**
 * Top-level page component for the Training Portal.
 * It uses the shared PortalLayout and renders the correct sub-page view
 * based on the portalSubPage state.
 */
const TrainingPortal = ({ section, setPage, portalSubPage }) => {
    
    const renderContent = () => {
        switch (portalSubPage) {
            case 'portal-dashboard':
                // return <TrainingDashboard section={section} />;
                return <PortalDashboardView section={section} />;
            case 'table':
                // return <TrainingTable section={section} />;
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

export default TrainingPortal;


// import React from 'react';
// import PortalLayout from '/src/features/portals/shared/components/PortalLayout';

// // Import the real application component using an absolute path.
// import TrainingPortalApp from '/src/features/portals/training/TrainingPortalApp';

// /**
//  * Top-level page component for the Training Portal.
//  * It uses the shared PortalLayout and renders the complete TrainingPortalApp,
//  * which internally handles all its own views and logic.
//  */
// const TrainingPortal = ({ section, setPage, portalSubPage, setPortalSubPage }) => {

//     return (
//         <PortalLayout
//             section={section}
//             setPage={setPage}
//             portalSubPage={portalSubPage}
//             setPortalSubPage={setPortalSubPage} // Pass this down for the sidebar navigation
//         >
//             {/* Render the real application.
//               It receives the current sub-page to know what to display and the function
//               to change the sub-page for its internal navigation needs (e.g., clicking
//               an employee to go to the detailed view).
//             */}
//             <TrainingPortalApp
//                 portalSubPage={portalSubPage}
//                 setPortalSubPage={setPortalSubPage}
//             />
//         </PortalLayout>
//     );
// };

// export default TrainingPortal;


