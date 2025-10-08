import React from 'react';

/**
 * A generic placeholder component for the Maintenance feature.
 * @param {object} props - The component props.
 * @param {string} props.pageTitle - The title of the specific page being displayed.
 */
const PlaceholderView = ({ pageTitle }) => (
    <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Maintenance - {pageTitle}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">Page content for {pageTitle.toLowerCase()} will be displayed here.</p>
    </div>
);

export default PlaceholderView;