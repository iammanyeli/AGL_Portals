import {
  BookOpen,
  Bug,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Wrench,
} from './components/icons';

export const mainNavLinks = [
  { id: 'dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: 'setPage' },
  { id: 'training', tooltip: 'Training', Icon: BookOpen, action: 'goToPortal' },
  { id: 'defects', tooltip: 'Defects', Icon: Bug, action: 'goToPortal' },
  { id: 'maintenance', tooltip: 'Maintenance', Icon: Wrench, action: 'goToPortal' },
  { id: 'inspections', tooltip: 'Inspections', Icon: CheckSquare, action: 'goToPortal' },
  { id: 'settings', tooltip: 'Settings', Icon: Settings, action: 'setPage' },
];