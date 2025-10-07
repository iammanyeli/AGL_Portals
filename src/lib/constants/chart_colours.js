/**
 * @file Centralized color constants for all charts.
 * This ensures visual consistency and easy theme management.
 */

// General Palette
export const PRIMARY = '#4f46e5';
export const SECONDARY = '#8b5cf6';
export const ACCENT = '#f97316';
export const SUCCESS = '#22c55e';
export const WARNING = '#f59e0b';
export const DANGER = '#ef4444';

// Chart Specific Elements
export const AXIS_LINE = 'rgba(100, 116, 139, 0.6)';
export const GRID_LINE = 'rgba(203, 213, 225, 0.5)';
export const LABEL_TEXT = '#64748b';
export const TOOLTIP_BG = '#ffffff';
export const TOOLTIP_TEXT = '#334155';
export const TOOLTIP_BORDER = '#e2e8f0';

// Dataset Colors
export const DATASET_COLORS = {
    'portal-defects': [DANGER, SUCCESS],
    'portal-training': [PRIMARY, SECONDARY],
    'portal-maintenance': [ACCENT, WARNING],
    'portal-inspections': [SUCCESS, DANGER],
    'default': ['#3b82f6', '#10b981', '#f97316', '#ec4899', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1']
};

export const STATUS_COLORS = {
    'Valid': '#4ade80',
    'Expiring Soon': '#fbbf24',
    'Expired': '#f87171'
};
