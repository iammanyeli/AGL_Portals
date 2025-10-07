/**
 * @file Defines the canonical shape for a single, processed training record.
 * This model represents a training entry after its status (e.g., Valid, Expiring Soon) has been calculated.
 */

/**
 * Creates a Training Record object.
 * @param {object} recordData - The raw record data from an API or source.
 * @returns {object} A structured training record object.
 */
export const createRecordModel = (recordData) => ({
  /**
   * Unique identifier for the record.
   * @type {number | string}
   */
  id: recordData.id,

  /**
   * Information about the employee.
   * @type {{employeeNumber: string, firstName: string, surname: string, gender: string, jobTitle: string}}
   */
  employee: { ...recordData.employee },

  /**
   * The title of the training or certification.
   * @type {string}
   */
  trainingTitle: recordData.trainingTitle,

  /**
   * The entity that provided the training.
   * @type {string}
   */
  provider: recordData.provider,

  /**
   * Location where the training took place.
   * @type {{site: string, province: string}}
   */
  location: { ...recordData.location },

  /**
   * Status and date information for the training record.
   * Includes calculated fields like daysLeft and the validity status string.
   * @type {{dateOfTraining: string, dateOfExpiry: string, daysLeft: number, status: 'Valid' | 'Expiring Soon' | 'Expired'}}
   */
  status: { ...recordData.status },
});