'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import {
    Users,
    MessageSquare,
    TrendingUp,
    Clock,
    ExternalLink,
    Zap,
    ArrowUpRight,
    Target,
    Activity
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
    const { data: session } = useSession();

    const stats = [
        { label: 'Total Leads', value: '452', trend: '+24%', icon: Users, color: 'var(--accent-cyan)' },
        { label: 'Escalations (HOT)', value: '18', trend: '+5%', icon: Target, color: '#ff3b3b' },
        { label: 'Bot Savings', value: '$1,240', trend: '92%', icon: Zap, color: 'var(--accent-blue)' },
    ];

    const recentLeads = [
        { id: 1, name: 'Khalid Al-Bakr', phone: '+971 50 123 4567', niche: 'Lead Agent', status: 'HOT', date: '2h ago' },
        { id: 2, name: 'Omar Hassan', phone: '+971 52 987 6543', niche: 'Lead Agent', status: 'WARM', date: '5h ago' },
        { id: 3, name: 'Guest User', phone: '+971 55 444 3322', niche: 'Lead Agent', status: 'COLD', date: 'Yesterday' },
    ];

    return (
        <div className="animate-in">
            {/* Greeting */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome back, <span style={{ color: 'var(--accent-blue)' }}>{session?.user?.name || 'Partner'}</span></h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your Lead Reply Agent is currently qualifying leads at **92% efficiency**.</p>
            </div>

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
                        <div>
                            <h4 style={{ fontSize: '1rem' }}>Conversion Funnel</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Message volume vs Qualification rate</p>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.65rem' }}>LEAD ANALYTICS <ArrowUpRight size={12} /></button>
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

                {/* Status Indicator */}
                <div className="card" style={{ background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(20, 30, 80, 0.8) 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div className="icon-box" style={{ background: 'var(--accent-blue)', width: '32px', height: '32px' }}><Activity size={16} color="white" /></div>
                        <h4 style={{ fontSize: '0.9rem' }}>Infrastructure Status</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>WA CONNECT</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>CONNECTED</span>
                        </div>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>CLAUDE AI</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>ACTIVE</span>
                        </div>
                        <div className="glass-card" style={{ padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>PENDING TAKEOVERS</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ff3b3b' }}>4 LEADS</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lead Table */}
            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.9rem' }}>High-Intent Leads (HOT)</h4>
                    <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.7rem' }}>SYNC TO CRM</button>
                </div>
                <table className="modern-table" style={{ margin: 0 }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <tr>
                            <th style={{ paddingLeft: '24px' }}>Lead</th>
                            <th>Status</th>
                            <th>Current Flow</th>
                            <th>Qualified At</th>
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
                                        background: lead.status === 'HOT' ? 'rgba(255, 59, 59, 0.1)' : lead.status === 'WARM' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                        color: lead.status === 'HOT' ? '#ff3b3b' : lead.status === 'WARM' ? '#f59e0b' : 'var(--accent-cyan)'
                                    }}>
                                        {lead.status}
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
