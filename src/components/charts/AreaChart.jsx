import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import useChartConfig from '../../lib/hooks/useChartConfig';
import { DATASET_COLORS, ACCENT } from '../../lib/constants/chart_colours';

const AreaChart = ({ data, labels, title, dataKey, label, sectionId }) => {
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
        const mainColor = chartColors[0] || ACCENT;
        
        const ctx = chartRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, `${mainColor}80`);
        gradient.addColorStop(1, `${mainColor}00`);


        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    fill: true,
                    backgroundColor: gradient,
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
            if (chartInstanceRef.current) {
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

export default AreaChart;
