import React from 'react';
import PortalLayout from '../../../components/layout/PortalLayout.jsx';
import TrainingPortalApp from './TrainingPortalApp.jsx';

/**
 * Top-level page component for the Training Portal.
 * It uses the shared PortalLayout and renders the complete TrainingPortalApp,
 * which internally handles all its own views and logic.
 */
const TrainingPortal = ({ section, setPage, portalSubPage, setPortalSubPage }) => {
    return (
        <PortalLayout
            section={section}
            setPage={setPage}
            portalSubPage={portalSubPage}
        >
            <TrainingPortalApp
                portalSubPage={portalSubPage}
                setPortalSubPage={setPortalSubPage}
            />
        </PortalLayout>
    );
};

export default TrainingPortal;