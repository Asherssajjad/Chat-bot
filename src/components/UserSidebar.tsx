'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Bot,
    PieChart,
    History
} from 'lucide-react';

const UserSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/user' },
        { name: 'My Leads', icon: Users, path: '/user/leads' },
        { name: 'Bot Config', icon: Bot, path: '/user/config' },
        { name: 'Flow History', icon: History, path: '/user/history' },
        { name: 'Reports', icon: PieChart, path: '/user/reports' },
        { name: 'Settings', icon: Settings, path: '/user/settings' },
    ];

    return (
        <div className="sidebar">
            <div className="logo-container">
                <Bot size={32} color="var(--accent-secondary)" />
                <span>Bareerah Bot</span>
            </div>

            <nav className="nav-group">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <div className="nav-item" style={{ background: 'rgba(255,255,255,0.03)', marginBottom: '1rem', padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Plan</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>Pro Business</div>
                </div>
                <button className="nav-item" style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserSidebar;
