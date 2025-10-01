import React from 'react';

/**
 * A generic placeholder component to indicate that a page's content is forthcoming.
 * It displays the section title and a descriptive message.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 * @param {string} props.pageTitle - The title of the specific page being displayed.
 */
const PlaceholderView = ({ section, pageTitle }) => (
    <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-[#1B365F] dark:text-slate-100">{section.title} - {pageTitle}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Page content for {pageTitle.toLowerCase()} will be displayed here.</p>
    </div>
);

export default PlaceholderView;
