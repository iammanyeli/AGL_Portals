import React from 'react';

// primitive: Button_Subtle
const Button_Subtle = (props) => (
    <button
        {...props}
        className={`px-3 py-1 rounded-md transition-colors ${props.className || ''}`}
    />
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    return (
        <div className="flex justify-center items-center space-x-2 mt-6 no-print">
            <Button_Subtle
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] disabled:opacity-50 hover:bg-[var(--color-surface-hover)]"
            >
                Prev
            </Button_Subtle>
            {pages.map(page => (
                <Button_Subtle
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`border ${
                        currentPage === page
                        ? 'bg-[var(--color-info)] text-[var(--color-button-info-text)] border-[var(--color-info)]'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                >
                    {page}
                </Button_Subtle>
            ))}
             <Button_Subtle
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] disabled:opacity-50 hover:bg-[var(--color-surface-hover)]"
            >
                Next
            </Button_Subtle>
        </div>
    );
};

export default Pagination;