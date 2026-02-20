
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Bus,
    Calendar,
    ClipboardList,
    Settings,
    LogOut,
    Ticket,
    BarChart3
} from 'lucide-react';

const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/', label: 'ໜ້າຫຼັກ (Dashboard)', icon: LayoutDashboard },
        { path: '/bus-schedule', label: 'ຕາຕະລາງເດີນລົດ', icon: Calendar },
        { path: '/bus-management', label: 'ຈັດການລົດເມ', icon: Bus },
        { path: '/passenger-management', label: 'ຈັດການຜູ້ໂດຍສານ', icon: Users },
        { path: '/check-in-out', label: 'ລະບົບ Check-in/out', icon: Ticket },
        { path: '/report', label: 'ລາຍງານ', icon: BarChart3 },
        { path: '/setting', label: 'ຕັ້ງຄ່າ', icon: Settings },
    ];

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/login');
    };

    return (
        <div className="w-64 bg-white shadow-lg flex flex-col h-full border-r border-gray-200">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-center">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Bus className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Easy Bus</h1>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    ອອກຈາກລະບົບ
                </button>
            </div>
        </div>
    );
};

export default SideNav;
