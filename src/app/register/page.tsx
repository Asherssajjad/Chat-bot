'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="card animate-in" style={{ width: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div className="icon-box" style={{ background: 'var(--accent-cyan)', width: '50px', height: '50px', margin: '0 auto 16px' }}>
                        <Zap size={24} color="white" fill="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Join the future of WhatsApp Automation</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(255, 59, 59, 0.1)', color: '#ff3b3b', padding: '12px', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>FULL NAME</label>
                        <div className="search-box" style={{ width: '100%', padding: '12px 16px' }}>
                            <User size={16} color="var(--text-secondary)" />
                            <input
                                type="text"
                                placeholder="Mark Johnson"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>EMAIL ADDRESS</label>
                        <div className="search-box" style={{ width: '100%', padding: '12px 16px' }}>
                            <Mail size={16} color="var(--text-secondary)" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>PASSWORD</label>
                        <div className="search-box" style={{ width: '100%', padding: '12px 16px' }}>
                            <Lock size={16} color="var(--text-secondary)" />
                            <input
                                type="password"
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '14px', marginTop: '10px' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'CREATING ACCOUNT...' : <>{'GET STARTED FREE'} <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>Login</Link>
                </div>
            </div>
        </div>
    );
}
