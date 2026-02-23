'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
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
    Car,
    Plus
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserLeadsCRM() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, mutate } = useSWR('/api/leads', fetcher);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', phone: '', interest: '', location: '' });

    const leads = data?.leads || [];
    const isLoading = !data && !error;

    const filteredLeads = leads.filter((lead: any) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.interest?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLead = async () => {
        if (!newLead.name || !newLead.phone) return alert('Name and Phone are required');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLead)
            });

            if (res.ok) {
                mutate(); // Refresh the list
                setIsAddModalOpen(false);
                setNewLead({ name: '', phone: '', interest: '', location: '' });
                alert('Lead added successfully!');
            } else {
                alert('Failed to add lead');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding lead');
        }
    };

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
                    <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={18} /> ADD LEAD MANUALLY
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
                        Total: <span style={{ color: 'var(--accent-cyan)' }}>{leads.length} Leads</span>
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
                            {isLoading ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>Loading leads...</td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No leads found. Add one manually or wait for the bot!</td></tr>
                            ) : (
                                filteredLeads.map((lead: any) => (
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
                                                background: lead.status === 'HOT' ? 'rgba(255, 59, 59, 0.1)' : lead.status === 'CONVERTED' ? 'rgba(1, 255, 140, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                                color: lead.status === 'HOT' ? '#ff3b3b' : lead.status === 'CONVERTED' ? 'var(--accent-cyan)' : 'var(--text-secondary)'
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
                                ))
                            )}
                        </tbody>
                    </table>

                    <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Showing {filteredLeads.length} leads</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>Prev</button>
                            <button className="btn btn-primary" style={{ padding: '6px 12px' }}>Next</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Add Lead Modal */}
            {isAddModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
                    <div className="card" style={{ width: '400px', padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Add Manual Lead</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                className="search-box"
                                placeholder="Name"
                                value={newLead.name}
                                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                            />
                            <input
                                className="search-box"
                                placeholder="Phone (e.g. +971...)"
                                value={newLead.phone}
                                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                            />
                            <input
                                className="search-box"
                                placeholder="Interest (e.g. SUV)"
                                value={newLead.interest}
                                onChange={(e) => setNewLead({ ...newLead, interest: e.target.value })}
                            />
                            <input
                                className="search-box"
                                placeholder="Location"
                                value={newLead.location}
                                onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                            />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)} style={{ flex: 1 }}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleAddLead} style={{ flex: 1 }}>Add Lead</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
