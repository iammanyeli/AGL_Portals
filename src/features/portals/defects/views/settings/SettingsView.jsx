import React from 'react';
import PlaceholderView from '../../components/PlaceholderView';

/**
 * Placeholder view for a portal's settings page.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const SettingsView = ({ section }) => <PlaceholderView section={section} pageTitle="Settings" />;

export default SettingsView;
