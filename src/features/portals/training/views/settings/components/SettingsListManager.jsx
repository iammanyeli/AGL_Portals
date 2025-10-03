import React, { useState } from 'react';

const SettingsListManager = ({ items, onAdd, onDelete, onUpdate, placeholder }) => {
    const [newItem, setNewItem] = useState('');
    const [editingItem, setEditingItem] = useState(null); // { originalValue: '...', currentValue: '...' }

    const handleAdd = () => { if(newItem.trim()) { onAdd(newItem); setNewItem(''); } };

    const handleStartEdit = (item) => {
        setEditingItem({ originalValue: item, currentValue: item });
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    const handleSaveEdit = () => {
        if (editingItem && editingItem.currentValue.trim() && editingItem.currentValue !== editingItem.originalValue) {
            onUpdate(editingItem.originalValue, editingItem.currentValue);
        }
        setEditingItem(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex gap-2 mb-4">
                <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder={placeholder} className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">Add</button>
            </div>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
                {(items || []).map(item => (
                    <li key={item} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                        {editingItem?.originalValue === item ? (
                            <input 
                                type="text"
                                value={editingItem.currentValue}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, currentValue: e.target.value }))}
                                className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mr-2"
                                autoFocus
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') handleCancelEdit(); }}
                            />
                        ) : (
                            <span className="text-gray-800">{item}</span>
                        )}
                        
                        {editingItem?.originalValue === item ? (
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800 font-semibold text-sm px-2">Save</button>
                                <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 font-semibold text-sm px-2">Cancel</button>
                            </div>
                        ) : (
                             <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => handleStartEdit(item)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-2">Edit</button>
                                <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-700 font-semibold text-sm px-2">Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SettingsListManager;