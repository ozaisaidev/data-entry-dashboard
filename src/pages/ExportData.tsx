
import React from 'react';
import { useStore } from '@/lib/store';
import { FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ExportData: React.FC = () => {
  const records = useStore((state) => state.records);

  const handleExport = (format: string) => {
    // This would be replaced with actual export functionality
    toast.success(`Data exported as ${format}`, {
      description: `${records.length} records exported successfully.`
    });
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
      </div>

      <Card className="animate-fade-in" style={{animationDelay: "0.2s"}}>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You are about to export {records.length} records from the database.
          </p>
          <div className="bg-muted p-4 rounded-md transition-all duration-300 hover:shadow-inner">
            <pre className="text-xs overflow-auto max-h-60 animate-fade-in" style={{animationDelay: "0.4s"}}>
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
