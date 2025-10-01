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

// UI Components
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from './components/ui/Card';
import Button from './components/ui/Button';
import Switch from './components/ui/Switch';
import ViewSwitcher from './components/ui/ViewSwitcher';

// Layout Components
import AppBar from './components/layout/AppBar';
import FloatingNav from './components/layout/FloatingNav';

// --- Page & Feature Components ---
import AuthPage from './features/authentication/AuthPage';
import Dashboard from './pages/Dashboard';

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
// {moved to src/features/authentication/} Phase 3

// --- AppBar Component ---
// {done and moved}

// --- FloatingNav Component ---
// {done and moved}

// --- GlobalStyles Component (was NavStyles) ---
// {done and moved}

// --- ViewSwitcher Component ---
// {done and moved}

// --- Grid View Components ---
// {moved to src/features/dashboard/components/} Phase 3


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
// {moved to src/pages/Dashboard.jsx}


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
        <div className="bg-slate-50 dark:bg-[#122442] transition-colors duration-500">
           <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
        </div>
    );
  }

  return (
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
  );
}