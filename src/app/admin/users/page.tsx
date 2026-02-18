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
    X
} from 'lucide-react';

const mockUsers = [
    { id: 1, name: 'Bareerah Rentals', email: 'rentals@bareerah.com', plan: 'Enterprise', status: 'Active', bots: 5, joined: '2024-01-12', apiKey: 'sk-ant-c01-as8...92j', whatsappToken: 'EAAO81...' },
    { id: 2, name: 'Global Car Hub', email: 'info@globalcar.com', plan: 'Professional', status: 'Active', bots: 2, joined: '2024-01-28', apiKey: 'sk-ant-c01-as8...3k2', whatsappToken: 'EAAO82...' },
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>User Management</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Full control over client accounts and their private API configurations.</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <UserPlus size={18} /> CREATE NEW USER
                </button>
            </div>

            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '16px' }}>
                    <div className="search-box" style={{ width: '300px' }}>
                        <Search size={16} color="var(--text-secondary)" />
                        <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <table className="modern-table" style={{ margin: '0' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ paddingLeft: '24px' }}>USER / CLIENT</th>
                            <th>SUBSCRIPTION</th>
                            <th>STATUS</th>
                            <th>CONFIG (API)</th>
                            <th style={{ paddingRight: '24px', textAlign: 'right' }}>ACTIONS</th>
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
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><Mail size={12} /> {user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="status-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>{user.plan}</span></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                                        <CheckCircle2 size={14} /> {user.status}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <div className="glass-card" style={{ padding: '4px 8px', fontSize: '0.65rem', border: '1px solid var(--accent-blue)' }}>Claude: SET</div>
                                        <div className="glass-card" style={{ padding: '4px 8px', fontSize: '0.65rem', border: '1px solid var(--accent-cyan)' }}>WS: SET</div>
                                    </div>
                                </td>
                                <td style={{ paddingRight: '24px', textAlign: 'right' }}>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem' }} onClick={() => openModal(user)}>
                                        EDIT API / USER
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Admin Modal for User/API Management */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <div className="card" style={{ width: '500px', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h3>{editingUser ? 'Edit User & API Config' : 'Create New User'}</h3>
                            <X style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>FULL NAME</label>
                                <div className="search-box" style={{ width: '100%' }}><input type="text" defaultValue={editingUser?.name} /></div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>EMAIL ADDRESS</label>
                                <div className="search-box" style={{ width: '100%' }}><input type="email" defaultValue={editingUser?.email} /></div>
                            </div>

                            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0, 117, 255, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-blue)' }}>
                                    <Key size={14} /> <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>MASTER API CONFIG (ADMIN ONLY)</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', marginBottom: '4px', display: 'block' }}>CLAUDE AI KEY</label>
                                        <div className="search-box" style={{ width: '100%', padding: '8px' }}><input type="password" defaultValue={editingUser?.apiKey} /></div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.65rem', marginBottom: '4px', display: 'block' }}>WHATSAPP TOKEN</label>
                                        <div className="search-box" style={{ width: '100%', padding: '8px' }}><input type="password" defaultValue={editingUser?.whatsappToken} /></div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>CANCEL</button>
                                <button className="btn btn-primary" style={{ flex: 1 }}>SAVE USER DATA</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
