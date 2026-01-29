import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Modal from '../components/Modal';
import api from '../services/api';

const Buses = () => {
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBus, setEditingBus] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCompany, setFilterCompany] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        licensePlate: '',
        capacity: '',
        phone: ''
    });



    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await api.get('/buses');
            setBuses(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch buses');
            setLoading(false);
        }
    };

    const companies = [...new Set(buses.map(b => b.company))];

    const handleOpenModal = (bus = null) => {
        if (bus) {
            setEditingBus(bus);
            setFormData({
                name: bus.name,
                company: bus.company,
                licensePlate: bus.licensePlate,
                capacity: bus.capacity,
                phone: bus.phone || ''
            });
        } else {
            setEditingBus(null);
            setFormData({
                name: '',
                company: '',
                licensePlate: '',
                capacity: '',
                phone: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const busData = {
            ...formData,
            capacity: parseInt(formData.capacity)
        };
        try {
            if (editingBus) {
                await api.put(`/buses/${editingBus._id}`, busData);
            } else {
                await api.post('/buses', busData);
            }
            fetchBuses();
            handleCloseModal();
        } catch (err) {
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/buses/${id}`);
            fetchBuses();
            setDeleteConfirmId(null);
        } catch (err) {
            alert('Failed to delete bus');
        }
    };



    // Filter buses
    const filteredBuses = buses.filter(bus => {
        const matchesSearch = (bus.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (bus.licensePlate?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCompany = filterCompany === 'all' || bus.company === filterCompany;
        return matchesSearch && matchesCompany;
    });

    if (loading) return <DashboardLayout title="Buses Management"><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout title="Buses Management">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">All Buses</h2>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} />
                        Add Bus
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="search-filter-bar">
                    <div className="search-input">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by name or license plate..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="form-select filter-select"
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                    >
                        <option value="all">All Companies</option>
                        {companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                </div>

                {/* Buses Table */}
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>License Plate</th>
                                <th>Capacity</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBuses.map((bus) => (
                                <tr key={bus._id}>
                                    <td className="font-medium">#{bus._id.slice(-6)}</td>
                                    <td>{bus.name}</td>
                                    <td>{bus.company}</td>
                                    <td className="font-medium">{bus.licensePlate}</td>
                                    <td>{bus.capacity} seats</td>
                                    <td>{bus.phone}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn edit"
                                                onClick={() => navigate(`/schedules?busId=${bus._id}`)}
                                                title="Manage Schedule"
                                            >
                                                <Calendar size={16} />
                                            </button>
                                            <button
                                                className="action-btn edit"
                                                onClick={() => handleOpenModal(bus)}
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => setDeleteConfirmId(bus._id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Bus Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingBus ? 'Edit Bus' : 'Add New Bus'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            {editingBus ? 'Update' : 'Create'}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Bus Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">License Plate</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.licensePlate}
                            onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Capacity</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            required
                            min="1"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
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
                <p>Are you sure you want to delete this bus? This action cannot be undone.</p>
            </Modal>
        </DashboardLayout>
    );
};

export default Buses;
