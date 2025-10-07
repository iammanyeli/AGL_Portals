/**
 * @file Defines the main aggregate model for the Training Portal dashboard.
 * This model combines stats, charts, and widget data into a single, comprehensive object.
 */

import { createRecordModel } from './record.model';
import { createStatsModel } from './stats.model';
import { createChartModel } from './chart.model';

/**
 * Creates the main Dashboard data model object.
 * @param {object} dashboardData - The aggregated data for the dashboard.
 * @returns {object} A structured dashboard data object.
 */
export const createDashboardModel = (dashboardData) => ({
  /**
   * Summary statistics for the dashboard cards.
   * @type {object}
   */
  stats: createStatsModel(dashboardData.stats || {}),

  /**
   * An array of chart data objects for the dashboard.
   * @type {object[]}
   */
  charts: (dashboardData.charts || []).map(createChartModel),

  /**
   * A list of training records that are expiring soon or have expired.
   * @type {object[]}
   */
  expiringSoon: (dashboardData.expiringSoon || []).map(createRecordModel),

  /**
   * A list of recent activities related to the training portal.
   * @type {object[]}
   */
  recentActivity: dashboardData.recentActivity || [],

  /**
    * Data for the drill-down chart, kept in a more flexible format.
    * @type {object}
    */
  drillDownData: dashboardData.drillDownData || {},
});