
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AudioUploader from './AudioUploader';
import { MotorData, AudioRPM } from '@/lib/types';
import { useStore } from '@/lib/store';

const DataEntryForm: React.FC = () => {
  const { toast } = useToast();
  const addRecord = useStore((state) => state.addRecord);
  
  const [formData, setFormData] = useState({
    motorId: '',
    gearId: '',
    vehicleSerialNumber: '',
    winNumber: '',
    status: 'Good' as 'Good' | 'Not Good',
  });

  const [audioFiles, setAudioFiles] = useState<{
    rpm500: File | null;
    rpm1500: File | null;
    rpm3000: File | null;
    rpm4500: File | null;
  }>({
    rpm500: null,
    rpm1500: null,
    rpm3000: null,
    rpm4500: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as 'Good' | 'Not Good' }));
  };

  const handleAudioFileChange = (rpm: AudioRPM, file: File | null) => {
    setAudioFiles((prev) => ({ ...prev, [rpm]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.motorId || !formData.gearId || !formData.vehicleSerialNumber || !formData.winNumber) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create record
    const newRecord: MotorData = {
      id: crypto.randomUUID(),
      ...formData,
      timestamp: new Date().toISOString(),
      audioFiles,
    };

    // Add to store
    addRecord(newRecord);

    // Show success message
    toast({
      title: "Data Submitted",
      description: `Motor ${formData.motorId} data has been recorded successfully.`,
    });

    // Reset form
    setFormData({
      motorId: '',
      gearId: '',
      vehicleSerialNumber: '',
      winNumber: '',
      status: 'Good',
    });

    setAudioFiles({
      rpm500: null,
      rpm1500: null,
      rpm3000: null,
      rpm4500: null,
    });
  };

  return (
    <Card className="industrial-card">
      <CardHeader>
        <CardTitle>Motor & Gear Assembly Data</CardTitle>
        <CardDescription>Enter details about the motor and gear assembly</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="motorId">Motor ID</Label>
              <Input
                id="motorId"
                name="motorId"
                placeholder="Enter motor ID"
                value={formData.motorId}
                onChange={handleInputChange}
                className="industrial-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gearId">Gear ID</Label>
              <Input
                id="gearId"
                name="gearId"
                placeholder="Enter gear ID"
                value={formData.gearId}
                onChange={handleInputChange}
                className="industrial-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleSerialNumber">Vehicle Serial Number</Label>
              <Input
                id="vehicleSerialNumber"
                name="vehicleSerialNumber"
                placeholder="Enter vehicle serial number"
                value={formData.vehicleSerialNumber}
                onChange={handleInputChange}
                className="industrial-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="winNumber">WIN Number</Label>
              <Input
                id="winNumber"
                name="winNumber"
                placeholder="Enter WIN number"
                value={formData.winNumber}
                onChange={handleInputChange}
                className="industrial-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger id="status" className="industrial-input">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Not Good">Not Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Audio Recordings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AudioUploader
                rpm={500}
                rpmKey="rpm500"
                file={audioFiles.rpm500}
                onFileChange={handleAudioFileChange}
              />
              <AudioUploader
                rpm={1500}
                rpmKey="rpm1500"
                file={audioFiles.rpm1500}
                onFileChange={handleAudioFileChange}
              />
              <AudioUploader
                rpm={3000}
                rpmKey="rpm3000"
                file={audioFiles.rpm3000}
                onFileChange={handleAudioFileChange}
              />
              <AudioUploader
                rpm={4500}
                rpmKey="rpm4500"
                file={audioFiles.rpm4500}
                onFileChange={handleAudioFileChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">Submit Data</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataEntryForm;
