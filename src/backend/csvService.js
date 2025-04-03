
/**
 * Service to handle CSV formatting and API communication
 */

/**
 * Converts an array of objects to CSV string format
 * @param {Array} data - Array of objects to convert
 * @returns {String} - Formatted CSV string
 */
function convertToCSV(data) {
  if (data.length === 0) return '';
  
  // Extract headers from first object
  const headers = Object.keys(data[0]).join(',');
  
  // Convert each object to CSV row
  const rows = data.map(item => 
    Object.values(item).map(value => 
      // Handle strings with commas by wrapping in quotes
      typeof value === 'string' && value.includes(',') 
        ? `"${value}"`
        : String(value)
    ).join(',')
  );
  
  // Combine headers and rows
  return [headers, ...rows].join('\n');
}

/**
 * Uploads CSV data to the remote API endpoint
 * @param {Array} records - Array of data records to convert and upload
 * @returns {Promise} - API response promise
 */
async function uploadCSVToAPI(records) {
  // Convert records to CSV format
  const csvData = convertToCSV(records);
  
  // API endpoint from environment variable or default
  const API_ENDPOINT = process.env.VITE_LAMBDA_API_ENDPOINT || '/api/upload';
  
  // Create payload for API
  const payload = {
    csv_data: csvData
  };
  
  // Call the API
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  // Handle response
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

module.exports = {
  convertToCSV,
  uploadCSVToAPI
};
