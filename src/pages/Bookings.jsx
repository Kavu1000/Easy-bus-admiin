import { useState, useEffect } from 'react';
import { Eye, Search } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import api from '../services/api';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            console.log('Bookings response:', response.data);
            setBookings(response.data.data || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
            setLoading(false);
        }
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const response = await api.put(`/bookings/${bookingId}`, {
                status: newStatus
            });

            const updatedBooking = response.data.data;

            // Update local state if modal is open with this booking
            if (selectedBooking && selectedBooking._id === bookingId) {
                setSelectedBooking(updatedBooking);
            }

            // Update list
            setBookings(bookings.map(b =>
                b._id === bookingId ? updatedBooking : b
            ));
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    const updatePaymentStatus = async (bookingId, newStatus) => {
        try {
            const response = await api.put(`/bookings/${bookingId}`, {
                paymentStatus: newStatus
            });

            const updatedBooking = response.data.data;

            // Update local state if modal is open with this booking
            if (selectedBooking && selectedBooking._id === bookingId) {
                setSelectedBooking(updatedBooking);
            }

            // Update list
            setBookings(bookings.map(b =>
                b._id === bookingId ? updatedBooking : b
            ));
        } catch (error) {
            console.error('Failed to update payment status:', error);
            alert('Failed to update payment status');
        }
    };

    // Filter bookings
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = (booking._id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (booking.userId?.username?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <DashboardLayout title="Bookings Management"><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout title="Bookings Management">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Bookings</h2>
                </div>

                {/* Search and Filters */}
                <div className="search-filter-bar">
                    <div className="search-input">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by booking ID or passenger name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="form-select filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="booked">Booked</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                {/* Bookings Table */}
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Passenger</th>
                                <th>Bus</th>
                                <th>Route</th>
                                <th>Departure</th>
                                <th>Seat</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="font-medium">#{booking._id.slice(-6)}</td>
                                    <td>{booking.userId?.username || booking.passengerDetails?.name || 'Unknown'}</td>
                                    <td>{booking.busId?.name || 'N/A'}</td>
                                    <td>{booking.departureStation} → {booking.arrivalStation}</td>
                                    <td>{new Date(booking.departureTime).toLocaleDateString()}</td>
                                    <td>{booking.seatNumber}</td>
                                    <td className="font-medium">{booking.price.toLocaleString()} LAK</td>
                                    <td>
                                        <span className={`badge ${booking.paymentStatus === 'completed' ? 'badge-success' :
                                            booking.paymentStatus === 'refunded' ? 'badge-warning' :
                                                'badge-secondary'
                                            }`}>
                                            {booking.paymentStatus || 'pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${booking.status === 'booked' ? 'badge-success' :
                                            booking.status === 'cancelled' ? 'badge-error' :
                                                booking.status === 'completed' ? 'badge-primary' :
                                                    'badge-warning'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn view"
                                                onClick={() => handleViewBooking(booking)}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {booking.status === 'booked' && (
                                                <>
                                                    <button
                                                        className="action-btn success"
                                                        onClick={() => updateBookingStatus(booking._id, 'completed')}
                                                        title="Mark as Completed"
                                                        style={{ color: 'green' }}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="action-btn error"
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to cancel this booking?')) {
                                                                updateBookingStatus(booking._id, 'cancelled');
                                                            }
                                                        }}
                                                        title="Cancel Booking"
                                                        style={{ color: 'red' }}
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Booking Details"
                footer={
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                }
            >
                {selectedBooking && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div>
                            <p className="text-sm text-secondary">Booking ID</p>
                            <p className="font-semibold">{selectedBooking._id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Passenger Name</p>
                            <p className="font-semibold">{selectedBooking.userId?.username || selectedBooking.passengerDetails?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Bus</p>
                            <p className="font-semibold">{selectedBooking.busId?.name} - {selectedBooking.busId?.company}</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Route</p>
                            <p className="font-semibold">{selectedBooking.departureStation} → {selectedBooking.arrivalStation}</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Departure Time</p>
                            <p className="font-semibold">{new Date(selectedBooking.departureTime).toLocaleString()}</p>
                        </div>
                        {selectedBooking.arrivalTime && (
                            <div>
                                <p className="text-sm text-secondary">Arrival Time</p>
                                <p className="font-semibold">{new Date(selectedBooking.arrivalTime).toLocaleString()}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-secondary">Seat Number</p>
                            <p className="font-semibold">{selectedBooking.seatNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Price</p>
                            <p className="font-semibold">{selectedBooking.price} LAK</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Payment Status</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                <select
                                    className="form-select"
                                    style={{ width: 'auto', padding: '4px 8px' }}
                                    value={selectedBooking.paymentStatus}
                                    onChange={(e) => updatePaymentStatus(selectedBooking._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                                <span className={`badge ${selectedBooking.paymentStatus === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                    {selectedBooking.paymentStatus}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Booking Status</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                <select
                                    className="form-select"
                                    style={{ width: 'auto', padding: '4px 8px' }}
                                    value={selectedBooking.status}
                                    onChange={(e) => updateBookingStatus(selectedBooking._id, e.target.value)}
                                >
                                    <option value="booked">Booked</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                    <option value="expired">Expired</option>
                                </select>
                                <span className={`badge ${selectedBooking.status === 'booked' ? 'badge-success' :
                                    selectedBooking.status === 'cancelled' ? 'badge-error' :
                                        selectedBooking.status === 'completed' ? 'badge-primary' :
                                            'badge-warning'
                                    }`}>
                                    {selectedBooking.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
};

export default Bookings;
