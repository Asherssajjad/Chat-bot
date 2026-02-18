'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0, 117, 255, 0.2) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(1, 255, 140, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0
      }}></div>

      {/* Navbar */}
      <nav style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.25rem', fontWeight: 800 }}>
          <div className="icon-box" style={{ background: 'var(--accent-blue)', width: '35px', height: '35px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Zap size={18} color="white" fill="white" style={{ margin: 'auto' }} />
          </div>
          <span>VISION AI</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/admin" className="nav-item" style={{ marginBottom: 0 }}>Admin Panel</Link>
          <Link href="/user" className="btn btn-primary" style={{ padding: '10px 24px' }}>GET STARTED</Link>
        </div>
      </nav >

      {/* Hero Section */}
      < main style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '32px' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>NEW</span> Version 2.0 is now live
          </div>
          <h1 style={{ fontSize: '5rem', marginBottom: '24px', lineHeight: '1', fontWeight: 800, background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            The Premium <span style={{ color: 'var(--accent-blue)' }}>WhatsApp SaaS</span> for Automation
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', marginInline: 'auto', lineHeight: '1.6' }}>
            Scale your business with intelligent hybrid flows. Hardcoded responses for efficiency, AI fallback for complexity.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link href="/user" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem' }}>
              Create Your Bot <ArrowRight size={18} />
            </Link>
            <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1rem', background: 'transparent', border: '1px solid var(--border-glass)' }}>
              View Demo
            </button>
          </div>
        </div>

        {/* Mockup Preview */}
        <div style={{ marginTop: '80px', maxWidth: '1200px', marginInline: 'auto', position: 'relative' }}>
          <div style={{ border: '8px solid rgba(255,255,255,0.05)', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Preview" style={{ width: '100%', display: 'block' }} />
          </div>
          {/* Floating Badges */}
          <div className="card glass-card" style={{ position: 'absolute', top: '20%', left: '-5%', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 color="var(--accent-cyan)" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Lead Captured</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Just now via WhatsApp</div>
            </div>
          </div>
        </div>
      </main >

      {/* Feature Grid */}
      < section style={{ padding: '100px 20px', maxWidth: '1200px', marginInline: 'auto' }}>
        <div className="grid-container">
          <div className="card">
            <Zap color="var(--accent-blue)" style={{ marginBottom: '16px' }} />
            <h3>Hybrid Intelligence</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.6' }}>
              Save 90% on API costs by using pre-defined hardcoded flows for regular inquiries.
            </p>
          </div>
          <div className="card">
            <Bot color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
            <h3>Claude Powered</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.6' }}>
              Natural language fallback using the latest AI models for complex customer queries.
            </p>
          </div>
          <div className="card">
            <ShieldCheck color="#f59e0b" style={{ marginBottom: '16px' }} />
            <h3>Multi-tenant</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.6' }}>
              Total data isolation for every client. Secure, private, and scalable.
            </p>
          </div>
          <div className="card">
            <ArrowRight color="var(--accent-blue)" style={{ marginBottom: '16px' }} />
            <h3>Lead CRM</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.6' }}>
              Automatically extract user data and export to CSV or your favorite CRM tools.
            </p>
          </div>
        </div>
      </section >
    </div >
  );
}
