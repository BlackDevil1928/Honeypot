
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AttackData {
  name: string;
  value: number;
  color: string;
}

const AttackStats = () => {
  const [hourlyData, setHourlyData] = useState<AttackData[]>([]);
  const [attackTypes, setAttackTypes] = useState<AttackData[]>([]);

  useEffect(() => {
    // Simulate hourly attack data
    const generateHourlyData = () => {
      const hours = Array.from({ length: 24 }, (_, i) => ({
        name: `${i}:00`,
        value: Math.floor(Math.random() * 100) + 10,
        color: '#00d4ff'
      }));
      setHourlyData(hours);
    };

    // Simulate attack type distribution
    const generateAttackTypes = () => {
      const types = [
        { name: 'SSH Brute Force', value: 35, color: '#ff3366' },
        { name: 'Web Exploits', value: 25, color: '#ff6b35' },
        { name: 'Port Scanning', value: 20, color: '#00d4ff' },
        { name: 'Malware Download', value: 15, color: '#8b5cf6' },
        { name: 'Other', value: 5, color: '#00ff88' }
      ];
      setAttackTypes(types);
    };

    generateHourlyData();
    generateAttackTypes();

    const interval = setInterval(() => {
      generateHourlyData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="neon-border bg-cyber-card">
        <CardHeader>
          <CardTitle className="text-cyber-primary terminal-text">24h Attack Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Bar dataKey="value" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="neon-border bg-cyber-card">
        <CardHeader>
          <CardTitle className="text-cyber-primary terminal-text">Attack Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={attackTypes}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {attackTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {attackTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: type.color }}></div>
                  <span className="text-gray-300">{type.name}</span>
                </div>
                <span className="text-cyber-primary terminal-text">{type.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttackStats;
