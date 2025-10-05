import {
  Home,
  LayoutDashboard,
  Settings,
  Table2,
  Upload,   
  Download   
} from '../../../components/icons';

export const inspectionsPortalNavLinks = [
  { id: 'hub-home', tooltip: 'Main Hub', Icon: Home, action: 'setPage' },

  { id: 'inspections-dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
  { id: 'inspections-table', tooltip: 'Table View', Icon: Table2, action: 'setPortalSubPage' },
  { id: 'inspections-import', tooltip: 'Import', Icon: Upload, action: 'setPortalSubPage' },
  { id: 'inspections-export', tooltip: 'Export', Icon: Download, action: 'setPortalSubPage' },
  { id: 'inspections-settings', tooltip: 'Settings', Icon: Settings, action: 'setPortalSubPage' },
];