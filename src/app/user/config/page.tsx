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
    AlertCircle,
    Plus,
    ArrowRight,
    Trash2,
    Zap,
    Play
} from 'lucide-react';
import { NICHE_FLOWS } from '@/lib/niche-flows';

export default function BotConfig() {
    const [selectedNiche, setSelectedNiche] = useState('CAR_BOOKING');
    const [isSaving, setIsSaving] = useState(false);
    const [customFlow, setCustomFlow] = useState([
        { id: 1, type: 'Greeting', text: 'Salam! Hope you are doing well.', trigger: 'Initial' },
        { id: 2, type: 'Offer', text: 'How can I help you today? I can share prices, details, or book now.', trigger: 'After Salam' },
        { id: 3, type: 'Process', text: 'Sure! Our prices start from $50/day. Which car do you like?', trigger: 'Price' },
    ]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    const removeFlowStep = (id: number) => {
        setCustomFlow(customFlow.filter(step => step.id !== id));
    };

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bot Intelligence Center</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Customize your bot behavior, flow sequences, and niche selection.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'UPDATING BOT...' : <><Save size={18} /> SAVE ALL CHANGES</>}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>

                {/* Left Column: Flow Builder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Booking Flow Sequence */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="stat-icon" style={{ background: 'var(--accent-blue)' }}><Play size={20} color="white" /></div>
                                <h3 style={{ fontSize: '1.1rem' }}>Booking Flow Sequence</h3>
                            </div>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}><Plus size={14} /> ADD STEP</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                            {customFlow.map((step, index) => (
                                <div key={step.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-main)', border: '2px solid var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                                            {index + 1}
                                        </div>
                                        {index !== customFlow.length - 1 && <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--accent-blue), transparent)' }}></div>}
                                    </div>
                                    <div className="glass-card" style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>{step.type} STEP</div>
                                            <Trash2 size={14} color="#ff3b3b" style={{ cursor: 'pointer' }} onClick={() => removeFlowStep(step.id)} />
                                        </div>
                                        <div className="search-box" style={{ width: '100%', padding: '10px' }}>
                                            <input type="text" value={step.text} onChange={(e) => {
                                                const newF = [...customFlow];
                                                newF[index].text = e.target.value;
                                                setCustomFlow(newF);
                                            }} style={{ width: '100%' }} />
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Zap size={10} color="var(--accent-cyan)" /> Trigger: {step.trigger}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Niche Selection */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-cyan)' }}><Globe size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Global Niche Brain</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Selecting a niche pre-loads 100+ proven hardcoded responses for your business.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            {Object.values(NICHE_FLOWS).map((niche) => (
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview & Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div className="card" style={{ background: 'var(--bg-sidebar)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-blue)' }}><Bot size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Bot Preview</h3>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {customFlow.slice(0, 2).map((s, i) => (
                                <React.Fragment key={i}>
                                    <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 12px 0', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                        {s.text}
                                    </div>
                                    {i === 0 && <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 0 12px', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-end', border: '1px solid var(--border-glass)' }}>
                                        Walaikumsalam!
                                    </div>}
                                </React.Fragment>
                            ))}
                        </div>
                        <div style={{ marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <Activity size={12} className="pulse" /> Bot is ready to serve
                        </div>
                    </div>

                    <div className="card glass-card">
                        <h4 style={{ fontSize: '0.85rem', marginBottom: '12px' }}>API Identity</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>WA Number</span>
                                <span style={{ fontWeight: 800 }}>+971 50 123 4567</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Claude AI</span>
                                <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>CONNECTED</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
function Activity({ size, className }: { size: number, className: string }) {
    return <Smartphone size={size} className={className} />;
}
