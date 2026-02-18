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
    Zap
} from 'lucide-react';

const mockLogs = [
    { id: 1, sender: '+971 50 123 4567', lastMessage: 'I want to rent a car for 3 days', time: '2 mins ago', type: 'Flow (Car Booking)', unread: true },
    { id: 2, sender: '+971 52 987 6543', lastMessage: 'Where is your office located?', time: '15 mins ago', type: 'AI Fallback', unread: false },
    { id: 3, sender: '+971 55 444 3322', lastMessage: 'Thank you for the information', time: '1 hour ago', type: 'Flow (Car Booking)', unread: false },
    { id: 4, sender: '+44 7712 345678', lastMessage: 'Can I pay with credit card?', time: '3 hours ago', type: 'AI Fallback', unread: false },
    { id: 5, sender: '+971 58 111 2233', lastMessage: 'Hello Bareerah', time: '5 hours ago', type: 'Initial Prompt', unread: false },
];

export default function ChatHistory() {
    const [selectedChat, setSelectedChat] = useState(1);

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Chat History & Logs</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Real-time monitoring of all WhatsApp interactions.</p>
                </div>
                <div className="glass-card" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%' }}></span>
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
                                <div style={{ marginTop: '8px', fontSize: '0.65rem', fontWeight: 800, color: log.type.includes('AI') ? 'var(--accent-purple)' : 'var(--accent-cyan)' }}>
                                    {log.type.toUpperCase()}
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
                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div style={{ alignSelf: 'center', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            Today, February 18
                        </div>

                        <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '12px 16px', borderRadius: '16px 16px 16px 2px', fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                Hello! Welcome to Bareerah Car Rentals. Would you like to Book a Car or Check Availability?
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Bot size={10} /> SENT BY BOT • 2:00 PM
                            </div>
                        </div>

                        <div style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 16px', borderRadius: '16px 16px 2px 16px', fontSize: '0.85rem', border: '1px solid var(--border-glass)' }}>
                                I want to rent a car for 3 days
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                                USER • 2:01 PM
                            </div>
                        </div>

                        <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '12px 16px', borderRadius: '16px 16px 16px 2px', fontSize: '0.85rem' }}>
                                Awesome! We have Sedans, SUVs, and Luxury cars available. Which one do you prefer?
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Bot size={10} /> SENT BY BOT (HARDCODED FLOW) • 2:01 PM
                            </div>
                        </div>

                        <div style={{ alignSelf: 'center', padding: '8px 16px', background: 'rgba(1, 255, 140, 0.05)', border: '1px solid rgba(1, 255, 140, 0.1)', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={12} /> BOT SUCCESS: LEAD DATA EXTRACTED (DAYS: 3)
                        </div>

                    </div>

                    {/* Message Input (For takeover) */}
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
