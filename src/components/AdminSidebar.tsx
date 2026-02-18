'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    LayoutDashboard,
    ShieldCheck
} from 'lucide-react';

const AdminSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { name: 'Users', icon: Users, path: '/admin/users' },
        { name: 'Packages', icon: Package, path: '/admin/packages' },
        { name: 'Niche Flows', icon: MessageSquare, path: '/admin/flows' },
        { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="sidebar">
            <div className="logo-container">
                <ShieldCheck size={32} color="var(--accent-primary)" />
                <span>SaaS Admin</span>
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
                <button className="nav-item" style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
