import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { ChevronLeft } from '../icons';

/**
 * A shared layout component for all portals. It provides the main card structure,
 * header with title and icon, and a back button. The actual page content
 * is rendered as children.
 * @param {object} props - The component props.
 * @param {object} props.section - The data for the current portal section.
 * @param {function} props.setPage - Function to navigate back to the main dashboard.
 * @param {string} props.portalSubPage - The key for the current sub-page to manage animations.
 * @param {React.ReactNode} props.children - The specific view component to render inside the layout.
 */
const PortalLayout = ({ section, setPage, portalSubPage, children }) => {
    if (!section) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
             <Card className="w-full rounded-2xl overflow-hidden shadow-xl">
                 <CardHeader className="flex items-center justify-between gap-4 bg-white dark:bg-white/5">
                     <div className="flex items-center gap-4">
                         <div className={`rounded-xl p-3 bg-gradient-to-br ${section.accent} text-white shadow-md`}>
                           <section.Icon className="h-7 w-7" />
                         </div>
                         <CardTitle className="text-2xl font-bold tracking-tight">{section.title}</CardTitle>
                     </div>
                     <Button onClick={() => setPage('hub-home')} className="flex items-center gap-2">
                         <ChevronLeft className="w-5 h-5" />
                         Home
                     </Button>
                 </CardHeader>
                 <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={portalSubPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                 </CardContent>
             </Card>
        </motion.div>
    );
};

export default PortalLayout;
