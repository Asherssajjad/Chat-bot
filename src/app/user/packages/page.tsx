'use client';

import React from 'react';
import {
    Zap,
    ShieldCheck,
    Crown,
    Check,
    Star
} from 'lucide-react';

const plans = [
    {
        id: 1,
        name: 'Starter',
        price: '$29',
        period: '/mo',
        icon: Zap,
        color: 'var(--text-secondary)',
        features: [
            '1 WhatsApp Number',
            'Basic Flow Engine',
            '1,000 Messages/mo',
            'Manual Export',
            'Email Support'
        ],
        buttonText: 'CURRENT PLAN',
        isCurrent: true
    },
    {
        id: 2,
        name: 'Business Pro',
        price: '$99',
        period: '/mo',
        icon: ShieldCheck,
        color: 'var(--accent-blue)',
        features: [
            '5 WhatsApp Numbers',
            'Full AI Fallback (Claude)',
            '10,000 Messages/mo',
            'Real-time CRM Sync',
            'Priority Support',
            'Advanced Niche Flows'
        ],
        buttonText: 'UPGRADE TO PRO',
        popular: true
    },
    {
        id: 3,
        name: 'Enterprise',
        price: '$299',
        period: '/mo',
        icon: Crown,
        color: 'var(--accent-cyan)',
        features: [
            'Unlimited Numbers',
            'White-label Branding',
            'Unlimited Messages',
            'API Access',
            '24/7 Account Manager',
            'Custom LLM Training'
        ],
        buttonText: 'CONTACT SALES'
    }
];

export default function UserPackages() {
    return (
        <div className="animate-in">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Pricing & Plans</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Choose the right plan to scale your WhatsApp automation. Upgrade anytime as your lead volume grows.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                {plans.map((plan) => (
                    <div key={plan.id} className="card" style={{
                        position: 'relative',
                        background: plan.popular ? 'var(--bg-sidebar)' : 'var(--bg-card)',
                        border: plan.popular ? '2px solid var(--accent-blue)' : '1px solid var(--border-glass)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {plan.popular && (
                            <div style={{
                                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                                background: 'var(--accent-blue)', color: 'white', padding: '6px 20px', borderRadius: '100px',
                                fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <Star size={14} fill="white" /> MOST POPULAR
                            </div>
                        )}

                        <div style={{ marginBottom: '32px' }}>
                            <div className="icon-box" style={{ background: plan.color, width: '50px', height: '50px', marginBottom: '24px' }}>
                                <plan.icon size={24} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{plan.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{plan.price}</span>
                                <span style={{ color: 'var(--text-secondary)' }}>{plan.period}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '40px' }}>
                            {plan.features.map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(1, 255, 140, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={12} color="var(--accent-cyan)" strokeWidth={3} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button className={`btn ${plan.isCurrent ? 'btn-secondary' : 'btn-primary'}`} style={{ width: '100%', padding: '16px' }}>
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
