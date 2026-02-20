'use client';

import { useState, useEffect } from 'react';
import {
    HomeIcon,
    TicketIcon,
    TruckIcon,
    ChartBarIcon,
    BellIcon,
    UsersIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {
    BellIcon as BellSolidIcon
} from '@heroicons/react/24/solid';

import MainLayout from './MainLayout';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import BusSchedule from './BusSchedule';
import Notifications from './Notifications';

interface DashboardStats {
    totalPassengers: number;
    checkedIn: number;
    pending: number;
    activeBuses: number;
    onTime: number;
    delayed: number;
    revenue: number;
    alerts: number;
}

export default function Dashboard() {
    // Mock data for dashboard
    const [stats] = useState<DashboardStats>({
        totalPassengers: 342,
        checkedIn: 289,
        pending: 53,
        activeBuses: 24,
        onTime: 20,
        delayed: 4,
        revenue: 125400,
        alerts: 3
    });


    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Today's Passengers"
                        value={stats.totalPassengers.toLocaleString()}
                        icon={UsersIcon}
                        color="blue"
                        subtitle={`${stats.checkedIn} checked in`}
                    />
                    <StatsCard
                        title="Pending Check-In"
                        value={stats.pending.toLocaleString()}
                        icon={TicketIcon}
                        color="yellow"
                        subtitle="Needs attention"
                    />
                    <StatsCard
                        title="Active Buses"
                        value={stats.activeBuses.toLocaleString()}
                        icon={TruckIcon}
                        color="green"
                        subtitle={`On time ${stats.onTime} | Delayed ${stats.delayed}`}
                    />
                    <StatsCard
                        title="Today's Revenue"
                        value={`฿${stats.revenue.toLocaleString()}`}
                        icon={ChartBarIcon}
                        color="purple"
                        subtitle="Last updated"
                    />
                </div>

                {/* Quick Actions and Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <QuickActions />
                    </div>
                    <div className="lg:col-span-2">
                        <BusSchedule />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentActivity />

                    {/* Status Overview */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    <span className="text-green-800 font-medium">Booking System</span>
                                </div>
                                <span className="text-green-600 text-sm">Operational</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    <span className="text-green-800 font-medium">Payment System</span>
                                </div>
                                <span className="text-green-600 text-sm">Operational</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                                    <span className="text-yellow-800 font-medium">SMS Notifications</span>
                                </div>
                                <span className="text-yellow-600 text-sm">Minor Delay</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    <span className="text-green-800 font-medium">Bus Tracking</span>
                                </div>
                                <span className="text-green-600 text-sm">Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
