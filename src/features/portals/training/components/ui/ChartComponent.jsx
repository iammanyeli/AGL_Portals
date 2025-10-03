import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const ChartComponent = ({ chartRef, config }) => {
    useEffect(() => {
        if (!chartRef.current) return;
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }
        const chartInstance = new Chart(chartRef.current, config);
        chartRef.current.chart = chartInstance;
        return () => {
            chartInstance.destroy();
        };
    }, [config, chartRef]);

    return <canvas ref={chartRef} />;
}

export default ChartComponent;