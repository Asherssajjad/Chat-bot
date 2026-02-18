'use client';

import React from 'react';

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyItems: 'center', textAlign: 'center' }}>
            <div style={{ margin: 'auto' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{title}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>This module is currently being optimized for the Bareerah Bot SaaS platform.</p>
                <button className="btn btn-primary" style={{ marginTop: '24px', marginInline: 'auto' }}>Coming Soon</button>
            </div>
        </div>
    );
};

export default PlaceholderPage;
