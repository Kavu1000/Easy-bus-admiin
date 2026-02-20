interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
    subtitle?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const colorClasses = {
    blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200'
    },
    green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-200'
    },
    yellow: {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        border: 'border-yellow-200'
    },
    purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        border: 'border-purple-200'
    },
    red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        border: 'border-red-200'
    }
};

export default function StatsCard({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
    trend
}: StatsCardProps) {
    const colors = colorClasses[color];

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 border ${colors.border}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <div className="flex items-center mt-2">
                            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {trend.isPositive ? '+' : ''}{trend.value}%
                            </span>
                            <span className="text-xs text-gray-500 ml-1">vs. yesterday</span>
                        </div>
                    )}
                </div>
                <div className={`${colors.bg} rounded-lg p-3`}>
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
            </div>
        </div>
    );
}
