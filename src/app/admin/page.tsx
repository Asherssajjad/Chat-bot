'use client';

import React from 'react';
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
    MoreVertical,
    Activity,
    Cpu,
    ShieldAlert,
    Server,
    Terminal,
    ArrowUpRight
} from 'lucide-react';

const messageVolumeData = [
    { name: '00:00', val: 400 }, { name: '04:00', val: 300 }, { name: '08:00', val: 900 },
    { name: '12:00', val: 1200 }, { name: '16:00', val: 1500 }, { name: '20:00', val: 1100 },
    { name: '23:59', val: 800 },
];

const resourceData = [
    { name: 'Core 1', v: 45 }, { name: 'Core 2', v: 38 }, { name: 'Core 3', v: 52 },
    { name: 'Core 4', v: 30 }, { name: 'Core 5', v: 48 }, { name: 'Core 6', v: 35 },
];

const AdminDashboard = () => {
    return (
        <div className="animate-in">
            {/* Real-time System Overview Stat Cards */}
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                    { label: "Global Messages", value: "842,000", trend: "+12.5%", icon: MessageSquare, color: 'var(--accent-blue)' },
                    { label: "AI API Savings", value: "$4,250", trend: "+24%", icon: Zap, color: 'var(--accent-cyan)' },
                    { label: "Active Bots", value: "1,284", trend: "+8.2%", icon: Cpu, color: 'var(--accent-purple)' },
                    { label: "Total Leads", value: "48,290", trend: "+15%", icon: Users, color: '#f59e0b' },
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
                            All clusters are healthy. You are currently saving **92%** on Claude API costs through optimized hardcoded flows.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', zIndex: 1, marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)' }}><Server size={18} color="var(--accent-blue)" /></div>
                            <div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>CPU USAGE</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>24.2%</div>
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
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>0 Active</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Live Stream */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem' }}>Live Event Stream</h4>
                        <Terminal size={14} color="var(--text-secondary)" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                        <div style={{ padding: '8px', borderLeft: '2px solid var(--accent-cyan)', background: 'rgba(1, 255, 140, 0.05)' }}>
                            <span style={{ color: 'var(--accent-cyan)' }}>[14:02:11]</span> Lead detected: Bareerah Rentals
                        </div>
                        <div style={{ padding: '8px', borderLeft: '2px solid var(--accent-blue)', background: 'rgba(0, 117, 255, 0.05)' }}>
                            <span style={{ color: 'var(--accent-blue)' }}>[14:02:05]</span> Webhook processed: +971...
                        </div>
                        <div style={{ padding: '8px', borderLeft: '2px solid var(--accent-purple)', background: 'rgba(139, 92, 246, 0.05)' }}>
                            <span style={{ color: 'var(--accent-purple)' }}>[14:01:48]</span> AI Fallback engaged for UID_092
                        </div>
                        <div style={{ padding: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>[14:01:30]</span> New user registered (Dubai Stay)
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px', fontSize: '0.75rem' }}>OPEN FULL LOGS</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>

                {/* Global Traffic Chart */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Global Message Volume</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Real-time traffic across all connected WhatsApp nodes</p>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.65rem' }}>VIEW NODES <ArrowUpRight size={12} /></button>
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

                {/* Load Balance / Cluster Health */}
                <div className="card" style={{ padding: '24px' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Cluster Node Distribution</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>CPU Load balancing per active bot-processing core</p>

                    <div style={{ height: '220px', marginBottom: '24px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={resourceData}>
                                <Bar dataKey="v" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>API LATENCY</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>184ms</div>
                        </div>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>QUEUE SIZE</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>12 Active</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
