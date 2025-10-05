import {
  Home,
  LayoutDashboard,
  Settings,
  Table2,
  Upload,   
  Download   
} from '../../../components/icons';

export const defectsPortalNavLinks = [
  // { id: 'home', tooltip: 'Main Dashboard', Icon: Home, action: 'setPage' },
  { id: 'dashboard', tooltip: 'Main Dashboard', Icon: Home, action: 'setPage' },
  { id: 'portal-dashboard', tooltip: 'Portal Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
  { id: 'table', tooltip: 'Table View', Icon: Table2, action: 'setPortalSubPage' },
  { id: 'import', tooltip: 'Import', Icon: Upload, action: 'setPortalSubPage' },
  { id: 'export', tooltip: 'Export', Icon: Download, action: 'setPortalSubPage' },
  { id: 'portal-settings', tooltip: 'Portal Settings', Icon: Settings, action: 'setPortalSubPage' },
];