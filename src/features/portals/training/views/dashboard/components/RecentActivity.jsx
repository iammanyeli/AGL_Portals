const RecentActivity = ({ activities, showActivityPage }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-md flex flex-col" style={{height: '390px'}}>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                    </div>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); showActivityPage('activity'); }} className="text-gray-400 hover:text-blue-600 transition-colors" title="View all activity">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </a>
            </div>

            <div className="space-y-4 overflow-y-auto flex-grow subtle-scrollbar pr-2">
                {activities.length > 0 ? activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                            {activity.user_initials || 'S'}
                        </div>
                        <div className="flex-grow">
                            <p className="text-gray-700 text-sm">
                                <span className="font-bold">{activity.user_name || 'System'}</span> {activity.details}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(activity.timestamp).toLocaleString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                )) : (
                     <div className="flex justify-center items-center h-full">
                        <p className="text-center text-gray-500 text-sm">No recent activities to show.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;

