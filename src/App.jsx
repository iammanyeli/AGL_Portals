// src/App.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Bug,
  CheckSquare,
  Wrench
} from './components/icons/index.js';

// Layout Components
import AppBar from './components/layout/AppBar';
import FloatingNav from './components/layout/FloatingNav';

// --- Page & Feature Components ---
import AuthPage from './features/authentication/index.jsx';
import Dashboard from './features/dashboard/index.jsx';
import SettingsPage from './features/settings/index.jsx';
import TrainingPortal from './features/portals/training/index.jsx';
import DefectsPortal from './features/portals/defects/index.jsx';
import MaintenancePortal from './features/portals/maintenance/index.jsx';
import InspectionsPortal from './features/portals/inspections/index.jsx';

// --- Navigation Configurations ---
import { mainNavLinks } from './routes/mainNavLinks.js';
import { trainingPortalNavLinks } from './features/portals/training/routes.js';
import { defectsPortalNavLinks } from './features/portals/defects/routes.js';
import { inspectionsPortalNavLinks } from './features/portals/inspections/routes.js';
import { maintenancePortalNavLinks } from './features/portals/maintenance/routes.js';

// --- Hooks ---
import useAuth from './hooks/useAuth.js';

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
  const { user, isAuthenticated, logout } = useAuth();
  const [page, setPage] = useState('hub-home');
  const [portalSubPage, setPortalSubPage] = useState('training-dashboard');
  const [theme, setTheme] = useState('dark');
  const [defaultView, setDefaultView] = useState('grid');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    logout();
    setPage('hub-home'); // Reset to default page on logout
  };

  const sections = [
    { id: "portal-training", title: "Training Portal", accent: "from-indigo-500 to-violet-500", Icon: BookOpen, metrics: [{ label: "Courses", value: 320 }, { label: "Active", value: 124 }, { label: "Avg Score", value: "87%" }, { label: "Completion", value: "72%" }], charts: [{ type: "line", data: trainingLine, title: "Weekly Score Improvement" }, { type: "pie", data: defectsPie, title: "Overall Defect Status" }], updates: [{ user: "Alex Doe", action: "completed the 'Advanced Safety' module.", time: "3h ago" }, { user: "Samantha Bee", action: "achieved a 95% score on the final exam.", time: "Yesterday" }, { user: "John Carter", action: "enrolled in 2 new courses.", time: "2 days ago" }, { user: "Maria Garcia", action: "updated the training manual.", time: "3 days ago" }] },
    { id: "portal-defects", title: "Defects Portal", accent: "from-rose-500 to-red-500", Icon: Bug, metrics: [{ label: "Open", value: 58 }, { label: "Critical", value: 12 }, { label: "MTTR", value: "48h" }, { label: "Total", value: 400 }], charts: [{ type: "bar", data: defectsBar, title: "Daily Bug Reports" }, { type: "pie", data: defectsPie, title: "Open vs. Resolved" }], updates: [{ user: "Maria Garcia", action: "resolved critical bug #7812.", time: "5m ago" }, { user: "Ken Watanabe", action: "reported a new UI issue.", time: "1h ago" }, { user: "Alex Doe", action: "commented on bug #7801.", time: "4h ago" }] },
    { id: "portal-maintenance", title: "Maintenance Portal", accent: "from-amber-400 to-orange-500", Icon: Wrench, metrics: [{ label: "Scheduled", value: 120 }, { label: "Overdue", value: 8 }, { label: "MTTR", value: "5.2h" }, { label: "Completed", value: 110 }], charts: [{ type: "area", data: maintenanceArea, title: "Monthly Work Orders" }, { type: "pie", data: maintenanceDonut, title: "Maintenance Type Distribution" }], updates: [{ user: "Peter Jones", action: "completed work order #223.", time: "22m ago" }, { user: "Samantha Bee", action: "scheduled preventive maintenance for Unit B.", time: "6h ago" }, { user: "Maria Garcia", action: "updated asset status for the main generator.", time: "Yesterday" }] },
    { id: "portal-inspections", title: "Inspections Portal", accent: "from-emerald-400 to-green-600", Icon: CheckSquare, metrics: [{ label: "This Month", value: 84 }, { label: "Pass Rate", value: "91%" }, { label: "Nonconformities", value: 9 }, { label: "Avg Time", value: "12m" }], charts: [{ type: "radar", data: inspectionsRadar, title: "Performance Areas" }, { type: "pie", data: inspectionsPie, title: "Pass / Fail Rate" }], updates: [{ user: "Li Wei", action: "passed the monthly safety inspection.", time: "45m ago" }, { user: "John Carter", action: "raised a non-conformity for fire-exit blockage.", time: "2h ago" }, { user: "Ken Watanabe", action: "submitted the weekly quality report.", time: "1 day ago" }] },
  ];

  const goToPortal = (portalId) => {
    setPage(portalId);
    const defaultSubPage = `${portalId.replace('portal-', '')}-dashboard`;
    setPortalSubPage(defaultSubPage);
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

    const isPortalView = page !== 'hub-home' && page !== 'hub-settings';
    if (!isPortalView) return hydrateLinks(mainNavLinks);

    switch (page) {
      case 'portal-training':
        return hydrateLinks(trainingPortalNavLinks);
      case 'portal-defects':
        return hydrateLinks(defectsPortalNavLinks);
      case 'portal-inspections':
        return hydrateLinks(inspectionsPortalNavLinks);
      case 'portal-maintenance':
        return hydrateLinks(maintenancePortalNavLinks);
      default:
        const homeLink = mainNavLinks.find(link => link.id === 'hub-home');
        return hydrateLinks(homeLink ? [homeLink] : []);
    }
  };

  const renderPage = () => {
    const portalData = sections.find(s => s.id === page);

    if (portalData) {
      const commonProps = { section: portalData, setPage, portalSubPage };
      switch (page) {
        case 'portal-training': return <TrainingPortal {...commonProps} setPortalSubPage={setPortalSubPage} />;
        case 'portal-defects': return <DefectsPortal {...commonProps} />;
        case 'portal-maintenance': return <MaintenancePortal {...commonProps} />;
        case 'portal-inspections': return <InspectionsPortal {...commonProps} />;
        default: break;
      }
    }

    switch (page) {
      case 'hub-settings':
        return <SettingsPage theme={theme} setTheme={setTheme} defaultView={defaultView} setDefaultView={setDefaultView} setPage={setPage} handleLogout={handleLogout} />;
      case 'hub-home':
      default:
        return <Dashboard sections={sections} goToPortal={goToPortal} defaultView={defaultView} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 dark:bg-[#122442] transition-colors duration-500">
        <AuthPage />
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