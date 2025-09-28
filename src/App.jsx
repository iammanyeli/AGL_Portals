import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Bug, 
  CheckSquare, 
  ChevronLeft, 
  Download, 
  Home, 
  LayoutDashboard, 
  LayoutGrid, 
  List, 
  Lock, 
  LogOut, 
  Mail, 
  MessageCircle, 
  Moon, 
  Settings, 
  Sun, 
  Table2, 
  Upload, 
  User, 
  Wrench 
} from './components/icons/index.js';
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
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from './components/ui/Card';
import Button from './components/ui/Button';
import Switch from './components/ui/Switch';
import ViewSwitcher from './components/ui/ViewSwitcher';



// --- Mock Data ---
const trainingLine = [
  { name: "Wk1", value: 60 },
  { name: "Wk2", value: 72 },
  { name: "Wk3", value: 78 },
  { name: "Wk4", value: 85 },
];
const defectsBar = [
  { name: "Mon", bugs: 12 },
  { name: "Tue", bugs: 8 },
  { name: "Wed", bugs: 16 },
  { name: "Thu", bugs: 10 },
  { name: "Fri", bugs: 5 },
];
const defectsPie = [
  { name: "Open", value: 58 },
  { name: "Resolved", value: 318 },
];
const maintenanceArea = [
  { month: "Jan", scheduled: 40, completed: 32 },
  { month: "Feb", scheduled: 35, completed: 30 },
  { month: "Mar", scheduled: 45, completed: 41 },
  { month: "Apr", scheduled: 30, completed: 28 },
];
const maintenanceDonut = [
  { name: "Preventive", value: 72 },
  { name: "Corrective", value: 48 },
];
const inspectionsRadar = [
  { subject: "Safety", A: 120, fullMark: 150 },
  { subject: "Quality", A: 98, fullMark: 150 },
  { subject: "Compliance", A: 86, fullMark: 150 },
];
const inspectionsPie = [
  { name: "Pass", value: 91 },
  { name: "Fail", value: 9 },
];
const PIE_COLORS = {
    defects: ['#ef4444', '#22c55e'],
    training: ['#8b5cf6', '#a78bfa'],
    maintenance: ['#f97316', '#fb923c'],
    inspections: ['#16a34a', '#f43f5e'],
};


// --- Inline SVGs for lucide-react icons ---
// {done and moved}

// --- Simple UI Component Mocks for shadcn/ui ---
// {done and moved}

// --- Auth Components ---
const LoginPage = ({ setAuthView, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-[#1B365F] dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Log in to continue your work.</p>
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="email" placeholder="Email Address"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1B365F] dark:bg-[#EED58E] dark:hover:bg-[#EED58E]/90 text-white dark:text-[#1B365F] hover:bg-[#1B365F]/90 px-4 py-3 text-base">Log In</button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Don't have an account? 
                    <button onClick={() => setAuthView('signup')} className="font-semibold text-[#1B365F] dark:text-[#EED58E] hover:underline focus:outline-none ml-1">Sign up</button>
                </p>
            </div>
        </div>
    );
};

const SignupPage = ({ setAuthView, onSignup }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        onSignup(fullName, email, password);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-[#1B365F] dark:text-white mb-2">Create an Account</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Join us to start managing your operations.</p>
            <form onSubmit={handleSignup} className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="text" placeholder="Full Name"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="email" placeholder="Email Address"/>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-sm bg-slate-100 dark:bg-white/5 dark:text-white border border-slate-300 dark:border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED58E] focus:border-transparent placeholder-slate-400" type="password" placeholder="Password"/>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1B365F] dark:bg-[#EED58E] dark:hover:bg-[#EED58E]/90 text-white dark:text-[#1B365F] hover:bg-[#1B365F]/90 px-4 py-3 text-base">Sign Up</button>
            </form>
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Already have an account?
                    <button onClick={() => setAuthView('login')} className="font-semibold text-[#1B365F] dark:text-[#EED58E] hover:underline focus:outline-none ml-1">Log in</button>
                </p>
            </div>
        </div>
    );
};

const AuthPage = ({ onLogin, onSignup }) => {
    const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
             <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-white dark:bg-[#1B365F]/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center items-center text-center bg-[#1B365F] dark:bg-black/20">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1B365F] to-[#122442] opacity-50 z-0"></div>
                     <div className="relative z-10">
                        <img src="/agl_white_logo.svg" alt="AGL Logo" className="max-w-xs w-full mx-auto mb-4" />

                        <h1 className="text-3xl font-bold tracking-wider mb-3 text-[#EED58E]">Portal System</h1>
                    </div>
                </div>
                <div className="w-full lg:w-7/12 p-8 lg:p-16 flex items-center justify-center">
                    <div className="w-full max-w-md mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={authView}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {authView === 'login' ? <LoginPage setAuthView={setAuthView} onLogin={onLogin} /> : <SignupPage setAuthView={setAuthView} onSignup={onSignup} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- AppBar Component ---
const AppBar = ({ user, theme }) => (
  <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#1B365F]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
    <div className="mx-auto px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img 
          src={theme === 'dark' ? '/agl_white_logo.svg' : '/agl_blue_logo.svg'} 
          alt="AGL Logo" 
          className="h-8 w-auto"
        />
        <span className="text-xl font-bold text-[#1B365F] dark:text-white tracking-wider">PORTAL SYSTEM</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-slate-300 font-medium hidden sm:block">{user?.fullName || 'User'}</span>
        <img src={user?.photoURL || "https://placehold.co/40x40/d1d5db/4b5563?text=U"} alt="Profile Thumbnail" className="w-10 h-10 rounded-full border-2 border-[#EED58E] object-cover"/>
      </div>
    </div>
  </header>
);

// --- FloatingNav Component ---
const FloatingNav = ({ currentPage, setPage, portalSubPage, setPortalSubPage, goToPortal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isPortalView = currentPage !== 'dashboard' && currentPage !== 'settings';

  const mainNavLinks = [
    { id: 'dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: () => setPage('dashboard') },
    { id: 'training', tooltip: 'Training', Icon: BookOpen, action: () => goToPortal('training') },
    { id: 'defects', tooltip: 'Defects', Icon: Bug, action: () => goToPortal('defects') },
    { id: 'maintenance', tooltip: 'Maintenance', Icon: Wrench, action: () => goToPortal('maintenance') },
    { id: 'inspections', tooltip: 'Inspections', Icon: CheckSquare, action: () => goToPortal('inspections') },
    { id: 'settings', tooltip: 'Settings', Icon: Settings, action: () => setPage('settings') },
  ];

  const portalNavLinks = [
    { id: 'home', tooltip: 'Main Dashboard', Icon: Home, action: () => setPage('dashboard') },
    { id: 'portal-dashboard', tooltip: 'Portal Dashboard', Icon: LayoutDashboard, action: () => setPortalSubPage('portal-dashboard') },
    { id: 'table', tooltip: 'Table View', Icon: Table2, action: () => setPortalSubPage('table') },
    { id: 'import', tooltip: 'Import Data', Icon: Upload, action: () => setPortalSubPage('import') },
    { id: 'export', tooltip: 'Export Data', Icon: Download, action: () => setPortalSubPage('export') },
    { id: 'portal-settings', tooltip: 'Portal Settings', Icon: Settings, action: () => setPortalSubPage('portal-settings') },
  ];

  const navLinks = isPortalView ? portalNavLinks : mainNavLinks;
  const activeItem = isPortalView ? portalSubPage : currentPage;
  
  const handlePeelClick = () => {
      if (!isExpanded) {
          setIsExpanded(true);
      }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
        const peel = document.getElementById('peelContent');
        if (peel && !peel.contains(event.target)) {
            setIsExpanded(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className="fixed bottom-6 right-6 z-50">
      <div 
        id="peelContent"
        onClick={handlePeelClick}
        className={`p-2 glass-nav ${!isExpanded ? 'collapsed' : ''}`}
      >
        {navLinks.map(({ id, tooltip, Icon, action }) => (
          <button
            key={id}
            onClick={() => { action(); setIsExpanded(false); }}
            className={`nav-item w-12 h-12 rounded-full ${activeItem === id ? 'active' : ''}`}
            aria-label={tooltip}
          >
            <Icon className="nav-icon text-[#1B365F] dark:text-slate-300" />
            <span className="tooltip">{tooltip}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- GlobalStyles Component (was NavStyles) ---
const GlobalStyles = () => (
  <style>{`
    html {
        scroll-behavior: smooth;
    }
    .glass-nav {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    }
    .dark .glass-nav {
        background: rgba(27, 54, 95, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    .nav-item .tooltip {
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translate(-100%, -50%);
        background-color: #1f2937;
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 0.875rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }
    .nav-item:hover .tooltip {
        opacity: 1;
        visibility: visible;
    }
    .nav-item:hover {
        background-color: rgba(238, 213, 142, 0.15);
    }
    .dark .nav-item:hover {
        background-color: rgba(238, 213, 142, 0.2);
    }
    .nav-item.active {
        background-color: rgba(238, 213, 142, 0.25);
    }
    .dark .nav-item.active {
         background-color: rgba(238, 213, 142, 0.3);
    }
    .nav-icon {
        transition: all 0.3s ease;
    }
    .nav-item:hover .nav-icon {
        transform: scale(1.1);
        color: #1B365F;
    }
    .dark .nav-item:hover .nav-icon {
        color: #EED58E;
    }

    #peelContent {
        width: 64px;
        border-radius: 9999px;
        transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }
    #peelContent.collapsed {
        height: 64px;
        cursor: pointer;
    }
    #peelContent:not(.collapsed) {
        height: 344px; /* Adjusted for 6 items */
    }
    #peelContent .nav-item {
        position: absolute;
        left: 50%;
        flex-shrink: 0;
        transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s;
    }
    #peelContent:not(.collapsed) .nav-item {
        transform: translateX(-50%) scale(1);
        opacity: 1;
        pointer-events: all;
    }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(1) { top: 8px; }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(2) { top: 64px; }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(3) { top: 120px; }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(4) { top: 176px; }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(5) { top: 232px; }
    #peelContent:not(.collapsed) button.nav-item:nth-of-type(6) { top: 288px; }

    #peelContent.collapsed .nav-item {
        top: 50%;
        transform: translateX(-50%) translateY(-50%) scale(0.8);
        opacity: 0;
        pointer-events: none;
    }
    #peelContent.collapsed .nav-item.active {
        transform: translateX(-50%) translateY(-50%) scale(1);
        opacity: 1;
        pointer-events: all;
    }
  `}</style>
);

// --- ViewSwitcher Component ---
// {done and moved}


// --- Grid View Components ---
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
const GridView = ({ sections, goToPortal }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
            <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <GridSectionCard section={section} goToPortal={goToPortal} />
            </motion.div>
        ))}
    </div>
);

// --- Portal Sub-Page Placeholders ---
const PlaceholderView = ({ section, pageTitle }) => (
    <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-[#1B365F] dark:text-slate-100">{section.title} - {pageTitle}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Page content for {pageTitle.toLowerCase()} will be displayed here.</p>
    </div>
);
const PortalDashboardView = ({ section }) => <PlaceholderView section={section} pageTitle="Dashboard" />;
const TableView = ({ section }) => <PlaceholderView section={section} pageTitle="Table View" />;
const ImportView = ({ section }) => <PlaceholderView section={section} pageTitle="Import" />;
const ExportView = ({ section }) => <PlaceholderView section={section} pageTitle="Export" />;
const PortalSettingsView = ({ section }) => <PlaceholderView section={section} pageTitle="Settings" />;


// --- Portal Page Component ---
const PortalPage = ({ section, setPage, portalSubPage }) => {
    if (!section) return null;

    const renderPortalContent = () => {
        switch (portalSubPage) {
            case 'portal-dashboard': return <PortalDashboardView section={section} />;
            case 'table': return <TableView section={section} />;
            case 'import': return <ImportView section={section} />;
            case 'export': return <ExportView section={section} />;
            case 'portal-settings': return <PortalSettingsView section={section} />;
            default: return <PortalDashboardView section={section} />;
        }
    };
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
             <Card className="w-full rounded-2xl overflow-hidden shadow-xl">
                 <CardHeader className="flex items-center justify-between gap-4 bg-white dark:bg-white/5">
                     <div className="flex items-center gap-4">
                         <div className={`rounded-xl p-3 bg-gradient-to-br ${section.accent} text-white shadow-md`}>
                           <section.Icon className="h-7 w-7" />
                         </div>
                         <CardTitle className="text-2xl font-bold tracking-tight">{section.title} Portal</CardTitle>
                     </div>
                     <Button onClick={() => setPage('dashboard')} className="flex items-center gap-2">
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
                            {renderPortalContent()}
                        </motion.div>
                    </AnimatePresence>
                 </CardContent>
             </Card>
        </motion.div>
    );
};

// --- Settings Page Component ---
const SettingsPage = ({ theme, setTheme, defaultView, setDefaultView, setPage, handleLogout }) => {
    return (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
            <Card className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
                <CardHeader className="flex items-center justify-between gap-4 bg-white dark:bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className={`rounded-xl p-3 bg-gradient-to-br from-slate-500 to-gray-500 text-white shadow-md`}>
                           <Settings className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Settings</CardTitle>
                    </div>
                     <Button onClick={() => setPage('dashboard')} className="flex items-center gap-2">
                         <ChevronLeft className="w-5 h-5" />
                         Home
                     </Button>
                </CardHeader>
                <CardContent className="divide-y divide-slate-200 dark:divide-white/10 p-0">
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Theme</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[#EED58E]' : 'text-slate-400'}`} />
                            <Switch checked={theme === 'dark'} onChange={(isDark) => setTheme(isDark ? 'dark' : 'light')} />
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-300' : 'text-slate-400'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Default View</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Choose the default layout for the dashboard.</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <List className={`w-6 h-6 ${defaultView === 'list' ? 'text-[#1B365F] dark:text-[#EED58E]' : 'text-slate-400'}`} />
                            <Switch checked={defaultView === 'grid'} onChange={(isGrid) => setDefaultView(isGrid ? 'grid' : 'list')} />
                            <LayoutGrid className={`w-6 h-6 ${defaultView === 'grid' ? 'text-[#1B365F] dark:text-[#EED58E]' : 'text-slate-400'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Profile</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information.</p>
                        </div>
                        <Button className="flex items-center gap-2">
                            <User className="w-5 h-5"/>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Account</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sign out of your current session.</p>
                        </div>
                        <Button onClick={handleLogout} className="flex items-center gap-2 !bg-red-500/10 hover:!bg-red-500/20 !text-red-500 dark:!bg-red-500/10 dark:hover:!bg-red-500/20 dark:!text-red-400">
                            <LogOut className="w-5 h-5"/>
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// --- Dashboard Component (wrapper for existing list/grid) ---
const Dashboard = ({ sections, goToPortal, defaultView }) => {
    const [view, setView] = useState(defaultView);
    const [activeTabs, setActiveTabs] = useState(
        sections.reduce((acc, section) => ({ ...acc, [section.id]: 'metrics' }), {})
    );

    const handleTabChange = (sectionId, tab) => {
        setActiveTabs(prev => ({ ...prev, [sectionId]: tab }));
    };

    useEffect(() => {
        setView(defaultView);
    }, [defaultView]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
            <ViewSwitcher view={view} setView={setView} />
            <div className="">
                <AnimatePresence mode="wait">
                    {view === 'list' ? (
                         <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
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
                        </motion.div>
                    ) : (
                        <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                           <GridView sections={sections} goToPortal={goToPortal} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};


export default function App() {
  const [page, setPage] = useState('dashboard'); // 'dashboard', 'settings', 'training', etc.
  const [portalSubPage, setPortalSubPage] = useState('portal-dashboard'); // 'portal-dashboard', 'table', 'import', etc.
  const [theme, setTheme] = useState('dark');
  const [defaultView, setDefaultView] = useState('grid');
  
  // --- New Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // --- Mock Authentication Handlers ---
  const handleLogin = (email, password) => {
    // This is a mock login. In a real app, you'd verify credentials.
    const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const initials = userName.split(' ').map(n=>n[0]).join('').substring(0,2);
    setUser({ 
        fullName: userName, 
        email: email, 
        photoURL: `https://placehold.co/40x40/d1d5db/4b5563?text=${initials}`
    });
    setIsAuthenticated(true);
  };

  const handleSignup = (fullName, email, password) => {
    // This is a mock signup.
    const initials = fullName.split(' ').map(n=>n[0]).join('').substring(0,2);
    setUser({ 
        fullName: fullName, 
        email: email,
        photoURL: `https://placehold.co/40x40/d1d5db/4b5563?text=${initials}`
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPage('dashboard'); // Reset to default page on logout
  };

  const sections = [
    { id: "training", title: "Training", accent: "from-indigo-500 to-violet-500", Icon: BookOpen, metrics: [{ label: "Courses", value: 320 }, { label: "Active", value: 124 }, { label: "Avg Score", value: "87%" }, { label: "Completion", value: "72%" }], charts: [{ type: "line", data: trainingLine, title: "Weekly Score Improvement" }, { type: "pie", data: defectsPie, title: "Overall Defect Status" }], updates: [{ user: "Alex Doe", action: "completed the 'Advanced Safety' module.", time: "3h ago" }, { user: "Samantha Bee", action: "achieved a 95% score on the final exam.", time: "Yesterday" }, { user: "John Carter", action: "enrolled in 2 new courses.", time: "2 days ago" }, { user: "Maria Garcia", action: "updated the training manual.", time: "3 days ago" }] },
    { id: "defects", title: "Defects", accent: "from-rose-500 to-red-500", Icon: Bug, metrics: [{ label: "Open", value: 58 }, { label: "Critical", value: 12 }, { label: "MTTR", value: "48h" }, { label: "Total", value: 400 }], charts: [{ type: "bar", data: defectsBar, title: "Daily Bug Reports" }, { type: "pie", data: defectsPie, title: "Open vs. Resolved" }], updates: [{ user: "Maria Garcia", action: "resolved critical bug #7812.", time: "5m ago" }, { user: "Ken Watanabe", action: "reported a new UI issue.", time: "1h ago" }, { user: "Alex Doe", action: "commented on bug #7801.", time: "4h ago" }] },
    { id: "maintenance", title: "Maintenance", accent: "from-amber-400 to-orange-500", Icon: Wrench, metrics: [{ label: "Scheduled", value: 120 }, { label: "Overdue", value: 8 }, { label: "MTTR", value: "5.2h" }, { label: "Completed", value: 110 }], charts: [{ type: "area", data: maintenanceArea, title: "Monthly Work Orders" }, { type: "pie", data: maintenanceDonut, title: "Maintenance Type Distribution" }], updates: [{ user: "Peter Jones", action: "completed work order #223.", time: "22m ago" }, { user: "Samantha Bee", action: "scheduled preventive maintenance for Unit B.", time: "6h ago" }, { user: "Maria Garcia", action: "updated asset status for the main generator.", time: "Yesterday" }] },
    { id: "inspections", title: "Inspections", accent: "from-emerald-400 to-green-600", Icon: CheckSquare, metrics: [{ label: "This Month", value: 84 }, { label: "Pass Rate", value: "91%" }, { label: "Nonconformities", value: 9 }, { label: "Avg Time", value: "12m" }], charts: [{ type: "radar", data: inspectionsRadar, title: "Performance Areas" }, { type: "pie", data: inspectionsPie, title: "Pass / Fail Rate" }], updates: [{ user: "Li Wei", action: "passed the monthly safety inspection.", time: "45m ago" }, { user: "John Carter", action: "raised a non-conformity for fire-exit blockage.", time: "2h ago" }, { user: "Ken Watanabe", action: "submitted the weekly quality report.", time: "1 day ago" }] },
  ];

  const goToPortal = (portalId) => {
    setPage(portalId);
    setPortalSubPage('portal-dashboard'); // Always reset to dashboard view when entering a portal
  };

  const renderPage = () => {
      const portalData = sections.find(s => s.id === page);
      if (portalData) {
          return <PortalPage section={portalData} setPage={setPage} portalSubPage={portalSubPage} />;
      }
      switch (page) {
          case 'settings':
              return <SettingsPage theme={theme} setTheme={setTheme} defaultView={defaultView} setDefaultView={setDefaultView} setPage={setPage} handleLogout={handleLogout} />;
          case 'dashboard':
          default:
              return <Dashboard sections={sections} goToPortal={goToPortal} defaultView={defaultView} />;
      }
  };

  // --- Main render logic with authentication ---
  if (!isAuthenticated) {
    return (
      <>
        <GlobalStyles />
        <div className="bg-slate-50 dark:bg-[#122442] transition-colors duration-500">
           <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="bg-white dark:bg-[#1B365F] min-h-screen font-sans text-[#1B365F] dark:text-white">
        <AppBar user={user} theme={theme} />
        <main className="pt-24 pb-24">
            <AnimatePresence mode="wait">
                 {renderPage()}
            </AnimatePresence>
        </main>
        <FloatingNav 
            currentPage={page} 
            setPage={setPage}
            portalSubPage={portalSubPage}
            setPortalSubPage={setPortalSubPage}
            goToPortal={goToPortal}
        />
      </div>
    </>
  );
}
