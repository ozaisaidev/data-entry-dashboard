
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, FileAudio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MotorData } from '@/lib/types';

interface DataTableProps {
  records: MotorData[];
}

const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle>Recent Entries</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground animate-pulse-slow">
            <p>No records have been entered yet.</p>
            <p className="text-sm">Submit data using the form above to see it displayed here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Motor ID</TableHead>
                  <TableHead>Gear ID</TableHead>
                  <TableHead>Vehicle S/N</TableHead>
                  <TableHead>WIN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audio Files</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record, index) => {
                  const audioCount = Object.values(record.audioFiles).filter(Boolean).length;
                  
                  return (
                    <TableRow 
                      key={record.id} 
                      className="transition-all hover:bg-accent/10 hover:scale-[1.01] cursor-pointer"
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        animation: 'fade-in 0.5s ease-out forwards'
                      }}
                    >
                      <TableCell className="font-medium">{record.motorId}</TableCell>
                      <TableCell>{record.gearId}</TableCell>
                      <TableCell>{record.vehicleSerialNumber}</TableCell>
                      <TableCell>{record.winNumber}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={record.status === 'Good' ? 'default' : 'destructive'}
                          className="whitespace-nowrap animate-pulse-slow"
                        >
                          {record.status === 'Good' ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <X className="h-3 w-3 mr-1" />
                          )}
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileAudio className="h-3 w-3 mr-1" />
                          <span>{audioCount} file{audioCount !== 1 ? 's' : ''}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(record.timestamp)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
