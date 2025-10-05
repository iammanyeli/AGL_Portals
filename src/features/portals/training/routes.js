import {
    Home,
    LayoutDashboard,
    Table2,
    MessageCircle,
    Upload,
    Settings
} from '../../../components/icons';

export const trainingPortalNavLinks = [
    { id: 'hub-home', tooltip: 'Main Hub', Icon: Home, action: 'setPage' },

    { id: 'training-dashboard', tooltip: 'Dashboard', Icon: LayoutDashboard, action: 'setPortalSubPage' },
    { id: 'training-records', tooltip: 'Records', Icon: Table2, action: 'setPortalSubPage' },
    { id: 'training-activity', tooltip: 'Activity Log', Icon: MessageCircle, action: 'setPortalSubPage' },
    { id: 'training-import', tooltip: 'Import / Export', Icon: Upload, action: 'setPortalSubPage' },
    { id: 'training-settings', tooltip: 'Settings', Icon: Settings, action: 'setPortalSubPage' },
];