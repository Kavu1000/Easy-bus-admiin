
import { Bell, User, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    {/* Page Title Placeholder - Can make dynamic per page if needed */}
                </div>

                <div className="flex items-center space-x-4">
                    {/* Current Time */}
                    <div className="hidden md:flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="font-mono text-sm font-medium" suppressHydrationWarning>
                            {currentTime ? formatTime(currentTime) : '--:--:--'}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500" suppressHydrationWarning>
                            {currentTime ? formatDate(currentTime) : ''}
                        </span>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-gray-800">ສົມຊາຍ ໃຈດີ</p>
                            <p className="text-xs text-gray-500">ເຈົ້າໜ້າທີ່ສະຖານີ</p>
                        </div>
                        <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <User className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
