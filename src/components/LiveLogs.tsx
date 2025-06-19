
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LogEntry {
  id: string;
  timestamp: Date;
  ip: string;
  command: string;
  service: string;
  status: 'blocked' | 'logged' | 'flagged';
}

const LiveLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const commands = [
      'ls -la', 'cat /etc/passwd', 'wget malware.exe', 'nc -l 4444',
      'rm -rf /', 'chmod 777 *', 'sudo su', 'ps aux', '/bin/sh',
      'curl malicious-site.com', 'python exploit.py', 'nmap -sS'
    ];
    
    const services = ['SSH', 'FTP', 'HTTP', 'TELNET', 'SMB'];
    
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        command: commands[Math.floor(Math.random() * commands.length)],
        service: services[Math.floor(Math.random() * services.length)],
        status: ['blocked', 'logged', 'flagged'][Math.floor(Math.random() * 3)] as LogEntry['status'],
      };
      
      setLogs(prev => [...prev.slice(-50), newLog]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-cyber-danger';
      case 'flagged': return 'text-cyber-warning';
      case 'logged': return 'text-cyber-secondary';
      default: return 'text-cyber-primary';
    }
  };

  return (
    <Card className="neon-border bg-cyber-card h-96">
      <CardHeader>
        <CardTitle className="text-cyber-primary terminal-text">Live Attack Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-1 font-mono text-xs">
            {logs.slice().reverse().map((log) => (
              <div key={log.id} className="grid grid-cols-12 gap-2 py-1 hover:bg-cyber-border/20 transition-colors">
                <span className="col-span-2 text-cyber-secondary">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className="col-span-2 text-cyber-primary">{log.ip}</span>
                <span className="col-span-1 text-gray-400">{log.service}</span>
                <span className="col-span-5 text-gray-300 truncate">{log.command}</span>
                <span className={`col-span-2 ${getStatusColor(log.status)} font-bold`}>
                  {log.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveLogs;
