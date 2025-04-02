
import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { FileDown, Database, Cloud, RefreshCw, FileUp, FilePlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ExportData: React.FC = () => {
  const records = useStore((state) => state.records);
  const [oneDriveFileName, setOneDriveFileName] = useState('motor_data');
  const [oneDriveFileType, setOneDriveFileType] = useState('excel');
  const [isAppendingOneDrive, setIsAppendingOneDrive] = useState(false);
  const [oneDriveExporting, setOneDriveExporting] = useState(false);

  const [s3BucketName, setS3BucketName] = useState('motor-data');
  const [s3FileName, setS3FileName] = useState('motor_data');
  const [isAppendingS3, setIsAppendingS3] = useState(false);
  const [s3Exporting, setS3Exporting] = useState(false);

  // Function to handle standard export formats (Excel/CSV)
  const handleExport = (format: string) => {
    // This would be replaced with actual export functionality
    toast.success(`Data exported as ${format}`, {
      description: `${records.length} records exported successfully.`
    });
  };

  // Function to handle OneDrive export
  const handleOneDriveExport = async () => {
    setOneDriveExporting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mode = isAppendingOneDrive ? 'appended to' : 'uploaded as new';
      toast.success(`Data ${mode} file on OneDrive`, {
        description: `${oneDriveFileName}.${oneDriveFileType === 'excel' ? 'xlsx' : 'csv'} has been successfully exported with ${records.length} records.`
      });
    } catch (error) {
      toast.error('OneDrive export failed', {
        description: 'Please check your connection and try again.'
      });
    } finally {
      setOneDriveExporting(false);
    }
  };

  // Function to convert data to CSV and then to base64
  const convertToBase64CSV = (data: any[]) => {
    // Create CSV header from object keys
    const headers = Object.keys(data[0] || {}).join(',');
    
    // Create CSV rows from values
    const rows = data.map(item => 
      Object.values(item).map(value => 
        // Handle strings with commas by wrapping in quotes
        typeof value === 'string' && value.includes(',') 
          ? `"${value}"`
          : String(value)
      ).join(',')
    );
    
    // Combine header and rows
    const csvContent = [headers, ...rows].join('\n');
    
    // Convert to base64
    return btoa(csvContent);
  };

  // Function to handle S3/Lambda export
  const handleS3Export = async () => {
    setS3Exporting(true);
    
    try {
      // Convert data to base64-encoded CSV
      const csv_base64 = convertToBase64CSV(records);
      
      // Prepare payload for Lambda
      const payload = {
        csv_base64,
        bucket_name: s3BucketName,
        file_name: `${s3FileName}.csv`,
        append: isAppendingS3
      };
      
      // This would be replaced with actual API call to Lambda
      // For now we'll simulate with a delay
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const mode = isAppendingS3 ? 'appended to' : 'uploaded as new';
      toast.success(`Data ${mode} file in S3`, {
        description: `${records.length} records successfully exported to '${s3FileName}.csv' in bucket '${s3BucketName}'.`
      });
      
      // Uncomment below for actual implementation
      /* 
      const response = await fetch('https://your-lambda-api-endpoint.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      toast.success(`Data ${mode} file in S3`, {
        description: result.message || `${records.length} records successfully exported.`
      });
      */
      
    } catch (error) {
      toast.error('S3 export failed', {
        description: 'Please check your connection and AWS credentials.'
      });
      console.error('S3 export error:', error);
    } finally {
      setS3Exporting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <FileDown className="h-6 w-6 text-industrial-teal animate-pulse-slow" />
        <h1 className="text-2xl font-bold">Export Data</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Export to Excel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Export all motor data to Microsoft Excel format (.xlsx)
            </p>
            <Button 
              className="w-full bg-industrial-teal hover:bg-industrial-teal/90 transition-transform duration-200 hover:scale-105"
              onClick={() => handleExport('Excel')}
            >
              <FileDown className="mr-2 h-4 w-4 animate-bounce" />
              Download Excel File
            </Button>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animationDelay: "0.1s"}}>
          <CardHeader>
            <CardTitle>Export to CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Export all motor data to CSV format for compatibility with various applications
            </p>
            <Button 
              variant="outline"
              className="w-full transition-transform duration-200 hover:scale-105"
              onClick={() => handleExport('CSV')}
            >
              <FileDown className="mr-2 h-4 w-4 animate-bounce" style={{animationDelay: "0.3s"}} />
              Download CSV File
            </Button>
          </CardContent>
        </Card>
        
        {/* OneDrive Card */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in" style={{animationDelay: "0.2s"}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cloud className="mr-2 h-5 w-5 text-blue-500 animate-pulse-slow" />
              Export to OneDrive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Upload your motor data directly to Microsoft OneDrive
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="onedrive-filename">File Name</Label>
                  <Input
                    id="onedrive-filename"
                    placeholder="Enter file name"
                    value={oneDriveFileName}
                    onChange={(e) => setOneDriveFileName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="onedrive-filetype">File Type</Label>
                  <Select value={oneDriveFileType} onValueChange={setOneDriveFileType}>
                    <SelectTrigger id="onedrive-filetype">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Switch 
                  id="onedrive-append" 
                  checked={isAppendingOneDrive}
                  onCheckedChange={setIsAppendingOneDrive}
                />
                <Label htmlFor="onedrive-append" className="cursor-pointer">
                  Append to existing file
                </Label>
              </div>

              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
                onClick={handleOneDriveExport}
                disabled={oneDriveExporting}
              >
                {oneDriveExporting ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : isAppendingOneDrive ? (
                  <FilePlus className="mr-2 h-4 w-4 animate-bounce" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4 animate-bounce" />
                )}
                {oneDriveExporting ? 'Exporting...' : isAppendingOneDrive ? 'Append to OneDrive' : 'Upload to OneDrive'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* S3/Lambda Card (replacing DynamoDB) */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in" style={{animationDelay: "0.3s"}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-green-500 animate-pulse-slow" />
              Export to S3 via Lambda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Upload your motor data to AWS S3 via Lambda function
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="s3-bucket">Bucket Name</Label>
                  <Input
                    id="s3-bucket"
                    placeholder="S3 bucket name"
                    value={s3BucketName}
                    onChange={(e) => setS3BucketName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="s3-filename">File Name</Label>
                  <Input
                    id="s3-filename"
                    placeholder="File name"
                    value={s3FileName}
                    onChange={(e) => setS3FileName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Switch 
                  id="s3-append" 
                  checked={isAppendingS3}
                  onCheckedChange={setIsAppendingS3}
                />
                <Label htmlFor="s3-append" className="cursor-pointer">
                  Append to existing file
                </Label>
              </div>

              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-105"
                onClick={handleS3Export}
                disabled={s3Exporting}
              >
                {s3Exporting ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : isAppendingS3 ? (
                  <FilePlus className="mr-2 h-4 w-4 animate-bounce" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4 animate-bounce" />
                )}
                {s3Exporting ? 'Exporting...' : isAppendingS3 ? 'Append to S3' : 'Upload to S3'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{animationDelay: "0.4s"}}>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You are about to export {records.length} records from the database.
          </p>
          <div className="bg-muted p-4 rounded-md transition-all duration-300 hover:shadow-inner">
            <pre className="text-xs overflow-auto max-h-60 animate-fade-in" style={{animationDelay: "0.5s"}}>
              {JSON.stringify(records.slice(0, 3), null, 2)}
              {records.length > 3 && '\n... and more records'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
