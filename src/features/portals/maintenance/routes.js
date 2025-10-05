import {
  Home,
  LayoutDashboard,
  Settings,
  Table2,
  Upload,   
  Download   
} from '../../../components/icons';

export const maintenancePortalNavLinks = [
  { id: 'hub-home', tooltip: 'Main Hub', Icon: Home, action: 'setPage' },

  { id: 'maintenance-dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
  { id: 'maintenance-table', tooltip: 'Table View', Icon: Table2, action: 'setPortalSubPage' },
  { id: 'maintenance-import', tooltip: 'Import', Icon: Upload, action: 'setPortalSubPage' },
  { id: 'maintenance-export', tooltip: 'Export', Icon: Download, action: 'setPortalSubPage' },
  { id: 'maintenance-settings', tooltip: 'Settings', Icon: Settings, action: 'setPortalSubPage' },
];