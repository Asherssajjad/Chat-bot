'use client';

import React, { useState } from 'react';
import { Activity, MessageSquare, Phone, Server, CheckCircle, Zap } from 'lucide-react';

export default function WhatsAppTest() {
    const [infoData, setInfoData] = useState<any>(null);
    const [infoLoading, setInfoLoading] = useState(false);
    const [infoError, setInfoError] = useState('');

    const [testPhone, setTestPhone] = useState('');
    const [testMessage, setTestMessage] = useState('Hello from Asher Bot! 🚀 The API is connected correctly.');
    const [msgLoading, setMsgLoading] = useState(false);
    const [msgResult, setMsgResult] = useState<any>(null);

    const fetchInfo = async () => {
        setInfoLoading(true);
        setInfoError('');
        setInfoData(null);
        try {
            const res = await fetch('/api/whatsapp-test');
            const data = await res.json();
            if (data.success) {
                setInfoData(data);
            } else {
                setInfoError(data.error);
            }
        } catch (e: any) {
            setInfoError(e.message);
        } finally {
            setInfoLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!testPhone) {
            alert('Please enter a destination phone number (with country code, e.g. 971501234567)');
            return;
        }
        setMsgLoading(true);
        setMsgResult(null);
        try {
            const res = await fetch('/api/whatsapp-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toPhone: testPhone, message: testMessage })
            });
            const data = await res.json();
            setMsgResult(data);
        } catch (e: any) {
            setMsgResult({ success: false, error: e.message });
        } finally {
            setMsgLoading(false);
        }
    };

    return (
        <div className="animate-in" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>WhatsApp Connection Test</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Verify your Meta API tokens and send direct test messages without Webhooks.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <Server size={20} color="var(--accent-blue)" /> Read API Status
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Fetches your connected Phone ID and Business Account from Meta directly using the Token. This verifies your API connection is alive.
                    </p>
                    <button className="btn btn-primary" onClick={fetchInfo} disabled={infoLoading} style={{ width: '100%' }}>
                        {infoLoading ? 'FETCHING...' : 'TEST API CONNECTION'}
                    </button>

                    {infoError && <div style={{ marginTop: '16px', color: '#ff3b3b', fontSize: '0.8rem', background: 'rgba(255, 59, 59, 0.1)', padding: '12px', borderRadius: '8px' }}>{infoError}</div>}

                    {infoData && (
                        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontSize: '0.75rem', overflowX: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '12px', fontWeight: 800 }}>
                                <CheckCircle size={16} /> CONNECTION SUCCESSFUL
                            </div>
                            <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                                {JSON.stringify(infoData, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <MessageSquare size={20} color="var(--accent-cyan)" /> Send Test Message
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Send an outbound text message from your registered WhatsApp Business Number directly to any phone.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                        <div className="search-box" style={{ width: '100%', padding: '12px' }}>
                            <Phone size={16} color="var(--text-secondary)" />
                            <input
                                type="text"
                                placeholder="To: eg 971501234567"
                                value={testPhone}
                                onChange={e => setTestPhone(e.target.value)}
                            />
                        </div>
                        <div className="search-box" style={{ width: '100%', padding: '12px' }}>
                            <input
                                type="text"
                                placeholder="Message content"
                                value={testMessage}
                                onChange={e => setTestMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="btn btn-secondary" onClick={sendMessage} disabled={msgLoading} style={{ width: '100%' }}>
                        {msgLoading ? 'SENDING...' : 'SEND OUTBOUND MESSAGE'}
                    </button>

                    {msgResult && (
                        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontSize: '0.8rem' }}>
                            {msgResult.success ? (
                                <div style={{ color: 'var(--accent-cyan)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle size={16} /> Message Sent Successfully!
                                </div>
                            ) : (
                                <div style={{ color: '#ff3b3b' }}>
                                    <strong>Failed:</strong> {msgResult.error}
                                    {msgResult.details?.error_user_title && <div>{msgResult.details.error_user_title}</div>}
                                </div>
                            )}
                            {msgResult.data && (
                                <pre style={{ marginTop: '12px', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                                    {JSON.stringify(msgResult.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
