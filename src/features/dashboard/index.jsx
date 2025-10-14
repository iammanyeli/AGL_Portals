import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ViewSwitcher from '../../components/primitives/ViewSwitcher';
import DashboardGrid from './components/DashboardGrid';
import DashboardList from './components/DashboardList';

// layout: DashboardLayout
const DashboardLayout = ({ children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
        {children}
    </motion.div>
);

// block: ViewAnimation
const ViewAnimation = ({ view, sections, goToPortal }) => (
    <AnimatePresence mode="wait">
        {view === 'list' ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <DashboardList sections={sections} goToPortal={goToPortal} />
            </motion.div>
        ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <DashboardGrid sections={sections} goToPortal={goToPortal} />
            </motion.div>
        )}
    </AnimatePresence>
);

const Dashboard = ({ sections, goToPortal, defaultView }) => {
    const [view, setView] = useState(defaultView);

    useEffect(() => {
        setView(defaultView);
    }, [defaultView]);

    return (
        <DashboardLayout>
            <ViewSwitcher view={view} setView={setView} />
            <div className="">
                <ViewAnimation view={view} sections={sections} goToPortal={goToPortal} />
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;