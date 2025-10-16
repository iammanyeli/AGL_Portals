import React from 'react';

// icon: WarningIcon
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

// icon: ViewIcon
const ViewIcon = (props) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

// primitive: Button_Warning
const Button_Warning = ({ children, ...props }) => (
    <button
        {...props}
        className="flex-shrink-0 bg-[var(--color-button-warning-bg)] text-[var(--color-button-warning-text)] font-bold py-2 px-3 rounded-lg hover:bg-[var(--color-button-warning-hover-bg)] transition-colors text-sm"
    >
        {children}
    </button>
);

// block: ListItem
const ListItem = ({ title, subtitle, detail, actionButton }) => (
    <div className="flex items-center justify-between gap-4 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
        <div>
            <p className="font-bold text-[var(--color-text-primary)]">{title}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
            {detail && <p className="text-xs text-[var(--color-warning)] font-semibold mt-1">{detail}</p>}
        </div>
        {actionButton}
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
        <div className="space-y-3 overflow-y-auto flex-grow pr-2">
            {children}
        </div>
    </div>
);

// view: ExpiringSoon
const ExpiringSoon = ({ expiringCerts, showActivityPage, showDetailedView, processedRecords }) => {
    const handleRenewClick = (certId) => {
        const recordToView = processedRecords.find(record => record.id === certId);
        if (recordToView) {
            showDetailedView(recordToView);
        }
    };

    return (
        <ListLayout 
            title="Expiring Soon"
            icon={<WarningIcon />}
            iconContainerClass="bg-[var(--color-icon-container-warning-bg)] text-[var(--color-icon-container-warning-text)]"
            action={(e) => { e.preventDefault(); showActivityPage('expiring'); }}
        >
            {expiringCerts && expiringCerts.length > 0 ? (
                expiringCerts.map((cert) => (
                    <ListItem 
                        key={cert.id}
                        title={cert.name}
                        subtitle={cert.certificate}
                        detail={`${cert.daysLeft} days left`}
                        actionButton={<Button_Warning onClick={() => handleRenewClick(cert.id)}>Renew</Button_Warning>}
                    />
                ))
            ) : (
                <EmptyStateBlock message="No expiring certificates." />
            )}
        </ListLayout>
    );
};

export default ExpiringSoon;

