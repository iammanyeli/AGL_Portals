import React, { useState, useMemo } from 'react';
import ChartComponent from '../../../components/ui/ChartComponent.jsx';

const DrillDownChart = ({ chartRef, data, initialConfig, drillDownConfigFn }) => {
    const [drillDownKey, setDrillDownKey] = useState(null);

    const config = useMemo(() => {
        if (drillDownKey) {
            return drillDownConfigFn(drillDownKey);
        }
        const initial = initialConfig(data);
        initial.options.onClick = (e, els) => {
            if (els.length > 0) {
                const newKey = e.chart.data.labels[els[0].index];
                setDrillDownKey(newKey);
            }
        };
        return initial;
    }, [drillDownKey, data, initialConfig, drillDownConfigFn]);

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col" style={{height: '400px'}}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{config.options.plugins.title.text}</h3>
                {drillDownKey && (
                    <button onClick={() => setDrillDownKey(null)} className="no-print px-4 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">&larr; Back to Overview</button>
                )}
            </div>
            <div className="relative flex-grow">
                <ChartComponent chartRef={chartRef} config={config} />
            </div>
        </div>
    );
}

export default DrillDownChart;