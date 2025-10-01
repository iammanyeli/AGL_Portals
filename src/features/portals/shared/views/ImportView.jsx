import React from 'react';
import PlaceholderView from './PlaceholderView';

/**
 * Placeholder view for a portal's data import page.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const ImportView = ({ section }) => <PlaceholderView section={section} pageTitle="Import" />;

export default ImportView;
