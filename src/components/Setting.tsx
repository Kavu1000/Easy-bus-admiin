
'use client';

import { useState } from 'react';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    ShieldCheck,
    FileText,
    Smartphone
} from 'lucide-react';
import MainLayout from './MainLayout';

interface UserSettings {
    name: string;
    email: string;
    phone: string;
    position: string;
    stationId: string;
}

interface NotificationSettings {
    busDelays: boolean;
    newBookings: boolean;
    systemAlerts: boolean;
    dailyReports: boolean;
    maintenance: boolean;
}

interface SystemSettings {
    theme: 'light' | 'dark' | 'auto';
    language: 'la' | 'en';
    timezone: string;
    autoLogout: number;
    displayDensity: 'compact' | 'comfortable' | 'spacious';
}

export default function Setting() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'system' | 'security' | 'about'>('profile');
    const [userSettings, setUserSettings] = useState<UserSettings>({
        name: 'ສົມຊາຍ ໃຈດີ',
        email: 'somchai@busstation.com',
        phone: '020 5555 1234',
        position: 'ເຈົ້າໜ້າທີ່ສະຖານີ',
        stationId: 'VTE-001'
    });

    const [notifications, setNotifications] = useState<NotificationSettings>({
        busDelays: true,
        newBookings: true,
        systemAlerts: true,
        dailyReports: false,
        maintenance: true
    });

    const [systemSettings, setSystemSettings] = useState<SystemSettings>({
        theme: 'light',
        language: 'la',
        timezone: 'Asia/Vientiane',
        autoLogout: 30,
        displayDensity: 'comfortable'
    });

    const handleSaveProfile = () => {
        alert('ບັນທຶກຂໍ້ມູນສ່ວນຕົວຮຽບຮ້ອຍແລ້ວ');
    };

    const handleSaveNotifications = () => {
        alert('ບັນທຶກການຕັ້ງຄ່າການແຈ້ງເຕືອນຮຽບຮ້ອຍແລ້ວ');
    };

    const handleSaveSystem = () => {
        alert('ບັນທຶກການຕັ້ງຄ່າລະບົບຮຽບຮ້ອຍແລ້ວ');
    };

    const handleChangePassword = () => {
        alert('ລະບົບຈະສົ່ງລິ້ງປ່ຽນລະຫັດຜ່ານໄປຍັງອີເມວຂອງທ່ານ');
    };

    const handleLogoutAllDevices = () => {
        if (confirm('ທ່ານຕ້ອງການອອກຈາກລະບົບໃນອຸປະກອນທັງໝົດແມ່ນບໍ່?')) {
            alert('ອອກຈາກລະບົບໃນອຸປະກອນທັງໝົດຮຽບຮ້ອຍແລ້ວ');
        }
    };

    const tabs = [
        { key: 'profile', label: 'ຂໍ້ມູນສ່ວນຕົວ', icon: User },
        { key: 'notifications', label: 'ການແຈ້ງເຕືອນ', icon: Bell },
        { key: 'system', label: 'ການຕັ້ງຄ່າລະບົບ', icon: SettingsIcon },
        { key: 'security', label: 'ຄວາມປອດໄພ', icon: ShieldCheck },
        { key: 'about', label: 'ກ່ຽວກັບ', icon: FileText }
    ];

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">ຕັ້ງຄ່າ</h1>
                    <p className="text-sm text-gray-600">ຈັດການການຕັ້ງຄ່າບັນຊີແລະລະບົບ</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row min-h-[600px] overflow-hidden">
                    {/* Settings Navigation */}
                    <nav className="w-full md:w-64 border-r border-gray-200 bg-gray-50 md:bg-white">
                        <div className="p-2 md:py-4">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key as any)}
                                        className={`w-full flex items-center px-4 md:px-6 py-3 text-left transition-colors ${activeTab === tab.key
                                            ? 'bg-blue-50 text-blue-700 md:border-r-2 md:border-blue-500 rounded-lg md:rounded-none'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        <div className="max-w-4xl">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">ຂໍ້ມູນສ່ວນຕົວ</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                                ຊື່-ນາມສະກຸນ
                                            </label>
                                            <input
                                                type="text"
                                                value={userSettings.name}
                                                onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                                                className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                                ອີເມວ
                                            </label>
                                            <input
                                                type="email"
                                                value={userSettings.email}
                                                onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                                                className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                                ເບີໂທລະສັບ
                                            </label>
                                            <input
                                                type="tel"
                                                value={userSettings.phone}
                                                onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
                                                className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                                ຕຳແໜ່ງ
                                            </label>
                                            <input
                                                type="text"
                                                value={userSettings.position}
                                                readOnly
                                                className="w-full border-2 border-gray-300 bg-gray-100 rounded-lg px-4 py-3 text-gray-700 cursor-not-allowed"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                                ລະຫັດສະຖານີ
                                            </label>
                                            <input
                                                type="text"
                                                value={userSettings.stationId}
                                                readOnly
                                                className="w-full border-2 border-gray-300 bg-gray-100 rounded-lg px-4 py-3 text-gray-700 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            ບັນທຶກການປ່ຽນແປງ
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">ການຕັ້ງຄ່າການແຈ້ງເຕືອນ</h2>

                                    <div className="space-y-6">
                                        {[
                                            { key: 'busDelays', label: 'ລົດເມຊັກຊ້າ', description: 'ແຈ້ງເຕືອນເມື່ອລົດເມຊັກຊ້າກວ່າເວລາທີ່ກຳນົດ' },
                                            { key: 'newBookings', label: 'ການຈອງໃໝ່', description: 'ແຈ້ງເຕືອນເມື່ອມີການຈອງປີ້ໃໝ່' },
                                            { key: 'systemAlerts', label: 'ແຈ້ງເຕືອນລະບົບ', description: 'ແຈ້ງເຕືອນກ່ຽວກັບລະບົບແລະການອັບເດດ' },
                                            { key: 'dailyReports', label: 'ລາຍງານປະຈຳວັນ', description: 'ສົ່ງລາຍງານສະຫຼຸບປະຈຳວັນທາງອີເມວ' },
                                            { key: 'maintenance', label: 'ການບຳລຸງຮັກສາ', description: 'ແຈ້ງເຕືອນກ່ຽວກັບການບຳລຸງຮັກສາລົດເມ' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key as keyof NotificationSettings]}
                                                        onChange={(e) => setNotifications({
                                                            ...notifications,
                                                            [item.key]: e.target.checked
                                                        })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleSaveNotifications}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            ບັນທຶກການຕັ້ງຄ່າ
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'system' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">ການຕັ້ງຄ່າລະບົບ</h2>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                                    ຮູບແບບ (Theme)
                                                </label>
                                                <select
                                                    value={systemSettings.theme}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value as any })}
                                                    className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none font-medium"
                                                >
                                                    <option value="light">ແຈ້ງ (Light)</option>
                                                    <option value="dark">ມືດ (Dark)</option>
                                                    <option value="auto">ອັດຕະໂນມັດ</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                                    ພາສາ
                                                </label>
                                                <select
                                                    value={systemSettings.language}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value as any })}
                                                    className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none font-medium"
                                                >
                                                    <option value="la">ລາວ (Lao)</option>
                                                    <option value="en">English</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                                    ການອອກຈາກລະບົບອັດຕະໂນມັດ (ນາທີ)
                                                </label>
                                                <select
                                                    value={systemSettings.autoLogout}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, autoLogout: Number(e.target.value) })}
                                                    className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none font-medium"
                                                >
                                                    <option value={15}>15 ນາທີ</option>
                                                    <option value={30}>30 ນາທີ</option>
                                                    <option value={60}>1 ຊົ່ວໂມງ</option>
                                                    <option value={120}>2 ຊົ່ວໂມງ</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                                    ຄວາມໜາແໜ້ນການສະແດງຜົນ
                                                </label>
                                                <select
                                                    value={systemSettings.displayDensity}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, displayDensity: e.target.value as any })}
                                                    className="w-full border-2 border-gray-400 bg-white rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none font-medium"
                                                >
                                                    <option value="compact">ກະທັດຮັດ</option>
                                                    <option value="comfortable">ສະບາຍ</option>
                                                    <option value="spacious">ກວ້າງຂວາງ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleSaveSystem}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            ບັນທຶກການຕັ້ງຄ່າ
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-6">ຄວາມປອດໄພ</h2>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">ປ່ຽນລະຫັດຜ່ານ</h3>
                                                    <p className="text-sm text-gray-500">ອັບເດດລະຫັດຜ່ານຂອງທ່ານເປັນປະຈຳເພື່ອຄວາມປອດໄພ</p>
                                                </div>
                                                <button
                                                    onClick={handleChangePassword}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                >
                                                    ປ່ຽນລະຫັດຜ່ານ
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">ອອກຈາກລະບົບໃນອຸປະກອນທັງໝົດ</h3>
                                                    <p className="text-sm text-gray-500">ອອກຈາກລະບົບໃນອຸປະກອນອື່ນໆ ທີ່ເຂົ້າສູ່ລະບົບໄວ້</p>
                                                </div>
                                                <button
                                                    onClick={handleLogoutAllDevices}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                                >
                                                    ອອກຈາກລະບົບທັງໝົດ
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">ອຸປະກອນທີ່ເຂົ້າສູ່ລະບົບ</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <Smartphone className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">iPad Pro (ປັດຈຸບັນ)</p>
                                                        <p className="text-xs text-gray-500">ເຂົ້າສູ່ລະບົບເມື່ອ: ມື້ນີ້ 09:15</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">ປັດຈຸບັນ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'about' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">ກ່ຽວກັບລະບົບ</h2>

                                    <div className="space-y-6">
                                        <div className="text-center py-8">
                                            <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <span className="text-white font-bold text-xl">BS</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900">ລະບົບຈັດການສະຖານີລົດເມ</h3>
                                            <p className="text-gray-600">ເວີຊັນ 1.0.0</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">ຂໍ້ມູນລະບົບ</h4>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <p>ເວີຊັນ: 1.0.0</p>
                                                    <p>ວັນທີອັບເດດ: 23 ກໍລະກົດ 2025</p>
                                                    <p>ສະຖານະ: ໃຊ້ງານໄດ້</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">ການສະໜັບສະໜູນ</h4>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <p>ອີເມວ: support@busstation.com</p>
                                                    <p>ໂທ: 020 5555 6789</p>
                                                    <p>ເວລາເຮັດວຽກ: 24/7</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-6">
                                            <p className="text-xs text-gray-500 text-center">
                                                © 2025 ລະບົບຈັດການສະຖານີລົດເມ. ສະຫງວນລິຂະສິດທັງໝົດ.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
