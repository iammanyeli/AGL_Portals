import React from 'react';
import { motion } from 'framer-motion';
import GridSectionCard from './GridSectionCard';

// block: GridItem
const GridItem = ({ section, goToPortal, index }) => (
    <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <GridSectionCard section={section} goToPortal={goToPortal} />
    </motion.div>
);

const DashboardGrid = ({ sections, goToPortal }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
            <GridItem key={section.id} section={section} goToPortal={goToPortal} index={index} />
        ))}
    </div>
);

export default DashboardGrid;