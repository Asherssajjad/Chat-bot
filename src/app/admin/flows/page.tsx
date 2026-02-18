'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Plus,
    Trash2,
    Edit3,
    ChevronRight,
    Workflow,
    Smartphone,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { NICHE_FLOWS } from '@/lib/niche-flows';

export default function AdminNicheFlows() {
    const [activeNiche, setActiveNiche] = useState('CAR_BOOKING');

    const flows = Object.values(NICHE_FLOWS);
    const currentFlow = NICHE_FLOWS[activeNiche];

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Niche Chat Flows</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Define the hardcoded logic "The Brain" for each business category.</p>
                </div>
                <button className="btn btn-primary">
                    <Workflow size={18} /> CREATE NEW NICHE
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>

                {/* Sidebar: Niche List */}
                <div className="card" style={{ padding: '16px', height: 'fit-content' }}>
                    <h4 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Available Niches</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {flows.map((flow) => (
                            <button
                                key={flow.id}
                                onClick={() => setActiveNiche(flow.id.toUpperCase().replace('-', '_'))}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: activeNiche === flow.id.toUpperCase().replace('-', '_') ? 'var(--accent-blue)' : 'rgba(255,255,255,0.03)',
                                    color: activeNiche === flow.id.toUpperCase().replace('-', '_') ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MessageSquare size={16} />
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{flow.name}</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main: Flow Designer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Initial Message Config */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Greeting Message</h3>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}><Edit3 size={14} /> EDIT</button>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Sent automatically when user starts chat</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                                "{currentFlow.initialMessage}"
                            </div>
                        </div>
                    </div>

                    {/* Steps Config */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Hardcoded Flow Steps</h3>
                            <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}><Plus size={14} /> ADD STEP</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {currentFlow.steps.map((step, idx) => (
                                <div key={idx} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {step.trigger.map((t, i) => (
                                                <span key={i} style={{ padding: '4px 10px', background: 'rgba(0, 117, 255, 0.1)', color: 'var(--accent-blue)', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
                                                    TRIGGER: {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <Edit3 size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                                            <Trash2 size={16} color="#ff3b3b" style={{ cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>BOT RESPONSE</div>
                                            <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{step.response}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>DATA EXTRACTION</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Smartphone size={14} color="var(--accent-cyan)" />
                                                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>{step.extraction || 'None'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Fallback Notice */}
                    <div className="card glass-card" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <AlertTriangle color="var(--accent-blue)" size={20} />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>AI Fallback Integration</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    If a user message doesn't match any triggers above, the bot will call Claude AI.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
