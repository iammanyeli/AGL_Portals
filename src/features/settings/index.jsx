import React from 'react';
import { motion } from "framer-motion";

// UI Components
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Switch from '../../components/ui/Switch';

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
                <CardHeader className="flex items-center justify-between gap-4 bg-white dark:bg-white/5">
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
                <CardContent className="divide-y divide-slate-200 dark:divide-white/10 p-0">
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Theme</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-[#EED58E]' : 'text-slate-400'}`} />
                            <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-300' : 'text-slate-400'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Default View</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Choose the default layout for the dashboard.</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <List className={`w-6 h-6 ${defaultView === 'list' ? 'text-[#1B365F] dark:text-[#EED58E]' : 'text-slate-400'}`} />
                            <Switch checked={defaultView === 'grid'} onChange={(isGrid) => setDefaultView(isGrid ? 'grid' : 'list')} />
                            <LayoutGrid className={`w-6 h-6 ${defaultView === 'grid' ? 'text-[#1B365F] dark:text-[#EED58E]' : 'text-slate-400'}`} />
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Profile</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information.</p>
                        </div>
                        <Button className="flex items-center gap-2">
                            <User className="w-5 h-5"/>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                         <div>
                            <h4 className="font-semibold text-[#1B365F] dark:text-slate-200">Account</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sign out of your current session.</p>
                        </div>
                        <Button onClick={handleLogout} className="flex items-center gap-2 !bg-red-500/10 hover:!bg-red-500/20 !text-red-500 dark:!bg-red-500/10 dark:hover:!bg-red-500/20 dark:!text-red-400">
                            <LogOut className="w-5 h-5"/>
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
