const DeleteModal = ({ onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 h-full w-full z-50 flex justify-center items-center">
        <div className="p-8 w-11/12 md:w-1/3 shadow-lg rounded-xl bg-white text-center transform transition-all">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
                <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition duration-300 font-semibold">Cancel</button>
                <button onClick={onConfirm} className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition duration-300">Delete</button>
            </div>
        </div>
    </div>
);
