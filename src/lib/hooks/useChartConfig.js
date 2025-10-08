/**
 * @file A custom hook to provide shared configuration for Chart.js instances.
 * This centralizes options like responsiveness, aspect ratio, plugins, and styling,
 * dynamically sourcing colors from CSS variables to support theming.
 */
import { useMemo } from 'react';
import useTheme from '../../hooks/useTheme';

const useChartConfig = (options = {}) => {
    // Rerun this calculation when the theme changes to ensure colors are updated
    const { theme } = useTheme();

    const chartColors = useMemo(() => {
        // Guard against running in non-browser environments (e.g., SSR)
        if (typeof window === 'undefined') {
            return {};
        }
        const styles = getComputedStyle(document.documentElement);
        return {
            axisLine: styles.getPropertyValue('--chart-axis-line').trim(),
            gridLine: styles.getPropertyValue('--chart-grid-line').trim(),
            labelText: styles.getPropertyValue('--chart-label-text').trim(),
            tooltipBg: styles.getPropertyValue('--chart-tooltip-bg').trim(),
            tooltipText: styles.getPropertyValue('--chart-tooltip-text').trim(),
            tooltipBorder: styles.getPropertyValue('--chart-tooltip-border').trim(),
        };
    }, [theme]); // Dependency on theme ensures this recalculates on light/dark mode switch

    // useMemo prevents re-calculating the entire config on every render
    const baseConfig = useMemo(() => ({
        maintainAspectRatio: false,
        responsive: true,
        layout: {
            padding: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    color: chartColors.labelText,
                    boxWidth: 12,
                    padding: 20,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: chartColors.tooltipBg,
                titleColor: chartColors.tooltipText,
                bodyColor: chartColors.tooltipText,
                borderColor: chartColors.tooltipBorder,
                borderWidth: 1,
                padding: 10,
                bodyFont: {
                    size: 14,
                },
            },
            title: {
              display: false,
              text: '',
              color: chartColors.labelText,
              font: {
                size: 16,
                weight: '600'
              },
              padding: {
                bottom: 10
              }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: chartColors.labelText,
                },
                border: {
                  color: chartColors.axisLine
                }
            },
            y: {
                grid: {
                    color: chartColors.gridLine,
                    drawBorder: false,
                },
                ticks: {
                    color: chartColors.labelText,
                },
                 border: {
                  display: false
                }
            },
        },
        ...options,
    }), [chartColors, options]);

    return baseConfig;
};

export default useChartConfig;