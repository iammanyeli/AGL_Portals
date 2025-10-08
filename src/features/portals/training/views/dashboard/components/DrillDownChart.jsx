import React, { useState, useMemo, useCallback } from 'react';
import BarChart from '/src/components/charts/BarChart.jsx';

const DrillDownChart = ({ data, drillDownConfigFn }) => {
    const [drillDownKey, setDrillDownKey] = useState(null);

    // This callback is now passed down from the parent `DashboardView`
    // to keep this component purely presentational.
    const drillDown = useCallback((site) => {
        if (data && data.trainingBySiteBreakdown) {
            return data.trainingBySiteBreakdown[site] || {};
        }
        return {};
    }, [data]);
    
    const handleChartClick = (key) => {
        if (!drillDownKey) {
            setDrillDownKey(key);
        }
    }
    
    const { labels, dataset, title, subtitle } = useMemo(() => {
        if (drillDownKey) {
            const drillDownData = drillDown(drillDownKey);
            return {
                labels: Object.keys(drillDownData),
                dataset: {
                    label: 'Certificates',
                    data: Object.values(drillDownData)
                },
                title: `Topic Breakdown for ${drillDownKey}`,
                subtitle: null,
            };
        }
        return {
            labels: Object.keys(data.totalBySite),
            dataset: {
                label: 'Total Certificates',
                data: Object.values(data.totalBySite),
            },
            title: 'Total Certificates by Site',
            subtitle: '(Click a bar for details)',
        };
    }, [drillDownKey, data, drillDown]);

    return (
        <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
            <div className="relative flex justify-center items-center mb-4">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
                    {subtitle && <p className="text-sm italic text-[var(--color-text-secondary)]">{subtitle}</p>}
                </div>
                {drillDownKey && (
                    <button onClick={() => setDrillDownKey(null)} className="absolute right-0 no-print px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-[var(--color-info)] bg-[var(--color-icon-container-info-bg)] hover:opacity-80">&larr; Back to Overview</button>
                )}
            </div>
            <div className="relative flex-grow">
                <BarChart 
                    labels={labels}
                    data={dataset.data}
                    label={dataset.label}
                    onClick={!drillDownKey ? handleChartClick : undefined}
                />
            </div>
        </div>
    );
}

export default DrillDownChart;