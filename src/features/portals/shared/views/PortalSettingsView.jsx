import React from 'react';
import PlaceholderView from './PlaceholderView';

/**
 * Placeholder view for a portal's settings page.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const PortalSettingsView = ({ section }) => <PlaceholderView section={section} pageTitle="Settings" />;

export default PortalSettingsView;
