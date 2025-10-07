/**
 * @file Shared utility functions for charts.
 * This can include formatters for tooltips, labels, etc.
 */

// Example helper: A formatter for tooltips
export const valueFormatter = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
};
