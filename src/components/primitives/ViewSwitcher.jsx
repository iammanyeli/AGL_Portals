import React from 'react';
import { List, LayoutGrid } from '../icons';

const ViewSwitcher = ({ view, setView }) => (
  <div className="px-2 sm:px-4 md:px-6 mb-6 flex justify-center">
    <div className="p-1 bg-[var(--color-control-surface-bg)] rounded-xl flex items-center space-x-1">
      <button
        onClick={() => setView('list')}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${view === 'list' ? 'bg-[var(--tab-active-bg)] shadow text-[var(--tab-active-text)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
      >
        <List className="h-4 w-4" />
        Detailed List
      </button>
      <button
        onClick={() => setView('grid')}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${view === 'grid' ? 'bg-[var(--tab-active-bg)] shadow text-[var(--tab-active-text)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
      >
        <LayoutGrid className="h-4 w-4" />
        Grid View
      </button>
    </div>
  </div>
);

export default ViewSwitcher;