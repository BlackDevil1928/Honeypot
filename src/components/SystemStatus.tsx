
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Server, Activity, AlertTriangle } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  connections: number;
  icon: React.ElementType;
}

const SystemStatus = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'SSH Honeypot',
      status: 'online',
      uptime: '99.9%',
      connections: 147,
      icon: Server
    },
    {
      name: 'HTTP Honeypot',
      status: 'online',
      uptime: '99.7%',
      connections: 89,
      icon: Activity
    },
    {
      name: 'FTP Honeypot',
      status: 'warning',
      uptime: '97.2%',
      connections: 23,
      icon: AlertTriangle
    },
    {
      name: 'Fail2Ban',
      status: 'online',
      uptime: '100%',
      connections: 0,
      icon: Shield
    }
  ]);

  const [totalBlocked, setTotalBlocked] = useState(1247);
  const [activeThreats, setActiveThreats] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalBlocked(prev => prev + Math.floor(Math.random() * 3));
      setActiveThreats(Math.floor(Math.random() * 15) + 5);
      
      setServices(prev => prev.map(service => ({
        ...service,
        connections: service.connections + Math.floor(Math.random() * 5) - 2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-cyber-secondary';
      case 'warning': return 'bg-cyber-warning';
      case 'offline': return 'bg-cyber-danger';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="neon-border bg-cyber-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-secondary text-sm terminal-text">Total Blocked</p>
              <p className="text-2xl font-bold text-cyber-primary terminal-text">{totalBlocked}</p>
            </div>
            <Shield className="h-8 w-8 text-cyber-secondary" />
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-cyber-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-secondary text-sm terminal-text">Active Threats</p>
              <p className="text-2xl font-bold text-cyber-danger terminal-text">{activeThreats}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-cyber-danger" />
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-cyber-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-secondary text-sm terminal-text">Services Online</p>
              <p className="text-2xl font-bold text-cyber-secondary terminal-text">
                {services.filter(s => s.status === 'online').length}/{services.length}
              </p>
            </div>
            <Server className="h-8 w-8 text-cyber-secondary" />
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-cyber-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-secondary text-sm terminal-text">System Load</p>
              <p className="text-2xl font-bold text-cyber-primary terminal-text">2.4%</p>
            </div>
            <Activity className="h-8 w-8 text-cyber-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border bg-cyber-card md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-cyber-primary terminal-text">Honeypot Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-cyber-bg rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-cyber-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">{service.name}</p>
                      <p className="text-xs text-cyber-secondary">Uptime: {service.uptime}</p>
                      <p className="text-xs text-gray-400">Connections: {service.connections}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(service.status)} text-black font-bold`}>
                    {service.status.toUpperCase()}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;
