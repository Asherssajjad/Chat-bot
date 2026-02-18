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
import { CreditCard, Globe, Wallet, ShoppingCart, MoreVertical } from 'lucide-react';

const areaData = [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 500 },
    { name: 'Apr', value: 280 }, { name: 'May', value: 590 }, { name: 'Jun', value: 320 },
    { name: 'Jul', value: 480 }, { name: 'Aug', value: 510 }, { name: 'Sep', value: 390 },
    { name: 'Oct', value: 430 }, { name: 'Nov', value: 540 }, { name: 'Dec', value: 600 },
];

const barData = [
    { name: 'A', v: 400 }, { name: 'B', v: 300 }, { name: 'C', v: 500 },
    { name: 'D', v: 280 }, { name: 'E', v: 590 }, { name: 'F', v: 320 },
    { name: 'G', v: 480 },
];

const AdminDashboard = () => {
    return (
        <div>
            {/* Stat Cards */}
            <div className="grid-container">
                {[
                    { label: "Today's Money", value: "$53,000", trend: "+55%", icon: Wallet },
                    { label: "Today's Users", value: "2,300", trend: "+5%", icon: Globe },
                    { label: "New Clients", value: "+3,052", trend: "-14%", icon: CreditCard, down: true },
                    { label: "Total Sales", value: "$173,000", trend: "+8%", icon: ShoppingCart },
                ].map((stat, i) => (
                    <div key={i} className="card stat-card">
                        <div className="stat-info">
                            <div className="label">{stat.label}</div>
                            <div className="value">
                                {stat.value}
                                <span className={`trend ${stat.down ? 'trend-down' : 'trend-up'}`}>{stat.trend}</span>
                            </div>
                        </div>
                        <div className="stat-icon">
                            <stat.icon size={20} color="white" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero & Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '24px', marginBottom: '24px' }}>

                {/* Hero Card */}
                <div className="card hero-card" style={{ padding: '32px' }}>
                    <div className="hero-content">
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Welcome back,</div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Mark Johnson</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', width: '200px', lineHeight: '1.6' }}>
                            Glad to see you again! Ask me anything.
                        </p>
                        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                            Tap to record <Globe size={16} />
                        </div>
                    </div>
                </div>

                {/* Satisfaction Rate */}
                <div className="card">
                    <h4 style={{ marginBottom: '4px' }}>Satisfaction Rate</h4>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '24px' }}>From all projects</div>
                    <div className="progress-container">
                        <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>95%</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Based on likes</div>
                    </div>
                </div>

                {/* Referral Tracking */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h4>Referral Tracking</h4>
                        <MoreVertical size={16} color="var(--text-secondary)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '16px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Invited</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>145 people</div>
                        </div>
                        <div className="glass-card" style={{ padding: '16px', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Bonus</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>1,465</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }}>

                {/* Sales Overview */}
                <div className="card">
                    <h4 style={{ marginBottom: '4px' }}>Sales overview</h4>
                    <div style={{ fontSize: '0.75rem', marginBottom: '24px' }}>
                        <span style={{ color: 'var(--accent-cyan)' }}>(+5) more</span> in 2024
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#1a1f37', border: 'none', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Active Users Bar Chart */}
                <div className="card" style={{ background: 'var(--accent-gradient)' }}>
                    <div style={{ height: '200px', marginBottom: '24px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <Bar dataKey="v" fill="white" radius={[4, 4, 0, 0]} barSize={8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <h4 style={{ marginBottom: '8px' }}>Active Users</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        <span style={{ color: 'var(--accent-cyan)' }}>(+23)</span> than last week
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        {[
                            { label: 'Users', val: '32,984' },
                            { label: 'Clicks', val: '2.42m' },
                            { label: 'Sales', val: '2,400$' },
                            { label: 'Items', val: '320' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{item.label}</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{item.val}</div>
                                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '8px' }}>
                                    <div style={{ width: '60%', height: '100%', background: 'white', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
