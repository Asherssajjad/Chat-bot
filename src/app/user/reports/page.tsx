'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, MessageSquare, Zap, Clock } from 'lucide-react';

const conversionData = [
    { name: 'Mon', leads: 40, converted: 24 },
    { name: 'Tue', leads: 30, converted: 18 },
    { name: 'Wed', leads: 50, converted: 35 },
    { name: 'Thu', leads: 28, converted: 20 },
    { name: 'Fri', leads: 59, converted: 42 },
    { name: 'Sat', leads: 32, converted: 25 },
    { name: 'Sun', leads: 48, converted: 30 },
];

const sourceData = [
    { name: 'Hardcoded Flows', value: 85, color: 'var(--accent-blue)' },
    { name: 'AI Fallback', value: 15, color: 'var(--accent-purple)' },
];

export default function UserReports() {
    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Performance Reports</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Detailed analysis of your bot's conversion and cost efficiency.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secondary">
                        <Calendar size={18} /> LAST 30 DAYS
                    </button>
                    <button className="btn btn-primary">
                        <Download size={18} /> GENERATE PDF
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
                {[
                    { label: 'Conv. Rate', value: '68.2%', icon: TrendingUp, color: 'var(--accent-cyan)' },
                    { label: 'Avg. Response', value: '1.2s', icon: Clock, color: 'var(--accent-blue)' },
                    { label: 'Saved Credits', value: '$1,240', icon: Zap, color: '#f59e0b' },
                    { label: 'Total Volume', value: '12,450', icon: MessageSquare, color: 'var(--accent-purple)' },
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

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>

                {/* Conversion Chart */}
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Lead Acquisition vs Conversion</h3>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: '#1a1f37', border: 'none', borderRadius: '12px' }} />
                                <Bar dataKey="leads" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="converted" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cost Efficiency Pie */}
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Chat Source Distribution</h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                        {sourceData.map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: s.color }}></div>
                                    {s.name}
                                </div>
                                <div style={{ fontWeight: 800 }}>{s.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
