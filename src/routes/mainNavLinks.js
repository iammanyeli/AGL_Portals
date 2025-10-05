import {
  BookOpen,
  Bug,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Wrench,
} from '../components/icons';

export const mainNavLinks = [
  { id: 'hub-home', tooltip: 'Main Hub', Icon: LayoutDashboard, action: 'setPage' },

  { id: 'portal-training', tooltip: 'Training Portal', Icon: BookOpen, action: 'goToPortal' },
  { id: 'portal-defects', tooltip: 'Defects Portal', Icon: Bug, action: 'goToPortal' },
  { id: 'portal-maintenance', tooltip: 'Maintenance Portal', Icon: Wrench, action: 'goToPortal' },
  { id: 'portal-inspections', tooltip: 'Inspections Portal', Icon: CheckSquare, action: 'goToPortal' },
  
  { id: 'hub-settings', tooltip: 'Main Settings', Icon: Settings, action: 'setPage' },
];