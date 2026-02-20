'use client';

import { useRouter } from 'next/navigation';
import {
    QrCodeIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    PlusIcon,
    PrinterIcon
} from '@heroicons/react/24/outline';

const quickActions = [
    {
        name: 'Scan QR Code',
        description: 'Check in passengers',
        icon: QrCodeIcon,
        color: 'blue',
        href: '/checkin'
    },
    {
        name: 'Passenger Management',
        description: 'Search and manage records',
        icon: MagnifyingGlassIcon,
        color: 'green',
        href: '/passengers'
    },
    {
        name: 'Report Issue',
        description: 'Report a service problem',
        icon: ExclamationTriangleIcon,
        color: 'red',
        action: 'report-issue'
    },
    {
        name: 'View Reports',
        description: 'Statistics and reports',
        icon: DocumentTextIcon,
        color: 'purple',
        href: '/reports'
    },
    {
        name: 'Add Passenger',
        description: 'Register a new passenger',
        icon: PlusIcon,
        color: 'yellow',
        action: 'add-passenger'
    },
    {
        name: 'Notifications',
        description: 'View all notifications',
        icon: PrinterIcon,
        color: 'gray',
        href: '/notifications'
    }
];

const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    red: 'bg-red-100 text-red-600 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
    gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
};

export default function QuickActions() {
    const router = useRouter();

    const handleActionClick = (action: typeof quickActions[0]) => {
        if (action.href) {
            router.push(action.href);
        } else if (action.action) {
            switch (action.action) {
                case 'report-issue':
                    // Show report issue modal or navigate to issue form
                    alert('Opening issue report form');
                    break;
                case 'add-passenger':
                    // Navigate to passenger management and trigger add modal
                    router.push('/passengers?action=add');
                    break;
                default:
                    console.log(`Action: ${action.action}`);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.name}
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm text-left hover:bg-gray-50"
                            onClick={() => handleActionClick(action)}
                        >
                            <div className={`p-2 rounded-lg ${colorClasses[action.color as keyof typeof colorClasses]} mr-3`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{action.name}</p>
                                <p className="text-xs text-gray-500 truncate">{action.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
