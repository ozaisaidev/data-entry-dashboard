
// This file serves as a proxy between the frontend and the AWS Lambda function
// It converts the data to CSV format and sends it to the API Gateway

/**
 * Handler function to process motor data and upload to S3
 * @param {Object} event - The event object containing motor data
 * @returns {Object} - Response from the Lambda function
 */
exports.handler = async (event) => {
  try {
    // Parse the request body
    const { csv_data } = JSON.parse(event.body || '{}');
    
    // If there's no CSV data, return an error
    if (!csv_data) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing CSV data' })
      };
    }

    // Convert CSV data to base64 for transmission
    const csv_base64 = Buffer.from(csv_data).toString('base64');
    
    // Prepare payload for AWS Lambda
    const payload = { csv_base64 };
    
    // API Gateway URL would be set in environment variables in production
    // This is a placeholder URL
    const API_URL = process.env.API_GATEWAY_URL || 'https://your-api-gateway-endpoint.amazonaws.com/dev/upload';

    // Call the Lambda function through API Gateway
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Get the response data
    const data = await response.json();

    // Return the response from the Lambda function
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error processing data:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
