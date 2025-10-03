import {
    Home,
    LayoutDashboard,
    Table2,
    MessageCircle,
    Upload,
    Settings
} from '../../../components/icons';

export const trainingPortalNavLinks = [
    { id: 'home', tooltip: 'Main Dashboard', Icon: Home, action: 'setPage' },
    { id: 'portal-dashboard', tooltip: 'Portal Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
    { id: 'table', tooltip: 'Records', Icon: Table2, action: 'setPortalSubPage' },
    { id: 'activityDetails', tooltip: 'Activity Log', Icon: MessageCircle, action: 'setPortalSubPage' },
    { id: 'import', tooltip: 'Import / Export', Icon: Upload, action: 'setPortalSubPage' },
    { id: 'portal-settings', tooltip: 'Portal Settings', Icon: Settings, action: 'setPortalSubPage' },
];