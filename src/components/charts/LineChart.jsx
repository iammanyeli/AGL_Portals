import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';
import { DATASET_COLORS, PRIMARY } from '../../lib/constants/chart_colours';

const LineChart = ({ data, labels, title, dataKey, label, sectionId }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const baseOptions = useChartConfig({
        plugins: {
            legend: { display: false },
            title: { display: true, text: title }
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
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: mainColor,
                    tension: 0.4,
                    pointBackgroundColor: mainColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: mainColor,
                    pointRadius: 4,
                    pointHoverRadius: 6,
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

export default LineChart;
