import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    BookOpen, 
    Bug, 
    Wrench, 
    CheckSquare, 
    Settings,
    Home,
    Table2,
    Upload,
    Download
} from '../icons';

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

export default FloatingNav;