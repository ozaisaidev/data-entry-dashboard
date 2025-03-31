
import React from 'react';
import { useStore } from '@/lib/store';
import { Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioRPM } from '@/lib/types';

const AudioAnalysis: React.FC = () => {
  const records = useStore((state) => state.records);
  
  // Calculate audio files statistics
  const audioRpms: AudioRPM[] = ['rpm500', 'rpm1500', 'rpm3000', 'rpm4500'];
  
  const countByRPM = audioRpms.reduce((acc, rpm) => {
    acc[rpm] = records.filter(r => r.audioFiles[rpm]).length;
    return acc;
  }, {} as Record<AudioRPM, number>);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Mic className="h-6 w-6 text-industrial-orange" />
        <h1 className="text-2xl font-bold">Audio Analysis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByRPM.rpm500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">1500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByRPM.rpm1500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">3000 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByRPM.rpm3000}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">4500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countByRPM.rpm4500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audio Analysis Tool</CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">
            Advanced audio analysis features will be implemented in future updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioAnalysis;
