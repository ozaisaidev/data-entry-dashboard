
import React from 'react';
import { useStore } from '@/lib/store';
import { Database } from 'lucide-react';
import DataEntryForm from '@/components/DataEntryForm';
import DataTable from '@/components/DataTable';
import { Card } from '@/components/ui/card';

const DataEntry: React.FC = () => {
  const records = useStore((state) => state.records);

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-6 w-6 text-industrial-blue animate-pulse-slow" />
        <h1 className="text-2xl font-bold">Data Entry</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="industrial-card bg-industrial-blue text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="p-6">
            <h3 className="font-semibold">Total Motors</h3>
            <p className="text-3xl font-bold mt-2 animate-fade-in">{records.length}</p>
            <p className="text-sm opacity-70 mt-1">Records in database</p>
          </div>
        </Card>
        <Card className="industrial-card bg-industrial-teal text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{animationDelay: "0.1s"}}>
          <div className="p-6">
            <h3 className="font-semibold">Good Status</h3>
            <p className="text-3xl font-bold mt-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
              {records.filter(r => r.status === 'Good').length}
            </p>
            <p className="text-sm opacity-70 mt-1">Passing quality control</p>
          </div>
        </Card>
        <Card className="industrial-card bg-industrial-orange text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{animationDelay: "0.2s"}}>
          <div className="p-6">
            <h3 className="font-semibold">Audio Files</h3>
            <p className="text-3xl font-bold mt-2 animate-fade-in" style={{animationDelay: "0.3s"}}>
              {records.reduce((acc, record) => 
                acc + Object.values(record.audioFiles).filter(Boolean).length, 0
              )}
            </p>
            <p className="text-sm opacity-70 mt-1">Recordings uploaded</p>
          </div>
        </Card>
        <Card className="industrial-card bg-industrial-dark text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{animationDelay: "0.3s"}}>
          <div className="p-6">
            <h3 className="font-semibold">Not Good</h3>
            <p className="text-3xl font-bold mt-2 animate-fade-in" style={{animationDelay: "0.4s"}}>
              {records.filter(r => r.status === 'Not Good').length}
            </p>
            <p className="text-sm opacity-70 mt-1">Failing quality control</p>
          </div>
        </Card>
      </div>

      <div className="mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
        <DataEntryForm />
      </div>

      <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
        <DataTable records={records} />
      </div>
    </div>
  );
};

export default DataEntry;
