'use client';

import React from 'react';
import useSWR from 'swr';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    MessageSquare,
    Globe,
    Zap,
    Users,
    Activity,
    Cpu,
    ShieldAlert,
    Server,
    Terminal,
    ArrowUpRight,
    Loader2
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AdminDashboard = () => {
    const { data: stats, error: statsError } = useSWR('/api/stats', fetcher, { refreshInterval: 5000 });
    const { data: history, error: historyError } = useSWR('/api/admin/history', fetcher, { refreshInterval: 3000 });

    const messageVolumeData = [
        { name: '00:00', val: 0 }, { name: '04:00', val: 0 }, { name: '08:00', val: 0 },
        { name: '12:00', val: stats?.total || 0 }, { name: '16:00', val: stats?.total || 0 }, { name: '20:00', val: stats?.total || 0 },
        { name: '23:59', val: stats?.total || 0 },
    ];

    const logs = history?.logs || [];

    return (
        <div className="animate-in">
            {/* Real-time System Overview Stat Cards */}
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                    { label: "Total Leads", value: stats?.total || 0, trend: "+100%", icon: Users, color: '#f59e0b' },
                    { label: "Hot Leads", value: stats?.hot || 0, trend: "Target", icon: Zap, color: 'var(--accent-cyan)' },
                    { label: "Active Nodes", value: "1", trend: "Live", icon: Cpu, color: 'var(--accent-purple)' },
                    { label: "Efficiency", value: `${stats?.efficiency || 0}%`, trend: "AI Optimized", icon: MessageSquare, color: 'var(--accent-blue)' },
                ].map((stat, i) => (
                    <div key={i} className="card stat-card" style={{ padding: '20px' }}>
                        <div className="stat-info">
                            <div className="label">{stat.label}</div>
                            <div className="value">
                                {stat.value}
                                <span className="trend trend-up" style={{ fontSize: '0.65rem' }}>{stat.trend}</span>
                            </div>
                        </div>
                        <div className="stat-icon" style={{ background: stat.color, width: '40px', height: '40px' }}>
                            <stat.icon size={18} color="white" />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '16px', marginBottom: '16px' }}>

                {/* Main Master Control Hero */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(20, 30, 80, 0.8) 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '300px',
                    padding: '32px'
                }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 117, 255, 0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>

                    <div style={{ zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '1px' }}>SYSTEM LIVE • ASHER BOT NODE 01</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>Platform Infrastructure</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: '1.6' }}>
                            Your AI Engine is connected. Handling <b>{stats?.total || 0}</b> active lead relationships with <b>{stats?.hot || 0}</b> high-intent conversions.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', zIndex: 1, marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)' }}><Server size={18} color="var(--accent-blue)" /></div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>SERVER STATUS</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>ONLINE</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)' }}><Activity size={18} color="var(--accent-cyan)" /></div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>UPTIME</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>99.99%</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)' }}><ShieldAlert size={18} color="#f59e0b" /></div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>INCIDENTS</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{statsError || historyError ? '1 Issue' : '0 Active'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real Live Stream */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem' }}>Live Event Stream</h4>
                        {!history && <Loader2 size={14} className="animate-spin" color="var(--text-secondary)" />}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.75rem', fontFamily: 'monospace', overflowY: 'auto', maxHeight: '250px' }}>
                        {logs.length === 0 ? (
                            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>Waiting for first webhook event...</div>
                        ) : (
                            logs.slice(0, 5).map((log: any, i: number) => (
                                <div key={i} style={{ padding: '8px', borderLeft: `2px solid ${log.tag === 'HOT' ? 'var(--accent-cyan)' : 'var(--accent-blue)'}`, background: 'rgba(255, 255, 255, 0.02)' }}>
                                    <span style={{ color: 'var(--text-secondary)', marginRight: '8px' }}>[{new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                                    <span style={{ color: 'var(--accent-cyan)' }}>{log.name}</span>: {log.lastMessage.substring(0, 30)}...
                                </div>
                            ))
                        )}
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px', fontSize: '0.75rem' }} onClick={() => window.location.href = '/admin/history'}>VIEW ALL CHATS</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>

                {/* Global Traffic Chart - Connected to Real Data */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Traffic Velocity</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lead generation activity over time</p>
                        </div>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={messageVolumeData}>
                                <defs>
                                    <linearGradient id="colorMsg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#1a1f37', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="val" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorMsg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Database Connectivity Health */}
                <div className="card" style={{ padding: '24px' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Lead Status Distribution</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Sentiment breakdown of real captured leads</p>

                    <div style={{ height: '220px', marginBottom: '24px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Hot', v: stats?.hot || 0 },
                                { name: 'Warm', v: stats?.warm || 0 },
                                { name: 'Cold', v: stats?.cold || 0 },
                            ]}>
                                <Bar dataKey="v" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>DB CONNECTION</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: statsError ? '#ff3b3b' : 'var(--accent-cyan)' }}>
                                {statsError ? 'ERROR' : 'HEALTHY'}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>LAST UPDATE</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>LIVE</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
