/**
 * @file A custom hook to provide shared configuration for Chart.js instances.
 * This centralizes options like responsiveness, aspect ratio, plugins, and styling.
 */
import {
    AXIS_LINE,
    GRID_LINE,
    LABEL_TEXT,
    TOOLTIP_BG,
    TOOLTIP_BORDER,
    TOOLTIP_TEXT
} from '../constants/chart_colours';

const useChartConfig = (options = {}) => {
    const baseConfig = {
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
                display: false, // Default to false, can be overridden
                position: 'bottom',
                labels: {
                    color: LABEL_TEXT,
                    boxWidth: 12,
                    padding: 20,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: TOOLTIP_BG,
                titleColor: TOOLTIP_TEXT,
                bodyColor: TOOLTIP_TEXT,
                borderColor: TOOLTIP_BORDER,
                borderWidth: 1,
                padding: 10,
                bodyFont: {
                    size: 14,
                },
            },
            title: {
              display: false, // Default to false
              text: '',
              color: LABEL_TEXT,
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
                    color: LABEL_TEXT,
                },
                border: {
                  color: AXIS_LINE
                }
            },
            y: {
                grid: {
                    color: GRID_LINE,
                    drawBorder: false,
                },
                ticks: {
                    color: LABEL_TEXT,
                },
                 border: {
                  display: false
                }
            },
        },
        ...options,
    };

    return baseConfig;
};

export default useChartConfig;
