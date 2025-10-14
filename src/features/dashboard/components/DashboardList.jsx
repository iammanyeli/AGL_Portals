import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Card, CardHeader, CardContent, CardTitle } from '../../../components/primitives/Card';
import Button from '../../../components/primitives/Button';
import { LayoutGrid, MessageCircle } from '../../../components/icons';

// Import modular chart components
import AreaChart from '../../../components/charts/AreaChart';
import BarChart from '../../../components/charts/BarChart';
import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';
import RadarChart from '../../../components/charts/RadarChart';


// block: ChartRenderer
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

// block: Header_Subtitle
const Header_Subtitle = ({ title, subtitle }) => (
    <div>
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        <div className="text-base text-[var(--color-text-secondary)] font-medium">{subtitle}</div>
    </div>
);

// block: SectionHeader
const SectionHeader = ({ section, goToPortal }) => (
    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 bg-[var(--color-surface-alt)] border-b-0">
        <div className="flex items-center gap-4">
            <div className={`rounded-xl p-3 bg-gradient-to-br ${section.accent} text-white shadow-md`}>
                <section.Icon className="h-7 w-7" />
            </div>
            <Header_Subtitle title={section.title} subtitle="Latest performance & trends" />
        </div>
        <Button size="lg" className="shrink-0 w-full sm:w-auto" onClick={() => goToPortal(section.id)}>
            Open Portal
        </Button>
    </CardHeader>
);

// block: MetricCard
const MetricCard = ({ metric }) => (
    <div className="rounded-xl p-4 bg-[var(--color-surface-alt)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-surface-hover)] transition-colors h-28">
        <div className="text-sm text-[var(--color-text-secondary)]">{metric.label}</div>
        <div className="mt-1 text-3xl font-semibold text-[var(--color-text-primary)]">{metric.value}</div>
    </div>
);

// block: ActivityItem
const ActivityItem = ({ update }) => (
    <div className="flex items-start gap-3">
        <img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${update.user.split(' ').map(n => n[0]).join('')}`} alt={update.user} className="w-9 h-9 rounded-full border-2 border-[var(--color-surface-alt)] shadow-sm" />
        <div>
            <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                <span className="font-semibold">{update.user}</span> {update.action}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{update.time}</p>
        </div>
    </div>
);

// primitive: Tab
const Tab = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`w-full p-2 text-center text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            isActive
                ? 'bg-[var(--tab-active-bg)] shadow text-[var(--tab-active-text)]'
                : 'text-[var(--color-text-secondary)]'
        }`}
    >
        {children}
    </button>
);

// block: TabContent
const TabContent = ({ activeTab, section }) => (
    <AnimatePresence mode="wait">
        {activeTab === 'metrics' && (
            <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-4"
            >
                {section.metrics.map((m, idx) => (
                    <MetricCard key={idx} metric={m} />
                ))}
            </motion.div>
        )}
        {activeTab === 'activity' && (
            <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 h-full overflow-y-auto pr-2"
            >
                {section.updates.map((update, index) => (
                    <ActivityItem key={index} update={update} />
                ))}
            </motion.div>
        )}
    </AnimatePresence>
);

// block: ListItem
const ListItem = ({ section, goToPortal, activeTabs, handleTabChange }) => (
    <motion.div
        id={section.id}
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
        <Card className="w-full rounded-2xl overflow-hidden">
            <SectionHeader section={section} goToPortal={goToPortal} />
            <CardContent className="px-6 pb-6 bg-[var(--color-surface-alt)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-80 bg-[var(--color-surface-contrast)] rounded-xl p-4 shadow-inner border border-[var(--color-border)] flex flex-col">
                            <ChartRenderer chart={section.charts[0]} sectionId={section.id} />
                        </div>
                        <div className="h-80 bg-[var(--color-surface-contrast)] rounded-xl p-4 shadow-inner border border-[var(--color-border)] flex flex-col">
                            <ChartRenderer chart={section.charts[1]} sectionId={section.id} />
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col gap-4 h-80">
                        <div className="flex p-1 bg-[var(--color-tab-container-bg)] rounded-xl">
                            <Tab isActive={activeTabs[section.id] === 'metrics'} onClick={() => handleTabChange(section.id, 'metrics')}>
                                <LayoutGrid className="h-4 w-4" />Key Metrics
                            </Tab>
                            <Tab isActive={activeTabs[section.id] === 'activity'} onClick={() => handleTabChange(section.id, 'activity')}>
                                <MessageCircle className="h-4 w-4" />Recent Activity
                            </Tab>
                        </div>
                        <div className="flex-grow relative flex flex-col justify-end">
                            <TabContent activeTab={activeTabs[section.id]} section={section} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

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
                <ListItem
                    key={s.id}
                    section={s}
                    goToPortal={goToPortal}
                    activeTabs={activeTabs}
                    handleTabChange={handleTabChange}
                />
            ))}
        </div>
    );
};

export default DashboardList;