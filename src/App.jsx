import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Bug,
  CheckSquare,
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
import SettingsPage from './pages/Settings';
import TrainingPortal from './pages/TrainingPortal';
import DefectsPortal from './pages/DefectsPortal';
import MaintenancePortal from './pages/MaintenancePortal';
import InspectionsPortal from './pages/InspectionsPortal';

// --- Navigation Configurations ---
import { mainNavLinks } from './navigation.js';
import { defaultPortalNavLinks } from './features/portals/shared/navigation.js';
import { trainingPortalNavLinks } from './features/portals/training/navigation.js';


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
    setPortalSubPage('portal-dashboard');
  };

  const getNavLinks = () => {
      const navActions = {
          setPage: (pageId) => setPage(pageId),
          goToPortal: (portalId) => goToPortal(portalId),
          setPortalSubPage: (subPageId) => setPortalSubPage(subPageId),
      };

      // Turns the action strings from the config files into callable functions
      const hydrateLinks = (links) => links.map(link => ({
          ...link,
          action: () => navActions[link.action](link.id),
      }));
      
      const isPortalView = page !== 'dashboard' && page !== 'settings';
      if (!isPortalView) return hydrateLinks(mainNavLinks);

      switch (page) {
          case 'training':
              return hydrateLinks(trainingPortalNavLinks);
          // Future portals will have their own case here
          // case 'defects':
          //     return hydrateLinks(defectsPortalNavLinks); 
          default:
              return hydrateLinks(defaultPortalNavLinks);
      }
  };

  const renderPage = () => {
      const portalData = sections.find(s => s.id === page);
      
      if (portalData) {
          const commonProps = { section: portalData, setPage, portalSubPage };
          switch (page) {
              case 'training': return <TrainingPortal {...commonProps} setPortalSubPage={setPortalSubPage} />;
              case 'defects': return <DefectsPortal {...commonProps} />;
              case 'maintenance': return <MaintenancePortal {...commonProps} />;
              case 'inspections': return <InspectionsPortal {...commonProps} />;
              default: break;
          }
      }

      switch (page) {
          case 'settings':
              return <SettingsPage theme={theme} setTheme={setTheme} defaultView={defaultView} setDefaultView={setDefaultView} setPage={setPage} handleLogout={handleLogout} />;
          case 'dashboard':
          default:
              return <Dashboard sections={sections} goToPortal={goToPortal} defaultView={defaultView} />;
      }
  };

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
            portalSubPage={portalSubPage}
            navLinks={getNavLinks()}
        />
      </div>
  );
}