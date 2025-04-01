
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
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Mic className="h-6 w-6 text-industrial-orange animate-pulse-slow" />
        <h1 className="text-2xl font-bold">Audio Analysis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in">{countByRPM.rpm500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{animationDelay: "0.1s"}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">1500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in" style={{animationDelay: "0.15s"}}>{countByRPM.rpm1500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{animationDelay: "0.2s"}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">3000 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in" style={{animationDelay: "0.25s"}}>{countByRPM.rpm3000}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{animationDelay: "0.3s"}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">4500 RPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold animate-fade-in" style={{animationDelay: "0.35s"}}>{countByRPM.rpm4500}</div>
            <p className="text-xs text-muted-foreground mt-1">Audio recordings</p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{animationDelay: "0.4s"}}>
        <CardHeader>
          <CardTitle>Audio Analysis Tool</CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-muted-foreground text-center transform transition-all duration-500 hover:scale-110">
            <Mic className="h-24 w-24 mx-auto mb-4 text-industrial-orange/50 animate-pulse-slow" />
            <p>Advanced audio analysis features will be implemented in future updates.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioAnalysis;
