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
    ExternalLink
} from 'lucide-react';

const UserDashboard = () => {
    const stats = [
        { label: 'Total Leads', value: '452', trend: '+24%', icon: Users, color: 'var(--accent-cyan)' },
        { label: 'Chat Volume', value: '1,892', trend: '+15%', icon: MessageSquare, color: 'var(--accent-blue)' },
        { label: 'Today Bookings', value: '12', trend: 'High', icon: Calendar, color: '#f59e0b' },
    ];

    const recentLeads = [
        { id: 1, name: 'Khalid Al-Bakr', phone: '+971 50 123 4567', niche: 'Car Booking', status: 'Warm', date: '2h ago' },
        { id: 2, name: 'Omar Hassan', phone: '+971 52 987 6543', niche: 'Car Booking', status: 'Hot', date: '5h ago' },
        { id: 3, name: 'Unknown User', phone: '+971 55 444 3322', niche: 'Car Booking', status: 'New', date: 'Yesterday' },
    ];

    return (
        <div>
            <div className="grid-container" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card stat-card">
                        <div className="stat-info">
                            <div className="label">{stat.label}</div>
                            <div className="value">
                                {stat.value}
                                <span className={`trend trend-up`}>{stat.trend}</span>
                            </div>
                        </div>
                        <div className="stat-icon" style={{ background: stat.color }}>
                            <stat.icon size={20} color="white" />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Lead CRM Table */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3>Recent Captured Leads</h3>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem' }}>EXPORT ALL</button>
                    </div>
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Lead</th>
                                <th>Status</th>
                                <th>Niche</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLeads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{lead.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.phone}</div>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.7rem',
                                            background: lead.status === 'Hot' ? 'rgba(255, 59, 59, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                            color: lead.status === 'Hot' ? '#ff3b3b' : 'var(--accent-cyan)'
                                        }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td>{lead.niche}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            <Clock size={12} /> {lead.date}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <ExternalLink size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bot Strategy Glass Card */}
                <div className="card" style={{ background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)' }}>
                    <h3 style={{ marginBottom: '8px' }}>Active Strategy</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '24px' }}>How your AI handles queries</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="stat-icon" style={{ width: '35px', height: '35px' }}>
                                <MapPin size={16} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Current Niche</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Car Booking</div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="stat-icon" style={{ width: '35px', height: '35px', background: 'var(--accent-cyan)' }}>
                                <TrendingUp size={16} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Flow Ratio</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>92% Hardcoded</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '3px solid var(--accent-blue)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Your bot is currently saving you **$420.00** this month by prioritizing hardcoded flows over AI API calls.
                            </p>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', padding: '14px' }}>
                            EDIT CHAT FLOWS
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
