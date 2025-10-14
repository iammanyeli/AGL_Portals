import React from 'react';
import { motion } from "framer-motion";

// UI Components
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from '../../components/primitives/Card';
import Button from '../../components/primitives/Button';
import Switch from '../../components/primitives/Switch';

// Icons
import { 
  ChevronLeft, 
  LayoutGrid, 
  List, 
  LogOut, 
  Moon, 
  Settings, 
  Sun, 
  User 
} from '../../components/icons';
import useTheme from '../../hooks/useTheme';

// layout: SettingsLayout
const SettingsLayout = ({ setPage, children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6">
        <Card className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <CardHeader className="flex items-center justify-between gap-4 bg-[var(--color-card-header)]">
                <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 bg-gradient-to-br from-slate-500 to-gray-500 text-white shadow-md`}>
                       <Settings className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Settings</CardTitle>
                </div>
                 <Button onClick={() => setPage('hub-home')} className="flex items-center gap-2">
                     <ChevronLeft className="w-5 h-5" />
                     Home
                 </Button>
            </CardHeader>
            <CardContent className="divide-y divide-[var(--color-divider)] p-0">
                {children}
            </CardContent>
        </Card>
    </motion.div>
);

// primitive: Header_Subtitle
const Header_Subtitle = ({ title, description }) => (
    <div>
        <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
    </div>
);

// block: ListItem
const ListItem = ({ content, action }) => (
    <div className="p-6 flex items-center justify-between">
        <div>{content}</div>
        <div>{action}</div>
    </div>
);

// primitive: Toggle_Icon
const Toggle_Icon = ({ leftIcon, rightIcon, checked, onChange }) => (
    <div className="flex items-center gap-2">
        {React.cloneElement(leftIcon, { className: `w-6 h-6 ${leftIcon.props.className || ''}` })}
        <Switch checked={checked} onChange={onChange} />
        {React.cloneElement(rightIcon, { className: `w-6 h-6 ${rightIcon.props.className || ''}` })}
    </div>
);

// primitive: Button_Icon
const Button_Icon = ({ icon, children, className, ...props }) => (
    <Button {...props} className={`flex items-center gap-2 ${className || ''}`}>
        {icon}
        {children}
    </Button>
);

// primitive: Button_Icon_Destructive
const Button_Icon_Destructive = ({ icon, children, ...props }) => (
    <Button_Icon
        icon={icon}
        {...props}
        className="!bg-[var(--color-button-destructive-bg)] hover:!bg-[var(--color-button-destructive-hover-bg)] !text-[var(--color-button-destructive-text)]"
    >
        {children}
    </Button_Icon>
);


export default function SettingsPage({ defaultView, setDefaultView, setPage, handleLogout }) {
    const { theme, toggleTheme } = useTheme();

    const handleViewChange = (isGrid) => {
        setDefaultView(isGrid ? 'grid' : 'list');
    };

    return (
        <SettingsLayout setPage={setPage}>
            <ListItem
                content={<Header_Subtitle title="Theme" description="Switch between light and dark mode." />}
                action={
                    <Toggle_Icon
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        leftIcon={<Sun className={`${theme === 'light' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />}
                        rightIcon={<Moon className={`${theme === 'dark' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />}
                    />
                }
            />
            <ListItem
                content={<Header_Subtitle title="Default View" description="Choose the default layout for the dashboard." />}
                action={
                    <Toggle_Icon
                        checked={defaultView === 'grid'}
                        onChange={handleViewChange}
                        leftIcon={<List className={`${defaultView === 'list' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />}
                        rightIcon={<LayoutGrid className={`${defaultView === 'grid' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />}
                    />
                }
            />
            <ListItem
                content={<Header_Subtitle title="Profile" description="Manage your personal information." />}
                action={
                    <Button_Icon icon={<User className="w-5 h-5"/>}>
                        Edit Profile
                    </Button_Icon>
                }
            />
            <ListItem
                content={<Header_Subtitle title="Account" description="Sign out of your current session." />}
                action={
                    <Button_Icon_Destructive 
                        icon={<LogOut className="w-5 h-5"/>} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button_Icon_Destructive>
                }
            />
        </SettingsLayout>
    )
}

