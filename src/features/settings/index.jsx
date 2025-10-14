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

// primitive: Header_Subtitle_Compact
const Header_Subtitle_Compact = ({ title, description }) => (
    <div>
        <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
    </div>
);

// block: ListItem_Block
const ListItem_Block = ({ content, action }) => (
    <div className="p-6 flex items-center justify-between">
        <div>{content}</div>
        <div>{action}</div>
    </div>
);

// block: Toggle_Icon
const Toggle_Icon = ({ LeftIcon, RightIcon, checked, onChange }) => (
    <div className="flex items-center gap-2">
        {LeftIcon}
        <Switch checked={checked} onChange={onChange} />
        {RightIcon}
    </div>
);

// primitive: Button_Icon
const Button_Icon = ({ icon, children, className, ...props }) => (
    <Button {...props} className={`flex items-center gap-2 ${className || ''}`}>
        {icon}
        {children}
    </Button>
);


export default function SettingsPage({ defaultView, setDefaultView, setPage, handleLogout }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <SettingsLayout setPage={setPage}>
            <ListItem_Block
                content={<Header_Subtitle_Compact title="Theme" description="Switch between light and dark mode." />}
                action={
                    <Toggle_Icon
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        LeftIcon={<Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />}
                        RightIcon={<Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />}
                    />
                }
            />
            <ListItem_Block
                content={<Header_Subtitle_Compact title="Default View" description="Choose the default layout for the dashboard." />}
                action={
                    <Toggle_Icon
                        checked={defaultView === 'grid'}
                        onChange={(isGrid) => setDefaultView(isGrid ? 'grid' : 'list')}
                        LeftIcon={<List className={`w-6 h-6 ${defaultView === 'list' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />}
                        RightIcon={<LayoutGrid className={`w-6 h-6 ${defaultView === 'grid' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />}
                    />
                }
            />
            <ListItem_Block
                content={<Header_Subtitle_Compact title="Profile" description="Manage your personal information." />}
                action={
                    <Button_Icon icon={<User className="w-5 h-5"/>}>
                        Edit Profile
                    </Button_Icon>
                }
            />
            <ListItem_Block
                content={<Header_Subtitle_Compact title="Account" description="Sign out of your current session." />}
                action={
                    <Button_Icon 
                        icon={<LogOut className="w-5 h-5"/>} 
                        onClick={handleLogout} 
                        className="!bg-[var(--color-button-destructive-bg)] hover:!bg-[var(--color-button-destructive-hover-bg)] !text-[var(--color-button-destructive-text)]"
                    >
                        Logout
                    </Button_Icon>
                }
            />
        </SettingsLayout>
    )
}

