import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';

const RadarChart = ({ data, labels, title, dataKey, label, sectionId }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    
    const baseOptions = useChartConfig({
        plugins: {
            legend: { display: false },
            title: { display: true, text: title },
        },
        scales: {
            r: {
                angleLines: {
                    color: 'var(--chart-grid-line)'
                },
                grid: {
                    color: 'var(--chart-grid-line)'
                },
                pointLabels: {
                    color: 'var(--chart-label-text)',
                    font: {
                        size: 12
                    }
                },
                ticks: {
                    display: false
                }
            }
        }
    });

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        const styles = getComputedStyle(document.documentElement);
        const mainColor = styles.getPropertyValue('--color-info').trim() || '#3b82f6';

        const config = {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: `${mainColor}33`,
                    borderColor: mainColor,
                    borderWidth: 2,
                    pointBackgroundColor: mainColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: mainColor
                }]
            },
            options: baseOptions,
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);

        return () => {
            if(chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, labels, title, dataKey, label, sectionId, baseOptions]);

    return (
        <div className="relative h-full w-full">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default RadarChart;