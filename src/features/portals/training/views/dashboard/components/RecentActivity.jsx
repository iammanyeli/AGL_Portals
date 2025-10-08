const RecentActivity = ({ activities, showActivityPage }) => {
    return (
        <div className="bg-[var(--color-surface-subtle)] rounded-2xl p-6 shadow-md flex flex-col h-[390px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                     <div className="bg-[var(--color-icon-container-info-bg)] text-[var(--color-icon-container-info-text)] p-3 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Recent Activity</h3>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); showActivityPage('activity'); }} className="text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors" title="View all activity">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </a>
            </div>

            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
                {activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-control-surface-bg)] flex items-center justify-center font-bold text-[var(--color-text-secondary)]">{activity.user_initials || 'S'}</div>
                        <div>
                            <p className="text-[var(--color-text-secondary)] text-sm"><span className="font-bold text-[var(--color-text-primary)]">{activity.user_name || 'System'}</span> {activity.details}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;