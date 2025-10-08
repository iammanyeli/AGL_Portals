import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '/src/lib/hooks/useChartConfig.js';

const BarChart = ({ data, labels, title, dataKey, label, sectionId, onClick }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const baseOptions = useChartConfig({
        plugins: {
            legend: { display: false },
            title: { display: true, text: title }
        },
        onClick: (event, elements, chart) => {
            if (onClick && elements.length > 0) {
                const newKey = chart.data.labels[elements[0].index];
                onClick(newKey);
            }
        },
    });

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        const styles = getComputedStyle(document.documentElement);
        const chartColors = [
            styles.getPropertyValue('--color-info').trim(),
            styles.getPropertyValue('--color-success').trim(),
            styles.getPropertyValue('--color-warning').trim(),
            styles.getPropertyValue('--color-danger').trim(),
        ];

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: chartColors,
                    borderRadius: 4,
                }]
            },
            options: baseOptions
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, labels, title, dataKey, label, sectionId, baseOptions, onClick]);

    return (
        <div className="relative h-full w-full">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;