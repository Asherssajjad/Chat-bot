'use client';

import React from 'react';
import {
    Users,
    MessageSquare,
    Calendar,
    ChevronRight,
    TrendingUp,
    MapPin,
    Clock,
    ExternalLink,
    Zap,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const chartData = [
    { name: 'Mon', msgs: 120 }, { name: 'Tue', msgs: 210 }, { name: 'Wed', msgs: 180 },
    { name: 'Thu', msgs: 320 }, { name: 'Fri', msgs: 290 }, { name: 'Sat', msgs: 450 },
    { name: 'Sun', msgs: 380 },
];

const UserDashboard = () => {
    const stats = [
        { label: 'Total Leads', value: '452', trend: '+24%', icon: Users, color: 'var(--accent-cyan)' },
        { label: 'Chat Volume', value: '1,892', trend: '+15%', icon: MessageSquare, color: 'var(--accent-blue)' },
        { label: 'Saved Credits', value: '$1,240', trend: 'High', icon: Zap, color: '#f59e0b' },
    ];

    const recentLeads = [
        { id: 1, name: 'Khalid Al-Bakr', phone: '+971 50 123 4567', niche: 'Car Booking', status: 'Warm', date: '2h ago' },
        { id: 2, name: 'Omar Hassan', phone: '+971 52 987 6543', niche: 'Car Booking', status: 'Hot', date: '5h ago' },
        { id: 3, name: 'Unknown User', phone: '+971 55 444 3322', niche: 'Car Booking', status: 'New', date: 'Yesterday' },
        { id: 4, name: 'John Doe', phone: '+1 234 567 890', niche: 'Real Estate', status: 'Warm', date: 'Yesterday' },
    ];

    return (
        <div className="animate-in">
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card stat-card" style={{ padding: '20px' }}>
                        <div className="stat-info">
                            <div className="label">{stat.label}</div>
                            <div className="value">
                                {stat.value}
                                <span className={`trend trend-up`} style={{ fontSize: '0.65rem' }}>{stat.trend}</span>
                            </div>
                        </div>
                        <div className="stat-icon" style={{ background: stat.color, width: '40px', height: '40px' }}>
                            <stat.icon size={18} color="white" />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '16px', marginBottom: '16px' }}>

                {/* Traffic Overview */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '1rem' }}>Message Traffic (Last 7 Days)</h4>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.65rem' }}>VIEW LOGS <ArrowUpRight size={12} /></button>
                    </div>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="userMsg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#1a1f37', border: 'none', borderRadius: '8px', fontSize: '11px' }} />
                                <Area type="monotone" dataKey="msgs" stroke="var(--accent-blue)" strokeWidth={2} fillOpacity={1} fill="url(#userMsg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Strategy Indicator */}
                <div className="card" style={{ background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(26, 31, 55, 0.94) 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div className="icon-box" style={{ background: 'var(--accent-cyan)', width: '32px', height: '32px' }}><TrendingUp size={16} color="white" /></div>
                        <h4 style={{ fontSize: '0.9rem' }}>Bot Strategy</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ACTIVE NICHE</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Car Booking</div>
                        </div>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>EFFICIENCY</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>92% Flows / 8% AI</div>
                        </div>
                        <div style={{ padding: '12px', borderRadius: '12px', border: '1px solid rgba(0, 117, 255, 0.2)', background: 'rgba(0, 117, 255, 0.03)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                Your bot handled **382 queries** today automatically, costing you **$0**.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lead Table */}
            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.9rem' }}>Recently Captured Leads</h4>
                    <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.7rem' }}>EXPORT ALL</button>
                </div>
                <table className="modern-table" style={{ margin: 0 }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <tr>
                            <th style={{ paddingLeft: '24px' }}>Lead</th>
                            <th>Status</th>
                            <th>Niche</th>
                            <th>Time Captured</th>
                            <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentLeads.map((lead) => (
                            <tr key={lead.id} className="hover-row">
                                <td style={{ paddingLeft: '24px' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{lead.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{lead.phone}</div>
                                </td>
                                <td>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        background: lead.status === 'Hot' ? 'rgba(255, 59, 59, 0.1)' : lead.status === 'Warm' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                        color: lead.status === 'Hot' ? '#ff3b3b' : lead.status === 'Warm' ? '#f59e0b' : 'var(--accent-cyan)'
                                    }}>
                                        {lead.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ fontSize: '0.8rem' }}>{lead.niche}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <Clock size={12} /> {lead.date}
                                    </div>
                                </td>
                                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                                    <ExternalLink size={14} color="var(--accent-blue)" style={{ cursor: 'pointer' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDashboard;
