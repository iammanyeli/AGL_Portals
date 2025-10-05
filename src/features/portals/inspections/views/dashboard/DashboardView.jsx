import React from 'react';
import PlaceholderView from '../../components/PlaceholderView';

/**
 * Placeholder view for a portal's main dashboard.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const DashboardView = ({ section }) => <PlaceholderView section={section} pageTitle="Dashboard" />;

export default DashboardView;
