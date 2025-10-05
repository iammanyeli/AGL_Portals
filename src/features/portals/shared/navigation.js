import {
  Home,
  LayoutDashboard,
  Settings,
  Table2,
} from '../../../components/icons';

export const defaultPortalNavLinks = [
  { id: 'dashboard', tooltip: 'Main Dashboard', Icon: Home, action: 'setPage' },
  { id: 'portal-dashboard', tooltip: 'Portal Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
  { id: 'table', tooltip: 'Table View', Icon: Table2, action: 'setPortalSubPage' },
  { id: 'portal-settings', tooltip: 'Portal Settings', Icon: Settings, action: 'setPortalSubPage' },
];