import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';
import { DATASET_COLORS, PRIMARY } from '../../lib/constants/chart_colours';

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
                    color: '#e2e8f0'
                },
                grid: {
                    color: '#e2e8f0'
                },
                pointLabels: {
                    color: '#64748b',
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
        
        const chartColors = DATASET_COLORS[sectionId] || DATASET_COLORS.default;
        const mainColor = chartColors[0] || PRIMARY;

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
