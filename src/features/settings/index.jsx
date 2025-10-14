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

export default function SettingsPage({ defaultView, setDefaultView, setPage, handleLogout }) {
    const { theme, toggleTheme } = useTheme();

    return (
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
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[var(--color-text-primary)]">Theme</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">Switch between light and dark mode.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />
                            <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[var(--color-text-primary)]">Default View</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">Choose the default layout for the dashboard.</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <List className={`w-6 h-6 ${defaultView === 'list' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />
                            <Switch checked={defaultView === 'grid'} onChange={(isGrid) => setDefaultView(isGrid ? 'grid' : 'list')} />
                            <LayoutGrid className={`w-6 h-6 ${defaultView === 'grid' ? 'text-[var(--color-icon-toggle-active)]' : 'text-[var(--color-text-secondary)]'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[var(--color-text-primary)]">Profile</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">Manage your personal information.</p>
                        </div>
                        <Button className="flex items-center gap-2">
                            <User className="w-5 h-5"/>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[var(--color-text-primary)]">Account</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">Sign out of your current session.</p>
                        </div>
                        <Button onClick={handleLogout} className="flex items-center gap-2 !bg-[var(--color-button-destructive-bg)] hover:!bg-[var(--color-button-destructive-hover-bg)] !text-[var(--color-button-destructive-text)]">
                            <LogOut className="w-5 h-5"/>
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}