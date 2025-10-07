import React, { useState, useMemo } from 'react';
import BarChart from '/src/components/charts/BarChart.jsx';

const DrillDownChart = ({ data, drillDownConfigFn }) => {
    const [drillDownKey, setDrillDownKey] = useState(null);

    const handleChartClick = (key) => {
        if (!drillDownKey) {
            setDrillDownKey(key);
        }
    }
    
    const { labels, dataset, title } = useMemo(() => {
        if (drillDownKey) {
            const drillDownData = drillDownConfigFn(drillDownKey);
            return {
                labels: Object.keys(drillDownData),
                dataset: {
                    label: 'Certificates',
                    data: Object.values(drillDownData)
                },
                title: `Topic Breakdown for ${drillDownKey}`
            };
        }
        return {
            labels: Object.keys(data.totalBySite),
            dataset: {
                label: 'Total Certificates',
                data: Object.values(data.totalBySite),
            },
            title: 'Total Certificates by Site (Click for details)',
        };
    }, [drillDownKey, data, drillDownConfigFn]);

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col" style={{height: '400px'}}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                {drillDownKey && (
                    <button onClick={() => setDrillDownKey(null)} className="no-print px-4 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">&larr; Back to Overview</button>
                )}
            </div>
            <div className="relative flex-grow">
                <BarChart 
                    labels={labels}
                    data={dataset.data}
                    title="" // Title is handled outside
                    label={dataset.label}
                    sectionId="portal-training"
                    onClick={!drillDownKey ? handleChartClick : undefined}
                />
            </div>
        </div>
    );
}

export default DrillDownChart;

