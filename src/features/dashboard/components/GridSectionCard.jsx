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

const PIE_COLORS = {
    defects: ['#ef4444', '#22c55e'],
    training: ['#8b5cf6', '#a78bfa'],
    maintenance: ['#f97316', '#fb923c'],
    inspections: ['#16a34a', '#f43f5e'],
};

const GridSectionCard = ({ section, goToPortal }) => {
    const [[viewIndex, direction], setView] = useState([0, 0]);

    const views = [
        { name: 'Key Metrics' },
        { name: section.charts[0].title },
        { name: section.charts[1].title },
        { name: 'Recent Activity' },
    ];

    const swipeVariants = {
        enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 })
    };

    const paginate = (newDirection) => {
        let newIndex = viewIndex + newDirection;
        if (newIndex < 0) { newIndex = views.length - 1; }
        else if (newIndex >= views.length) { newIndex = 0; }
        setView([newIndex, newDirection]);
    };

    return (
        <Card className="w-full rounded-2xl overflow-hidden shadow-xl h-[560px] flex flex-col">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 bg-white dark:bg-[#1B365F] border-b">
                <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 bg-gradient-to-br ${section.accent} text-white shadow-md`}>
                        <section.Icon className="h-7 w-7" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">{section.title}</CardTitle>
                        <div className="text-base text-slate-500 dark:text-slate-400 font-medium">{views[viewIndex].name}</div>
                    </div>
                </div>
                <Button className="shrink-0 w-full sm:w-auto" onClick={() => goToPortal(section.id)}>
                    Open Portal
                </Button>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0">
                <div className="flex-grow relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={viewIndex} custom={direction} variants={swipeVariants} initial="enter" animate="center" exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="absolute w-full h-full top-0 left-0 p-6"
                            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1}
                            onDragEnd={(e, { offset }) => {
                                if (offset.x < -50) { paginate(1); }
                                else if (offset.x > 50) { paginate(-1); }
                            }}
                        >
                            {viewIndex === 0 && (<div className="grid grid-cols-2 gap-4 h-full">{section.metrics.map((m, idx) => (<div key={idx} className="rounded-xl p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-center"><div className="text-sm text-slate-500 dark:text-slate-400">{m.label}</div><div className="mt-1 text-3xl font-semibold text-[#1B365F] dark:text-slate-100">{m.value}</div></div>))}</div>)}
                            {viewIndex === 1 && (<div className="w-full h-full bg-slate-50 dark:bg-black/20 rounded-xl shadow-inner border border-slate-200 dark:border-white/10 flex flex-col">{section.charts[0].type === "line" && <ResponsiveContainer width="100%" height="100%"><LineChart data={section.charts[0].data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}><CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /><XAxis dataKey="name" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} /><Tooltip wrapperClassName="rounded-md shadow-lg" /><Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer>} {section.charts[0].type === "bar" && <ResponsiveContainer width="100%" height="100%"><BarChart data={section.charts[0].data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}><CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /><XAxis dataKey="name" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} /><Tooltip wrapperClassName="rounded-md shadow-lg" /><Bar dataKey="bugs" fill="#ef4444" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>} {section.charts[0].type === "area" && <ResponsiveContainer width="100%" height="100%"><AreaChart data={section.charts[0].data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}><CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /><XAxis dataKey="month" stroke="#6b7280" fontSize={12}/><YAxis stroke="#6b7280" fontSize={12}/><Tooltip wrapperClassName="rounded-md shadow-lg" /><Area type="monotone" dataKey="completed" stroke="#f97316" fill="#fed7aa" strokeWidth={2} /></AreaChart></ResponsiveContainer>} {section.charts[0].type === "radar" && <ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={section.charts[0].data}><PolarGrid /><PolarAngleAxis dataKey="subject" fontSize={12} /><PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={10}/><Radar name={section.title} dataKey="A" stroke="#16a34a" fill="#86efac" fillOpacity={0.6} /><Tooltip wrapperClassName="rounded-md shadow-lg" /></RadarChart></ResponsiveContainer>}</div>)}
                            {viewIndex === 2 && (<div className="w-full h-full bg-slate-50 dark:bg-black/20 rounded-xl shadow-inner border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={section.charts[1].data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{section.charts[1].data.map((entry, i) => (<Cell key={`cell-${i}`} fill={PIE_COLORS[section.id][i % PIE_COLORS[section.id].length]} />))}</Pie><Tooltip wrapperClassName="rounded-md shadow-lg" /><Legend /></PieChart></ResponsiveContainer></div>)}
                            {viewIndex === 3 && (<div className="space-y-4 h-full overflow-y-auto pr-2">{section.updates.map((update, index) => (<div key={index} className="flex items-start gap-3"><img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${update.user.split(' ').map(n => n[0]).join('')}`} alt={update.user} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" /><div><p className="text-sm text-slate-800 dark:text-slate-200 leading-snug"><span className="font-semibold">{update.user}</span> {update.action}</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{update.time}</p></div></div>))}</div>)}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex justify-center items-center py-3 px-4 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 space-x-2">
                    {views.map((_, index) => (
                        <button key={index}
                            onClick={() => { if (index === viewIndex) return; setView([index, index > viewIndex ? 1 : -1]); }}
                            className={`h-2 rounded-full transition-all ${viewIndex === index ? 'w-6 bg-[#EED58E]' : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/30'}`}
                        ></button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default GridSectionCard;