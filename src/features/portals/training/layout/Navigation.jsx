const Navigation = ({ currentPage, setCurrentPage, setSettingsView }) => (
    <div className="flex justify-center md:justify-start flex-wrap gap-2 sm:gap-4 mb-8 no-print">
        {[ {label: 'Dashboard', page: 'dashboard', icon: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>},
            {label: 'Records', page: 'records', icon: <><path d="M4 19.5a2.5 2.5 0 0 1-2.5-2.5v-10A2.5 2.5 0 0 1 4 5H7l2-2h6l2 2h3a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5z"/><path d="M10 11.5a1.5 1.5 0 0 1-3 0V11"/><path d="M14 11.5a1.5 1.5 0 0 1-3 0V11"/><path d="M18 11.5a1.5 1.5 0 0 1-3 0V11"/><line x1="12" x2="12" y1="17" y2="11.5"/></>},
            {label: 'Activity', page: 'activityDetails', icon: <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>},
            {label: 'Import / Export', page: 'import', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>},
            {label: 'Settings', page: 'settings', icon: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>}
        ].map(item => (
                <button key={item.page} onClick={() => {
                    if (item.page === 'settings') setSettingsView('main');
                    setCurrentPage(item.page);
                }} className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${currentPage === item.page ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">{item.icon}</svg>
                <span className="hidden sm:inline-flex">{item.label}</span>
            </button>
        ))}
    </div>
);
