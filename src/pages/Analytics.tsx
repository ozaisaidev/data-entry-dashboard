
import React from 'react';
import { useStore } from '@/lib/store';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics: React.FC = () => {
  const records = useStore((state) => state.records);

  // Calculate stats
  const totalMotors = records.length;
  const goodStatus = records.filter(r => r.status === 'Good').length;
  const notGoodStatus = records.filter(r => r.status === 'Not Good').length;
  const goodPercentage = totalMotors ? Math.round((goodStatus / totalMotors) * 100) : 0;

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="h-6 w-6 text-industrial-blue animate-pulse-slow" />
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-md hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Motors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in">{totalMotors}</div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md hover:scale-105" style={{animationDelay: "0.1s"}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quality Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in" style={{animationDelay: "0.2s"}}>{goodPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {goodStatus} good / {notGoodStatus} not good
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md hover:scale-105" style={{animationDelay: "0.2s"}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Audio Recordings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in" style={{animationDelay: "0.3s"}}>
              {records.reduce((acc, record) => 
                acc + Object.values(record.audioFiles).filter(Boolean).length, 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 animate-fade-in" style={{animationDelay: "0.3s"}}>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground animate-pulse-slow">
            Detailed charts will be added in the future. Currently showing: {goodStatus} Good, {notGoodStatus} Not Good
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
