import Sidebar from '@/components/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <div className="header-nav">
                    <div className="breadcrumb">
                        Master Control / <span>System Overview</span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div className="search-box">
                            <input type="text" placeholder="Search Nodes..." />
                        </div>
                        <button className="btn btn-primary" style={{ height: '35px', fontSize: '0.7rem' }}>SYNC ALL NODES</button>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
