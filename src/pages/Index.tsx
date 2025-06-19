
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AttackMap from '@/components/AttackMap';
import LiveLogs from '@/components/LiveLogs';
import AttackStats from '@/components/AttackStats';
import SystemStatus from '@/components/SystemStatus';
import { Terminal, Shield, Globe, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-bg p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyber-primary animate-pulse-glow" />
            <h1 className="text-3xl font-bold text-cyber-primary terminal-text">
              HoneyPot Security Monitor
            </h1>
          </div>
          <div className="flex items-center gap-2 text-cyber-secondary">
            <div className="w-2 h-2 bg-cyber-secondary rounded-full animate-pulse"></div>
            <span className="text-sm terminal-text">ACTIVE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm terminal-text">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyber-primary" />
            <span className="text-gray-400">Deploy honeypot on a VM</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyber-secondary" />
            <span className="text-gray-400">Log connections, IPs, attempted commands</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyber-warning" />
            <span className="text-gray-400">Visualize IP geolocation of attackers</span>
          </div>
        </div>
      </div>

      {/* System Status Cards */}
      <SystemStatus />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttackMap />
        <LiveLogs />
      </div>

      {/* Attack Statistics */}
      <AttackStats />

      {/* Deliverables Section */}
      <Card className="neon-border bg-cyber-card mt-6">
        <CardHeader>
          <CardTitle className="text-cyber-primary terminal-text">Project Deliverables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-cyber-bg rounded-lg">
              <h3 className="text-cyber-secondary font-bold mb-2 terminal-text">Running Honeypot</h3>
              <p className="text-gray-400 text-sm">
                Fully operational honeypot services simulating vulnerable SSH, HTTP, and FTP servers
              </p>
            </div>
            <div className="p-4 bg-cyber-bg rounded-lg">
              <h3 className="text-cyber-secondary font-bold mb-2 terminal-text">Detailed Logs</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive logging of all connection attempts, commands, and attack patterns
              </p>
            </div>
            <div className="p-4 bg-cyber-bg rounded-lg">
              <h3 className="text-cyber-secondary font-bold mb-2 terminal-text">Visual Attack Reports</h3>
              <p className="text-gray-400 text-sm">
                Real-time visualization of attack origins, patterns, and threat intelligence
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-cyber-secondary terminal-text">
        <p className="text-sm">
          Honeypot Server v2.1 | Monitoring {new Date().toLocaleDateString()} | 
          <span className="text-cyber-primary ml-2">System Operational</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
