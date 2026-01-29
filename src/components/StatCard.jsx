import './StatCard.css';

const StatCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
    return (
        <div className={`stat-card stat-card-${color}`}>
            <div className="stat-icon">
                <Icon size={24} />
            </div>
            <div className="stat-content">
                <p className="stat-label">{label}</p>
                <h3 className="stat-value">{value}</h3>
                {trend && (
                    <p className={`stat-trend ${trend.direction}`}>
                        {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
