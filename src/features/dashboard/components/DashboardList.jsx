import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { LayoutGrid, MessageCircle } from '../../../components/icons';

const PIE_COLORS = {
    'portal-defects': ['#ef4444', '#22c55e'],
    'portal-training': ['#8b5cf6', '#a78bfa'],
    'portal-maintenance': ['#f97316', '#fb923c'],
    'portal-inspections': ['#16a34a', '#f43f5e'],
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
                <Card className="w-full rounded-2xl overflow-hidden shadow-xl">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 bg-white dark:bg-white/5 border-b-0">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl p-3 bg-gradient-to-br ${s.accent} text-white shadow-md`}>
                        <s.Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">{s.title}</CardTitle>
                        <div className="text-base text-slate-500 dark:text-slate-400 font-medium">Latest performance & trends</div>
                      </div>
                    </div>
                    <Button size="lg" className="shrink-0 w-full sm:w-auto" onClick={() => goToPortal(s.id)}>
                      Open Portal
                    </Button>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 bg-white dark:bg-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">
                      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-80 bg-slate-50 dark:bg-black/20 rounded-xl p-4 shadow-inner border border-slate-200 dark:border-white/10 flex flex-col">
                          <h4 className="font-semibold text-[#1B365F] dark:text-slate-200 mb-2">{s.charts[0].title}</h4>
                          <div className="flex-grow">
                            {s.charts[0].type === "line" && (<ResponsiveContainer width="100%" height="100%"><LineChart data={s.charts[0].data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="#475569" /><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} /><Tooltip wrapperClassName="rounded-md shadow-lg" /><Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer>)}
                            {s.charts[0].type === "bar" && (<ResponsiveContainer width="100%" height="100%"><BarChart data={s.charts[0].data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="#475569" /><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} /><Tooltip wrapperClassName="rounded-md shadow-lg" /><Bar dataKey="bugs" fill="#ef4444" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>)}
                            {s.charts[0].type === "area" && (<ResponsiveContainer width="100%" height="100%"><AreaChart data={s.charts[0].data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="#475569" /><XAxis dataKey="month" stroke="#94a3b8" fontSize={12}/><YAxis stroke="#94a3b8" fontSize={12}/><Tooltip wrapperClassName="rounded-md shadow-lg" /><Area type="monotone" dataKey="completed" stroke="#f97316" fill="#fed7aa" fillOpacity={0.5} strokeWidth={2} /></AreaChart></ResponsiveContainer>)}
                            {s.charts[0].type === "radar" && (<ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={s.charts[0].data}><PolarGrid /><PolarAngleAxis dataKey="subject" fontSize={12} /><PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={10}/><Radar name={s.title} dataKey="A" stroke="#16a34a" fill="#86efac" fillOpacity={0.6} /><Tooltip wrapperClassName="rounded-md shadow-lg" /></RadarChart></ResponsiveContainer>)}
                          </div>
                        </div>
                        <div className="h-80 bg-slate-50 dark:bg-black/20 rounded-xl p-4 shadow-inner border border-slate-200 dark:border-white/10 flex flex-col">
                          <h4 className="font-semibold text-[#1B365F] dark:text-slate-200 mb-2">{s.charts[1].title}</h4>
                          <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={s.charts[1].data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{s.charts[1].data.map((entry, i) => (<Cell key={`cell-${i}`} fill={PIE_COLORS[s.id][i % PIE_COLORS[s.id].length]} />))}</Pie><Tooltip wrapperClassName="rounded-md shadow-lg" /><Legend /></PieChart></ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-1 flex flex-col gap-4 h-80">
                         <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl">
                            <button onClick={() => handleTabChange(s.id, 'metrics')} className={`w-full p-2 text-center text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTabs[s.id] === 'metrics' ? 'bg-white dark:bg-[#EED58E] shadow text-[#1B365F] dark:text-[#1B365F]' : 'text-slate-500 dark:text-slate-400'}`}><LayoutGrid className="h-4 w-4" />Key Metrics</button>
                            <button onClick={() => handleTabChange(s.id, 'activity')} className={`w-full p-2 text-center text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTabs[s.id] === 'activity' ? 'bg-white dark:bg-[#EED58E] shadow text-[#1B365F] dark:text-[#1B365F]' : 'text-slate-500 dark:text-slate-400'}`}><MessageCircle className="h-4 w-4" />Recent Activity</button>
                         </div>
                         <div className="flex-grow relative flex flex-col justify-end">
                          <AnimatePresence mode="wait">
                            {activeTabs[s.id] === 'metrics' && (<motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="grid grid-cols-2 gap-4">{s.metrics.map((m, idx) => (<div key={idx} className="rounded-xl p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow h-28"><div className="text-sm text-slate-500 dark:text-slate-400">{m.label}</div><div className="mt-1 text-3xl font-semibold text-[#1B365F] dark:text-slate-100">{m.value}</div></div>))}</motion.div>)}
                            {activeTabs[s.id] === 'activity' && (<motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-4 h-full overflow-y-auto pr-2">{s.updates.map((update, index) => (<div key={index} className="flex items-start gap-3"><img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${update.user.split(' ').map(n => n[0]).join('')}`} alt={update.user} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" /><div><p className="text-sm text-slate-800 dark:text-slate-200 leading-snug"><span className="font-semibold">{update.user}</span> {update.action}</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{update.time}</p></div></div>))}</motion.div>)}
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