
import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b animate-fade-in">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden transition-transform hover:rotate-180 duration-300"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-industrial-teal rounded-md flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12">
            <span className="text-white font-bold">F</span>
          </div>
          <h1 className="text-xl font-bold">Factory Data Entry</h1>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="transition-transform hover:scale-110 duration-300"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="transition-transform hover:rotate-90 duration-300"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
