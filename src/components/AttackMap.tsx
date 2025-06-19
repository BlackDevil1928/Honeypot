
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Attack {
  id: string;
  lat: number;
  lng: number;
  country: string;
  ip: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

const AttackMap = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    // Simulate real-time attacks
    const interval = setInterval(() => {
      const newAttack: Attack = {
        id: Math.random().toString(36).substr(2, 9),
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
        country: ['Russia', 'China', 'North Korea', 'Iran', 'Brazil', 'India'][Math.floor(Math.random() * 6)],
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as Attack['severity'],
        timestamp: new Date(),
      };
      
      setAttacks(prev => [...prev.slice(-20), newAttack]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-danger';
      case 'high': return 'bg-cyber-warning';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-cyber-secondary';
      default: return 'bg-cyber-primary';
    }
  };

  return (
    <Card className="neon-border bg-cyber-card">
      <CardHeader>
        <CardTitle className="text-cyber-primary terminal-text">Global Attack Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-cyber-bg rounded-lg p-4 h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10"></div>
          <div className="scan-effect absolute inset-0"></div>
          
          {/* Simulated world map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute border-t border-cyber-border" style={{ top: `${i * 12.5}%`, width: '100%' }} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="absolute border-l border-cyber-border" style={{ left: `${i * 8.33}%`, height: '100%' }} />
            ))}
          </div>

          {/* Attack points */}
          {attacks.map((attack) => (
            <div
              key={attack.id}
              className={`absolute w-3 h-3 rounded-full ${getSeverityColor(attack.severity)} animate-pulse-glow`}
              style={{
                left: `${((attack.lng + 180) / 360) * 100}%`,
                top: `${((90 - attack.lat) / 180) * 100}%`,
              }}
              title={`${attack.country} - ${attack.ip} - ${attack.severity}`}
            />
          ))}
        </div>
        
        <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
          {attacks.slice(-5).reverse().map((attack) => (
            <div key={attack.id} className="flex justify-between items-center text-xs terminal-text">
              <span className="text-cyber-secondary">{attack.timestamp.toLocaleTimeString()}</span>
              <span className="text-cyber-primary">{attack.ip}</span>
              <span className="text-gray-400">{attack.country}</span>
              <span className={`px-2 py-1 rounded text-black ${getSeverityColor(attack.severity)}`}>
                {attack.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttackMap;
