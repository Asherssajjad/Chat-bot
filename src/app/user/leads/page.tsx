'use client';

import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    Download,
    MoreVertical,
    Smartphone,
    Calendar,
    MapPin,
    ExternalLink,
    Mail,
    CheckCircle2,
    Clock,
    Car
} from 'lucide-react';

const mockLeads = [
    { id: 1, name: 'Khalid Al-Bakr', phone: '+971 50 123 4567', email: 'khalid@example.com', status: 'Hot', interest: 'SUV Booking', date: '2 hours ago', location: 'Dubai Marina' },
    { id: 2, name: 'Omar Hassan', phone: '+971 52 987 6543', email: 'omar@example.com', status: 'Warm', interest: 'Sedan Booking', date: '5 hours ago', location: 'Business Bay' },
    { id: 3, name: 'Unknown User', phone: '+971 55 444 3322', email: 'N/A', status: 'New', interest: 'Price Inquiry', date: '1 day ago', location: 'Downtown Dubai' },
    { id: 4, name: 'John Smith', phone: '+44 7712 345678', email: 'jsmith@example.com', status: 'Converted', interest: 'Luxury Rental', date: '2 days ago', location: 'DXB Airport' },
    { id: 5, name: 'Sarah Ahmed', phone: '+971 58 111 2233', email: 'sarah@example.com', status: 'Hot', interest: 'SUV Booking', date: '2 days ago', location: 'Jumeirah' },
];

export default function UserLeadsCRM() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Lead Management CRM</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Review, track, and export leads captured by your Bareerah Bot.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secondary">
                        <Download size={18} /> EXPORT CSV
                    </button>
                    <button className="btn btn-primary">
                        ADD LEAD MANUALLY
                    </button>
                </div>
            </div>

            {/* CRM Stats Sidebar + Table Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Filters & Search */}
                <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="search-box" style={{ flex: 1, padding: '10px 16px' }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search leads by name, phone, or interested niche..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary"><Filter size={16} /> FILTERS</button>
                    <div className="glass-card" style={{ padding: '10px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                        Total: <span style={{ color: 'var(--accent-cyan)' }}>1,284 Leads</span>
                    </div>
                </div>

                {/* Lead Table */}
                <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
                    <table className="modern-table" style={{ margin: 0 }}>
                        <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>LEAD INFO</th>
                                <th>STATUS</th>
                                <th>INTEREST / NICHE</th>
                                <th>LOCATION</th>
                                <th>CAPTURED ON</th>
                                <th style={{ paddingRight: '24px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLeads.map((lead) => (
                                <tr key={lead.id} className="hover-row">
                                    <td style={{ paddingLeft: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{lead.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Smartphone size={10} /> {lead.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '100px',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            background: lead.status === 'Hot' ? 'rgba(255, 59, 59, 0.1)' : lead.status === 'Converted' ? 'rgba(1, 255, 140, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                            color: lead.status === 'Hot' ? '#ff3b3b' : lead.status === 'Converted' ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                                        }}>
                                            {lead.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Car size={14} color="var(--accent-blue)" />
                                            <span style={{ fontSize: '0.85rem' }}>{lead.interest}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <MapPin size={12} /> {lead.location}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <Clock size={12} /> {lead.date}
                                        </div>
                                    </td>
                                    <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-blue)' }}><ExternalLink size={16} /></button>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><MoreVertical size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Showing 5 of 452 active leads</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>Prev</button>
                            <button className="btn btn-primary" style={{ padding: '6px 12px' }}>Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
