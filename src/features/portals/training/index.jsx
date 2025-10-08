import React, { useState } from 'react';
import PortalLayout from '../../../components/layout/PortalLayout.jsx';
import TrainingPortalApp from './TrainingPortalApp.jsx';

const TrainingPortal = ({ section, setPage, portalSubPage, setPortalSubPage, viewIcon }) => {
    const [viewTitle, setViewTitle] = useState('');

    return (
        <PortalLayout
            section={section}
            setPage={setPage}
            portalSubPage={portalSubPage}
            viewTitle={viewTitle}
            viewIcon={viewIcon}
        >
            <TrainingPortalApp
                portalSubPage={portalSubPage}
                setPortalSubPage={setPortalSubPage}
                setViewTitle={setViewTitle}
            />
        </PortalLayout>
    );
};

export default TrainingPortal;