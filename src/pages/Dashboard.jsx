import { useState, useEffect } from 'react';
import { Users, Bus, Ticket, DollarSign, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBuses: 0,
        totalBookings: 0,
        totalRevenue: 0,
        pendingBookings: 0,
        confirmedBookings: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch all data in parallel
            const [
                usersRes,
                busesRes,
                bookingsRes,
                pendingRes,
                confirmedRes
            ] = await Promise.all([
                api.get('/users?limit=1'),
                api.get('/buses?limit=1'),
                api.get('/bookings?limit=5'), // Get recent bookings
                api.get('/bookings?paymentStatus=pending&limit=1'),
                api.get('/bookings?status=completed&limit=1')
            ]);

            // Calculate total revenue (mock calculation since backend doesn't support it yet)
            // In a real app, this should come from an aggregation endpoint
            const estimatedRevenue = (bookingsRes.data.pagination?.total || 0) * 25; // Assuming avg $25 per ticket

            // Update stats
            setStats({
                totalUsers: usersRes.data.pagination?.total || 0,
                totalBuses: busesRes.data.pagination?.total || 0,
                totalBookings: bookingsRes.data.pagination?.total || 0,
                totalRevenue: estimatedRevenue,
                pendingBookings: pendingRes.data.pagination?.total || 0,
                confirmedBookings: confirmedRes.data.pagination?.total || 0,
            });

            // Set recent bookings
            setRecentBookings(bookingsRes.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout title="Dashboard">
                <div>Loading dashboard...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Dashboard">
            {/* Statistics Cards */}
            <div className="stats-grid">
                <StatCard
                    icon={Users}
                    label="Active Users"
                    value={stats.totalUsers}
                    color="primary"
                />
                <StatCard
                    icon={Bus}
                    label="Active Buses"
                    value={stats.totalBuses}
                    color="success"
                />
                <StatCard
                    icon={Ticket}
                    label="Total Bookings"
                    value={stats.totalBookings}
                    color="info"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={`${stats.totalRevenue} LAK`}
                    color="warning"
                />
                <StatCard
                    icon={Clock}
                    label="Pending Bookings"
                    value={stats.pendingBookings}
                    color="warning"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Confirmed Bookings"
                    value={stats.confirmedBookings}
                    color="success"
                />
            </div>

            {/* Recent Bookings */}
            <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="card-header">
                    <h2 className="card-title">Recent Bookings</h2>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Passenger</th>
                                <th>Route</th>
                                <th>Date</th>
                                <th>Seats</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.length > 0 ? (
                                recentBookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="font-medium">#{booking._id.slice(-6)}</td>
                                        <td>{booking.userId?.username || booking.passengerDetails?.name || 'N/A'}</td>
                                        <td>
                                            {booking.departureStation} → {booking.arrivalStation}
                                        </td>
                                        <td>{new Date(booking.departureTime).toLocaleDateString()}</td>
                                        <td>{booking.seatNumber}</td>
                                        <td className="font-medium">{booking.price} LAK</td>
                                        <td>
                                            <span className={`badge badge-${booking.status === 'completed' ? 'success' :
                                                booking.status === 'pending' ? 'warning' :
                                                    booking.status === 'booked' ? 'primary' :
                                                        'error'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No bookings yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
