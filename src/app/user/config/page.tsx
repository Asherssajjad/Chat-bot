'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Bot,
    Settings,
    Save,
    Key,
    Globe,
    Smartphone,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { NICHE_FLOWS } from '@/lib/niche-flows';

export default function BotConfig() {
    const [selectedNiche, setSelectedNiche] = useState('CAR_BOOKING');
    const [isSaving, setIsSaving] = useState(false);

    const niches = Object.values(NICHE_FLOWS);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bot Configuration</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Set your business niche, API keys, and chat behavior.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'SAVING...' : <><Save size={18} /> SAVE CHANGES</>}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>

                {/* Connection Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Niche Selection */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon"><Globe size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Business Niche Selection</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Selecting a niche pre-configures your bot with optimized hardcoded flows to save AI costs.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            {niches.map((niche) => (
                                <div
                                    key={niche.id}
                                    onClick={() => setSelectedNiche(niche.id.toUpperCase().replace('-', '_'))}
                                    style={{
                                        padding: '16px',
                                        borderRadius: '16px',
                                        border: selectedNiche === niche.id.toUpperCase().replace('-', '_') ? '2px solid var(--accent-blue)' : '1px solid var(--border-glass)',
                                        background: selectedNiche === niche.id.toUpperCase().replace('-', '_') ? 'rgba(0, 117, 255, 0.05)' : 'rgba(255,255,255,0.02)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{niche.name}</div>
                                        {selectedNiche === niche.id.toUpperCase().replace('-', '_') && <CheckCircle2 size={16} color="var(--accent-blue)" />}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Includes 12+ custom flows</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* API Keys */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: '#f59e0b' }}><Key size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>API Configuration</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px' }}>CLAUDE AI API KEY (FALLBACK)</label>
                                <div className="search-box" style={{ width: '100%', padding: '12px 16px' }}>
                                    <input type="password" value="********************************" readOnly />
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <CheckCircle2 size={12} /> Key validated and active
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px' }}>WHATSAPP BUSINESS TOKEN</label>
                                <div className="search-box" style={{ width: '100%', padding: '12px 16px' }}>
                                    <input type="password" value="********************************" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bot Preview / Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div className="card" style={{ background: 'var(--bg-sidebar)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-cyan)' }}><Bot size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Live Preview</h3>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '16px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 12px 0', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                {NICHE_FLOWS[selectedNiche]?.initialMessage || "Hello! How can I help you?"}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 0 12px', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-end', border: '1px solid var(--border-glass)' }}>
                                I want to book a car
                            </div>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 12px 0', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                Awesome! We have Sedans, SUVs, and Luxury cars...
                            </div>
                        </div>
                    </div>

                    <div className="card glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#f59e0b' }}>
                            <AlertCircle size={18} />
                            <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>AI Usage Warning</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Your current settings use AI Fallback for 8% of queries. Ensure your Claude API key has sufficient balance.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
