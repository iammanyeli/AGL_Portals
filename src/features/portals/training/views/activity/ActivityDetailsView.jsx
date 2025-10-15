import React, { useState } from 'react';

import Header from './components/Header';
import TabButton from './components/TabButton';
import ExpiringSoonView from './components/ExpiringSoonView/ExpiringSoonView';
import RecentActivityView from './components/RecentActivityView/RecentActivityView';

const ActivityDetailsPage = ({ onBack, expiringCerts, activities, initialTab, showDetailedView, processedRecords }) => {
    const [activeView, setActiveView] = useState(initialTab || 'expiring');

    const ExpiringIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    );

    const ActivityIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    );

    return (
        <div>
            <Header title="Activity & Expiry Details" onBack={onBack} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- Left Navigation --- */}
                <aside className="lg:col-span-3">
                    <div className="bg-[var(--color-surface-subtle)]/50 p-4 rounded-2xl border border-[var(--color-border)]/80 space-y-3 sticky top-10 no-print">
                        <TabButton
                            label="Expiring & Expired"
                            icon={<ExpiringIcon />}
                            isActive={activeView === 'expiring'}
                            onClick={() => setActiveView('expiring')}
                        />
                        <TabButton
                            label="All Activity"
                            icon={<ActivityIcon />}
                            isActive={activeView === 'activity'}
                            onClick={() => setActiveView('activity')}
                        />
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <main className="lg:col-span-9">
                    {activeView === 'expiring' && <ExpiringSoonView data={expiringCerts} showDetailedView={showDetailedView} processedRecords={processedRecords} />}
                    {activeView === 'activity' && <RecentActivityView data={activities} />}
                </main>
            </div>
        </div>
    );
};

export default ActivityDetailsPage;
