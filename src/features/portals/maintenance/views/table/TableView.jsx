import React from 'react';
import PlaceholderView from '../../components/PlaceholderView';

/**
 * Placeholder view for a portal's table/data view.
 * @param {object} props - The component props.
 * @param {object} props.section - The portal section data object.
 */
const TableView = ({ section }) => <PlaceholderView section={section} pageTitle="Table View" />;

export default TableView;
