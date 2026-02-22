'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    MessageSquare,
    Bot,
    User,
    Send,
    Mic,
    RefreshCw,
    MoreVertical,
    Activity,
    Smartphone,
    Terminal
} from 'lucide-react';
import { NICHE_FLOWS } from '@/lib/niche-flows';

type ChatMessage = {
    id: number;
    sender: 'user' | 'bot' | 'system';
    text: string;
    type: 'text' | 'audio';
    timestamp: string;
    flowSource?: string; // 'FLOW' | 'AI' | 'VOICE_FLOW'
    tag?: string; // 'HOT' | 'WARM'
};

export default function BotSimulator() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            sender: 'bot',
            text: NICHE_FLOWS['LEAD_REPLY_AGENT'].initialMessage,
            type: 'text',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            flowSource: 'FLOW'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('LEAD_REPLY_AGENT');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text: string, type: 'text' | 'audio') => {
        if (!text.trim() && type === 'text') return;

        // 1. Add User Message
        const userMsg: ChatMessage = {
            id: Date.now(),
            sender: 'user',
            text: type === 'audio' ? '🎤 Voice Note (0:12)' : text,
            type: type,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // 2. Simulate API Call
        try {
            const res = await fetch('/api/simulator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: type === 'audio' ? 'simulated_audio_content' : text,
                    niche: selectedNiche,
                    type: type
                })
            });

            const data = await res.json();
            const botResponse = data.botResponse;

            // 3. Add Bot Response
            const botMsg: ChatMessage = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botResponse.text,
                type: 'text',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                flowSource: botResponse.source,
                tag: botResponse.tag
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error(error);
            const errorMsg: ChatMessage = {
                id: Date.now() + 1,
                sender: 'system',
                text: 'Error connecting to bot engine.',
                type: 'text',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const resetChat = () => {
        setMessages([{
            id: Date.now(),
            sender: 'bot',
            text: NICHE_FLOWS[selectedNiche].initialMessage,
            type: 'text',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            flowSource: 'FLOW'
        }]);
    };

    return (
        <div className="animate-in" style={{ height: 'calc(100vh - 140px)', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '24px' }}>

            {/* Left: Chat Simulator */}
            <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>

                {/* Simulator Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bot size={20} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Bot Simulator</h3>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Activity size={12} className="pulse" /> Logic Engine Active
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            value={selectedNiche}
                            onChange={(e) => { setSelectedNiche(e.target.value); resetChat(); }}
                            style={{ background: 'var(--bg-main)', border: '1px solid var(--border-glass)', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            {Object.entries(NICHE_FLOWS).map(([key, flow]) => (
                                <option key={key} value={key}>{flow.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-secondary" style={{ padding: '8px' }} onClick={resetChat}>
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'var(--bg-sidebar)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                            animation: 'fadeIn 0.3s ease'
                        }}>
                            {/* Message metadata for Bot */}
                            {msg.sender === 'bot' && (
                                <div style={{ marginBottom: '6px', fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Bot size={12} /> BOT • <span style={{
                                        color: msg.flowSource === 'AI' ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                                        fontWeight: 800
                                    }}>{msg.flowSource} MODE</span>
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div style={{
                                padding: '14px 18px',
                                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                                background: msg.sender === 'user' ? 'rgba(255,255,255,0.05)' : 'var(--accent-blue)',
                                border: msg.sender === 'user' ? '1px solid var(--border-glass)' : 'none',
                                color: 'white',
                                fontSize: '0.9rem',
                                whiteSpace: 'pre-line',
                                lineHeight: '1.5',
                                boxShadow: msg.sender === 'bot' ? '0 4px 12px rgba(0, 117, 255, 0.2)' : 'none'
                            }}>
                                {msg.text}
                            </div>

                            {/* Tags or Time */}
                            <div style={{ marginTop: '6px', fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: msg.sender === 'user' ? 'right' : 'left', display: 'flex', gap: '8px', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                <span>{msg.timestamp}</span>
                                {msg.tag && (
                                    <span style={{
                                        color: msg.tag === 'HOT' ? '#ff3b3b' : 'var(--accent-cyan)',
                                        fontWeight: 800,
                                        background: msg.tag === 'HOT' ? 'rgba(255, 59, 59, 0.1)' : 'rgba(1, 255, 140, 0.1)',
                                        padding: '0 6px',
                                        borderRadius: '4px'
                                    }}>
                                        {msg.tag} LEAD
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{ alignSelf: 'flex-start', padding: '12px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: '18px', display: 'flex', gap: '4px' }}>
                            <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
                            <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                            <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '20px', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="search-box" style={{ flex: 1, padding: '12px 16px' }}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText, 'text')}
                                style={{ fontSize: '0.9rem' }}
                            />
                        </div>
                        <button
                            className="btn btn-secondary"
                            style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)' }}
                            title="Simulate Voice Note"
                            onClick={() => handleSendMessage('Simulated Voice Note', 'audio')}
                        >
                            <Mic size={20} color="var(--accent-purple)" />
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ padding: '12px 24px' }}
                            onClick={() => handleSendMessage(inputText, 'text')}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Debug & Logic Panel */}
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Terminal size={18} /> Logic Debugger
                    </h3>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                        <div style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>// Current Engine State</div>
                        <div>Niche: <span style={{ color: 'white' }}>{selectedNiche}</span></div>
                        <div>Mode: <span style={{ color: 'white' }}>HYBRID (Flow + AI)</span></div>
                        <div>Voice API: <span style={{ color: 'white' }}>Mocked (Whisper-1)</span></div>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>How it works (Voice)</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                        1. User sends voice note (WhatsApp Audio).
                        <br />2. Server downloads .ogg file.
                        <br />3. Send to <strong>OpenAI Whisper</strong> for transcription.
                        <br />4. Text result fed into Flow Engine.
                    </p>
                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem' }}>CONFIGURE WHISPER API</button>
                </div>

                {/* Legend */}
                <div style={{ marginTop: 'auto' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Response Types</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                            <div style={{ width: '10px', height: '10px', background: 'var(--accent-cyan)', borderRadius: '2px' }}></div>
                            <span>Hardcoded Flow (Zero Cost)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                            <div style={{ width: '10px', height: '10px', background: 'var(--accent-purple)', borderRadius: '2px' }}></div>
                            <span>AI Fallback (Claude/GPT)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
