/**
 * @file Defines a generic and consistent structure for chart data.
 */

/**
 * Creates a Chart Data object.
 * @param {object} chartData - The data required to render a chart.
 * @param {'pie' | 'bar' | 'line' | 'doughnut' | 'radar' | 'area'} chartData.type - The type of chart.
 * @param {string} chartData.title - The title to be displayed for the chart.
 * @param {string[]} chartData.labels - An array of labels for the x-axis or chart segments.
 * @param {object[]} chartData.datasets - An array of dataset objects.
 * @param {string} chartData.datasets.label - The label for the dataset.
 * @param {number[]} chartData.datasets.data - The numerical data for the chart.
 * @returns {object} A structured chart data object.
 */
export const createChartModel = (chartData) => ({
  type: chartData.type,
  title: chartData.title,
  labels: chartData.labels || [],
  datasets: chartData.datasets || [{ label: '', data: [] }],
});