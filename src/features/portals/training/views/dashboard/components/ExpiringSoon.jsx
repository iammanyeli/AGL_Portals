const ExpiringSoon = ({ expiringCerts, showActivityPage, showDetailedView, processedRecords }) => {
    const handleRenewClick = (certId) => {
        const recordToView = processedRecords.find(record => record.id === certId);
        if (recordToView) {
            showDetailedView(recordToView);
        }
    };

    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-md flex flex-col" style={{height: '390px'}}>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Expiring Soon</h3>
                    </div>
                </div>
                 <a href="#" onClick={(e) => { e.preventDefault(); showActivityPage('expiring'); }} className="text-gray-400 hover:text-orange-600 transition-colors" title="View all expiring certificates">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </a>
            </div>

            <div className="space-y-3 overflow-y-auto flex-grow subtle-scrollbar pr-2">
                {expiringCerts.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg">
                        <div className="flex-grow">
                            <p className="font-bold text-gray-800">{cert.name}</p>
                            <p className="text-sm text-gray-600">{cert.certificate}</p>
                            <p className="text-xs text-orange-500 font-semibold mt-1">{cert.daysLeft} days left</p>
                        </div>
                        <button onClick={() => handleRenewClick(cert.id)} className="flex-shrink-0 bg-orange-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors text-sm">
                            Renew
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpiringSoon;