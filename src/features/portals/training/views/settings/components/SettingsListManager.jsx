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
        <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-[var(--shadow-card)]">
            <div className="flex gap-2 mb-4">
                <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder={placeholder} className="flex-grow block w-full rounded-md border-[var(--color-border)] shadow-sm focus:border-[var(--color-info)] focus:ring-[var(--color-info)] sm:text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)]" />
                <button onClick={handleAdd} className="px-4 py-2 bg-[var(--color-button-info-bg)] text-[var(--color-button-info-text)] font-semibold rounded-lg shadow-md hover:bg-[var(--color-button-info-hover-bg)] transition">Add</button>
            </div>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
                {(items || []).map(item => (
                    <li key={item} className="flex justify-between items-center bg-[var(--color-surface-contrast)] p-2 rounded-md">
                        {editingItem?.originalValue === item ? (
                            <input 
                                type="text"
                                value={editingItem.currentValue}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, currentValue: e.target.value }))}
                                className="flex-grow block w-full rounded-md border-[var(--color-border)] shadow-sm focus:border-[var(--color-info)] focus:ring-[var(--color-info)] sm:text-sm mr-2 bg-[var(--color-input-bg)] text-[var(--color-text-primary)]"
                                autoFocus
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') handleCancelEdit(); }}
                            />
                        ) : (
                            <span className="text-[var(--color-text-primary)]">{item}</span>
                        )}
                        
                        {editingItem?.originalValue === item ? (
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={handleSaveEdit} className="text-[var(--color-success)] hover:opacity-80 font-semibold text-sm px-2">Save</button>
                                <button onClick={handleCancelEdit} className="text-[var(--color-text-secondary)] hover:opacity-80 font-semibold text-sm px-2">Cancel</button>
                            </div>
                        ) : (
                             <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => handleStartEdit(item)} className="text-[var(--color-info)] hover:opacity-80 font-semibold text-sm px-2">Edit</button>
                                <button onClick={() => onDelete(item)} className="text-[var(--color-danger)] hover:opacity-80 font-semibold text-sm px-2">Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SettingsListManager;