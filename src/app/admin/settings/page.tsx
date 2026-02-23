'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
    Bot,
    Save,
    Globe,
    Smartphone,
    CheckCircle2,
    Users,
    Zap
} from 'lucide-react';
import { NICHE_FLOWS } from '@/lib/niche-flows';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MasterBotSettings() {
    const { data: clientsData, error: clientsError, mutate } = useSWR('/api/admin/clients', fetcher);

    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [selectedNiche, setSelectedNiche] = useState('LEAD_REPLY_AGENT');
    const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
    const [websiteContent, setWebsiteContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const clients = clientsData?.clients || [];

    // Auto-select first client if none selected
    useEffect(() => {
        if (clients.length > 0 && !selectedClientId) {
            setSelectedClientId(clients[0].id);
        }
    }, [clients, selectedClientId]);

    // Load active config when client selection changes
    useEffect(() => {
        if (selectedClientId && clients.length > 0) {
            const activeClient = clients.find((c: any) => c.id === selectedClientId);
            if (activeClient) {
                setSelectedNiche(activeClient.niche || 'LEAD_REPLY_AGENT');
                setSystemPrompt(activeClient.systemPrompt || '');
                setWebsiteContent(activeClient.websiteContent || '');
            }
        }
    }, [selectedClientId, clients]);

    const handleSave = async () => {
        if (!selectedClientId) return alert('Select a client first');
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/clients', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedClientId,
                    niche: selectedNiche,
                    systemPrompt,
                    websiteContent
                })
            });

            if (res.ok) {
                mutate();
                alert('Client Bot Configuration Saved Successfully!');
            } else {
                alert('Failed to save configuration');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving configuration');
        } finally {
            setIsSaving(false);
        }
    };

    if (!clientsData && !clientsError) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Clients...</div>;
    if (clients.length === 0) return <div style={{ padding: '40px', textAlign: 'center' }}>No clients found. Please provision a client infrastructure first.</div>;

    const activeClient = clients.find((c: any) => c.id === selectedClientId);

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Master Bot Intelligence</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Configure AI prompt, niche behavior, and website knowledge across clients.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'UPDATING BOT...' : <><Save size={18} /> SAVE ALL CHANGES</>}
                </button>
            </div>

            <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Users size={20} color="var(--accent-cyan)" />
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>SELECT TARGET CLIENT:</div>
                <select
                    className="search-box"
                    style={{ background: 'var(--bg-card)', color: 'white', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '8px', minWidth: '250px' }}
                    value={selectedClientId || ''}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                >
                    {clients.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.businessName || 'Unnamed Business'} ({c.phoneNumberId})</option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>

                {/* Left Column: Flow Builder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* System Prompt Section */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-purple)' }}><Bot size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>AI Personality (System Prompt)</h3>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            Define how the AI should behave for <b>{activeClient?.businessName || 'this client'}</b> when Hardcoded flows end.
                        </p>
                        <textarea
                            className="search-box"
                            style={{ width: '100%', height: '120px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '12px', resize: 'vertical' }}
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            placeholder="You are a helpful assistant for..."
                        />
                    </div>

                    {/* Website Knowledge Base Section */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-orange)' }}><Globe size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Website Knowledge Base</h3>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            Paste scraped text or documentation from the client's website to serve as fallback RAG context.
                        </p>
                        <textarea
                            className="search-box"
                            style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '12px', resize: 'vertical' }}
                            value={websiteContent}
                            onChange={(e) => setWebsiteContent(e.target.value)}
                            placeholder="Paste text content here..."
                        />
                    </div>

                    {/* Niche Selection */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-cyan)' }}><Zap size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Global Niche Brain</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Selecting a niche overrides the bot's intro flow and primary objective.
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

                    <div className="card glass-card">
                        <h4 style={{ fontSize: '0.85rem', marginBottom: '12px' }}>Client Infrastructure Overview</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>WA Phone ID</span>
                                <span style={{ fontWeight: 800 }}>{activeClient?.phoneNumberId || 'None'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Message Limit</span>
                                <span style={{ fontWeight: 800 }}>{activeClient?.messageLimit || '0'} / day</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Bot Status</span>
                                <span style={{ color: activeClient?.status === 'ACTIVE' ? 'var(--accent-cyan)' : '#ff3b3b', fontWeight: 800 }}>{activeClient?.status || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'var(--bg-sidebar)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div className="stat-icon" style={{ background: 'var(--accent-blue)' }}><Bot size={20} color="white" /></div>
                            <h3 style={{ fontSize: '1.1rem' }}>Initial Bot Flow Preview</h3>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 12px 0', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                {NICHE_FLOWS[selectedNiche as any]?.initialMessage || 'Greetings. How can I assist you today?'}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 14px', borderRadius: '12px 12px 0 12px', fontSize: '0.8rem', maxWidth: '80%', alignSelf: 'flex-end', border: '1px solid var(--border-glass)' }}>
                                [User Reply...]
                            </div>
                        </div>
                        <div style={{ marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <Smartphone size={12} className="pulse" /> Flow preview updates on save
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
