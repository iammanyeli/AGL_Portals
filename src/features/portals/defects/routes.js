import {
  Home,
  LayoutDashboard,
  Settings,
  Table2,
  Upload,   
  Download   
} from '../../../components/icons';

export const defectsPortalNavLinks = [
  { id: 'hub-home', tooltip: 'Main Hub', Icon: Home, action: 'setPage' },

  { id: 'defects-dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
  { id: 'defects-table', tooltip: 'Table View', Icon: Table2, action: 'setPortalSubPage' },
  { id: 'defects-import', tooltip: 'Import', Icon: Upload, action: 'setPortalSubPage' },
  { id: 'defects-export', tooltip: 'Export', Icon: Download, action: 'setPortalSubPage' },
  { id: 'defects-settings', tooltip: 'Settings', Icon: Settings, action: 'setPortalSubPage' },
];