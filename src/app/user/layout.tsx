import Sidebar from '@/components/Sidebar';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dashboard-container">
            <Sidebar isAdmin={false} />
            <main className="main-content">
                <div className="header-nav">
                    <div className="breadcrumb">
                        Client Portal / <span>Active Bot Overview</span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div className="search-box">
                            <input type="text" placeholder="Quick Search Leads..." />
                        </div>
                        <button className="btn btn-primary" style={{ height: '35px', fontSize: '0.7rem' }}>WHATSAPP CONNECT</button>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
