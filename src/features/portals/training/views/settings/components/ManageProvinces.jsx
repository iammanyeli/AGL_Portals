import React, { useState, useMemo, useRef } from 'react';

// Production Imports from existing repo
import { Card, CardContent } from '/src/components/primitives/Card.jsx';
import Button from '/src/components/primitives/Button.jsx';
import InputField from '/src/features/portals/training/components/ui/InputField.jsx';
import ConfirmationModal from '/src/features/portals/training/components/modals/ConfirmationModal.jsx';
import { Trash } from '/src/components/icons';
// New UI enhancement: Importing the dedicated search input component.
import SearchInputField from './SearchInputField.jsx';

// New UI enhancement: Icon helper components (kept for edit/save/cancel actions)
const Icon = ({ path, className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
);
const EditIcon = () => <Icon path="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />;
const SaveIcon = () => <Icon path="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />;
const CancelIcon = () => <Icon path="M6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586 6.707 5.293z" />;

// New UI enhancement: Snackbar for non-blocking feedback
const Snackbar = ({ message, onUndo, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[var(--color-text-primary)] text-[var(--color-text-inverted)] px-6 py-3 rounded-lg shadow-xl flex items-center gap-4 animate-slide-up z-50">
            <span>{message}</span>
            {onUndo && <button onClick={onUndo} className="font-bold uppercase text-sm tracking-wider text-[var(--color-accent)]">Undo</button>}
        </div>
    );
};


const ManageProvinces = ({ items, onAdd, onDelete, onUpdate, placeholder }) => {
    // --- All existing production logic is preserved ---
    const [newItem, setNewItem] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ isVisible: false, message: '' });
    const deleteTimeoutRef = useRef(null);
    
    const filteredItems = useMemo(() => items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())), [items, searchTerm]);

    const handleAdd = () => {
        if (newItem.trim()) {
            onAdd(newItem);
            setNewItem('');
            setSnackbar({ isVisible: true, message: `Added "${newItem}"` });
            setTimeout(() => setSnackbar({ isVisible: false, message: '' }), 3000);
        }
    };

    const handleStartEdit = (item) => setEditingItem({ originalValue: item, currentValue: item });
    const handleCancelEdit = () => setEditingItem(null);
    const handleSaveEdit = () => {
        if (editingItem && editingItem.currentValue.trim() && editingItem.currentValue !== editingItem.originalValue) {
            onUpdate(editingItem.originalValue, editingItem.currentValue);
        }
        setEditingItem(null);
    };

    const handleDeleteRequest = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!itemToDelete) return;
        setIsModalOpen(false);
        setSnackbar({ isVisible: true, message: `Deleted "${itemToDelete}"`, onUndo: handleUndoDelete });
        deleteTimeoutRef.current = setTimeout(() => {
            onDelete(itemToDelete);
            setItemToDelete(null);
            clearTimeout(deleteTimeoutRef.current);
        }, 5000); 
        setTimeout(() => setSnackbar({ isVisible: false, message: '' }), 4800);
    };

    const handleUndoDelete = () => {
        clearTimeout(deleteTimeoutRef.current);
        setSnackbar({ isVisible: false, message: '' });
        setItemToDelete(null);
    };

    return (
        <>
            {isModalOpen && <ConfirmationModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Deletion" message={`Are you sure you want to delete "${itemToDelete}"? This action cannot be undone.`} />}
            
            <Snackbar isVisible={snackbar.isVisible} message={snackbar.message} onUndo={itemToDelete ? handleUndoDelete : null} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6 rounded-2xl animate-fade-in">
                    <CardContent className="p-0">
                        <SearchInputField placeholder="Search provinces..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 mt-4">
                            {filteredItems.map(item => (
                                <li key={item} className="group flex justify-between items-center bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] p-3 rounded-lg transition-all duration-200">
                                    {editingItem?.originalValue === item ? (
                                        <InputField type="text" value={editingItem.currentValue} onChange={(e) => setEditingItem(p => ({ ...p, currentValue: e.target.value }))} className="!p-0 !border-0 !bg-transparent !ring-0 !shadow-none" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') handleCancelEdit(); }} />
                                    ) : ( <span className="text-[var(--color-text-primary)] font-medium">{item}</span> )}
                                    <div className="flex gap-1 flex-shrink-0 transition-opacity duration-200 lg:opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                                        {editingItem?.originalValue === item ? (
                                            <>
                                                <button onClick={handleSaveEdit} className="h-8 w-8 flex items-center justify-center rounded-full text-[var(--color-success)] hover:bg-[var(--color-surface-contrast)]"><SaveIcon /></button>
                                                <button onClick={handleCancelEdit} className="h-8 w-8 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-contrast)]"><CancelIcon /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleStartEdit(item)} className="h-8 w-8 flex items-center justify-center rounded-full text-[var(--color-info)] hover:bg-[var(--color-surface-contrast)]"><EditIcon /></button>
                                                <button onClick={() => handleDeleteRequest(item)} className="h-8 w-8 flex items-center justify-center rounded-full text-[var(--color-danger)] hover:bg-[var(--color-surface-destructive)]"><Trash /></button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="p-6 rounded-2xl animate-fade-in h-fit">
                    <CardContent className="p-0">
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Add New Province</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} className="flex flex-col gap-3">
                            <InputField value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder={placeholder} />
                            <Button type="submit">Add Province</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ManageProvinces;

