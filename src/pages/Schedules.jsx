import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, RefreshCw } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import api from '../services/api';

const Schedules = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const busIdFilter = queryParams.get('busId');

    const [schedules, setSchedules] = useState([]);
    const [buses, setBuses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        route: { from: '', to: '' },
        busId: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        price: '',
        availableSeats: '',
        date: '',
        status: 'active'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [schedulesRes, busesRes] = await Promise.all([
                api.get('/schedules?limit=1000'), // Fetch all schedules
                api.get('/buses?limit=1000') // Fetch all buses
            ]);
            console.log('Buses response:', busesRes.data);
            console.log('Buses data:', busesRes.data.data);
            console.log('Schedules count:', schedulesRes.data.data?.length || 0); // Log count
            setSchedules(schedulesRes.data.data || []);
            setBuses(busesRes.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Error details:', error.response?.data);
            setLoading(false);
        }
    };

    const handleOpenModal = (schedule = null) => {
        if (schedule) {
            setEditingSchedule(schedule);
            setFormData({
                ...schedule,
                busId: schedule.busId?._id || schedule.busId,
                date: schedule.date ? new Date(schedule.date).toISOString().split('T')[0] : ''
            });
        } else {
            setEditingSchedule(null);
            setFormData({
                route: { from: '', to: '' },
                busId: busIdFilter || '',
                departureTime: '',
                arrivalTime: '',
                duration: '',
                price: '',
                availableSeats: '',
                date: '',
                status: 'active'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSchedule(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scheduleData = {
                ...formData,
                price: parseFloat(formData.price),
                pricePerSeat: parseFloat(formData.price), // backend requires pricePerSeat
                availableSeats: parseInt(formData.availableSeats)
            };

            if (editingSchedule) {
                await api.put(`/schedules/${editingSchedule._id}`, scheduleData);
            } else {
                await api.post('/schedules', scheduleData);
            }
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving schedule:', error);
            const errorMessage = error.response?.data?.message || 'Failed to save schedule';
            alert(errorMessage);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/schedules/${id}`);
            fetchData();
            setDeleteConfirmId(null);
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Failed to delete schedule');
        }
    };

    const handleUpdateExpired = async () => {
        setUpdating(true);
        try {
            const response = await api.post('/schedules/update-expired');
            alert(response.data.message);
            fetchData();
        } catch (error) {
            console.error('Error updating schedules:', error);
            alert('Failed to update schedules');
        } finally {
            setUpdating(false);
        }
    };

    // Filter schedules
    const filteredSchedules = schedules.filter(schedule => {
        const routeString = `${schedule.route?.from} ${schedule.route?.to}`.toLowerCase();
        const matchesSearch = routeString.includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || schedule.status === filterStatus;

        // Filter by busId if present in URL
        const matchesBus = !busIdFilter || (schedule.busId && (schedule.busId._id === busIdFilter || schedule.busId === busIdFilter));

        return matchesSearch && matchesStatus && matchesBus;
    });

    if (loading) return <DashboardLayout title="Schedules Management"><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout title="Schedules Management">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">
                        {busIdFilter ? 'Bus Schedules' : 'All Schedules'}
                        {busIdFilter && (
                            <span className="ml-2 text-sm font-normal text-gray-500">
                                (Filtered by Bus ID: {busIdFilter.slice(-6)})
                            </span>
                        )}
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={handleUpdateExpired}
                            disabled={updating}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                            <RefreshCw size={18} className={updating ? 'animate-spin' : ''} />
                            {updating ? 'Updating...' : 'Update Expired'}
                        </button>
                        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                            <Plus size={18} />
                            Add Schedule
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="search-filter-bar">
                    <div className="search-input">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by route..."
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Schedules Table */}
                <div className="table-container" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <table className="table">
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#1F2937', zIndex: 1 }}>
                            <tr>
                                <th>ID</th>
                                <th>Route</th>
                                <th>Bus</th>
                                <th>Date</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Available Seats</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSchedules.map((schedule) => {
                                return (
                                    <tr key={schedule._id}>
                                        <td className="font-medium">#{schedule._id.slice(-6)}</td>
                                        <td>{schedule.route?.from} → {schedule.route?.to}</td>
                                        <td>{schedule.busId?.name || 'N/A'}</td>
                                        <td>{new Date(schedule.date).toLocaleDateString()}</td>
                                        <td>{schedule.departureTime}</td>
                                        <td>{schedule.arrivalTime}</td>
                                        <td>{schedule.duration}</td>
                                        <td className="font-medium">{schedule.price} LAK</td>
                                        <td>{schedule.availableSeats}</td>
                                        <td>
                                            <span className={`badge ${schedule.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                                                {schedule.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn edit"
                                                    onClick={() => handleOpenModal(schedule)}
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => setDeleteConfirmId(schedule._id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Schedule Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            {editingSchedule ? 'Update' : 'Create'}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">From</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.route.from}
                            onChange={(e) => setFormData({ ...formData, route: { ...formData.route, from: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">To</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.route.to}
                            onChange={(e) => setFormData({ ...formData, route: { ...formData.route, to: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Bus</label>
                        <select
                            className="form-select"
                            value={formData.busId}
                            onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
                            required
                        >
                            <option value="">Select a bus</option>
                            {buses && buses.length > 0 ? (
                                buses.map(bus => (
                                    <option key={bus._id} value={bus._id}>
                                        {bus.name} - {bus.company}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No buses available - Create a bus first</option>
                            )}
                        </select>
                        {buses && buses.length === 0 && (
                            <small style={{ color: '#EF4444', marginTop: '0.25rem', display: 'block' }}>
                                No buses found. Please create a bus in the Buses management page first.
                            </small>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Departure Time</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g., 07:00 AM"
                            value={formData.departureTime}
                            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Arrival Time</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g., 02:30 PM"
                            value={formData.arrivalTime}
                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Duration</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g., 7h 30m"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price (LAK)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Available Seats</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.availableSeats}
                            onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteConfirmId !== null}
                onClose={() => setDeleteConfirmId(null)}
                title="Confirm Delete"
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirmId)}>
                            Delete
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to delete this schedule? This action cannot be undone.</p>
            </Modal>
        </DashboardLayout>
    );
};

export default Schedules;
