import React from 'react';

// icon: ClockIcon
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

// icon: ViewIcon
const ViewIcon = (props) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

// primitive: Avatar_Initials
const Avatar_Initials = ({ initials, userName }) => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-control-surface-bg)] flex items-center justify-center font-bold text-[var(--color-text-secondary)]" title={userName || 'System'}>
        {initials || 'S'}
    </div>
);

// block: ListItem
const ListItem = ({ avatar, title, subtitle, timestamp }) => (
    <div className="flex items-start gap-4">
        {avatar}
        <div>
            <p className="text-[var(--color-text-secondary)] text-sm">
                <span className="font-bold text-[var(--color-text-primary)]">{title}</span> {subtitle}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1">{timestamp}</p>
        </div>
    </div>
);

// block: EmptyStateBlock
const EmptyStateBlock = ({ message }) => (
    <div className="flex items-center justify-center h-full">
        <p className="text-[var(--color-text-secondary)]">{message}</p>
    </div>
);

// layout: ListLayout
const ListLayout = ({ title, icon, iconContainerClass, action, children }) => (
    <div className="bg-[var(--color-surface-subtle)] rounded-2xl p-6 shadow-md flex flex-col h-[390px]">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-4">
                 <div className={`${iconContainerClass} p-3 rounded-xl`}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
            </div>
             <a href="#" onClick={action} className="text-[var(--color-text-secondary)] hover:text-[var(--color-info)] transition-colors" title="View all">
               <ViewIcon />
            </a>
        </div>
        <div className="space-y-4 overflow-y-auto flex-grow pr-2">
            {children}
        </div>
    </div>
);

// view: RecentActivity
const RecentActivity = ({ activities, showActivityPage }) => {
    return (
        <ListLayout
            title="Recent Activity"
            icon={<ClockIcon />}
            iconContainerClass="bg-[var(--color-icon-container-info-bg)] text-[var(--color-icon-container-info-text)]"
            action={(e) => { e.preventDefault(); showActivityPage('activity'); }}
        >
            {activities && activities.length > 0 ? (
                activities.slice(0, 5).map((activity) => (
                    <ListItem 
                        key={activity.id}
                        avatar={<Avatar_Initials initials={activity.user_initials} userName={activity.user_name} />}
                        title={activity.user_name || 'System'}
                        subtitle={activity.details}
                        timestamp={new Date(activity.timestamp).toLocaleString()}
                    />
                ))
            ) : (
                <EmptyStateBlock message="No recent activity." />
            )}
        </ListLayout>
    );
};

export default RecentActivity;

