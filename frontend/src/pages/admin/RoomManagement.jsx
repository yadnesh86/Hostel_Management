import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManagement = () => {
  const initialFormState = {
    hostel_id: '',
    room_number: '',
    capacity: 1,
    current_occupants: 0,
    fee_per_month: '',
    floor_number: '',
    room_type: 'double',
    status: 'available',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/adminrooms');
      const updatedRooms = res.data.map(room => ({
        ...room,
        status: room.current_occupants >= room.capacity ? 'full' : 'available',
      }));
      setRooms(updatedRooms);
    } catch (err) {
      setMessageType('error');
      setMessage('Failed to fetch rooms.');
    }
  };

  const fetchHostels = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/adminhostel');
      setHostels(res.data);
    } catch (err) {
      setHostels([]);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setMessage('');
    setMessageType('success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hostel_id || !formData.room_number || !formData.capacity || !formData.fee_per_month) {
      setMessageType('error');
      setMessage('All required fields must be filled.');
      return;
    }

    const autoStatus = parseInt(formData.current_occupants) >= parseInt(formData.capacity) ? 'full' : 'available';

    try {
      const dataToSend = { ...formData, status: autoStatus };

      if (editingId) {
        await axios.put(`http://localhost:3001/api/adminrooms/${editingId}`, dataToSend);
        setMessage('Room updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/adminrooms', dataToSend);
        setMessage('Room added successfully!');
      }

      setMessageType('success');
      handleClear();
      fetchRooms();
    } catch (err) {
      setMessageType('error');
      setMessage('Failed to submit room.');
    }
  };

  const handleEdit = (room) => {
    setFormData({ ...room });
    setEditingId(room.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/adminrooms/${id}`);
      setMessageType('success');
      setMessage('Room deleted successfully!');
      fetchRooms();
    } catch (err) {
      setMessageType('error');
      setMessage('Failed to delete room.');
    }
  };

  const filteredRooms = rooms.filter((room) =>
    (room.room_number + room.hostel_name).toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? room.status === filterStatus : true) &&
    (filterType ? room.room_type === filterType : true)
  );

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Room Management</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Room or Hostel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4"
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="full">Full</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4"
        >
          <option value="">All Types</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
      </div>

      {/* Form */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Hostel</label>
              <select
                name="hostel_id"
                value={formData.hostel_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3"
                required
              >
                <option value="">Select Hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Room Number</label>
              <input
                type="text"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Current Occupants</label>
              <input
                type="number"
                name="current_occupants"
                value={formData.current_occupants}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Fee per Month (₹)</label>
              <input
                type="number"
                name="fee_per_month"
                value={formData.fee_per_month}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Floor Number</label>
              <input
                type="number"
                name="floor_number"
                value={formData.floor_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Room Type</label>
              <select
                name="room_type"
                value={formData.room_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full mr-2"
              >
                {editingId ? 'Update Room' : 'Add Room'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full ml-2"
              >
                Clear
              </button>
            </div>

            {message && (
              <p className={`text-center mt-2 ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedRooms.length ? (
          displayedRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-4 rounded shadow border hover:shadow-lg transform transition hover:scale-105"
            >
              <h4 className="text-xl font-bold mb-2 text-gray-800">Room {room.room_number}</h4>
              <p className="text-gray-600"><strong>Hostel:</strong> {room.hostel_name}</p>
              <p className="text-gray-600"><strong>Capacity:</strong> {room.capacity}</p>
              <p className="text-gray-600"><strong>Current Occupants:</strong> {room.current_occupants}</p>
              <p className="text-gray-600"><strong>Floor:</strong> {room.floor_number}</p>
              <p className="text-gray-600"><strong>Fee/Month:</strong> ₹{room.fee_per_month}</p>
              <p className="text-gray-600"><strong>Type:</strong> {room.room_type}</p>
              <p className="text-gray-600"><strong>Status:</strong> {room.status}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(room)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No rooms found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
