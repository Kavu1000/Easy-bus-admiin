'use client';

import { useRouter } from 'next/navigation';
import {
    ExclamationTriangleIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XMarkIcon,
    ClockIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Notification {
    id: string;
    type: 'warning' | 'info' | 'success' | 'error';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    details?: string;
    actions?: {
        label: string;
        action: () => void;
    }[];
}

interface NotificationDetailProps {
    notification: Notification;
    onClose: () => void;
}

const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'warning':
            return ExclamationTriangleIcon;
        case 'info':
            return InformationCircleIcon;
        case 'success':
            return CheckCircleIcon;
        case 'error':
            return ExclamationTriangleIcon;
        default:
            return InformationCircleIcon;
    }
};

const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
        case 'warning':
            return {
                icon: 'text-yellow-600',
                bg: 'bg-yellow-50',
                border: 'border-yellow-200'
            };
        case 'info':
            return {
                icon: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200'
            };
        case 'success':
            return {
                icon: 'text-green-600',
                bg: 'bg-green-50',
                border: 'border-green-200'
            };
        case 'error':
            return {
                icon: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200'
            };
        default:
            return {
                icon: 'text-gray-600',
                bg: 'bg-gray-50',
                border: 'border-gray-200'
            };
    }
};

export default function NotificationDetail({ notification, onClose }: NotificationDetailProps) {
    const router = useRouter();
    const Icon = getNotificationIcon(notification.type);
    const colors = getNotificationColor(notification.type);

    const handleActionClick = (actionFn: () => void) => {
        actionFn();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b ${colors.border} ${colors.bg}`}>
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full bg-white ${colors.icon}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {notification.time}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                            {notification.message}
                        </p>

                        {notification.details && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                <h3 className="font-semibold text-gray-900 mb-2">Additional Details</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {notification.details}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {notification.actions && notification.actions.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                            <div className="space-y-2">
                                {notification.actions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleActionClick(action.action)}
                                        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                                    >
                                        <span className="font-medium text-gray-900">{action.label}</span>
                                        <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            router.push('/notifications');
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        View All Notifications
                    </button>
                </div>
            </div>
        </div>
    );
}
