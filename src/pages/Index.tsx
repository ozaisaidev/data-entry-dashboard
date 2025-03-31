
import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import DashboardHeader from '@/components/DashboardHeader';
import DataEntryForm from '@/components/DataEntryForm';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileDown, Mic, BarChart2, Database, Menu, X } from 'lucide-react';

const Index: React.FC = () => {
  const records = useStore((state) => state.records);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const SidebarItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <Button 
      variant="ghost" 
      className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-0 justify-center'} mb-1`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {sidebarOpen && <span>{label}</span>}
    </Button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div 
        className={`bg-card border-r transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen ? (
            <>
              <h2 className="font-bold text-lg">Factory App</h2>
              <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="mx-auto">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="p-2 flex-1">
          <SidebarItem icon={Database} label="Data Entry" />
          <SidebarItem icon={BarChart2} label="Analytics" />
          <SidebarItem icon={Mic} label="Audio Analysis" />
          <SidebarItem icon={FileDown} label="Export Data" />
        </div>
        <div className="p-4 border-t">
          {sidebarOpen ? (
            <div className="text-xs text-muted-foreground">
              <p>v1.0.0</p>
              <p>© 2023 Factory Solutions</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-6 w-6 bg-industrial-teal rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="industrial-card bg-industrial-blue text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">Total Motors</h3>
                  <p className="text-3xl font-bold mt-2">{records.length}</p>
                  <p className="text-sm opacity-70 mt-1">Records in database</p>
                </CardContent>
              </Card>
              <Card className="industrial-card bg-industrial-teal text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">Good Status</h3>
                  <p className="text-3xl font-bold mt-2">
                    {records.filter(r => r.status === 'Good').length}
                  </p>
                  <p className="text-sm opacity-70 mt-1">Passing quality control</p>
                </CardContent>
              </Card>
              <Card className="industrial-card bg-industrial-orange text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">Audio Files</h3>
                  <p className="text-3xl font-bold mt-2">
                    {records.reduce((acc, record) => 
                      acc + Object.values(record.audioFiles).filter(Boolean).length, 0
                    )}
                  </p>
                  <p className="text-sm opacity-70 mt-1">Recordings uploaded</p>
                </CardContent>
              </Card>
              <Card className="industrial-card bg-industrial-dark text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">Not Good</h3>
                  <p className="text-3xl font-bold mt-2">
                    {records.filter(r => r.status === 'Not Good').length}
                  </p>
                  <p className="text-sm opacity-70 mt-1">Failing quality control</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <DataEntryForm />
            </div>

            <div>
              <DataTable records={records} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
