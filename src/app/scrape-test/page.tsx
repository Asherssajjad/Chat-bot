'use client';

import React, { useState } from 'react';
import { Globe, Search, RefreshCw, Layers, FileText, Image as ImageIcon, ExternalLink, Activity, Database, CheckCircle, DatabaseZap } from 'lucide-react';

export default function ScrapePlayground() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'text' | 'images'>('text');

    const handleScrape = async () => {
        if (!url || !url.startsWith('http')) {
            setError('Please enter a valid URL starting with http:// or https://');
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/scrape-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.error || 'Failed to scrape website');
            }
        } catch (err: any) {
            setError(err.message || 'Network error while scraping');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', background: 'var(--accent-gradient)', boxShadow: '0 8px 30px rgba(0, 117, 255, 0.3)', marginBottom: '16px' }}>
                    <DatabaseZap size={30} color="white" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '12px' }}>Data Extraction Testing Ground</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Test how the bot "reads" a website. It fetches all text data immediately and stores it. It also extracts images, but won't show them to users unless they ask for it.
                </p>
            </div>

            {/* Input Section */}
            <div className="card" style={{ marginBottom: '32px', display: 'flex', gap: '16px', background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(20, 30, 80, 0.4) 100%)', padding: '32px' }}>
                <div className="search-box" style={{ flex: 1, padding: '16px', background: 'rgba(0,0,0,0.3)', width: 'auto' }}>
                    <Globe size={24} color="var(--accent-cyan)" />
                    <input
                        type="url"
                        placeholder="Enter website URL (e.g. https://www.apple.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                        style={{ fontSize: '1.1rem', fontWeight: 500 }}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleScrape}
                    disabled={isLoading}
                    style={{ padding: '0 40px', fontSize: '1.1rem', letterSpacing: '1px' }}
                >
                    {isLoading ? <><RefreshCw size={22} className="pulse" /> SCRAPING...</> : <><Search size={22} /> INITIATE DATA EXTRACTION</>}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{ background: 'rgba(255, 59, 59, 0.1)', border: '1px solid rgba(255, 59, 59, 0.3)', color: '#ff3b3b', padding: '16px 24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                    <Activity size={20} /> {error}
                </div>
            )}

            {/* Results Section */}
            {result && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '32px' }}>

                    {/* Left: Metadata */}
                    <div className="card" style={{ height: 'fit-content', padding: '32px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Layers size={20} color="var(--accent-cyan)" /> Extraction Summary
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '16px', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Page Title</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: '1.4' }}>{result.title || 'No Title Found'}</div>
                            </div>

                            <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--accent-blue)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Raw Text Extracted</div>
                                    <FileText size={16} color="var(--accent-blue)" />
                                </div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{result.textLength.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>chars</span></div>
                            </div>

                            <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--accent-purple)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Images Found</div>
                                    <ImageIcon size={16} color="var(--accent-purple)" />
                                </div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{result.imageCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>images</span></div>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Requires customer explicit request to be displayed by bot.</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(1, 255, 140, 0.05)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>
                                <CheckCircle size={18} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Data is clean and ready for DB storage.</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Data View */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.2)' }}>
                            <div
                                onClick={() => setActiveTab('text')}
                                style={{
                                    padding: '20px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700,
                                    color: activeTab === 'text' ? 'white' : 'var(--text-secondary)',
                                    borderBottom: activeTab === 'text' ? '3px solid var(--accent-blue)' : '3px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Database size={18} color={activeTab === 'text' ? 'var(--accent-blue)' : 'currentColor'} />
                                Extracted Knowledge Base
                            </div>
                            <div
                                onClick={() => setActiveTab('images')}
                                style={{
                                    padding: '20px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700,
                                    color: activeTab === 'images' ? 'white' : 'var(--text-secondary)',
                                    borderBottom: activeTab === 'images' ? '3px solid var(--accent-purple)' : '3px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <ImageIcon size={18} color={activeTab === 'images' ? 'var(--accent-purple)' : 'currentColor'} />
                                Image Index
                            </div>
                        </div>

                        {/* Content Area */}
                        <div style={{ padding: '32px', background: 'rgba(0,0,0,0.1)', height: '600px', overflowY: 'auto' }}>

                            {activeTab === 'text' && (
                                <div style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                                    {result.fullText}
                                    {result.fullText.length === 0 && (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>No readable text found.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'images' && (
                                <div>
                                    {result.images.length === 0 ? (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>No prominent images found.</div>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                            {result.images.map((img: any, i: number) => (
                                                <div key={i} className="glass-card" style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ height: '150px', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justify-content: 'center' }}>
                                                        <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.style.display = 'none'} />
                                                    </div>
                                                    <div style={{ padding: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                            <div style={{ fontWeight: 700, color: 'white', maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={img.alt}>{img.alt || 'Unnamed Image'}</div>
                                                            <a href={img.src} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}><ExternalLink size={14} /></a>
                                                        </div>
                                                        <div style={{ wordBreak: 'break-all', opacity: 0.6 }}>{img.src.split('/').pop()}</div>
                                                    </div>
                                                </div>
                                    ))}
                                </div>
                            )}
                        </div>
                            )}

                    </div>
                </div>

                </div>
    )
}
        </div >
    );
}
