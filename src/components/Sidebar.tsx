'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    Home,
    BarChart2,
    Users,
    Settings,
    LogOut,
    Zap,
    MessageCircle,
    Terminal,
    Phone
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const adminMenu = [
        { name: 'Dashboard', icon: Home, path: '/admin' },
        { name: 'Clients', icon: Users, path: '/admin/users' },
        { name: 'Leads', icon: BarChart2, path: '/admin/leads' },
        { name: 'Chat History', icon: MessageCircle, path: '/admin/history' },
        { name: 'Bot Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="icon-box" style={{ background: 'var(--accent-blue)' }}>
                    <Zap size={18} color="white" fill="white" />
                </div>
                <span>ASHER BOT</span>
            </div>

            <div style={{ padding: '0 16px', marginBottom: '24px' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    background: 'rgba(1, 255, 140, 0.05)',
                    border: '1px solid rgba(1, 255, 140, 0.1)',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    color: 'var(--accent-cyan)'
                }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--accent-cyan)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                    SYSTEM OPERATIONAL
                </div>
            </div>

            <nav style={{ flex: 1 }}>
                {adminMenu.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                    >
                        <div className="icon-box">
                            <item.icon size={18} color={pathname === item.path ? 'white' : 'var(--accent-blue)'} />
                        </div>
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <div className="card glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>Need help?</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Please check our docs</div>
                    <button className="nav-item active" style={{ width: '100%', justifyContent: 'center', marginBottom: 0, border: 'none', cursor: 'pointer' }}>
                        DOCUMENTATION
                    </button>
                </div>
                <button
                    className="nav-item"
                    style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    <div className="icon-box"><LogOut size={18} color="#ff3b3b" /></div>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
