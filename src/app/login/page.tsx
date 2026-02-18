'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
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
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/user');
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
                    <div className="icon-box" style={{ background: 'var(--accent-blue)', width: '50px', height: '50px', margin: '0 auto 16px' }}>
                        <Zap size={24} color="white" fill="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Login to manage your ASHER BOT</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(255, 59, 59, 0.1)', color: '#ff3b3b', padding: '12px', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                placeholder="••••••••"
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
                        {isLoading ? 'SECURE LOGGING IN...' : <>{'LOGIN TO DASHBOARD'} <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link href="/register" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>Sign up</Link>
                </div>
            </div>
        </div>
    );
}
