'use client';

import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    Shield,
    MoreVertical,
    Mail,
    Calendar,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Key,
    X,
    Smartphone,
    ShieldCheck,
    Lock,
    Settings,
    Activity,
    AlertTriangle,
    Zap,
    Globe
} from 'lucide-react';

const mockUsers = [
    {
        id: 1,
        name: 'Bareerah Rentals',
        email: 'rentals@bareerah.com',
        plan: 'Enterprise',
        status: 'Active',
        bots: 5,
        joined: '2024-01-12',
        claudeKey: 'sk-ant-c01-as8...',
        phoneId: '1284920491',
        wabaId: '10294810294',
        accessToken: 'EAAO81...',
        webhookSecret: 'sh_as82...',
        messageLimit: 5000,
        autoPause: true
    },
    {
        id: 2,
        name: 'Global Car Hub',
        email: 'info@globalcar.com',
        plan: 'Professional',
        status: 'Active',
        bots: 2,
        joined: '2024-01-28',
        claudeKey: 'sk-ant-c01-as8...',
        phoneId: '294819204',
        wabaId: '20491820491',
        accessToken: 'EAAO82...',
        webhookSecret: 'sh_kj91...',
        messageLimit: 1000,
        autoPause: false
    },
];

export default function UsersManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    const openModal = (user: any = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Client Infrastructure Control</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Direct management of WhatsApp Enterprise IDs, Access Tokens, and Cost Controllers.</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <UserPlus size={18} /> PROVISION NEW CLIENT
                </button>
            </div>

            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '16px' }}>
                    <div className="search-box" style={{ width: '300px' }}>
                        <Search size={16} color="var(--text-secondary)" />
                        <input type="text" placeholder="Search by name, email, or WABA ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <table className="modern-table" style={{ margin: '0' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ paddingLeft: '24px' }}>CLIENT / BUSINESS</th>
                            <th>WABA ID</th>
                            <th>DAILY LIMIT</th>
                            <th>AUTO-PAUSE</th>
                            <th style={{ paddingRight: '24px', textAlign: 'right' }}>INFRASTRUCTURE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover-row">
                                <td style={{ paddingLeft: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{user.name.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><code style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>{user.wabaId}</code></td>
                                <td>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{user.messageLimit.toLocaleString()} <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>msgs/day</span></div>
                                </td>
                                <td>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        background: user.autoPause ? 'rgba(1, 255, 140, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: user.autoPause ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                                    }}>
                                        {user.autoPause ? 'ON' : 'OFF'}
                                    </span>
                                </td>
                                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem' }} onClick={() => openModal(user)}>
                                        MANAGE CONFIG
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Comprehensive Admin Modal for Configuration */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
                    <div className="card" style={{ width: '650px', maxHeight: '90vh', overflowY: 'auto', animation: 'fadeIn 0.3s ease', border: '1px solid rgba(0, 117, 255, 0.3)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem' }}>{editingUser ? 'Client Infrastructure Config' : 'Provision New Client'}</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>WABA ID: {editingUser?.wabaId || 'NEW'}</p>
                            </div>
                            <X style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* Section 1: Business Identity */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-blue)' }}>
                                    <Globe size={16} /> <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>BUSINESS IDENTITY</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>BUSINESS NAME</label>
                                        <div className="search-box" style={{ width: '100%' }}><input type="text" defaultValue={editingUser?.name} /></div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>ADMIN EMAIL</label>
                                        <div className="search-box" style={{ width: '100%' }}><input type="email" defaultValue={editingUser?.email} /></div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: WhatsApp Enterprise API (WABA) */}
                            <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(0, 117, 255, 0.03)', border: '1px solid rgba(0, 117, 255, 0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--accent-blue)' }}>
                                    <Smartphone size={16} /> <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>WHATSAPP ENTERPRISE API (WABA)</span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>PHONE NUMBER ID</label>
                                        <div className="search-box" style={{ width: '100%' }}><input type="text" defaultValue={editingUser?.phoneId} placeholder="e.g. 12849204..." /></div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>WABA ACCOUNT ID</label>
                                        <div className="search-box" style={{ width: '100%' }}><input type="text" defaultValue={editingUser?.wabaId} placeholder="e.g. 10294810..." /></div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>PERMANENT ACCESS TOKEN</label>
                                    <div className="search-box" style={{ width: '100%' }}><Lock size={12} color="var(--text-secondary)" /><input type="password" defaultValue={editingUser?.accessToken} placeholder="EAAB..." /></div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>WEBHOOK VERIFY SECRET</label>
                                    <div className="search-box" style={{ width: '100%' }}><Shield size={12} color="var(--text-secondary)" /><input type="text" defaultValue={editingUser?.webhookSecret} placeholder="e.g. asher_verify_..." /></div>
                                </div>
                            </div>

                            {/* Section 3: AI & Controllers */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.03)', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-purple)' }}>
                                        <Zap size={14} /> <span style={{ fontWeight: 800, fontSize: '0.7rem' }}>CLAUDE AI KEY</span>
                                    </div>
                                    <div className="search-box" style={{ width: '100%' }}><input type="password" defaultValue={editingUser?.claudeKey} placeholder="sk-ant-..." /></div>
                                </div>

                                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(1, 255, 140, 0.03)', border: '1px solid rgba(1, 255, 140, 0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                                        <Activity size={14} /> <span style={{ fontWeight: 800, fontSize: '0.7rem' }}>COST CONTROLS</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>DAILY MSG LIMIT</label>
                                            <div className="search-box" style={{ width: '100%', padding: '4px 12px' }}><input type="number" defaultValue={editingUser?.messageLimit} /></div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.7rem' }}>AUTO-PAUSE</span>
                                            <div style={{ width: '40px', height: '20px', background: editingUser?.autoPause ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
                                                <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: editingUser?.autoPause ? '22px' : '2px', transition: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-glass)' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>DISCARD</button>
                                <button className="btn btn-primary" style={{ flex: 1 }}>SAVE & PROVISION WABA</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
