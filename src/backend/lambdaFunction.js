
// This is a sample AWS Lambda function for processing and uploading CSV data to S3
// Note: This file is for reference only and would be deployed to AWS Lambda, not used in the frontend

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Configure these parameters in Lambda environment variables
const S3_BUCKET = process.env.S3_BUCKET || 'motor-data-bucket';
const DEFAULT_FILENAME = process.env.DEFAULT_FILENAME || 'motor-data';

exports.handler = async (event) => {
  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const csvData = body.csv_data;
    
    if (!csvData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'CSV data is required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // For CORS support
        },
      };
    }
    
    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${DEFAULT_FILENAME}-${timestamp}.csv`;
    
    // Upload the CSV data to S3
    const params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Body: csvData,
      ContentType: 'text/csv',
    };
    
    await s3.putObject(params).promise();
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data uploaded successfully',
        filename: filename,
        timestamp: new Date().toISOString(),
        recordCount: csvData.split('\n').length - 1, // Subtract 1 for header row
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // For CORS support
      },
    };
  } catch (error) {
    console.error('Error processing CSV data:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process data' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // For CORS support
      },
    };
  }
};
