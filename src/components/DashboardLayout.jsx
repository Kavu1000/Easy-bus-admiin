import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                {title && (
                    <div className="page-header">
                        <h1 className="page-title">{title}</h1>
                    </div>
                )}
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
