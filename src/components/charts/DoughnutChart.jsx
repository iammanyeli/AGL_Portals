import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';
import { DATASET_COLORS, STATUS_COLORS } from '../../lib/constants/chart_colours';

const DoughnutChart = ({ data, labels, title, sectionId, useStatusColors = false }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const baseOptions = useChartConfig({
        plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: title }
        },
        cutout: '70%'
    });

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        let backgroundColors;

        if (useStatusColors) {
            backgroundColors = labels.map(label => STATUS_COLORS[label] || '#cccccc');
        } else {
            backgroundColors = DATASET_COLORS[sectionId] || DATASET_COLORS.default;
        }

        const config = {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    hoverOffset: 4,
                    borderWidth: 0,
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

export default DoughnutChart;
