
export interface MotorData {
  id: string;
  motorId: string;
  gearId: string;
  vehicleSerialNumber: string;
  winNumber: string;
  timestamp: string;
  status: 'Good' | 'Not Good';
  audioFiles: {
    rpm500: File | null;
    rpm1500: File | null;
    rpm3000: File | null;
    rpm4500: File | null;
  };
}

export type AudioRPM = 'rpm500' | 'rpm1500' | 'rpm3000' | 'rpm4500';
