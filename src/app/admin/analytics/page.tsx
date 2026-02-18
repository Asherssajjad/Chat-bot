'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { Download, Users, Package, DollarSign, Activity } from 'lucide-react';

const revenueData = [
    { name: 'Jan', rev: 4000 }, { name: 'Feb', rev: 3000 }, { name: 'Mar', rev: 5000 },
    { name: 'Apr', rev: 4500 }, { name: 'May', rev: 6000 }, { name: 'Jun', rev: 8000 },
    { name: 'Jul', rev: 9500 },
];

export default function AdminAnalytics() {
    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>System Analytics</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Global monitoring of platform growth, revenue, and infrastructure load.</p>
                </div>
                <button className="btn btn-primary">
                    <Download size={18} /> EXPORT GLOBAL DATA
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Revenue', value: '$142,500', icon: DollarSign, color: 'var(--accent-cyan)' },
                    { label: 'Active Plans', value: '1,284', icon: Package, color: 'var(--accent-blue)' },
                    { label: 'System Load', value: '24%', icon: Activity, color: '#f59e0b' },
                    { label: 'Avg User MRR', value: '$110', icon: Users, color: 'var(--accent-purple)' },
                ].map((stat, i) => (
                    <div key={i} className="card stat-card">
                        <div className="stat-info">
                            <div className="label">{stat.label}</div>
                            <div className="value">{stat.value}</div>
                        </div>
                        <div className="stat-icon" style={{ background: stat.color }}>
                            <stat.icon size={18} color="white" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Revenue Growth (Projected vs Actual)</h3>
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} axisLine={false} tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#1a1f37', border: 'none', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="rev" stroke="var(--accent-cyan)" strokeWidth={3} fillOpacity={1} fill="url(#adminRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
