'use client';

import React, { useState, useEffect } from 'react';
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
    ExternalLink,
    RefreshCw
} from 'lucide-react';

export default function ChatHistory() {
    const [logs, setLogs] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [leadInfo, setLeadInfo] = useState<any>(null);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/history');
            const data = await res.json();
            if (data.logs) {
                setLogs(data.logs);
                if (data.logs.length > 0 && !selectedChat) {
                    setSelectedChat(data.logs[0].id);
                }
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (leadId: string) => {
        try {
            setLoadingMessages(true);
            const res = await fetch(`/api/admin/history/${leadId}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
                setLeadInfo(data.lead);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat);
        }
    }, [selectedChat]);

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Chat History & Logs</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Real-time monitoring of all Lead Agent interactions.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={fetchLogs}
                        className="btn btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        REFRESH
                    </button>
                    <div className="glass-card" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
                        BOT STATUS: <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>ACTIVE</span>
                    </div>
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
                        {loading && logs.length === 0 ? (
                            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading chats...</div>
                        ) : logs.length === 0 ? (
                            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No conversations found yet.</div>
                        ) : (
                            logs.map((log) => (
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                        <div style={{ width: '32px', height: '32px', background: 'var(--bg-sidebar)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Smartphone size={14} color="var(--text-secondary)" />
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{log.name || log.sender}</div>
                                        <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                                            {new Date(log.time).toLocaleDateString() === new Date().toLocaleDateString()
                                                ? formatTime(log.time)
                                                : new Date(log.time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {log.lastMessage}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                        <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>{log.type}</span>
                                        <span style={{
                                            fontSize: '0.6rem',
                                            fontWeight: 800,
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            background: log.tag === 'HOT' ? 'rgba(255, 59, 59, 0.1)' : log.tag === 'WARM' ? 'rgba(255, 165, 0, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                            color: log.tag === 'HOT' ? '#ff3b3b' : log.tag === 'WARM' ? '#ffa500' : 'var(--accent-cyan)'
                                        }}>{log.tag}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Detail View */}
                <div className="card" style={{ padding: '0px', display: 'flex', flexDirection: 'column', background: 'var(--bg-sidebar)' }}>
                    {!selectedChat ? (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', flexDirection: 'column', gap: '16px' }}>
                            <MessageSquare size={48} opacity={0.1} />
                            <p>Select a conversation to view details</p>
                        </div>
                    ) : (
                        <>
                            {/* Toolbar */}
                            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>
                                        {(leadInfo?.name || leadInfo?.phone || '+')[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{leadInfo?.name || leadInfo?.phone}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>WhatsApp Lead</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn btn-secondary" style={{ padding: '8px' }}><MoreVertical size={16} /></button>
                                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>TAKE OVER CHAT</button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {loadingMessages ? (
                                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Loading messages...</div>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <div key={msg.id || idx} style={{ alignSelf: msg.sender === 'USER' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                                            <div style={{
                                                background: msg.sender === 'USER' ? 'rgba(255,255,255,0.05)' : 'var(--accent-blue)',
                                                color: 'white',
                                                padding: '10px 14px',
                                                borderRadius: msg.sender === 'USER' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                                                fontSize: '0.85rem',
                                                border: msg.sender === 'USER' ? '1px solid var(--border-glass)' : 'none',
                                                whiteSpace: 'pre-line'
                                            }}>
                                                {msg.message}
                                            </div>
                                            <div style={{
                                                marginTop: '4px',
                                                fontSize: '0.6rem',
                                                color: 'var(--text-secondary)',
                                                textAlign: msg.sender === 'USER' ? 'right' : 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                justifyContent: msg.sender === 'USER' ? 'flex-end' : 'flex-start'
                                            }}>
                                                {msg.sender !== 'USER' && <Bot size={10} />}
                                                {msg.sender} • {formatTime(msg.createdAt)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Message Input Container (Placeholder) */}
                            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div className="search-box" style={{ flex: 1, padding: '12px 16px' }}>
                                        <input type="text" placeholder="Type a message to manually take over..." style={{ fontSize: '0.85rem' }} disabled />
                                    </div>
                                    <button className="btn btn-primary" disabled>SEND</button>
                                </div>
                                <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>Manual takeover is currently in read-only mode.</p>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
