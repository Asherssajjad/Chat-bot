'use client';

import React from 'react';
import {
    Package,
    Check,
    Plus,
    Settings,
    Trash2,
    Zap,
    ShieldCheck,
    Crown
} from 'lucide-react';

const packages = [
    {
        id: 1,
        name: 'Basic Starter',
        price: '$29',
        period: '/month',
        icon: Zap,
        color: 'var(--text-secondary)',
        features: ['1 WhatsApp Bot', 'Basic Flow Engine', '1,000 Messages/mo', 'Email Support'],
        users: 482
    },
    {
        id: 2,
        name: 'Business Pro',
        price: '$99',
        period: '/month',
        icon: ShieldCheck,
        color: 'var(--accent-blue)',
        features: ['5 WhatsApp Bots', 'Hybrid AI Fallback', '10,000 Messages/mo', 'Priority Support', 'Custom Reports'],
        popular: true,
        users: 641
    },
    {
        id: 3,
        name: 'Enterprise',
        price: '$299',
        period: '/month',
        icon: Crown,
        color: 'var(--accent-cyan)',
        features: ['Unlimited Bots', 'Advanced AI Extraction', 'Unlimited Messages', '24/7 Dedicated Support', 'White-label Dashboard'],
        users: 161
    }
];

export default function PackagesManagement() {
    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Subscription Packages</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Configure pricing plans and feature limits for your SaaS.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> CREATE NEW PLAN
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {packages.map((pkg) => (
                    <div key={pkg.id} className="card" style={{
                        position: 'relative',
                        border: pkg.popular ? '2px solid var(--accent-blue)' : '1px solid var(--border-glass)',
                        background: pkg.popular ? 'rgba(0, 117, 255, 0.05)' : 'var(--bg-card)'
                    }}>
                        {pkg.popular && (
                            <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent-blue)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800 }}>
                                MOST POPULAR
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: pkg.color }}>
                                <pkg.icon size={20} color="white" />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><Settings size={16} /></button>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff3b3b' }}><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{pkg.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800 }}>{pkg.price}</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{pkg.period}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                            {pkg.features.map((feature, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(1, 255, 140, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={10} color="var(--accent-cyan)" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Users</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{pkg.users}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
