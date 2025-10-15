import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    return (
        <div className="flex justify-center items-center space-x-2 mt-6 no-print">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] disabled:opacity-50 hover:bg-[var(--color-surface-hover)]"
            >
                Prev
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-md border ${
                        currentPage === page
                        ? 'bg-[var(--color-info)] text-[var(--color-button-info-text)] border-[var(--color-info)]'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                >
                    {page}
                </button>
            ))}
             <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] disabled:opacity-50 hover:bg-[var(--color-surface-hover)]"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
