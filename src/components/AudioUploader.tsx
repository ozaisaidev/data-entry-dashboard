
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AudioRPM } from '@/lib/types';
import { Upload, Check, X } from 'lucide-react';

interface AudioUploaderProps {
  rpm: number;
  rpmKey: AudioRPM;
  file: File | null;
  onFileChange: (rpm: AudioRPM, file: File | null) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ rpm, rpmKey, file, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(rpmKey, selectedFile);
  };

  const handleRemoveFile = () => {
    onFileChange(rpmKey, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card 
      className={`p-4 border ${file ? 'border-green-500' : 'border-gray-200'} relative transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
    >
      <div className="text-center">
        <h3 className="font-semibold mb-1">{rpm} RPM</h3>
        <div className="h-16 flex items-center justify-center">
          {!file ? (
            <div 
              onClick={handleClick}
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <Upload size={24} className="text-muted-foreground mb-1 animate-bounce" />
              <p className="text-xs text-muted-foreground">Upload Audio</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full animate-fade-in">
              <div className="flex items-center mb-1">
                <Check size={16} className="text-green-500 mr-1 animate-scale-in" />
                <span className="text-sm font-medium">File Uploaded</span>
              </div>
              <p className="text-xs text-muted-foreground truncate max-w-full">
                {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
              </p>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          <Button 
            size="sm" 
            variant={file ? "outline" : "default"}
            onClick={handleClick}
            className="transition-all duration-300 hover:scale-105"
          >
            {file ? "Replace" : "Select File"}
          </Button>
          {file && (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={handleRemoveFile}
              className="transition-all duration-300 animate-fade-in"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        onChange={handleFileChange}
        accept="audio/*"
      />
    </Card>
  );
};

export default AudioUploader;
