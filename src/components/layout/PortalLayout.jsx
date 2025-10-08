import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { ChevronLeft } from '../icons';

const PortalLayout = ({ section, setPage, portalSubPage, children, viewTitle }) => {
    if (!section) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
             <Card className="w-full rounded-2xl overflow-hidden shadow-xl">
                 <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--color-card-header)]">
                     <div className="flex items-center gap-4">
                         <div className={`rounded-xl p-3 bg-gradient-to-br ${section.accent} text-white shadow-md`}>
                           <section.Icon className="h-7 w-7" />
                         </div>
                         <CardTitle className="text-2xl font-bold tracking-tight">{section.title}</CardTitle>
                     </div>
                     <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-[var(--color-text-secondary)] tracking-tight">{viewTitle}</h2>
                        <Button onClick={() => setPage('hub-home')} className="flex items-center gap-2">
                            <ChevronLeft className="w-5 h-5" />
                            Home
                        </Button>
                     </div>
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