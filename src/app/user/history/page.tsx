'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Search,
    User,
    Smartphone,
    Clock,
    ChevronRight,
    Filter,
    Bot,
    Zap,
    MoreVertical,
    ExternalLink
} from 'lucide-react';

const mockLogs = [
    { id: 1, sender: '+971 50 123 4567', lastMessage: '3', time: '2 mins ago', type: 'Flow (Step 2: Purchase)', unread: true, tag: 'HOT' },
    { id: 2, sender: '+971 52 987 6543', lastMessage: 'details', time: '15 mins ago', type: 'Flow (Step 1: Menu)', unread: false, tag: 'WARM' },
    { id: 3, sender: '+971 55 444 3322', lastMessage: 'Hi', time: '1 hour ago', type: 'Initial Greeting', unread: false, tag: 'COLD' },
];

export default function ChatHistory() {
    const [selectedChat, setSelectedChat] = useState(1);

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Chat History & Logs</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Real-time monitoring of all Lead Agent interactions.</p>
                </div>
                <div className="glass-card" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
                    BOT STATUS: <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>ACTIVE</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: 'calc(100vh - 250px)' }}>

                {/* Chat List */}
                <div className="card" style={{ padding: '0px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border-glass)' }}>
                        <div className="search-box" style={{ width: '100%' }}>
                            <Search size={14} color="var(--text-secondary)" />
                            <input type="text" placeholder="Search chats..." style={{ fontSize: '0.8rem' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {mockLogs.map((log) => (
                            <div
                                key={log.id}
                                onClick={() => setSelectedChat(log.id)}
                                style={{
                                    padding: '16px',
                                    borderBottom: '1px solid rgba(255,255,255,0.02)',
                                    cursor: 'pointer',
                                    background: selectedChat === log.id ? 'rgba(0, 117, 255, 0.05)' : 'transparent',
                                    transition: 'var(--transition)',
                                    position: 'relative'
                                }}
                            >
                                {log.unread && <div style={{ position: 'absolute', top: '16px', right: '16px', width: '8px', height: '8px', background: 'var(--accent-blue)', borderRadius: '50%' }}></div>}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                    <div style={{ width: '32px', height: '32px', background: 'var(--bg-sidebar)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Smartphone size={14} color="var(--text-secondary)" />
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{log.sender}</div>
                                    <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{log.time}</div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {log.lastMessage}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>{log.type.toUpperCase()}</span>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 800,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: log.tag === 'HOT' ? 'rgba(255, 59, 59, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                        color: log.tag === 'HOT' ? '#ff3b3b' : 'var(--accent-cyan)'
                                    }}>{log.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Detail View */}
                <div className="card" style={{ padding: '0px', display: 'flex', flexDirection: 'column', background: 'var(--bg-sidebar)' }}>
                    {/* Toolbar */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                +
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>+971 50 123 4567</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Online via WhatsApp</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary" style={{ padding: '8px' }}><Filter size={16} /></button>
                            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>TAKE OVER CHAT</button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        <div style={{ alignSelf: 'center', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            Today, February 18
                        </div>

                        {/* USER START */}
                        <div style={{ alignSelf: 'flex-end', maxWidth: '75%' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 14px', borderRadius: '14px 14px 2px 14px', fontSize: '0.85rem', border: '1px solid var(--border-glass)' }}>
                                Hi, I need help with your services.
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--text-secondary)', textAlign: 'right' }}>USER • 2:00 PM</div>
                        </div>

                        {/* BOT MENU (STEP 1) */}
                        <div style={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '14px 14px 14px 2px', fontSize: '0.85rem', whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                                Hi 👋 Thanks for contacting us.{"\n\n"}How can I help you today?{"\n"}Reply with a number:{"\n\n"}1️⃣ Get service details{"\n"}2️⃣ See our social media work{"\n"}3️⃣ Purchase a service{"\n"}4️⃣ Talk to our team{"\n"}5️⃣ Other query
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Bot size={10} /> BOT (STEP 1: MENU) • 2:00 PM
                            </div>
                        </div>

                        {/* USER SELECTS OPTION 3 */}
                        <div style={{ alignSelf: 'flex-end', maxWidth: '75%' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 14px', borderRadius: '14px 14px 2px 14px', fontSize: '0.85rem', border: '1px solid var(--border-glass)' }}>
                                3
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--text-secondary)', textAlign: 'right' }}>USER • 2:02 PM</div>
                        </div>

                        {/* BOT OPTION HANDLING (STEP 2) */}
                        <div style={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '10px 14px', borderRadius: '14px 14px 14px 2px', fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
                                Great 👍 Please share:{"\n"}• Service name{"\n"}• Budget range
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Bot size={10} /> BOT (STEP 2: OPTION 3) • 2:02 PM
                            </div>
                        </div>

                        {/* TAG NOTIFICATION */}
                        <div style={{ alignSelf: 'center', padding: '8px 16px', background: 'rgba(255, 59, 59, 0.05)', border: '1px solid rgba(255, 59, 59, 0.1)', borderRadius: '12px', fontSize: '0.7rem', color: '#ff3b3b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={12} /> SYSTEM: LEAD MARKED AS **HOT** (PURCHASE INTENT)
                        </div>

                    </div>

                    {/* Message Input */}
                    <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="search-box" style={{ flex: 1, padding: '12px 16px' }}>
                                <input type="text" placeholder="Type a message to manually take over..." style={{ fontSize: '0.85rem' }} />
                            </div>
                            <button className="btn btn-primary">SEND</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
