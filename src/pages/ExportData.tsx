
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

  const [dynamoDbTable, setDynamoDbTable] = useState('motors');
  const [dynamoDbRegion, setDynamoDbRegion] = useState('us-east-1');
  const [isAppendingDynamoDB, setIsAppendingDynamoDB] = useState(false);
  const [dynamoDbExporting, setDynamoDbExporting] = useState(false);

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

  // Function to handle DynamoDB export
  const handleDynamoDbExport = async () => {
    setDynamoDbExporting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const mode = isAppendingDynamoDB ? 'appended to' : 'replaced in';
      toast.success(`Data ${mode} DynamoDB`, {
        description: `${records.length} records successfully exported to table '${dynamoDbTable}' in region ${dynamoDbRegion}.`
      });
    } catch (error) {
      toast.error('DynamoDB export failed', {
        description: 'Please check your connection and AWS credentials.'
      });
    } finally {
      setDynamoDbExporting(false);
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
        
        {/* DynamoDB Card */}
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in" style={{animationDelay: "0.3s"}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-yellow-500 animate-pulse-slow" />
              Export to DynamoDB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Upload your motor data to AWS DynamoDB for cloud storage and analysis
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="dynamo-table">Table Name</Label>
                  <Input
                    id="dynamo-table"
                    placeholder="Table name"
                    value={dynamoDbTable}
                    onChange={(e) => setDynamoDbTable(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dynamo-region">AWS Region</Label>
                  <Select value={dynamoDbRegion} onValueChange={setDynamoDbRegion}>
                    <SelectTrigger id="dynamo-region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                      <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Switch 
                  id="dynamo-append" 
                  checked={isAppendingDynamoDB}
                  onCheckedChange={setIsAppendingDynamoDB}
                />
                <Label htmlFor="dynamo-append" className="cursor-pointer">
                  Append to existing data
                </Label>
              </div>

              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-105"
                onClick={handleDynamoDbExport}
                disabled={dynamoDbExporting}
              >
                {dynamoDbExporting ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : isAppendingDynamoDB ? (
                  <FilePlus className="mr-2 h-4 w-4 animate-bounce" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4 animate-bounce" />
                )}
                {dynamoDbExporting ? 'Exporting...' : isAppendingDynamoDB ? 'Append to DynamoDB' : 'Upload to DynamoDB'}
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
