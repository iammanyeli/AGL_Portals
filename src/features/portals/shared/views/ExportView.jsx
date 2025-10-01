import React from 'react';
import PlaceholderView from './PlaceholderView';

/**
 * Placeholder view for a portal's data export page.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const ExportView = ({ section }) => <PlaceholderView section={section} pageTitle="Export" />;

export default ExportView;
