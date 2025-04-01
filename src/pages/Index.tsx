
import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileDown, Mic, BarChart2, Database, Menu, X } from 'lucide-react';
import DataEntry from './DataEntry';
import Analytics from './Analytics';
import AudioAnalysis from './AudioAnalysis';
import ExportData from './ExportData';

const Index: React.FC = () => {
  const records = useStore((state) => state.records);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the active path from the URL
  const path = location.pathname.substring(1) || 'data-entry';
  const [activeItem, setActiveItem] = useState(path); 
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemClick = (itemId: string) => {
    setActiveItem(itemId);
    
    // Navigate to the appropriate route
    navigate(`/${itemId === 'data-entry' ? '' : itemId}`);
    
    // On mobile, close the sidebar after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const SidebarItem = ({ 
    icon: Icon, 
    label, 
    id 
  }: { 
    icon: React.ElementType; 
    label: string;
    id: string;
  }) => (
    <Button 
      variant="ghost" 
      className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-0 justify-center'} mb-1 ${activeItem === id ? 'bg-accent text-accent-foreground' : ''} transition-all duration-300 hover:scale-105`}
      onClick={() => handleMenuItemClick(id)}
    >
      <Icon className={`h-5 w-5 mr-2 transition-all duration-300 ${activeItem === id ? 'text-accent-foreground' : ''}`} />
      {sidebarOpen && <span className="animate-fade-in">{label}</span>}
    </Button>
  );

  // Render the selected component based on activeItem
  const renderContent = () => {
    switch (activeItem) {
      case 'analytics':
        return <Analytics />;
      case 'audio':
        return <AudioAnalysis />;
      case 'export':
        return <ExportData />;
      default:
        return <DataEntry />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar with animation */}
      <div 
        className={`bg-card border-r transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen ? (
            <>
              <h2 className="font-bold text-lg animate-fade-in">Factory App</h2>
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="transition-transform hover:rotate-90 duration-300">
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="mx-auto transition-transform hover:rotate-180 duration-300">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="p-2 flex-1">
          <SidebarItem icon={Database} label="Data Entry" id="data-entry" />
          <SidebarItem icon={BarChart2} label="Analytics" id="analytics" />
          <SidebarItem icon={Mic} label="Audio Analysis" id="audio" />
          <SidebarItem icon={FileDown} label="Export Data" id="export" />
        </div>
        <div className="p-4 border-t">
          {sidebarOpen ? (
            <div className="text-xs text-muted-foreground animate-fade-in">
              <p>v1.0.0</p>
              <p>© 2023 Factory Solutions</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-6 w-6 bg-industrial-teal rounded-full animate-pulse-slow"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main content with animation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-auto animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
