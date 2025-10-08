import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { LayoutGrid, MessageCircle } from '../../../components/icons';

// Import modular chart components
import AreaChart from '../../../components/charts/AreaChart';
import BarChart from '../../../components/charts/BarChart';
import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';
import RadarChart from '../../../components/charts/RadarChart';


const ChartRenderer = ({ chart, sectionId }) => {
    switch (chart.type) {
        case 'line':
            return <LineChart labels={chart.data.map(d => d.name)} data={chart.data.map(d => d.value)} title={chart.title} label="Value" sectionId={sectionId} />;
        case 'bar':
             // FIX: Now uses a generic 'value' key and the correct label.
            return <BarChart labels={chart.data.map(d => d.name)} data={chart.data.map(d => d.value)} title={chart.title} label="Certificates" sectionId={sectionId} />;
        case 'area':
            return <AreaChart labels={chart.data.map(d => d.month)} data={chart.data.map(d => d.completed)} title={chart.title} label="Completed" sectionId={sectionId} />;
        case 'radar':
            return <RadarChart labels={chart.data.map(d => d.subject)} data={chart.data.map(d => d.A)} title={chart.title} label={chart.title} sectionId={sectionId} />;
        case 'pie':
             // FIX: Now correctly uses useStatusColors for consistency.
            return <PieChart labels={chart.data.map(d => d.name)} data={chart.data.map(d => d.value)} title={chart.title} sectionId={sectionId} useStatusColors={true} />;
        default:
            return null;
    }
};


const DashboardList = ({ sections, goToPortal }) => {
    const [activeTabs, setActiveTabs] = useState(
        sections.reduce((acc, section) => ({ ...acc, [section.id]: 'metrics' }), {})
    );

    const handleTabChange = (sectionId, tab) => {
        setActiveTabs(prev => ({ ...prev, [sectionId]: tab }));
    };

    return (
        <div className="space-y-6">
            {sections.map((s) => (
              <motion.div
                id={s.id} key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <Card className="w-full rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 bg-[var(--color-surface-alt)] border-b-0">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl p-3 bg-gradient-to-br ${s.accent} text-white shadow-md`}>
                        <s.Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">{s.title}</CardTitle>
                        <div className="text-base text-[var(--color-text-secondary)] font-medium">Latest performance & trends</div>
                      </div>
                    </div>
                    <Button size="lg" className="shrink-0 w-full sm:w-auto" onClick={() => goToPortal(s.id)}>
                      Open Portal
                    </Button>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 bg-[var(--color-surface-alt)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">
                      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-80 bg-[var(--color-surface-contrast)] rounded-xl p-4 shadow-inner border border-[var(--color-border)] flex flex-col">
                           <ChartRenderer chart={s.charts[0]} sectionId={s.id} />
                        </div>
                        <div className="h-80 bg-[var(--color-surface-contrast)] rounded-xl p-4 shadow-inner border border-[var(--color-border)] flex flex-col">
                           <ChartRenderer chart={s.charts[1]} sectionId={s.id} />
                        </div>
                      </div>
                      <div className="lg:col-span-1 flex flex-col gap-4 h-80">
                         <div className="flex p-1 bg-[var(--color-tab-container-bg)] rounded-xl">
                            <button onClick={() => handleTabChange(s.id, 'metrics')} className={`w-full p-2 text-center text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTabs[s.id] === 'metrics' ? 'bg-[var(--tab-active-bg)] shadow text-[var(--tab-active-text)]' : 'text-[var(--color-text-secondary)]'}`}><LayoutGrid className="h-4 w-4" />Key Metrics</button>
                            <button onClick={() => handleTabChange(s.id, 'activity')} className={`w-full p-2 text-center text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTabs[s.id] === 'activity' ? 'bg-[var(--tab-active-bg)] shadow text-[var(--tab-active-text)]' : 'text-[var(--color-text-secondary)]'}`}><MessageCircle className="h-4 w-4" />Recent Activity</button>
                         </div>
                         <div className="flex-grow relative flex flex-col justify-end">
                          <AnimatePresence mode="wait">
                            {activeTabs[s.id] === 'metrics' && (<motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="grid grid-cols-2 gap-4">{s.metrics.map((m, idx) => (<div key={idx} className="rounded-xl p-4 bg-[var(--color-surface-alt)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-surface-hover)] transition-colors h-28"><div className="text-sm text-[var(--color-text-secondary)]">{m.label}</div><div className="mt-1 text-3xl font-semibold text-[var(--color-text-primary)]">{m.value}</div></div>))}</motion.div>)}
                            {activeTabs[s.id] === 'activity' && (<motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-4 h-full overflow-y-auto pr-2">{s.updates.map((update, index) => (<div key={index} className="flex items-start gap-3"><img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${update.user.split(' ').map(n => n[0]).join('')}`} alt={update.user} className="w-9 h-9 rounded-full border-2 border-[var(--color-surface-alt)] shadow-sm" /><div><p className="text-sm text-[var(--color-text-primary)] leading-snug"><span className="font-semibold">{update.user}</span> {update.action}</p><p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{update.time}</p></div></div>))}</motion.div>)}
                          </AnimatePresence>
                         </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
    );
};

export default DashboardList;