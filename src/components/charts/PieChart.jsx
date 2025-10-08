import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';

const PieChart = ({ data, labels, title, sectionId, useStatusColors = false }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const baseOptions = useChartConfig({
        plugins: {
            legend: { display: true, position: 'bottom' },
            title: { display: true, text: title }
        }
    });

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        const styles = getComputedStyle(document.documentElement);
        let backgroundColors;

        if (useStatusColors) {
            const statusColorMap = {
                'Valid': styles.getPropertyValue('--color-success').trim(),
                'Expiring Soon': styles.getPropertyValue('--color-warning').trim(),
                'Expired': styles.getPropertyValue('--color-danger').trim()
            };
            backgroundColors = labels.map(label => statusColorMap[label] || '#cccccc');
        } else {
             backgroundColors = [
                styles.getPropertyValue('--color-info').trim(),
                styles.getPropertyValue('--color-success').trim(),
                styles.getPropertyValue('--color-warning').trim(),
                styles.getPropertyValue('--color-danger').trim(),
            ];
        }

        const config = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    hoverOffset: 4,
                }]
            },
            options: baseOptions
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);

        return () => {
            if(chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, labels, title, sectionId, baseOptions, useStatusColors]);

    return (
        <div className="relative h-full w-full">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PieChart;