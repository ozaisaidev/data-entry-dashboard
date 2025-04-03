
/**
 * Main backend entry point for export functionality
 */
const { uploadCSVToAPI } = require('./csvService');

/**
 * Process and upload records to the API
 * @param {Array} records - Records to process and upload
 * @returns {Promise} - Results of the API call
 */
async function processAndExportRecords(records) {
  try {
    // Validate records
    if (!records || records.length === 0) {
      throw new Error('No records to export');
    }
    
    // Upload to API and return result
    const result = await uploadCSVToAPI(records);
    return {
      success: true,
      message: 'Data exported successfully',
      result
    };
  } catch (error) {
    console.error('Export error:', error);
    return {
      success: false,
      message: `Export failed: ${error.message}`
    };
  }
}

module.exports = {
  processAndExportRecords
};
