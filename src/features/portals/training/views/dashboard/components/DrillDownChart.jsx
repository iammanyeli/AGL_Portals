import React, { useState, useMemo, useCallback } from 'react';
import BarChart from '../../../../../../components/charts/BarChart.jsx';

// --- PRIMITIVES ---

// primitive: Header_Subtitle
const Header_Subtitle = ({ header, subtitle }) => (
    <div className="text-center">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{header}</h3>
        {subtitle && <p className="text-sm italic text-[var(--color-text-secondary)]">{subtitle}</p>}
    </div>
);

// primitive: Button
const Button = (props) => (
    <button
        {...props}
        className="absolute right-0 no-print px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-[var(--color-info)] bg-[var(--color-icon-container-info-bg)] hover:opacity-80"
    />
);


// --- LAYOUTS ---

// layout: CardLayout
const CardLayout = ({ children }) => (
    <div className="bg-[var(--color-surface-subtle)] p-6 rounded-2xl shadow-md flex flex-col h-[400px]">
        {children}
    </div>
);


// --- BLOCKS ---

// block: OverviewChart
const OverviewChart = ({ chartData, header, subtitle, onChartClick }) => (
    <CardLayout>
        <div className="relative flex justify-center items-center mb-4">
            <Header_Subtitle header={header} subtitle={subtitle} />
        </div>
        <div className="relative flex-grow">
            <BarChart
                labels={chartData.labels}
                data={chartData.dataset.data}
                label={chartData.dataset.label}
                onClick={onChartClick}
            />
        </div>
    </CardLayout>
);

// block: DetailChart
const DetailChart = ({ chartData, header, onBack }) => (
    <CardLayout>
        <div className="relative flex justify-center items-center mb-4">
            <Header_Subtitle header={header} />
            <Button onClick={onBack}>&larr; Back to Overview</Button>
        </div>
        <div className="relative flex-grow">
            <BarChart
                labels={chartData.labels}
                data={chartData.dataset.data}
                label={chartData.dataset.label}
            />
        </div>
    </CardLayout>
);


// --- WRAPPER VIEW ---

// block: DrillDownChart
const DrillDownChart = ({ data }) => {
    const [selectedKey, setSelectedKey] = useState(null);

    const getSelectedKeyData = useCallback((key) => {
        if (data && data.trainingBySiteBreakdown && data.trainingBySiteBreakdown[key]) {
            return data.trainingBySiteBreakdown[key];
        }
        return {};
    }, [data]);

    const handleChartClick = (key) => {
        setSelectedKey(key);
    };

    const overviewChartData = useMemo(() => ({
        labels: Object.keys(data.totalBySite),
        dataset: {
            label: 'Total Certificates',
            data: Object.values(data.totalBySite),
        },
    }), [data.totalBySite]);
    
    const detailChartData = useMemo(() => {
        if (!selectedKey) return null;
        const detailedData = getSelectedKeyData(selectedKey);
        return {
            labels: Object.keys(detailedData),
            dataset: {
                label: 'Certificates',
                data: Object.values(detailedData),
            },
        };
    }, [selectedKey, getSelectedKeyData]);

    if (selectedKey && detailChartData) {
        return (
            <DetailChart
                chartData={detailChartData}
                header={`Topic Breakdown for ${selectedKey}`}
                onBack={() => setSelectedKey(null)}
            />
        );
    }

    return (
        <OverviewChart
            chartData={overviewChartData}
            header="Total Certificates by Site"
            subtitle="(Click a bar for details)"
            onChartClick={handleChartClick}
        />
    );
};

export default DrillDownChart;

