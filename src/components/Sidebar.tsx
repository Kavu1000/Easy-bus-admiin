'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    TicketIcon,
    TruckIcon,
    ChartBarIcon,
    UsersIcon,
    Cog6ToothIcon,
    BellIcon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Check-In / Check-Out', href: '/checkin', icon: TicketIcon },
    { name: 'Bus Status', href: '/buses', icon: TruckIcon },
    { name: 'Passenger Management', href: '/passengers', icon: UsersIcon },
    { name: 'Notifications', href: '/notifications', icon: BellIcon },
    { name: 'Activity Log', href: '/activities', icon: ClipboardDocumentListIcon },
    { name: 'Reports & Statistics', href: '/reports', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">BS</span>
                            </div>
                            <span className="font-bold text-gray-900">Bus Station</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
                    >
                        {isCollapsed ? (
                            <ChevronRightIcon className="h-5 w-5" />
                        ) : (
                            <ChevronLeftIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        {!isCollapsed && (
                                            <span className="ml-3 truncate">{item.name}</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Station Info */}
                {!isCollapsed && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">Current Station</h4>
                            <p className="text-xs text-gray-600">Mo Chit Bus Terminal</p>
                            <p className="text-xs text-gray-600">Chatuchak, Bangkok</p>
                        </div>
                    </div>
                )}

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="ml-3">Log Out</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
