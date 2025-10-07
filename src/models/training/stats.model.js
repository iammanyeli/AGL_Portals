/**
 * @file Defines the shape for summary training statistics.
 * This model holds key numeric indicators displayed on the dashboard.
 */

/**
 * Creates a Training Stats object.
 * @param {object} statsData - The raw stats data.
 * @returns {object} A structured training stats object.
 */
export const createStatsModel = (statsData) => ({
  /**
   * The total number of training records.
   * @type {number}
   */
  total: statsData.total || 0,

  /**
   * The number of records with a 'Valid' status.
   * @type {number}
   */
  valid: statsData.valid || 0,

  /**
   * The number of records with an 'Expiring Soon' status.
   * @type {number}
   */
  expiringSoon: statsData.expiringSoon || 0,

  /**
   * The number of records with an 'Expired' status.
   * @type {number}
   */
  expired: statsData.expired || 0,
});